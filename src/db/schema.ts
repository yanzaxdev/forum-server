import { pgTable, index, unique, integer, varchar, timestamp, foreignKey, numeric, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const forumUsers = pgTable("forum_users", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "forum_users_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	username: varchar({ length: 50 }).notNull(),
	email: varchar({ length: 256 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	index("email_idx").using("btree", table.email.asc().nullsLast().op("text_ops")),
	index("username_idx").using("btree", table.username.asc().nullsLast().op("text_ops")),
	unique("forum_users_username_unique").on(table.username),
	unique("forum_users_email_unique").on(table.email),
]);

export const forumCourseRankings = pgTable("forum_course_rankings", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "forum_course_rankings_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	courseId: integer("course_id").notNull(),
	userId: integer("user_id").notNull(),
	grade: numeric({ precision: 5, scale:  2 }).default('0'),
	examDifficulty: numeric("exam_difficulty", { precision: 3, scale:  2 }).default('0'),
	assignmentDifficulty: numeric("assignment_difficulty", { precision: 3, scale:  2 }).default('0'),
	interestLevel: numeric("interest_level", { precision: 3, scale:  2 }).default('0'),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	index("course_id_idx").using("btree", table.courseId.asc().nullsLast().op("int4_ops")),
	index("user_id_idx").using("btree", table.userId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.courseId],
			foreignColumns: [forumCourse.id],
			name: "forum_course_rankings_course_id_forum_course_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [forumUsers.id],
			name: "forum_course_rankings_user_id_forum_users_id_fk"
		}),
	unique("unique_course_user_ranking").on(table.courseId, table.userId),
]);

export const forumCourse = pgTable("forum_course", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "forum_course_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	titleEn: varchar("title_en", { length: 256 }).notNull(),
	titleHe: varchar("title_he", { length: 256 }).notNull(),
	descriptionEn: text("description_en").notNull(),
	descriptionHe: text("description_he").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	courseNumber: varchar("course_number", { length: 50 }).default('00000').notNull(),
	level: varchar({ length: 50 }).default('beginner').notNull(),
	creditPoints: numeric("credit_points", { precision: 4, scale:  2 }).default('0').notNull(),
	department: varchar({ length: 256 }),
	gradeAverage: numeric("grade_average", { precision: 5, scale:  2 }).default('0'),
	examDifficulty: numeric("exam_difficulty", { precision: 3, scale:  2 }).default('0'),
	assignmentDifficulty: numeric("assignment_difficulty", { precision: 3, scale:  2 }).default('0'),
	interestLevel: numeric("interest_level", { precision: 3, scale:  2 }).default('0'),
	overallScore: numeric("overall_score", { precision: 5, scale:  2 }).default('0'),
}, (table) => [
	index("course_department_idx").using("btree", table.department.asc().nullsLast().op("text_ops")),
	index("course_number_idx").using("btree", table.courseNumber.asc().nullsLast().op("text_ops")),
	index("course_title_en_idx").using("btree", table.titleEn.asc().nullsLast().op("text_ops")),
	index("course_title_he_idx").using("btree", table.titleHe.asc().nullsLast().op("text_ops")),
	unique("forum_course_course_number_unique").on(table.courseNumber),
]);
