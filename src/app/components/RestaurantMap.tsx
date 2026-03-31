import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { BlogPost } from "../data/blogPosts";
import React from "react";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const pinkIcon = new L.Icon({
  iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const fallbackImageUrls: Record<string, string> = {
  "sourdough bread rustic": "https://images.unsplash.com/photo-1597604396383-b8ca64ed8fa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "thai green curry bowl": "https://images.unsplash.com/photo-1637184170418-e71f34f3e164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "chocolate chip cookies stack": "https://images.unsplash.com/photo-1619149651177-b09092806f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "summer salad colorful vegetables": "https://images.unsplash.com/photo-1660744868370-d8ce17a726ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "braised short ribs red wine": "https://images.unsplash.com/photo-1630291078007-1bc14b4b64a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "fresh pasta making flour": "https://images.unsplash.com/photo-1738717201678-412395e65b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "smoked meat sandwich": "https://images.unsplash.com/photo-1699728088600-6d684acbeada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "french bistro elegant": "https://images.unsplash.com/photo-1733574497640-baa7c169678b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "poutine quebec food": "https://images.unsplash.com/photo-1641573406941-9cd353573369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "bagel bakery fresh": "https://images.unsplash.com/photo-1756365365171-597d674d27e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "ramen bowl japanese": "https://images.unsplash.com/photo-1635379511574-bc167ca085c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "italian pasta restaurant": "https://images.unsplash.com/photo-1662197480393-2a82030b7b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "brunch cafe breakfast": "https://images.unsplash.com/photo-1670710029032-02771d92444d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
};

interface RestaurantMapProps {
  posts: (BlogPost & { address?: string; imageUrls?: string[] })[];
  centerCoords?: [number, number];
  zoom?: number;
}

export function RestaurantMap({ posts, centerCoords = [45.5017, -73.5673], zoom = 2 }: RestaurantMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const worldBounds = L.latLngBounds(L.latLng(-85, -180), L.latLng(85, 180));

    const map = L.map(mapContainerRef.current, {
      worldCopyJump: true,
      maxBounds: worldBounds,
      maxBoundsViscosity: 1.0,
      minZoom: 2,
    }).setView(centerCoords, Math.max(zoom, 2));

    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      noWrap: true,
      bounds: worldBounds,
    }).addTo(map);

    posts.forEach((post) => {
      if (!post.coordinates) return;

      const heroImage = post.imageUrls?.[0] ?? post.imageUrl ?? fallbackImageUrls[post.imageQuery] ?? null;
      const address = (post as any).address ?? null;

      const marker = L.marker(post.coordinates, { icon: pinkIcon }).addTo(map);

      marker.bindPopup(`
        <div style="width:220px; font-family: sans-serif; overflow: hidden; border-radius: 8px;">
          ${heroImage ? `
            <div style="height: 120px; overflow: hidden; margin: -13px -20px 10px -20px;">
              <img
                src="${heroImage}"
                alt="${post.title}"
                style="width: 100%; height: 100%; object-fit: cover;"
              />
            </div>
          ` : ""}
          <div style="padding: ${heroImage ? "0" : "4px"} 0 4px 0;">
            <h3 style="font-weight: 700; font-size: 14px; margin: 0 0 4px 0; line-height: 1.3;">${post.title}</h3>
            ${address ? `<p style="font-size: 11px; color: #78716c; margin: 0 0 6px 0; line-height: 1.4;">${address}</p>` : `<p style="font-size: 12px; color: #78716c; margin: 0 0 6px 0;">${post.location}</p>`}
            <span style="display: inline-block; padding: 2px 8px; background: #fce7f3; color: #be185d; font-size: 11px; border-radius: 4px;">
              ${post.category}
            </span>
            <div style="margin-top: 8px;">
              <button
                type="button"
                style="color: #db2777; font-size: 13px; font-weight: 600; cursor: pointer; background: none; border: none; padding: 0;"
                data-slug="${post.slug}"
              >
                Read Review →
              </button>
            </div>
          </div>
        </div>
      `, { maxWidth: 240 });

      marker.on("popupopen", (e) => {
        const popupEl = e.popup.getElement();
        if (!popupEl) return;
        const btn = popupEl.querySelector<HTMLButtonElement>(`button[data-slug="${post.slug}"]`);
        if (!btn) return;
        btn.addEventListener("click", () => navigate(`/post/${post.slug}`), { once: true });
      });
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [posts, centerCoords, zoom, navigate]);

  return (
    <div className="w-full h-[600px] relative">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-lg p-4 z-[1000] max-w-xs">
        <h3 className="font-bold text-stone-900 mb-2">Stickafork.init World Map</h3>
        <p className="text-sm text-stone-600 mb-2">Click on any pin to view the restaurant review</p>
        <div className="text-xs text-stone-500">{posts.length} restaurants reviewed worldwide</div>
      </div>
    </div>
  );
}
