import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { blogPosts as staticPosts, BlogPost } from "../data/blogPosts";

export function usePosts() {
  const [posts, setPosts] = useState<any[]>(staticPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error || !data) {
        setLoading(false);
        return;
      }

      const dbPosts = data.map((row) => ({
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt ?? "",
        date: row.date ?? "",
        readTime: row.read_time ?? "",
        category: row.category ?? "",
        imageQuery: row.image_query ?? "",
        imageUrl: row.image_url ?? undefined,
        imageUrls: row.image_urls ?? undefined,
        address: row.address ?? undefined,
        coordinates: row.coordinates as [number, number],
        location: row.location ?? "",
        content: row.content ?? { intro: "", sections: [] },
      }));

      setPosts([...dbPosts, ...staticPosts]);
      setLoading(false);
    }

    fetchPosts();
  }, []);

  return { posts, loading };
}
