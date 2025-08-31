import { column, defineDb, defineTable } from "astro:db";

const Clients = defineTable({
  columns: {
    clientID: column.number({ primaryKey: true, autoIncrement: true }),
    name: column.text(),
    age: column.number(),
    isActive: column.boolean({ default: true }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Clients },
});
