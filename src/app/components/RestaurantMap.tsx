import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { blogPosts } from "../data/blogPosts";
import React from "react";

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom pink marker icon
const pinkIcon = new L.Icon({
  iconRetinaUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface RestaurantMapProps {
  centerCoords?: [number, number];
  zoom?: number;
}

export function RestaurantMap({ centerCoords = [45.5017, -73.5673], zoom = 2 }: RestaurantMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Whole-world bounds (SW, NE)
    const worldBounds = L.latLngBounds(
      L.latLng(-85, -180),
      L.latLng(85, 180),
    );

    const map = L.map(mapContainerRef.current, {
      worldCopyJump: true,
      maxBounds: worldBounds,
      maxBoundsViscosity: 1.0, // 1 = "hard" boundary feel
      minZoom: 2, // prevents zooming way out (tweak to taste)
    }).setView(centerCoords, Math.max(zoom, 2));

    mapRef.current = map;

    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        noWrap: true, // stops horizontal tile wrapping
        bounds: worldBounds, // only request tiles within bounds
      },
    ).addTo(map);

    blogPosts.forEach((post) => {
      const marker = L.marker(post.coordinates, {
        icon: pinkIcon,
      }).addTo(map);

      // Create popup content
      marker.bindPopup(`
        <div class="p-2">
          <h3 class="font-bold text-base mb-1">${post.title}</h3>
          <p class="text-sm text-stone-600 mb-2">${post.location}</p>
          <span class="inline-block px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded">
            ${post.category}
          </span>
          <div class="mt-2">
          <button
            type="button"
            class="mt-2 text-pink-600 hover:text-pink-700 text-sm font-medium cursor-pointer"
            data-slug="${post.slug}"
          >
            Read Review →
          </button>
          </div>
        </div>
      `);

      marker.on("popupopen", (e) => {
        const popupEl = e.popup.getElement();
        if (!popupEl) return;

        const btn = popupEl.querySelector<HTMLButtonElement>(
          `button[data-slug="${post.slug}"]`,
        );
        if (!btn) return;

        btn.addEventListener(
          "click",
          () => navigate(`/post/${post.slug}`),
          { once: true },
        );
      });
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [centerCoords, zoom, navigate]);

  return (
    <div className="w-full h-[600px] relative">
      <div ref={mapContainerRef} className="w-full h-full" />

      <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-lg p-4 z-[1000] max-w-xs">
        <h3 className="font-bold text-stone-900 mb-2">
          Stickafork.init World Map
        </h3>
        <p className="text-sm text-stone-600 mb-2">
          Click on any pin to view the restaurant review
        </p>
        <div className="text-xs text-stone-500">
          {blogPosts.length} restaurants reviewed worldwide
        </div>
      </div>
    </div>
  );
}