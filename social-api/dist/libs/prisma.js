import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client.js";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(__filename), "..", "..");
function resolveDatabaseUrl(url) {
    if (!url || url.trim() === "") {
        return pathToFileURL(path.join(projectRoot, "dev.db")).href;
    }
    const trimmed = url.trim();
    const relativeFileMatch = trimmed.match(/^file:(\.{1,2}\/.*)$/);
    if (relativeFileMatch) {
        const absolutePath = path.resolve(projectRoot, relativeFileMatch[1]);
        return pathToFileURL(absolutePath).href;
    }
    if (!trimmed.startsWith("file:") && !trimmed.includes("://")) {
        const absolutePath = path.resolve(projectRoot, trimmed);
        return pathToFileURL(absolutePath).href;
    }
    return trimmed;
}
const connectionString = resolveDatabaseUrl(process.env.DATABASE_URL);
const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({
    adapter,
    omit: {
        user: {
            password: true,
        },
    },
});
export { prisma };
