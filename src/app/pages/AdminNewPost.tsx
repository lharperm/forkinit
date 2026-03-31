import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { ArrowLeft, LogOut } from "lucide-react";
import { supabase } from "../lib/supabase";
import { PostForm, PostFormValues, estimateReadTime } from "../components/PostForm";

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function AdminNewPost() {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate("/admin");
      else setAuthChecked(true);
    });
  }, [navigate]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate("/admin");
  }

  async function handleSubmit(values: PostFormValues) {
    setSaving(true);
    setError(null);

    const allText = values.intro + values.sections.map(s => s.text).join(" ");
    const slug = slugify(values.title);
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    const post = {
      slug,
      title: values.title,
      excerpt: values.excerpt,
      date,
      read_time: estimateReadTime(allText),
      category: values.category,
      location: values.location,
      address: values.addressDisplay || values.address,
      image_url: values.images[0] ?? null,
      image_urls: values.images.length > 0 ? values.images : null,
      image_query: "",
      coordinates: values.coordinates,
      content: { intro: values.intro, sections: values.sections },
    };

    const { error: dbError } = await supabase.from("posts").insert([post]);
    if (dbError) { setError(dbError.message); setSaving(false); return; }

    setSuccess(true);
    setSaving(false);
    setTimeout(() => navigate("/admin/dashboard"), 1500);
  }

  if (!authChecked) return null;

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
          <h1 className="text-2xl font-bold text-stone-900 mb-8">New Review</h1>
          <PostForm
            onSubmit={handleSubmit}
            saving={saving}
            submitLabel="Publish Review"
            error={error}
            success={success}
            successMessage="Post published! Redirecting..."
          />
        </div>
      </div>
    </div>
  );
}
