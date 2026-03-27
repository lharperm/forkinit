import React from "react";
import { useParams, Link } from "react-router";
import { Clock, Calendar, ArrowLeft, Tag, MapPin } from "lucide-react";
import { usePosts } from "../hooks/usePosts";

export function BlogPost() {
  const { slug } = useParams();
  const { posts, loading } = usePosts();
  const post = posts.find((p) => p.slug === slug);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-pulse space-y-6">
        <div className="h-4 bg-stone-200 rounded w-24" />
        <div className="h-96 bg-stone-200 rounded-2xl" />
        <div className="h-8 bg-stone-200 rounded w-3/4" />
        <div className="h-4 bg-stone-200 rounded w-full" />
        <div className="h-4 bg-stone-200 rounded w-5/6" />
      </div>
    );
  }

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

  const heroImage = post.imageUrl;

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
      {heroImage && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={heroImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Category + Location */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Tag className="size-4 text-pink-600" />
            <span className="text-sm font-medium text-pink-600">{post.category}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-stone-500">
            <MapPin className="size-4" />
            <span>{post.location}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
          {post.title}
        </h1>

        {/* Meta */}
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
              <p className="text-stone-700 leading-relaxed">{section.text}</p>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 pt-12 border-t border-stone-200">
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-stone-900 mb-3">Enjoyed this review?</h3>
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
