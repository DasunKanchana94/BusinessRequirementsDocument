import {
  type User,
  type InsertUser,
  type OtpVerification,
  type InsertOtp,
  type CreatorProfile,
  type InsertCreatorProfile,
  type Package,
  type InsertPackage,
  type Availability,
  type InsertAvailability,
  type Booking,
  type InsertBooking,
  type Transaction,
  type InsertTransaction,
  users,
  otpVerification,
  creatorProfiles,
  packages,
  availability,
  bookings,
  transactions,
} from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { eq, and, gte, desc } from "drizzle-orm";

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const db = drizzle(pool);

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByMobile(mobile: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserVerification(mobile: string, isVerified: boolean): Promise<void>;

  // OTP operations
  createOtp(otp: InsertOtp): Promise<OtpVerification>;
  getValidOtp(mobile: string, otp: string): Promise<OtpVerification | undefined>;
  markOtpAsVerified(id: string): Promise<void>;

  // Creator profile operations
  getCreatorProfile(userId: string): Promise<CreatorProfile | undefined>;
  getCreatorProfileByCustomUrl(customUrl: string): Promise<CreatorProfile | undefined>;
  createCreatorProfile(profile: InsertCreatorProfile): Promise<CreatorProfile>;
  updateCreatorProfile(userId: string, profile: Partial<InsertCreatorProfile>): Promise<CreatorProfile>;

  // Package operations
  getPackagesByCreator(creatorId: string): Promise<Package[]>;
  getPackage(id: string): Promise<Package | undefined>;
  createPackage(pkg: InsertPackage): Promise<Package>;
  updatePackage(id: string, pkg: Partial<InsertPackage>): Promise<Package>;
  deletePackage(id: string): Promise<void>;

  // Availability operations
  getAvailabilityByCreator(creatorId: string): Promise<Availability[]>;
  createAvailability(avail: InsertAvailability): Promise<Availability>;
  updateAvailability(id: string, avail: Partial<InsertAvailability>): Promise<Availability>;
  deleteAvailability(id: string): Promise<void>;

  // Booking operations
  getBookingsByCreator(creatorId: string): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: string, status: string, paymentStatus?: string): Promise<Booking>;

  // Transaction operations
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getTransactionsByCreator(creatorId: string): Promise<Transaction[]>;
  getAllTransactions(): Promise<Transaction[]>;
}

export class DbStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByMobile(mobile: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.mobile, mobile)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async updateUserVerification(mobile: string, isVerified: boolean): Promise<void> {
    await db.update(users).set({ isVerified }).where(eq(users.mobile, mobile));
  }

  // OTP operations
  async createOtp(otp: InsertOtp): Promise<OtpVerification> {
    const result = await db.insert(otpVerification).values(otp).returning();
    return result[0];
  }

  async getValidOtp(mobile: string, otpCode: string): Promise<OtpVerification | undefined> {
    const result = await db
      .select()
      .from(otpVerification)
      .where(
        and(
          eq(otpVerification.mobile, mobile),
          eq(otpVerification.otp, otpCode),
          eq(otpVerification.verified, false),
          gte(otpVerification.expiresAt, new Date())
        )
      )
      .limit(1);
    return result[0];
  }

  async markOtpAsVerified(id: string): Promise<void> {
    await db.update(otpVerification).set({ verified: true }).where(eq(otpVerification.id, id));
  }

  // Creator profile operations
  async getCreatorProfile(userId: string): Promise<CreatorProfile | undefined> {
    const result = await db.select().from(creatorProfiles).where(eq(creatorProfiles.userId, userId)).limit(1);
    return result[0];
  }

  async getCreatorProfileByCustomUrl(customUrl: string): Promise<CreatorProfile | undefined> {
    const result = await db.select().from(creatorProfiles).where(eq(creatorProfiles.customUrl, customUrl)).limit(1);
    return result[0];
  }

  async createCreatorProfile(profile: InsertCreatorProfile): Promise<CreatorProfile> {
    const result = await db.insert(creatorProfiles).values(profile).returning();
    return result[0];
  }

  async updateCreatorProfile(userId: string, profile: Partial<InsertCreatorProfile>): Promise<CreatorProfile> {
    const result = await db
      .update(creatorProfiles)
      .set({ ...profile, updatedAt: new Date() })
      .where(eq(creatorProfiles.userId, userId))
      .returning();
    return result[0];
  }

  // Package operations
  async getPackagesByCreator(creatorId: string): Promise<Package[]> {
    return await db.select().from(packages).where(eq(packages.creatorId, creatorId));
  }

  async getPackage(id: string): Promise<Package | undefined> {
    const result = await db.select().from(packages).where(eq(packages.id, id)).limit(1);
    return result[0];
  }

  async createPackage(pkg: InsertPackage): Promise<Package> {
    const result = await db.insert(packages).values(pkg).returning();
    return result[0];
  }

  async updatePackage(id: string, pkg: Partial<InsertPackage>): Promise<Package> {
    const result = await db
      .update(packages)
      .set({ ...pkg, updatedAt: new Date() })
      .where(eq(packages.id, id))
      .returning();
    return result[0];
  }

  async deletePackage(id: string): Promise<void> {
    await db.delete(packages).where(eq(packages.id, id));
  }

  // Availability operations
  async getAvailabilityByCreator(creatorId: string): Promise<Availability[]> {
    return await db.select().from(availability).where(eq(availability.creatorId, creatorId));
  }

  async createAvailability(avail: InsertAvailability): Promise<Availability> {
    const result = await db.insert(availability).values(avail).returning();
    return result[0];
  }

  async updateAvailability(id: string, avail: Partial<InsertAvailability>): Promise<Availability> {
    const result = await db.update(availability).set(avail).where(eq(availability.id, id)).returning();
    return result[0];
  }

  async deleteAvailability(id: string): Promise<void> {
    await db.delete(availability).where(eq(availability.id, id));
  }

  // Booking operations
  async getBookingsByCreator(creatorId: string): Promise<Booking[]> {
    return await db.select().from(bookings).where(eq(bookings.creatorId, creatorId)).orderBy(desc(bookings.scheduledAt));
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    const result = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
    return result[0];
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const result = await db.insert(bookings).values(booking).returning();
    return result[0];
  }

  async updateBookingStatus(id: string, status: string, paymentStatus?: string): Promise<Booking> {
    const updateData: any = { status, updatedAt: new Date() };
    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
    }
    const result = await db.update(bookings).set(updateData).where(eq(bookings.id, id)).returning();
    return result[0];
  }

  // Transaction operations
  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const result = await db.insert(transactions).values(transaction).returning();
    return result[0];
  }

  async getTransactionsByCreator(creatorId: string): Promise<Transaction[]> {
    return await db.select().from(transactions).where(eq(transactions.creatorId, creatorId)).orderBy(desc(transactions.createdAt));
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return await db.select().from(transactions).orderBy(desc(transactions.createdAt));
  }
}

export const storage = new DbStorage();
