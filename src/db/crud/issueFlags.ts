import { db } from "@/src/db";
import { issueFlagsTable } from "../schema";
import { eq, and, sql } from "drizzle-orm";

// Add a new flag to an issue
export async function addIssueFlag({
    issueId,
    flaggedBy,
    reason,
}: {
    issueId: number;
    flaggedBy: number;
    reason?: string;
}) {
    const result = await db
        .insert(issueFlagsTable)
        .values({ issueId, flaggedBy, reason })
        .returning();
    return result[0];
}

// Get all flags for a specific issue
export async function getFlagsByIssueId(issueId: number) {
    const result = await db
        .select()
        .from(issueFlagsTable)
        .where(eq(issueFlagsTable.issueId, issueId));
    return result;
}

// Check if a user has already flagged an issue
export async function hasUserFlaggedIssue(issueId: number, userId: number) {
    const result = await db
        .select()
        .from(issueFlagsTable)
        .where(and(
            eq(issueFlagsTable.issueId, issueId),
            eq(issueFlagsTable.flaggedBy, userId)
        ));
    return result.length > 0;
}

// Count total flags for an issue
export async function countFlagsForIssue(issueId: number) {
    const result = await db
        .select({ count: sql<number>`count(*)` })
        .from(issueFlagsTable)
        .where(eq(issueFlagsTable.issueId, issueId));
    return Number(result[0]?.count ?? 0);
}

// Delete a specific flag (e.g. undo or moderation)
export async function deleteFlagById(flagId: number) {
    const result = await db
        .delete(issueFlagsTable)
        .where(eq(issueFlagsTable.id, flagId))
        .returning();
    return result[0] || null;
}

// Delete all flags for an issue (e.g. on issue deletion or moderation reset)
export async function deleteFlagsByIssueId(issueId: number) {
    const result = await db
        .delete(issueFlagsTable)
        .where(eq(issueFlagsTable.issueId, issueId))
        .returning();
    return result;
}
