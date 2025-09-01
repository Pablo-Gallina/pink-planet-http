import { column, defineDb, defineTable } from "astro:db";

const Clients = defineTable({
  columns: {
    clientID: column.number({ primaryKey: true, autoIncrement: true }),
    name: column.text(),
    age: column.number(),
    isActive: column.boolean({ default: true }),
  },
});

const LikedPosts = defineTable({
  columns: {
    likePostID: column.number({ primaryKey: true, autoIncrement: true }),
    slugPost: column.text(),
    likes: column.number({ default: 0 }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Clients, LikedPosts },
});
