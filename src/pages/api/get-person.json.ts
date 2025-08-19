import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const person = {
    name: "Pablo Gallina",
    age: new Date().getFullYear() - 2000,
    occupation: "Software Engineer",
  };

  return new Response(JSON.stringify(person), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
