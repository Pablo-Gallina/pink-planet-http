import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const { clientID } = params;

  // if (!post)
  //   return new Response(JSON.stringify({ error: "Post not found" }), {
  //     status: 404,
  //     headers: { "Content-Type": "application/json" },
  //   });

  return new Response(JSON.stringify({ clientID }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const PUT: APIRoute = async ({ params, request }) => {
  const { clientID } = params;
  const body = await request.json();

  // For demonstration purposes, we will not implement PUT functionality.
  // In a real application, you would handle updating a post here.

  return new Response(JSON.stringify({ ...body, clientID }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const PATCH: APIRoute = async ({ params, request }) => {
  const { clientID } = params;

  // For demonstration purposes, we will not implement PATCH functionality.
  // In a real application, you would handle partial updates to a post here.
  const body = await request.json();

  return new Response(JSON.stringify({ ...body, clientID }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const { clientID } = params;

  // For demonstration purposes, we will not implement DELETE functionality.
  // In a real application, you would handle deleting a post here.

  return new Response(JSON.stringify({ clientID }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
