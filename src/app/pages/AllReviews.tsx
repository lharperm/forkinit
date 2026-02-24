import { Link } from "react-router-dom";
import { Clock, Calendar, MapPin, Filter } from "lucide-react";
import { blogPosts } from "../data/blogPosts";
import { useMemo, useState } from "react";

const imageUrls: Record<string, string> = {
  "sourdough bread rustic":
    "https://images.unsplash.com/photo-1597604396383-b8ca64ed8fa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VyZG91Z2glMjBicmVhZCUyMHJ1c3RpY3xlbnwxfHx8fDE3NzAxNDI4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "thai green curry bowl":
    "https://images.unsplash.com/photo-1637184170418-e71f34f3e164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpJTIwZ3JlZW4lMjBjdXJyeSUyMGJvd2x8ZW58MXx8fHwxNzcwMTcxMzM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "chocolate chip cookies stack":
    "https://images.unsplash.com/photo-1619149651177-b09092806f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjaGlwJTIwY29va2llcyUyMHN0YWNrfGVufDF8fHx8MTc3MDE1MTA4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  "summer salad colorful vegetables":
    "https://images.unsplash.com/photo-1660744868370-d8ce17a726ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBzYWxhZCUyMGNvbG9yZnVsJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NzAyMjYxODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "braised short ribs red wine":
    "https://images.unsplash.com/photo-1630291078007-1bc14b4b64a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFpc2VkJTIwc2hvcnQlMjByaWJzJTIwcmVkJTIwd2luZXxlbnwxfHx8fDE3NzAyMjYxODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "fresh pasta making flour":
    "https://images.unsplash.com/photo-1738717201678-412395e65b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBhc3RhJTIwbWFraW5nJTIwZmxvdXJ8ZW58MXx8fHwxNzcwMjI2MTg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "smoked meat sandwich":
    "https://images.unsplash.com/photo-1699728088600-6d684acbeada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbW9rZWQlMjBtZWF0JTIwc2FuZHdpY2h8ZW58MXx8fHwxNzcwNDAxMzMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "french bistro elegant":
    "https://images.unsplash.com/photo-1733574497640-baa7c169678b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBiaXN0cm8lMjBlbGVnYW50fGVufDF8fHx8MTc3MDQwMTMzNHww&ixlib=rb-4.1.0&q=80&w=1080",
  "poutine quebec food":
    "https://images.unsplash.com/photo-1641573406941-9cd353573369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3V0aW5lJTIwcXVlYmVjJTIwZm9vZHxlbnwxfHx8fDE3NzA0MDEzMzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "bagel bakery fresh":
    "https://images.unsplash.com/photo-1756365365171-597d674d27e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWdlbCUyMGJha2VyeSUyMGZyZXNofGVufDF8fHx8MTc3MDQwMTMzNHww&ixlib=rb-4.1.0&q=80&w=1080",
  "ramen bowl japanese":
    "https://images.unsplash.com/photo-1635379511574-bc167ca085c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW1lbiUyMGJvd2wlMjBqYXBhbmVzZXxlbnwxfHx8fDE3NzAzMTY1MTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "italian pasta restaurant":
    "https://images.unsplash.com/photo-1662197480393-2a82030b7b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGFzdGElMjByZXN0YXVyYW50fGVufDF8fHx8MTc3MDM3MDY0OXww&ixlib=rb-4.1.0&q=80&w=1080",
  "brunch cafe breakfast":
    "https://images.unsplash.com/photo-1670710029032-02771d92444d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnVuY2glMjBjYWZlJTIwYnJlYWtmYXN0fGVufDF8fHx8MTc3MDQwMTMzNXww&ixlib=rb-4.1.0&q=80&w=1080",
};

export function AllReviews() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(blogPosts.map((post) => post.category)))],
    []
  );

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return blogPosts;
    return blogPosts.filter((post) => post.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="py-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
          All Restaurant Reviews
        </h1>
        <p className="text-xl text-stone-600">
          Explore our complete collection of {blogPosts.length} reviews from around the world
        </p>
      </div>

      {/* Filter Section */}
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

      {/* Reviews Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
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
                  <div className="flex items-center gap-1 text-xs text-stone-500">
                    <MapPin className="size-3" />
                    <span>{post.location}</span>
                  </div>
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
    </div>
  );
}