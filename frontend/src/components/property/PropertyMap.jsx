"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Placeholder token - User should replace with their own
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const PropertyMap = ({ properties = [], center = [-2.2426, 53.4808], zoom = 12 }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "available": return "#22c55e"; // green-500
      case "hold": return "#f59e0b"; // amber-500
      case "let_agreed":
      case "reserved": return "#ef4444"; // red-500
      case "coming_soon": return "#3b82f6"; // blue-500
      default: return "#2563eb"; // blue-600 (default)
    }
  };

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: center,
      zoom: zoom,
    });

    map.current.on("load", () => {
      setIsLoaded(true);
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !map.current) return;

    // Remove existing markers
    const currentMarkers = document.querySelectorAll(".mapboxgl-marker");
    currentMarkers.forEach(m => m.remove());

    // Add markers for each property
    properties.forEach((prop) => {
      if (!prop.coordinates) return;

      const color = getStatusColor(prop.status);

      const el = document.createElement("div");
      el.className = "custom-marker";
      el.innerHTML = `
        <div class="group relative flex flex-col items-center">
          <div style="background-color: ${color};" class="text-white px-3 py-1.5 rounded-full font-black text-[10px] shadow-xl cursor-pointer transform transition-all duration-300 hover:scale-110 hover:ring-4 hover:ring-white flex items-center gap-1">
             <span>£${(prop.price_from / 1000).toFixed(1)}k</span>
          </div>
          <div style="border-top-color: ${color};" class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px]"></div>
        </div>
      `;

      new mapboxgl.Marker(el)
        .setLngLat([prop.coordinates.lng, prop.coordinates.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 35, closeButton: false, className: 'property-popup' })
            .setHTML(`
              <div class="p-0 overflow-hidden rounded-2xl w-[260px] bg-white">
                <div class="relative h-32">
                  <img src="${prop.image}" class="w-full h-full object-cover" />
                  <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest text-slate-900">
                    ${prop.match_score}% Match
                  </div>
                </div>
                <div class="p-4">
                  <h3 class="font-bold text-slate-900 text-sm mb-1">${prop.name}</h3>
                  <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">${prop.location}</p>
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-black text-slate-900">£${prop.price_from}<span class="text-[10px] text-slate-400 font-bold">/mo</span></p>
                    <a href="/developments/${prop.slug}" class="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-colors">Details</a>
                  </div>
                </div>
              </div>
            `)
        )
        .addTo(map.current);
    });
  }, [properties, isLoaded]);

  return (
    <div className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100">
      <div ref={mapContainer} className="w-full h-full" />
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-xl hidden md:block">
        <div className="space-y-2">
          {[
            { label: 'Available', color: '#22c55e' },
            { label: 'Limited', color: '#f59e0b' },
            { label: 'Reserved', color: '#ef4444' },
            { label: 'Coming Soon', color: '#3b82f6' }
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div style={{ backgroundColor: item.color }} className="w-3 h-3 rounded-full"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;
