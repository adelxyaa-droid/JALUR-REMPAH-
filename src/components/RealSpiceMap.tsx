"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";

const ports = [
  {
    name: "Aceh",
    position: [5.55, 95.32] as [number, number],
    color: "#d97706",
  },
  {
    name: "Banten",
    position: [-6.0, 106.15] as [number, number],
    color: "#e76f51",
  },
  {
    name: "Makassar",
    position: [-5.14, 119.41] as [number, number],
    color: "#0d9488",
  },
  {
    name: "Banda",
    position: [-4.52, 129.9] as [number, number],
    color: "#e11d48",
  },
  {
    name: "Ternate",
    position: [0.79, 127.38] as [number, number],
    color: "#9333ea",
  },
  {
    name: "Malaka",
    position: [2.2, 102.25] as [number, number],
    color: "#4f46e5",
  },
];

const routes = [
  {
    name: "Rute Nusantara",
    color: "#e76f51",
    positions: [
      ports[4].position,
      ports[3].position,
      ports[2].position,
      ports[1].position,
    ],
  },
  {
    name: "Rute Barat",
    color: "#d97706",
    positions: [
      ports[3].position,
      ports[2].position,
      ports[1].position,
      ports[0].position,
      ports[5].position,
    ],
  },
  {
    name: "Rute Timur",
    color: "#0d9488",
    positions: [
      ports[5].position,
      ports[2].position,
      ports[3].position,
      ports[4].position,
    ],
  },
];

const routeCoordinates: Record<string, [number, number]> = {
  "Asia Tenggara": [1.35, 103.8],
  Nusantara: [-2.0, 116.0],
  Madagaskar: [-18.9, 47.5],
  "Afrika Timur": [-6.8, 39.3],
  Lisbon: [38.72, -9.14],
  "Tanjung Harapan": [-34.36, 18.47],
  Eropa: [48.86, 2.35],
  "Timur Tengah": [25.3, 45.0],
  India: [20.6, 78.9],
  "Selat Malaka": [2.2, 102.25],
  Malaka: [2.2, 102.25],
  "Banda dan Maluku": [-2.0, 128.0],
  "Tiongkok & Jepang": [34.7, 119.5],
  Sulawesi: [-2.0, 120.0],
  Maluku: [0.79, 127.38],
  Jawa: [-7.5, 110.0],
  Sumatera: [0.5, 101.0],
};

export default function RealSpiceMap({
  highlightedRoute,
  compact = false,
  routePath,
}: {
  highlightedRoute?: string;
  compact?: boolean;
  routePath?: string[];
}) {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<LeafletMap | null>(null);
  const routeKey = routePath?.join("|");

  useEffect(() => {
    if (!mapElement.current || mapInstance.current) return;

    let isMounted = true;
    const animationFrames: number[] = [];

    import("leaflet").then(({ default: L }) => {
      if (!isMounted || !mapElement.current) return;

      const map = L.map(mapElement.current, {
        center: routeKey ? [15, 100] : [-1.8, 116.5],
        zoom: routeKey ? 3 : 4,
        minZoom: 3,
        maxZoom: 8,
        scrollWheelZoom: false,
      });
      mapInstance.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const selectedPositions = routeKey
        ?.split("|")
        .map((stop) => routeCoordinates[stop])
        .filter((position): position is [number, number] => Boolean(position));
      const selectedRouteNames = routeKey?.split("|") ?? [];

      if (selectedPositions && selectedPositions.length > 1) {
        L.polyline(selectedPositions, {
          color: "#e76f51",
          weight: 5,
          dashArray: "10 9",
        })
          .addTo(map)
          .bindPopup(highlightedRoute ?? "Rute pelayaran");

        selectedPositions.forEach((position, index) => {
          L.circleMarker(position, {
            radius: 8,
            color: "#fff",
            weight: 3,
            fillColor: "#e76f51",
            fillOpacity: 1,
          })
            .addTo(map)
            .bindPopup(
              `<strong>${selectedRouteNames[index]}</strong><br />Titik rute pelayaran`,
            )
            .bindTooltip(`${index + 1}  ${selectedRouteNames[index]}`, {
              permanent: true,
              direction: "top",
              offset: [0, -8],
              className: "route-stop-label",
            });
        });
        map.fitBounds(selectedPositions, { padding: [32, 32] });
      } else {
        routes.forEach((route) => {
          const isHighlighted =
            !highlightedRoute || route.name === highlightedRoute;
          L.polyline(route.positions, {
            color: route.color,
            weight: isHighlighted ? 5 : 2,
            dashArray: "10 9",
            opacity: isHighlighted ? 1 : 0.22,
          })
            .addTo(map)
            .bindPopup(route.name);
        });
      }

      const animatedRoutes =
        selectedPositions && selectedPositions.length > 1
          ? [
              {
                name: highlightedRoute ?? "Rute pelayaran",
                color: "#e76f51",
                positions: selectedPositions,
              },
            ]
          : routes;

      animatedRoutes.forEach((route, routeIndex) => {
        const vessel = L.marker(route.positions[0], {
          icon: L.divIcon({
            className: "route-vessel-marker",
            html: `<span style="--vessel-color:${route.color}">▰</span>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          }),
          interactive: false,
        }).addTo(map);
        const duration = 9000 + routeIndex * 1800;
        const startedAt = performance.now() - routeIndex * 2200;

        const animateVessel = (now: number) => {
          if (!mapInstance.current) return;
          const segmentCount = route.positions.length - 1;
          const progress =
            (((now - startedAt) % duration) + duration) / duration;
          const segmentPosition = (progress % 1) * segmentCount;
          const segmentIndex = Math.min(
            Math.floor(segmentPosition),
            segmentCount - 1,
          );
          const segmentProgress = segmentPosition - segmentIndex;
          const start = route.positions[segmentIndex];
          const end = route.positions[segmentIndex + 1];
          if (!start || !end) {
            animationFrames.push(window.requestAnimationFrame(animateVessel));
            return;
          }
          vessel.setLatLng([
            start[0] + (end[0] - start[0]) * segmentProgress,
            start[1] + (end[1] - start[1]) * segmentProgress,
          ]);
          animationFrames.push(window.requestAnimationFrame(animateVessel));
        };

        animationFrames.push(window.requestAnimationFrame(animateVessel));
      });

      if (!selectedPositions || selectedPositions.length < 2) {
        ports.forEach((port) => {
          L.circleMarker(port.position, {
            radius: 8,
            color: "#fff",
            weight: 3,
            fillColor: port.color,
            fillOpacity: 1,
          })
            .addTo(map)
            .bindPopup(
              `<strong>${port.name}</strong><br />Pelabuhan jalur rempah`,
            );
        });
      }

      window.requestAnimationFrame(() => map.invalidateSize());
    });

    return () => {
      isMounted = false;
      animationFrames.forEach((frame) => window.cancelAnimationFrame(frame));
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, [highlightedRoute, routeKey]);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-spice-teal/15 shadow-lg shadow-spice-teal/10 ${compact ? "h-56" : "h-[28rem] sm:h-[34rem]"}`}
    >
      <div
        ref={mapElement}
        className="h-full w-full"
        role="application"
        aria-label="Peta Indonesia dengan titik pelabuhan dan jalur pelayaran rempah"
      />
      <div className="pointer-events-none absolute left-3 top-3 z-[400] rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-teal-800 shadow-sm">
        Peta & arus pelayaran
      </div>
    </div>
  );
}
