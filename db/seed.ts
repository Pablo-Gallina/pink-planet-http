import { db, Clients } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Clients).values([
    { name: "Marcos Macario", age: 30 },
    { name: "John James", age: 25 },
    { name: "Jane Jhonoson", age: 28 },
    { name: "Alice Acual", age: 35 },
  ]);
}
