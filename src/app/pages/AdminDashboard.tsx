import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { Plus, Pencil, Trash2, LogOut, MapPin, Calendar } from "lucide-react";
import { supabase } from "../lib/supabase";
import { ForkLogo } from "../components/ForkLogo";

interface PostRow {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  date: string;
  image_url: string | null;
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/admin");
      } else {
        setAuthChecked(true);
        fetchPosts();
      }
    });
  }, [navigate]);

  async function fetchPosts() {
    const { data } = await supabase
      .from("posts")
      .select("id, slug, title, category, location, date, image_url")
      .order("created_at", { ascending: false });
    setPosts(data ?? []);
    setLoading(false);
  }

  async function handleDelete(id: string, slug: string) {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    setDeleting(id);
    await supabase.from("posts").delete().eq("id", id);
    setPosts(prev => prev.filter(p => p.id !== id));
    setDeleting(null);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate("/admin");
  }

  if (!authChecked) return null;

  return (
    <div className="min-h-screen bg-stone-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <span className="text-pink-600"><ForkLogo size={24} /></span>
            <span className="text-xl font-bold tracking-tight text-stone-900">
              Stickafork<span className="text-pink-500">.init</span>
              <span className="text-stone-400 font-normal text-sm ml-2">Admin</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs text-stone-500 hover:text-stone-700 transition-colors"
            >
              View site
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-red-500 transition-colors"
            >
              <LogOut className="size-3.5" /> Sign out
            </button>
          </div>
        </div>

        {/* Title + New Post button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-stone-900">Reviews</h1>
          <Link
            to="/admin/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded-lg hover:bg-pink-700 transition-colors"
          >
            <Plus className="size-4" /> New Review
          </Link>
        </div>

        {/* Posts list */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-8 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse flex gap-4">
                  <div className="w-16 h-16 bg-stone-200 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-stone-200 rounded w-3/4" />
                    <div className="h-3 bg-stone-200 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="p-16 text-center">
              <p className="text-stone-500 mb-4">No reviews yet.</p>
              <Link
                to="/admin/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded-lg hover:bg-pink-700 transition-colors"
              >
                <Plus className="size-4" /> Write your first review
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-stone-100">
              {posts.map(post => (
                <li key={post.id} className="flex items-center gap-4 p-4 hover:bg-stone-50 transition-colors">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                    {post.image_url ? (
                      <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-300">
                        <ForkLogo size={20} />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-stone-900 truncate">{post.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-pink-100 text-pink-700 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-stone-500 flex items-center gap-1">
                        <MapPin className="size-3" />{post.location}
                      </span>
                      <span className="text-xs text-stone-400 flex items-center gap-1">
                        <Calendar className="size-3" />{post.date}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      to={`/post/${post.slug}`}
                      className="text-xs text-stone-400 hover:text-stone-600 transition-colors px-2 py-1"
                      target="_blank"
                    >
                      View
                    </Link>
                    <Link
                      to={`/admin/edit/${post.slug}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors"
                    >
                      <Pencil className="size-3" /> Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(post.id, post.slug)}
                      disabled={deleting === post.id}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="size-3" />
                      {deleting === post.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
