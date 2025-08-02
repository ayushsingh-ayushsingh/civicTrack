import { db } from "@/src/db";
import { issuePhotosTable } from "../schema";
import { eq } from "drizzle-orm";

// Create a Photo for an Issue
export async function addIssuePhoto({
    issueId,
    imageUrl,
}: {
    issueId: number;
    imageUrl: string;
}) {
    const result = await db
        .insert(issuePhotosTable)
        .values({ issueId, imageUrl })
        .returning();
    return result[0];
}

// Get All Photos for an Issue
export async function getPhotosByIssueId(issueId: number) {
    const result = await db
        .select()
        .from(issuePhotosTable)
        .where(eq(issuePhotosTable.issueId, issueId));
    return result;
}

// Delete a Photo by ID
export async function deletePhotoById(photoId: number) {
    const result = await db
        .delete(issuePhotosTable)
        .where(eq(issuePhotosTable.id, photoId))
        .returning();
    return result[0] || null;
}

// Delete All Photos for an Issue
export async function deletePhotosByIssueId(issueId: number) {
    const result = await db
        .delete(issuePhotosTable)
        .where(eq(issuePhotosTable.issueId, issueId))
        .returning();
    return result;
}
