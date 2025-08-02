import {
    integer,
    pgTable,
    varchar,
    timestamp,
    boolean,
    text,
    jsonb,
    doublePrecision,
    smallint,
    serial,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    phone: varchar({ length: 20 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    isBanned: boolean("is_banned").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const issueCategoriesTable = pgTable("issue_categories", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull().unique(),
});

export const issuesTable = pgTable("issues", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    categoryId: integer("category_id")
        .notNull()
        .references(() => issueCategoriesTable.id),
    latitude: doublePrecision("latitude").notNull(),
    longitude: doublePrecision("longitude").notNull(),
    isAnonymous: boolean("is_anonymous").default(false),
    userId: integer("user_id").references(() => usersTable.id),
    status: varchar("status", { length: 50 }).default("Reported"), // Reported | In Progress | Resolved
    isHidden: boolean("is_hidden").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const issuePhotosTable = pgTable("issue_photos", {
    id: serial("id").primaryKey(),
    issueId: integer("issue_id")
        .notNull()
        .references(() => issuesTable.id),
    imageUrl: varchar("image_url", { length: 1024 }).notNull(),
});

export const issueStatusLogsTable = pgTable("issue_status_logs", {
    id: serial("id").primaryKey(),
    issueId: integer("issue_id")
        .notNull()
        .references(() => issuesTable.id),
    oldStatus: varchar("old_status", { length: 50 }),
    newStatus: varchar("new_status", { length: 50 }).notNull(),
    changedAt: timestamp("changed_at", { withTimezone: true }).defaultNow(),
});

export const issueFlagsTable = pgTable("issue_flags", {
    id: serial("id").primaryKey(),
    issueId: integer("issue_id")
        .notNull()
        .references(() => issuesTable.id),
    flaggedBy: integer("flagged_by")
        .notNull()
        .references(() => usersTable.id),
    reason: varchar("reason", { length: 255 }),
    flaggedAt: timestamp("flagged_at", { withTimezone: true }).defaultNow(),
});

export const notificationsTable = pgTable("notifications", {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
        .notNull()
        .references(() => usersTable.id),
    issueId: integer("issue_id")
        .notNull()
        .references(() => issuesTable.id),
    message: text("message").notNull(),
    isRead: boolean("is_read").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const analyticsSnapshotTable = pgTable("analytics_snapshot", {
    id: serial("id").primaryKey(),
    timestamp: timestamp("timestamp", { withTimezone: true }).defaultNow(),
    totalIssues: integer("total_issues").notNull(),
    issuesPerCategory: jsonb("issues_per_category").notNull(),
});
