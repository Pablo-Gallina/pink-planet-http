import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const { clientID } = params;

    const client = await db
      .select()
      .from(Clients)
      .where(eq(Clients.clientID, +clientID!))
      .get();

    if (!client)
      return new Response(JSON.stringify({ error: "Client not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });

    return new Response(JSON.stringify(client), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch client" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const { clientID } = params;
    const body = await request.json();

    await db.update(Clients).set(body).where(eq(Clients.clientID, +clientID!));

    return new Response(JSON.stringify({ ...body, clientID }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update client" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const PATCH: APIRoute = async ({ params, request }) => {
  try {
    const { clientID } = params;
    const body = await request.json();

    await db.update(Clients).set(body).where(eq(Clients.clientID, +clientID!));

    return new Response(JSON.stringify({ ...body, clientID }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update client" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const DELETE: APIRoute = async ({ params, request }) => {
  try {
    const { clientID } = params;

    await db
      .update(Clients)
      .set({ isActive: false })
      .where(eq(Clients.clientID, +clientID!));

    return new Response(
      JSON.stringify({ message: "Client deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete client" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
