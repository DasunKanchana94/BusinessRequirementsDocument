import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertCreatorProfileSchema, insertPackageSchema, insertAvailabilitySchema, insertBookingSchema } from "@shared/schema";
import bcrypt from "bcrypt";
import { z } from "zod";

// Utility to generate OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Utility to add minutes to a date
function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // ===== AUTHENTICATION ROUTES =====
  
  // Register - Step 1: Create user and send OTP
  app.post("/api/auth/register", async (req, res) => {
    try {
      const body = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByMobile(body.mobile);
      if (existingUser) {
        return res.status(400).json({ error: "User with this mobile number already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(body.password, 10);

      // Create user (unverified)
      await storage.createUser({
        ...body,
        password: hashedPassword,
      });

      // Generate and store OTP
      const otp = generateOTP();
      await storage.createOtp({
        mobile: body.mobile,
        otp,
        expiresAt: addMinutes(new Date(), 10), // 10 minute expiry
      });

      // In production, send OTP via Twilio SMS
      console.log(`OTP for ${body.mobile}: ${otp}`);

      res.json({ 
        success: true, 
        message: "OTP sent to mobile number",
        // For development/testing only
        otp: process.env.NODE_ENV === "development" ? otp : undefined
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Registration error:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  // Verify OTP - Step 2: Verify OTP and activate account
  app.post("/api/auth/verify-otp", async (req, res) => {
    try {
      const { mobile, otp } = req.body;

      const otpRecord = await storage.getValidOtp(mobile, otp);
      
      if (!otpRecord) {
        return res.status(400).json({ error: "Invalid or expired OTP" });
      }

      // Mark OTP as verified
      await storage.markOtpAsVerified(otpRecord.id);

      // Mark user as verified
      await storage.updateUserVerification(mobile, true);

      // Get user for response
      const user = await storage.getUserByMobile(mobile);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create initial creator profile
      await storage.createCreatorProfile({
        userId: user.id,
        displayName: `${user.firstName} ${user.lastName}`,
        customUrl: user.mobile.replace(/[^0-9]/g, ''), // Use sanitized mobile as default URL
      });

      res.json({ 
        success: true, 
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          mobile: user.mobile,
          role: user.role,
        }
      });
    } catch (error) {
      console.error("OTP verification error:", error);
      res.status(500).json({ error: "Verification failed" });
    }
  });

  // Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { mobile, password } = req.body;

      const user = await storage.getUserByMobile(mobile);
      
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      if (!user.isVerified) {
        return res.status(403).json({ error: "Account not verified. Please verify your mobile number." });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({ 
        success: true, 
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          mobile: user.mobile,
          role: user.role,
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  // ===== CREATOR PROFILE ROUTES =====

  // Get creator profile by user ID
  app.get("/api/creator/profile/:userId", async (req, res) => {
    try {
      const profile = await storage.getCreatorProfile(req.params.userId);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      console.error("Get profile error:", error);
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  // Get creator profile by custom URL
  app.get("/api/creator/public/:customUrl", async (req, res) => {
    try {
      const profile = await storage.getCreatorProfileByCustomUrl(req.params.customUrl);
      if (!profile) {
        return res.status(404).json({ error: "Creator not found" });
      }
      
      // Get packages for this creator
      const pkgs = await storage.getPackagesByCreator(profile.userId);
      
      // Get user info
      const user = await storage.getUser(profile.userId);
      
      res.json({ 
        profile,
        packages: pkgs,
        creator: user ? {
          firstName: user.firstName,
          lastName: user.lastName,
        } : null
      });
    } catch (error) {
      console.error("Get public profile error:", error);
      res.status(500).json({ error: "Failed to fetch creator" });
    }
  });

  // Update creator profile
  app.put("/api/creator/profile/:userId", async (req, res) => {
    try {
      const updates = insertCreatorProfileSchema.partial().parse(req.body);
      const profile = await storage.updateCreatorProfile(req.params.userId, updates);
      res.json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Update profile error:", error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  // ===== PACKAGE ROUTES =====

  // Get packages by creator
  app.get("/api/packages/creator/:creatorId", async (req, res) => {
    try {
      const pkgs = await storage.getPackagesByCreator(req.params.creatorId);
      res.json(pkgs);
    } catch (error) {
      console.error("Get packages error:", error);
      res.status(500).json({ error: "Failed to fetch packages" });
    }
  });

  // Create package
  app.post("/api/packages", async (req, res) => {
    try {
      const body = insertPackageSchema.parse(req.body);
      const pkg = await storage.createPackage(body);
      res.json(pkg);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Create package error:", error);
      res.status(500).json({ error: "Failed to create package" });
    }
  });

  // Update package
  app.put("/api/packages/:id", async (req, res) => {
    try {
      const updates = insertPackageSchema.partial().parse(req.body);
      const pkg = await storage.updatePackage(req.params.id, updates);
      res.json(pkg);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Update package error:", error);
      res.status(500).json({ error: "Failed to update package" });
    }
  });

  // Delete package
  app.delete("/api/packages/:id", async (req, res) => {
    try {
      await storage.deletePackage(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete package error:", error);
      res.status(500).json({ error: "Failed to delete package" });
    }
  });

  // ===== AVAILABILITY ROUTES =====

  // Get availability by creator
  app.get("/api/availability/creator/:creatorId", async (req, res) => {
    try {
      const avail = await storage.getAvailabilityByCreator(req.params.creatorId);
      res.json(avail);
    } catch (error) {
      console.error("Get availability error:", error);
      res.status(500).json({ error: "Failed to fetch availability" });
    }
  });

  // Create or update availability
  app.post("/api/availability", async (req, res) => {
    try {
      const body = insertAvailabilitySchema.parse(req.body);
      const avail = await storage.createAvailability(body);
      res.json(avail);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Create availability error:", error);
      res.status(500).json({ error: "Failed to create availability" });
    }
  });

  // ===== BOOKING ROUTES =====

  // Get bookings by creator
  app.get("/api/bookings/creator/:creatorId", async (req, res) => {
    try {
      const bookingsData = await storage.getBookingsByCreator(req.params.creatorId);
      res.json(bookingsData);
    } catch (error) {
      console.error("Get bookings error:", error);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  // Create booking
  app.post("/api/bookings", async (req, res) => {
    try {
      const body = insertBookingSchema.parse(req.body);
      
      // Generate a simple meeting link (in production, integrate with Google Meet/Zoom API)
      const meetingLink = `https://meet.google.com/${Math.random().toString(36).substring(7)}`;
      
      const booking = await storage.createBooking({
        ...body,
        meetingLink,
      });

      // Create transaction record
      const platformFeePercent = 0.15; // 15% platform fee
      const amount = parseFloat(body.price.toString());
      const platformFee = amount * platformFeePercent;
      const creatorPayout = amount - platformFee;

      await storage.createTransaction({
        bookingId: booking.id,
        creatorId: body.creatorId,
        amount: body.price,
        platformFee: platformFee.toString(),
        creatorPayout: creatorPayout.toString(),
        status: "held",
      });

      res.json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Create booking error:", error);
      res.status(500).json({ error: "Failed to create booking" });
    }
  });

  // ===== ADMIN/TRANSACTION ROUTES =====

  // Get all transactions (admin)
  app.get("/api/admin/transactions", async (req, res) => {
    try {
      const trans = await storage.getAllTransactions();
      res.json(trans);
    } catch (error) {
      console.error("Get transactions error:", error);
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

  return httpServer;
}
