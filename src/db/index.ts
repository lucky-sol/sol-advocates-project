import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { advocates } from "./schema";

const setup = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient, { schema: { advocates } });
  return db;
};

export default setup();
