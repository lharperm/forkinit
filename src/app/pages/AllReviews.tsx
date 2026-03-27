import { Link } from "react-router";
import { Clock, Calendar, MapPin, Filter } from "lucide-react";
import { usePosts } from "../hooks/usePosts";
import { useMemo, useState } from "react";
import React from "react";

export function AllReviews() {
  const { posts, loading } = usePosts();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((post) => post.category)))],
    [posts]
  );

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return posts;
    return posts.filter((post) => post.category === selectedCategory);
  }, [selectedCategory, posts]);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
          All Restaurant Reviews
        </h1>
        <p className="text-xl text-stone-600">
          Explore my complete collection of {posts.length} reviews from around the world
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="size-5 text-stone-600" />
          <span className="font-medium text-stone-700">Filter by category:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-pink-600 text-white"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
                <div className="h-48 bg-stone-200" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-stone-200 rounded w-1/3" />
                  <div className="h-5 bg-stone-200 rounded w-3/4" />
                  <div className="h-3 bg-stone-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const img = post.imageUrl;
              return (
                <Link
                  key={post.slug}
                  to={`/post/${post.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {img && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={img}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block px-2 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-stone-500">
                        <MapPin className="size-3" />
                        <span>{post.location}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-pink-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-stone-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-stone-500 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="size-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
