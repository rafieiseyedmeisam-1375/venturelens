import 'server-only';
import { PrismaClient } from '@prisma/client';
import { env } from '@/lib/env';
const globalForPrisma = globalThis as unknown as { prismaGlobal?: PrismaClient };
export const prisma =
  globalForPrisma.prismaGlobal ??
  new PrismaClient({
    // Confidential data must not leak through query/error logging.
    log: env.PRISMA_LOG_QUERIES && env.NODE_ENV === 'development' ? ['query'] : [],
  });
if (env.NODE_ENV !== 'production') globalForPrisma.prismaGlobal = prisma;
// Lazy connection: importing a service during build/preview must not contact a DB.
export const ensureConnected = () => prisma.$connect();
export default prisma;
