import React, { useState, useRef } from "react";
import { Plus, Trash2, Search, CheckCircle, AlertCircle, Upload, X } from "lucide-react";
import { supabase } from "../lib/supabase";

export interface Section {
  heading: string;
  text: string;
}

export interface PostFormValues {
  title: string;
  excerpt: string;
  category: string;
  location: string;
  address: string;
  addressDisplay: string;
  images: string[];
  intro: string;
  sections: Section[];
  coordinates: [number, number] | null;
}

interface PostFormProps {
  initial?: Partial<PostFormValues>;
  onSubmit: (values: PostFormValues) => Promise<void>;
  saving: boolean;
  submitLabel: string;
  error: string | null;
  success: boolean;
  successMessage?: string;
}

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function estimateReadTime(text: string) {
  const words = text.split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export function PostForm({ initial, onSubmit, saving, submitLabel, error, success, successMessage }: PostFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [images, setImages] = useState<string[]>(initial?.images ?? []);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [intro, setIntro] = useState(initial?.intro ?? "");
  const [sections, setSections] = useState<Section[]>(initial?.sections ?? [{ heading: "", text: "" }]);

  const [address, setAddress] = useState(initial?.address ?? "");
  const [geocoding, setGeocoding] = useState(false);
  const [geocodeResult, setGeocodeResult] = useState<{ lat: number; lng: number; display: string } | null>(
    initial?.coordinates
      ? { lat: initial.coordinates[0], lng: initial.coordinates[1], display: initial.addressDisplay ?? "Saved location" }
      : null
  );
  const [geocodeError, setGeocodeError] = useState<string | null>(null);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setImageUploading(true);
    setImageError(null);
    const uploaded: string[] = [];
    for (const file of files) {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("assets").upload(`posts/${fileName}`, file, { upsert: false });
      if (uploadError) { setImageError("Upload failed: " + uploadError.message); setImageUploading(false); return; }
      const { data } = supabase.storage.from("assets").getPublicUrl(`posts/${fileName}`);
      uploaded.push(data.publicUrl);
    }
    setImages(prev => [...prev, ...uploaded]);
    setImageUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeImage(i: number) { setImages(prev => prev.filter((_, idx) => idx !== i)); }
  function moveImage(from: number, to: number) {
    setImages(prev => { const a = [...prev]; const [m] = a.splice(from, 1); a.splice(to, 0, m); return a; });
  }

  async function handleGeocode() {
    if (!address.trim()) return;
    setGeocoding(true);
    setGeocodeError(null);
    setGeocodeResult(null);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address.trim())}&format=json&limit=1`, { headers: { "Accept-Language": "en" } });
      const data = await res.json();
      if (!data?.length) { setGeocodeError("Address not found. Try being more specific."); }
      else { setGeocodeResult({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), display: data[0].display_name }); }
    } catch { setGeocodeError("Failed to look up address."); }
    finally { setGeocoding(false); }
  }

  function addSection() { setSections(prev => [...prev, { heading: "", text: "" }]); }
  function removeSection(i: number) { setSections(prev => prev.filter((_, idx) => idx !== i)); }
  function updateSection(i: number, field: keyof Section, value: string) {
    setSections(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!geocodeResult) return;
    await onSubmit({
      title, excerpt, category, location, address,
      addressDisplay: geocodeResult.display,
      images, intro, sections,
      coordinates: [geocodeResult.lat, geocodeResult.lng],
    });
  }

  const inputClass = "w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent text-sm";
  const labelClass = "block text-sm font-medium text-stone-700 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={labelClass}>Title *</label>
        <input className={inputClass} value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g. Schwartz's Deli: Montreal's Legendary Smoked Meat" />
        {title && <p className="text-xs text-stone-400 mt-1">Slug: <span className="font-mono">{slugify(title)}</span></p>}
      </div>

      <div>
        <label className={labelClass}>Excerpt *</label>
        <textarea className={inputClass} value={excerpt} onChange={e => setExcerpt(e.target.value)} required rows={2} placeholder="One or two sentence summary shown on cards" />
      </div>

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
          <button type="button" onClick={handleGeocode} disabled={geocoding || !address.trim()}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            <Search className="size-4" />
            {geocoding ? "Looking up..." : "Look up"}
          </button>
        </div>
        {geocodeResult && (
          <div className="mt-2 flex items-start gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-green-700">Pin placed</p>
              <p className="text-xs text-green-600 mt-0.5">{geocodeResult.display}</p>
              <p className="text-xs text-green-500 font-mono mt-0.5">{geocodeResult.lat.toFixed(5)}, {geocodeResult.lng.toFixed(5)}</p>
            </div>
          </div>
        )}
        {geocodeError && (
          <div className="mt-2 flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            <AlertCircle className="size-4 text-red-500 flex-shrink-0" />
            <p className="text-xs text-red-600">{geocodeError}</p>
          </div>
        )}
        {!geocodeResult && !geocodeError && (
          <p className="text-xs text-stone-400 mt-1">Enter the address and click Look up to place the map pin.</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Photos <span className="text-stone-400 font-normal ml-1">— first photo is the hero image</span></label>
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-3">
            {images.map((url, i) => (
              <div key={url} className="relative group rounded-xl overflow-hidden aspect-square">
                <img src={url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                {i === 0 && <span className="absolute top-1.5 left-1.5 bg-pink-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">Hero</span>}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {i > 0 && <button type="button" onClick={() => moveImage(i, i - 1)} className="bg-white rounded-full p-1.5 text-xs font-bold text-stone-700">←</button>}
                  {i < images.length - 1 && <button type="button" onClick={() => moveImage(i, i + 1)} className="bg-white rounded-full p-1.5 text-xs font-bold text-stone-700">→</button>}
                  <button type="button" onClick={() => removeImage(i)} className="bg-white rounded-full p-1.5"><X className="size-3.5 text-stone-600" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-stone-300 rounded-xl p-6 text-center cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition-colors">
          {imageUploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-pink-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-stone-500">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="size-7 text-stone-400" />
              <p className="text-sm font-medium text-stone-600">{images.length > 0 ? "Add more photos" : "Click to upload photos"}</p>
              <p className="text-xs text-stone-400">Select multiple at once — JPG, PNG, WEBP</p>
            </div>
          )}
        </div>
        {imageError && (
          <div className="mt-2 flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            <AlertCircle className="size-4 text-red-500 flex-shrink-0" />
            <p className="text-xs text-red-600">{imageError}</p>
          </div>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
      </div>

      <div>
        <label className={labelClass}>Introduction *</label>
        <textarea className={inputClass} value={intro} onChange={e => setIntro(e.target.value)} required rows={4} placeholder="Opening paragraph that sets the scene..." />
      </div>

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
              <input className={inputClass} value={section.heading} onChange={e => updateSection(i, "heading", e.target.value)} placeholder="Section heading" required />
              <textarea className={inputClass} value={section.text} onChange={e => updateSection(i, "text", e.target.value)} rows={4} placeholder="Section body text..." required />
            </div>
          ))}
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">{error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm">{successMessage ?? "Saved!"}</div>}

      <button type="submit" disabled={saving || !geocodeResult}
        className="w-full px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        {saving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
