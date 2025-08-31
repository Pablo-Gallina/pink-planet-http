import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";
export const prerender = false;
export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const isActive = url.searchParams.get("isActive");

    const clients = await db
      .select()
      .from(Clients)
      .where(
        isActive !== null
          ? eq(Clients.isActive, isActive === "true")
          : undefined
      )
      .all();

    return new Response(JSON.stringify(clients), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch clients" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const newClient = await db.insert(Clients).values(body);
    const clientID = +newClient?.lastInsertRowid?.toString()!;

    return new Response(JSON.stringify({ clientID, ...body }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("Error creating client:", error);

    return new Response(JSON.stringify({ error: "Failed to create client" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
