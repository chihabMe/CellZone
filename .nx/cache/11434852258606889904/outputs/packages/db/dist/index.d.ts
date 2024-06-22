import { PrismaClient } from "@prisma/client";
declare global {
    var prisma: PrismaClient;
}
export declare const prisma: PrismaClient<import("@prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
export * from "@prisma/client";
