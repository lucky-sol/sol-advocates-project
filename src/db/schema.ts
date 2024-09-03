import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  bigint,
  index,
  uniqueIndex
} from "drizzle-orm/pg-core";

export const advocates = pgTable("advocates",
  {
    id: serial("id").primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    city: text("city").notNull(),
    degree: text("degree").notNull(),
    specialties: jsonb("payload").default([]).notNull(),
    yearsOfExperience: integer("years_of_experience").notNull(),
    phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    lantNameIndex: index('lastNameIndex').on(table.lastName, table.firstName, table.city, table.degree, table.specialties, table.yearsOfExperience, table.phoneNumber),
    phoneNumberIndex: uniqueIndex('phoneNumberIndex').on(table.phoneNumber),
  })
);

export type IAdvocate = typeof advocates.$inferSelect & { specialties: string[] };
