import db from "../../../db";
import { advocates } from "../../../db/schema";
import z, { ZodType } from "zod";
import { ilike, asc, sql, desc, SQL } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

interface ISorts {
  lastName?: number;
  firstName?: number;
  city?: number;
  degree?: number;
  specialty?: number;
  yearsOfExperience?: number;
  phoneNumber?: number;
}
export interface IAdvocateFilteredSchema {
  lastName?: string;
  limit: number;
  page: number;
  sorts?: ISorts;
}

export const AdvocateFilteredSchemaDTO = z.object({
  lastName: z.string().max(255).optional(),
  limit: z.number().int().positive(),
  page: z.number().int().positive(),
  sorts: z.object({
    lastName: z.number().optional(),
    firstName: z.number().optional(),
    city: z.number().optional(),
    degree: z.number().optional(),
    specialty: z.number().optional(),
    yearsOfExperience: z.number().optional(),
    phoneNumber: z.number().optional(),
  }),
}) satisfies ZodType<IAdvocateFilteredSchema>;

/**
 * Returns a sorting function based on the given key and direction.
 *
 * @param key - The key to sort by.
 * @param direction - The sorting direction (-1 for descending, 1 for ascending).
 * @returns The sorting function.
 */
function getSort(key: PgColumn, direction: number) {
  switch (direction) {
    case -1:
      return desc(key)
    default:
    case 1:
      return asc(key);
  }
}

/**
 * Converts the sorts object to an array of SQL sort expressions.
 *
 * @param o - The IAdvocateFilteredSchema object containing the sorts.
 * @returns An array of SQL sort expressions.
 */
function sortsToOrderBy(o: IAdvocateFilteredSchema) {
  const retVal: SQL<unknown>[] = [];
  Object.entries(o.sorts || {}).forEach(([key, direction]) => {
    const column = advocates[key as keyof typeof advocates];
    if (column) {
      retVal.push(getSort(column as PgColumn, direction));
    }
  });

  return retVal;
}

/**
 * Handles the HTTP POST request for advocates.
 * 
 * @param request - The HTTP request object.
 * @returns A Promise that resolves to the HTTP response object.
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const { lastName, limit, page } = AdvocateFilteredSchemaDTO.parse(body);
    console.log("body", { lastName, limit, page, sorts: body.sorts });

    const condition = !!lastName ? ilike(advocates.lastName, `%${lastName?.toLowerCase()}%`) : undefined;
    const sortby = sortsToOrderBy(body);
    const data = await db
      .select()
      .from(advocates)
      .where(condition)
      .orderBy(...sortby)
      .limit(limit).offset((page - 1) * limit);

    const [countResult] = await db
      .select({
        count: sql`count(*)`.mapWith(Number).as("count"),
      })
      .from(advocates)
      .where(condition);

    const totalNumAdvocates = countResult?.count ?? 0;
    const totalNumPages = Math.ceil(totalNumAdvocates / limit);

    const response = {
      data,
      totalNumPages,
      totalNumAdvocates
    };

    return Response.json(response, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
