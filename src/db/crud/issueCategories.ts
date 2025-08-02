import { db } from "@/src/db";
import { issueCategoriesTable } from "../schema";
import { eq } from "drizzle-orm";

// Create a New Issue Category
export async function createIssueCategory(name: string) {
    const result = await db
        .insert(issueCategoriesTable)
        .values({ name })
        .returning();
    return result[0];
}

// Get Issue Category by ID
export async function getIssueCategoryById(categoryId: number) {
    const result = await db
        .select()
        .from(issueCategoriesTable)
        .where(eq(issueCategoriesTable.id, categoryId));
    return result[0] || null;
}

// Get Issue Category by Name
export async function getIssueCategoryByName(name: string) {
    const result = await db
        .select()
        .from(issueCategoriesTable)
        .where(eq(issueCategoriesTable.name, name));
    return result[0] || null;
}

// Get All Issue Categories
export async function getAllIssueCategories() {
    const result = await db
        .select()
        .from(issueCategoriesTable);
    return result;
}

// Update an Issue Category
export async function updateIssueCategory(
    categoryId: number,
    newName: string
) {
    const result = await db
        .update(issueCategoriesTable)
        .set({ name: newName })
        .where(eq(issueCategoriesTable.id, categoryId))
        .returning();
    return result[0] || null;
}

// Delete an Issue Category
export async function deleteIssueCategory(categoryId: number) {
    const result = await db
        .delete(issueCategoriesTable)
        .where(eq(issueCategoriesTable.id, categoryId))
        .returning();
    return result[0] || null;
}
