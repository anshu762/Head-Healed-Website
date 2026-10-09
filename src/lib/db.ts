import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export function isDbConfigured(): boolean {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return false;
  if (
    connectionString.includes("your_password") ||
    connectionString.includes("ep-sample-pooler") ||
    connectionString.includes("placeholder")
  ) {
    return false;
  }
  return (
    connectionString.startsWith("postgres://") ||
    connectionString.startsWith("postgresql://")
  );
}

function getPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  if (isDbConfigured() && connectionString) {
    try {
      const adapter = new PrismaNeon({ connectionString });
      return new PrismaClient({ adapter });
    } catch {
      return new PrismaClient();
    }
  }

  return new PrismaClient();
}

export const db = globalForPrisma.prisma ?? getPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
