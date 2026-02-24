import { Link } from "react-router";
import { Clock, Calendar, MapPin } from "lucide-react";
import { RestaurantMap } from "../components/RestaurantMap";
import { blogPosts } from "../data/blogPosts";
import React from "react";

const imageUrls: Record<string, string> = {
  "sourdough bread rustic": "https://images.unsplash.com/photo-1597604396383-b8ca64ed8fa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VyZG91Z2glMjBicmVhZCUyMHJ1c3RpY3xlbnwxfHx8fDE3NzAxNDI4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "thai green curry bowl": "https://images.unsplash.com/photo-1637184170418-e71f34f3e164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpJTIwZ3JlZW4lMjBjdXJyeSUyMGJvd2x8ZW58MXx8fHwxNzcwMTcxMzM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "chocolate chip cookies stack": "https://images.unsplash.com/photo-1619149651177-b09092806f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjaGlwJTIwY29va2llcyUyMHN0YWNrfGVufDF8fHx8MTc3MDE1MTA4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  "smoked meat sandwich": "https://images.unsplash.com/photo-1699728088600-6d684acbeada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbW9rZWQlMjBtZWF0JTIwc2FuZHdpY2h8ZW58MXx8fHwxNzcwNDAxMzMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "french bistro elegant": "https://images.unsplash.com/photo-1733574497640-baa7c169678b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBiaXN0cm8lMjBlbGVnYW50fGVufDF8fHx8MTc3MDQwMTMzNHww&ixlib=rb-4.1.0&q=80&w=1080",
  "poutine quebec food": "https://images.unsplash.com/photo-1641573406941-9cd353573369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3V0aW5lJTIwcXVlYmVjJTIwZm9vZHxlbnwxfHx8fDE3NzA0MDEzMzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
};

export function Home() {
  // Get latest 6 posts for the grid
  const latestPosts = blogPosts.slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 to-rose-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-stone-900 mb-6">
            Your Passport to the
            <br />
            World's Best Eats
          </h1>
          <p className="text-xl text-stone-700 mb-8 max-w-3xl mx-auto">
            From Michelin-starred temples of gastronomy to humble street food stalls,
            we explore and review exceptional dining experiences across the globe.
          </p>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Currently featuring <span className="font-bold text-pink-600">{blogPosts.length}</span> restaurant 
            reviews from around the world, with a special focus on Montreal's vibrant food scene.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <MapPin className="size-6 text-pink-600" />
              <h2 className="text-3xl font-bold text-stone-900">Explore Our Reviews</h2>
            </div>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Click on any pin to read the full review. Zoom out to see international restaurants, 
              or explore Montreal's dining scene up close.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <RestaurantMap centerCoords={[45.5017, -73.5673]} zoom={12} />
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/post/${post.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
            
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
                  <p className="text-stone-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-pink-600 to-rose-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Explore More?
          </h2>
          <p className="text-xl text-pink-50 mb-8">
            Browse our complete collection of restaurant reviews from around the world.
          </p>
          <Link
            to="/reviews"
            className="inline-block px-8 py-4 bg-white text-pink-600 font-bold rounded-lg hover:bg-pink-50 transition-colors shadow-lg"
          >
            View All {blogPosts.length} Reviews
          </Link>
        </div>
      </section>
    </div>
  );
}