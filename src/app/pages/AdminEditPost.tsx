import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { ArrowLeft, LogOut } from "lucide-react";
import { supabase } from "../lib/supabase";
import { PostForm, PostFormValues, estimateReadTime } from "../components/PostForm";

export function AdminEditPost() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [authChecked, setAuthChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [initial, setInitial] = useState<Partial<PostFormValues> | null>(null);
  const [postId, setPostId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) { navigate("/admin"); return; }
      setAuthChecked(true);
      fetchPost();
    });
  }, [navigate, slug]);

  async function fetchPost() {
    const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).single();
    if (error || !data) { setError("Post not found."); setLoading(false); return; }

    setPostId(data.id);
    setInitial({
      title: data.title,
      excerpt: data.excerpt ?? "",
      category: data.category ?? "",
      location: data.location ?? "",
      address: data.address ?? "",
      addressDisplay: data.address ?? "",
      images: data.image_urls ?? (data.image_url ? [data.image_url] : []),
      intro: data.content?.intro ?? "",
      sections: data.content?.sections ?? [{ heading: "", text: "" }],
      coordinates: data.coordinates as [number, number] ?? null,
    });
    setLoading(false);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate("/admin");
  }

  async function handleSubmit(values: PostFormValues) {
    if (!postId) return;
    setSaving(true);
    setError(null);

    const allText = values.intro + values.sections.map(s => s.text).join(" ");

    const updates = {
      title: values.title,
      excerpt: values.excerpt,
      read_time: estimateReadTime(allText),
      category: values.category,
      location: values.location,
      address: values.addressDisplay || values.address,
      image_url: values.images[0] ?? null,
      image_urls: values.images.length > 0 ? values.images : null,
      coordinates: values.coordinates,
      content: { intro: values.intro, sections: values.sections },
    };

    const { error: dbError } = await supabase.from("posts").update(updates).eq("id", postId);
    if (dbError) { setError(dbError.message); setSaving(false); return; }

    setSuccess(true);
    setSaving(false);
    setTimeout(() => navigate("/admin/dashboard"), 1500);
  }

  if (!authChecked || loading) return null;

  return (
    <div className="min-h-screen bg-stone-50 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-stone-500 hover:text-pink-600 text-sm font-medium transition-colors">
            <ArrowLeft className="size-4" /> Back to dashboard
          </Link>
          <button type="button" onClick={handleSignOut} className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-red-500 transition-colors">
            <LogOut className="size-3.5" /> Sign out
          </button>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-stone-900 mb-8">Edit Review</h1>
          {initial && (
            <PostForm
              initial={initial}
              onSubmit={handleSubmit}
              saving={saving}
              submitLabel="Save Changes"
              error={error}
              success={success}
              successMessage="Changes saved! Redirecting..."
            />
          )}
        </div>
      </div>
    </div>
  );
}
