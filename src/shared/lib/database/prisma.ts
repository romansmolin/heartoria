import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
    prismaPool: Pool | undefined
}

// Schema version — bump to invalidate cached Prisma client after schema changes
const SCHEMA_VERSION = 2
const globalSchemaVersion = globalThis as unknown as { __prismaSchemaVersion?: number }
if (globalSchemaVersion.__prismaSchemaVersion !== SCHEMA_VERSION) {
    globalForPrisma.prisma = undefined
    globalSchemaVersion.__prismaSchemaVersion = SCHEMA_VERSION
}

export const prisma =
    globalForPrisma.prisma ??
    (() => {
        const connectionString = process.env.DATABASE_URL || process.env.PRISMA_DATABASE_URL

        if (!connectionString) {
            throw new Error('DATABASE_URL or PRISMA_DATABASE_URL must be set')
        }

        const pool =
            globalForPrisma.prismaPool ??
            new Pool({
                connectionString,
                max: 10,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 10000,
            })

        const adapter = new PrismaPg(pool)

        if (process.env.NODE_ENV !== 'production') {
            globalForPrisma.prismaPool = pool
        }

        return new PrismaClient({
            adapter,
            log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
        })
    })()

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}
