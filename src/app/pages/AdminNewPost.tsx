import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Plus, Trash2, ArrowLeft, Search, CheckCircle, AlertCircle, LogOut } from "lucide-react";
import { Link } from "react-router";
import { supabase } from "../lib/supabase";

interface Section {
  heading: string;
  text: string;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function estimateReadTime(text: string) {
  const words = text.split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

export function AdminNewPost() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Auth guard — redirect to login if no active session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/admin");
      } else {
        setAuthChecked(true);
      }
    });
  }, [navigate]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate("/admin");
  }

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [intro, setIntro] = useState("");
  const [sections, setSections] = useState<Section[]>([{ heading: "", text: "" }]);

  // Address geocoding
  const [address, setAddress] = useState("");
  const [geocoding, setGeocoding] = useState(false);
  const [geocodeResult, setGeocodeResult] = useState<{ lat: number; lng: number; display: string } | null>(null);
  const [geocodeError, setGeocodeError] = useState<string | null>(null);

  async function handleGeocode() {
    if (!address.trim()) return;
    setGeocoding(true);
    setGeocodeError(null);
    setGeocodeResult(null);

    try {
      const query = encodeURIComponent(address.trim());
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
        { headers: { "Accept-Language": "en" } }
      );
      const data = await res.json();

      if (!data || data.length === 0) {
        setGeocodeError("Address not found. Try being more specific.");
      } else {
        setGeocodeResult({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          display: data[0].display_name,
        });
      }
    } catch {
      setGeocodeError("Failed to look up address. Check your connection.");
    } finally {
      setGeocoding(false);
    }
  }

  function addSection() {
    setSections([...sections, { heading: "", text: "" }]);
  }

  function removeSection(i: number) {
    setSections(sections.filter((_, idx) => idx !== i));
  }

  function updateSection(i: number, field: keyof Section, value: string) {
    setSections(sections.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!geocodeResult) {
      setError("Please look up a valid address before publishing.");
      return;
    }

    setSaving(true);
    setError(null);

    const allText = intro + sections.map(s => s.text).join(" ");
    const slug = slugify(title);
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    const post = {
      slug,
      title,
      excerpt,
      date,
      read_time: estimateReadTime(allText),
      category,
      location,
      image_url: imageUrl || null,
      image_query: "",
      coordinates: [geocodeResult.lat, geocodeResult.lng],
      content: { intro, sections },
    };

    const { error: dbError } = await supabase.from("posts").insert([post]);

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
      return;
    }

    setSuccess(true);
    setSaving(false);
    setTimeout(() => navigate(`/post/${slug}`), 1500);
  }

  if (!authChecked) return null;

  const inputClass = "w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent text-sm";
  const labelClass = "block text-sm font-medium text-stone-700 mb-1.5";

  return (
    <div className="min-h-screen bg-stone-50 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-pink-600 text-sm font-medium transition-colors">
            <ArrowLeft className="size-4" /> Back to site
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-red-500 transition-colors"
          >
            <LogOut className="size-3.5" /> Sign out
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-stone-900 mb-8">New Review</h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div>
              <label className={labelClass}>Title *</label>
              <input className={inputClass} value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g. Schwartz's Deli: Montreal's Legendary Smoked Meat" />
              {title && <p className="text-xs text-stone-400 mt-1">Slug: <span className="font-mono">{slugify(title)}</span></p>}
            </div>

            {/* Excerpt */}
            <div>
              <label className={labelClass}>Excerpt *</label>
              <textarea className={inputClass} value={excerpt} onChange={e => setExcerpt(e.target.value)} required rows={2} placeholder="One or two sentence summary shown on cards" />
            </div>

            {/* Category + Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Category *</label>
                <input className={inputClass} value={category} onChange={e => setCategory(e.target.value)} required placeholder="e.g. Fine Dining, Street Food" />
              </div>
              <div>
                <label className={labelClass}>Location (display) *</label>
                <input className={inputClass} value={location} onChange={e => setLocation(e.target.value)} required placeholder="e.g. Montreal, Canada" />
              </div>
            </div>

            {/* Address geocoder */}
            <div>
              <label className={labelClass}>Restaurant Address (for map pin) *</label>
              <div className="flex gap-2">
                <input
                  className={inputClass}
                  value={address}
                  onChange={e => { setAddress(e.target.value); setGeocodeResult(null); setGeocodeError(null); }}
                  onKeyDown={e => e.key === "Enter" && (e.preventDefault(), handleGeocode())}
                  placeholder="e.g. 3895 Boulevard Saint-Laurent, Montreal"
                />
                <button
                  type="button"
                  onClick={handleGeocode}
                  disabled={geocoding || !address.trim()}
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Search className="size-4" />
                  {geocoding ? "Looking up..." : "Look up"}
                </button>
              </div>

              {geocodeResult && (
                <div className="mt-2 flex items-start gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-green-700">Pin placed successfully</p>
                    <p className="text-xs text-green-600 mt-0.5">{geocodeResult.display}</p>
                    <p className="text-xs text-green-500 font-mono mt-0.5">
                      {geocodeResult.lat.toFixed(5)}, {geocodeResult.lng.toFixed(5)}
                    </p>
                  </div>
                </div>
              )}

              {geocodeError && (
                <div className="mt-2 flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <AlertCircle className="size-4 text-red-500 flex-shrink-0" />
                  <p className="text-xs text-red-600">{geocodeError}</p>
                </div>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label className={labelClass}>Image URL</label>
              <input className={inputClass} value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://images.unsplash.com/..." />
              {imageUrl && (
                <img src={imageUrl} alt="Preview" className="mt-2 h-40 w-full object-cover rounded-lg" />
              )}
            </div>

            {/* Intro */}
            <div>
              <label className={labelClass}>Introduction *</label>
              <textarea className={inputClass} value={intro} onChange={e => setIntro(e.target.value)} required rows={4} placeholder="Opening paragraph that sets the scene..." />
            </div>

            {/* Sections */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className={labelClass + " mb-0"}>Content Sections *</label>
                <button type="button" onClick={addSection} className="inline-flex items-center gap-1 text-sm text-pink-600 hover:text-pink-700 font-medium">
                  <Plus className="size-4" /> Add Section
                </button>
              </div>
              <div className="space-y-4">
                {sections.map((section, i) => (
                  <div key={i} className="border border-stone-200 rounded-xl p-4 space-y-3 bg-stone-50">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">Section {i + 1}</span>
                      {sections.length > 1 && (
                        <button type="button" onClick={() => removeSection(i)} className="text-stone-400 hover:text-red-500 transition-colors">
                          <Trash2 className="size-4" />
                        </button>
                      )}
                    </div>
                    <input
                      className={inputClass}
                      value={section.heading}
                      onChange={e => updateSection(i, "heading", e.target.value)}
                      placeholder="Section heading e.g. The Atmosphere"
                      required
                    />
                    <textarea
                      className={inputClass}
                      value={section.text}
                      onChange={e => updateSection(i, "text", e.target.value)}
                      rows={4}
                      placeholder="Section body text..."
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm">
                Post published! Redirecting...
              </div>
            )}

            <button
              type="submit"
              disabled={saving || !geocodeResult}
              className="w-full px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Publishing..." : "Publish Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
