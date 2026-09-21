import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  if (
    connectionString &&
    (connectionString.startsWith("postgres://") ||
      connectionString.startsWith("postgresql://"))
  ) {
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
