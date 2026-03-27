import { Link } from "react-router";
import { Clock, Calendar, MapPin } from "lucide-react";
import { RestaurantMap } from "../components/RestaurantMap";
import { usePosts } from "../hooks/usePosts";
import React from "react";

export function Home() {
  const { posts, loading } = usePosts();
  const latestPosts = posts.slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 to-rose-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-stone-900 mb-6">
            Rachel Arnold's
            <br />
            Stickafork.init
          </h1>
          <p className="text-xl text-stone-700 mb-8 max-w-3xl mx-auto">
            Spoon me! Welcome to Rachel's blog. See her content and catch more of her @tastetoronto. 
          </p>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Currently featuring{" "}
            <span className="font-bold text-pink-600">{posts.length}</span> restaurant
            reviews from around the world.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <MapPin className="size-6 text-pink-600" />
              <h2 className="text-3xl font-bold text-stone-900">Rachel's Reviews</h2>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <RestaurantMap posts={posts} centerCoords={[45.5017, -73.5673]} zoom={12} />
          </div>
        </div>
      </section>

      {/* Latest Reviews Section */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-stone-900">Latest Reviews</h2>
            <Link
              to="/reviews"
              className="text-pink-600 hover:text-pink-700 font-medium flex items-center gap-2"
            >
              View All Reviews
              <span aria-hidden="true">→</span>
            </Link>
          </div>

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
              {latestPosts.map((post) => {
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
                        <MapPin className="size-4 text-stone-400" />
                        <span className="text-xs text-stone-500">{post.location}</span>
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
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-pink-600 to-rose-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want to See More?
          </h2>
          <p className="text-xl text-pink-50 mb-8">
            Browse the complete collection of my restaurant reviews from around the world.
          </p>
          <Link
            to="/reviews"
            className="inline-block px-8 py-4 bg-white text-pink-600 font-bold rounded-lg hover:bg-pink-50 transition-colors shadow-lg"
          >
            View All {posts.length} Reviews
          </Link>
        </div>
      </section>
    </div>
  );
}
