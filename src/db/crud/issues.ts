import { db } from "@/src/db";
import { issuesTable } from "../schema";
import { eq, and } from "drizzle-orm";

// Create a New Issue
export async function createIssue({
    title,
    description,
    categoryId,
    latitude,
    longitude,
    isAnonymous = false,
    userId,
    status = "Reported",
}: {
    title: string;
    description?: string;
    categoryId: number;
    latitude: number;
    longitude: number;
    isAnonymous?: boolean;
    userId?: number;
    status?: "Reported" | "In Progress" | "Resolved";
}) {
    const result = await db.insert(issuesTable).values({
        title,
        description,
        categoryId,
        latitude,
        longitude,
        isAnonymous,
        userId,
        status,
    }).returning();
    return result[0];
}

// Get Issue by ID
export async function getIssueById(issueId: number) {
    const result = await db
        .select()
        .from(issuesTable)
        .where(eq(issuesTable.id, issueId));
    return result[0] || null;
}

// Get All Issues (optionally filtered by user)
export async function getAllIssues(userId?: number) {
    const query = db.select().from(issuesTable);
    if (userId !== undefined) {
        query.where(eq(issuesTable.userId, userId));
    }
    const result = await query;
    return result;
}

// Update an Issue
export async function updateIssue(
    issueId: number,
    data: Partial<{
        title: string;
        description: string;
        categoryId: number;
        latitude: number;
        longitude: number;
        isAnonymous: boolean;
        status: "Reported" | "In Progress" | "Resolved";
        isHidden: boolean;
    }>
) {
    const result = await db
        .update(issuesTable)
        .set(data)
        .where(eq(issuesTable.id, issueId))
        .returning();
    return result[0] || null;
}

// Delete an Issue
export async function deleteIssue(issueId: number) {
    const result = await db
        .delete(issuesTable)
        .where(eq(issuesTable.id, issueId))
        .returning();
    return result[0] || null;
}

// Get Issues by Category
export async function getIssuesByCategory(categoryId: number) {
    const result = await db
        .select()
        .from(issuesTable)
        .where(eq(issuesTable.categoryId, categoryId));
    return result;
}

// Get Issues by Status
export async function getIssuesByStatus(status: "Reported" | "In Progress" | "Resolved") {
    const result = await db
        .select()
        .from(issuesTable)
        .where(eq(issuesTable.status, status));
    return result;
}

// Hide or Unhide an Issue
export async function setIssueVisibility(issueId: number, isHidden: boolean) {
    const result = await db
        .update(issuesTable)
        .set({ isHidden })
        .where(eq(issuesTable.id, issueId))
        .returning();
    return result[0] || null;
}
