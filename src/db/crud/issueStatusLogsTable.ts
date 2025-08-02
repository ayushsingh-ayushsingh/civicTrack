import { db } from "@/src/db";
import { issueStatusLogsTable } from "../schema";
import { eq } from "drizzle-orm";

// Add a new status change log for an issue
export async function addIssueStatusLog({
    issueId,
    oldStatus,
    newStatus,
}: {
    issueId: number;
    oldStatus?: string;
    newStatus: string;
}) {
    const result = await db
        .insert(issueStatusLogsTable)
        .values({ issueId, oldStatus, newStatus })
        .returning();
    return result[0];
}

// Get all status change logs for a specific issue
export async function getStatusLogsByIssueId(issueId: number) {
    const result = await db
        .select()
        .from(issueStatusLogsTable)
        .where(eq(issueStatusLogsTable.issueId, issueId));
    return result;
}

// Delete a single status log by ID (useful for moderation or rollback)
export async function deleteStatusLogById(logId: number) {
    const result = await db
        .delete(issueStatusLogsTable)
        .where(eq(issueStatusLogsTable.id, logId))
        .returning();
    return result[0] || null;
}

// Delete all status logs for an issue (e.g. when deleting an issue)
export async function deleteStatusLogsByIssueId(issueId: number) {
    const result = await db
        .delete(issueStatusLogsTable)
        .where(eq(issueStatusLogsTable.issueId, issueId))
        .returning();
    return result;
}
