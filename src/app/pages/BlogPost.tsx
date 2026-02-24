import { useParams, Link } from "react-router";
import { Clock, Calendar, ArrowLeft, Tag } from "lucide-react";
import { getBlogPostBySlug } from "../data/blogPosts";

const imageUrls: Record<string, string> = {
  "sourdough bread rustic": "https://images.unsplash.com/photo-1597604396383-b8ca64ed8fa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VyZG91Z2glMjBicmVhZCUyMHJ1c3RpY3xlbnwxfHx8fDE3NzAxNDI4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "thai green curry bowl": "https://images.unsplash.com/photo-1637184170418-e71f34f3e164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpJTIwZ3JlZW4lMjBjdXJyeSUyMGJvd2x8ZW58MXx8fHwxNzcwMTcxMzM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "chocolate chip cookies stack": "https://images.unsplash.com/photo-1619149651177-b09092806f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjaGlwJTIwY29va2llcyUyMHN0YWNtfGVufDF8fHx8MTc3MDE1MTA4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  "summer salad colorful vegetables": "https://images.unsplash.com/photo-1660744868370-d8ce17a726ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBzYWxhZCUyMGNvbG9yZnVsJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NzAyMjYxODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "braised short ribs red wine": "https://images.unsplash.com/photo-1630291078007-1bc14b4b64a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFpc2VkJTIwc2hvcnQlMjByaWJzJTIwcmVkJTIwd2luZXxlbnwxfHx8fDE3NzAyMjYxODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "fresh pasta making flour": "https://images.unsplash.com/photo-1738717201678-412395e65b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBhc3RhJTIwbWFraW5nJTIwZmxvdXJ8ZW58MXx8fHwxNzcwMjI2MTg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  // Montreal restaurant images
  "smoked meat sandwich": "https://images.unsplash.com/photo-1699728088600-6d684acbeada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbW9rZWQlMjBtZWF0JTIwc2FuZHdpY2h8ZW58MXx8fHwxNzcwNDAxMzMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "french bistro elegant": "https://images.unsplash.com/photo-1733574497640-baa7c169678b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBiaXN0cm8lMjBlbGVnYW50fGVufDF8fHx8MTc3MDQwMTMzNHww&ixlib=rb-4.1.0&q=80&w=1080",
  "poutine quebec food": "https://images.unsplash.com/photo-1641573406941-9cd353573369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3V0aW5lJTIwcXVlYmVjJTIwZm9vZHxlbnwxfHx8fDE3NzA0MDEzMzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "bagel bakery fresh": "https://images.unsplash.com/photo-1756365365171-597d674d27e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWdlbCUyMGJha2VyeSUyMGZyZXNofGVufDF8fHx8MTc3MDQwMTMzNHww&ixlib=rb-4.1.0&q=80&w=1080",
  "ramen bowl japanese": "https://images.unsplash.com/photo-1635379511574-bc167ca085c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW1lbiUyMGJvd2wlMjBqYXBhbmVzZXxlbnwxfHx8fDE3NzAzMTY1MTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "italian pasta restaurant": "https://images.unsplash.com/photo-1662197480393-2a82030b7b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGFzdGElMjByZXN0YXVyYW50fGVufDF8fHx8MTc3MDM3MDY0OXww&ixlib=rb-4.1.0&q=80&w=1080",
  "brunch cafe breakfast": "https://images.unsplash.com/photo-1670710029032-02771d92444d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnVuY2glMjBjYWZlJTIwYnJlYWtmYXN0fGVufDF8fHx8MTc3MDQwMTMzNXww&ixlib=rb-4.1.0&q=80&w=1080"
};

export function BlogPost() {
  const { slug } = useParams();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold text-stone-900 mb-4">Post Not Found</h2>
        <p className="text-stone-600 mb-8">
          Sorry, we couldn't find the blog post you're looking for.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <article className="pb-20">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-stone-600 hover:text-pink-600 transition-colors font-medium"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
      </div>

      {/* Hero Image */}
    
      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-4">
          <Tag className="size-4 text-pink-600" />
          <span className="text-sm font-medium text-pink-600">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
          {post.title}
        </h1>

        {/* Meta Information */}
        <div className="flex items-center gap-6 text-stone-600 pb-8 mb-8 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Calendar className="size-4" />
            <span className="text-sm">{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4" />
            <span className="text-sm">{post.readTime}</span>
          </div>
        </div>

        {/* Introduction */}
        <p className="text-lg text-stone-700 leading-relaxed mb-12">
          {post.content.intro}
        </p>

        {/* Content Sections */}
        <div className="space-y-10">
          {post.content.sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                {section.heading}
              </h2>
              <p className="text-stone-700 leading-relaxed">
                {section.text}
              </p>
            </section>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 pt-12 border-t border-stone-200">
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-stone-900 mb-3">
              Enjoyed this review?
            </h3>
            <p className="text-stone-700 mb-6">
              Check out more restaurant reviews and dining recommendations on the blog!
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors"
            >
              Browse All Reviews
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}