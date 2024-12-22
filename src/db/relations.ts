import {relations} from 'drizzle-orm/relations';

import {forumCourse, forumCourseRankings, forumUsers} from './schema';

export const forumCourseRankingsRelations = relations(
    forumCourseRankings,
    ({one}) => ({
      forumCourse: one(forumCourse, {
        fields: [forumCourseRankings.courseId],
        references: [forumCourse.id]
      }),
      forumUser: one(
          forumUsers,
          {fields: [forumCourseRankings.userId], references: [forumUsers.id]}),
    }));

export const forumCourseRelations =
    relations(forumCourse, ({many}) => ({
                             forumCourseRankings: many(forumCourseRankings),
                           }));

export const forumUsersRelations =
    relations(forumUsers, ({many}) => ({
                            forumCourseRankings: many(forumCourseRankings),
                          }));