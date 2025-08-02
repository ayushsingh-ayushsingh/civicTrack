import { db } from "@/src/db";
import { usersTable } from "../schema";
import { eq } from "drizzle-orm";

// Create a New User
export async function createUser({
    name,
    phone,
    password,
}: {
    name: string;
    phone: string;
    password: string;
}) {
    const result = await db
        .insert(usersTable)
        .values({ name, phone, password })
        .returning();
    return result[0];
}

// Get User by ID
export async function getUserById(userId: number) {
    const result = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, userId));
    return result[0] || null;
}

// Get User by Phone
export async function getUserByPhone(phone: string) {
    const result = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.phone, phone));
    return result[0] || null;
}

// Update User Info
export async function updateUser(
    userId: number,
    data: Partial<{ name: string; phone: string }>
) {
    const result = await db
        .update(usersTable)
        .set(data)
        .where(eq(usersTable.id, userId))
        .returning();
    return result[0] || null;
}

// Delete a User
export async function deleteUser(userId: number) {
    const result = await db
        .delete(usersTable)
        .where(eq(usersTable.id, userId))
        .returning();
    return result[0] || null;
}

// Ban / Unban a User
export async function setUserBanStatus(userId: number, isBanned: boolean) {
    const result = await db
        .update(usersTable)
        .set({ isBanned })
        .where(eq(usersTable.id, userId))
        .returning();
    return result[0] || null;
}
