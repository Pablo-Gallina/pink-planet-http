import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { db, eq, LikedPosts } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  try {
    const { slugPost } = params;
    const likedPost = await db
      .select({ likes: LikedPosts.likes })
      .from(LikedPosts)
      .where(eq(LikedPosts.slugPost, slugPost!))
      .get();

    return new Response(JSON.stringify({ likes: likedPost?.likes ?? 0 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch post" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const { slugPost } = params;
    const { likes = 0 } = await request.json();

    // Verifica si el post existe en el contenido
    if (!(await getEntry("blog", slugPost!))) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Obtiene los likes actuales
    const likedPost = await db
      .select({ likes: LikedPosts.likes })
      .from(LikedPosts)
      .where(eq(LikedPosts.slugPost, slugPost!))
      .get();

    const previous = likedPost?.likes ?? 0;
    const total = previous + likes;

    // Inserta o actualiza likes
    if (likedPost) {
      await db
        .update(LikedPosts)
        .set({ likes: total })
        .where(eq(LikedPosts.slugPost, slugPost!));
    } else {
      await db.insert(LikedPosts).values({ slugPost: slugPost!, likes: total });
    }

    return new Response(
      JSON.stringify({ likes: total, slugPost, added: likes, previous }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(JSON.stringify({ error: "Failed to update likes" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
