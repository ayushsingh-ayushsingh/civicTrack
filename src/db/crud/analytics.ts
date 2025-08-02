import { db } from "@/src/db";
import { analyticsSnapshotTable } from "../schema";
import { eq } from "drizzle-orm";

// Create a new analytics snapshot
export async function createAnalyticsSnapshot({
    totalIssues,
    issuesPerCategory,
}: {
    totalIssues: number;
    issuesPerCategory: Record<string, number>;
}) {
    const result = await db
        .insert(analyticsSnapshotTable)
        .values({
            totalIssues,
            issuesPerCategory,
        })
        .returning();
    return result[0];
}

// Get the latest analytics snapshot
export async function getLatestAnalyticsSnapshot() {
    const result = await db
        .select()
        .from(analyticsSnapshotTable)
        .orderBy(analyticsSnapshotTable.timestamp)
        .limit(1)
        .execute();
    return result[0] || null;
}

// Get all analytics snapshots (optional: for history, graphing, etc.)
export async function getAllAnalyticsSnapshots() {
    const result = await db
        .select()
        .from(analyticsSnapshotTable)
        .orderBy(analyticsSnapshotTable.timestamp);
    return result;
}

// Delete a snapshot by ID
export async function deleteAnalyticsSnapshot(snapshotId: number) {
    const result = await db
        .delete(analyticsSnapshotTable)
        .where(eq(analyticsSnapshotTable.id, snapshotId))
        .returning();
    return result[0] || null;
}
