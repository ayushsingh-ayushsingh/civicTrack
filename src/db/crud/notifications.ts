import { db } from "@/src/db";
import { notificationsTable } from "../schema";
import { eq, and } from "drizzle-orm";

// Create a new notification
export async function createNotification({
    userId,
    issueId,
    message,
}: {
    userId: number;
    issueId: number;
    message: string;
}) {
    const result = await db
        .insert(notificationsTable)
        .values({ userId, issueId, message })
        .returning();
    return result[0];
}

// Get all notifications for a user
export async function getNotificationsByUserId(userId: number) {
    const result = await db
        .select()
        .from(notificationsTable)
        .where(eq(notificationsTable.userId, userId));
    return result;
}

// Get unread notifications for a user
export async function getUnreadNotifications(userId: number) {
    const result = await db
        .select()
        .from(notificationsTable)
        .where(and(
            eq(notificationsTable.userId, userId),
            eq(notificationsTable.isRead, false)
        ));
    return result;
}

// Mark a single notification as read
export async function markNotificationAsRead(notificationId: number) {
    const result = await db
        .update(notificationsTable)
        .set({ isRead: true })
        .where(eq(notificationsTable.id, notificationId))
        .returning();
    return result[0] || null;
}

// Mark all notifications as read for a user
export async function markAllNotificationsAsRead(userId: number) {
    const result = await db
        .update(notificationsTable)
        .set({ isRead: true })
        .where(eq(notificationsTable.userId, userId))
        .returning();
    return result;
}

// Delete a single notification
export async function deleteNotification(notificationId: number) {
    const result = await db
        .delete(notificationsTable)
        .where(eq(notificationsTable.id, notificationId))
        .returning();
    return result[0] || null;
}

// Delete all notifications for a user
export async function deleteNotificationsByUserId(userId: number) {
    const result = await db
        .delete(notificationsTable)
        .where(eq(notificationsTable.userId, userId))
        .returning();
    return result;
}
