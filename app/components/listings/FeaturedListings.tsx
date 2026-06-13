"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { mockRooms } from "@/app/data/mockRooms";
import RoomCard from "./RoomCard";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function FeaturedListings() {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      });
    }
  }, []);

  // 👉 Distance function (Haversine)
  function getDistanceKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  }

  // 👉 enrich rooms with distance (if location exists)
  const enrichedRooms = useMemo(() => {
    if (!userLocation) return mockRooms;

    return mockRooms
      .map((room) => {
        // fallback coords (important if you haven’t added lat/lng yet)
        const roomCoords = {
          lat: -26.2,
          lng: 28.05,
        };

        const distance = getDistanceKm(
          userLocation.lat,
          userLocation.lng,
          roomCoords.lat,
          roomCoords.lng
        );

        return {
          ...room,
          distance,
        };
      })
      .sort((a: any, b: any) => a.distance - b.distance);
  }, [userLocation]);

  return (
    <section className="relative py-14 md:py-20">

      {/* Glow */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider">
            Discover
          </span>

          <h2 className="text-3xl md:text-5xl font-black mt-2">
            Featured Rooms
          </h2>

          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Rooms closest to you and most relevant listings.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {enrichedRooms.map((room: any, index) => (
            <motion.div
              key={room.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: "easeOut",
              }}
            >
              <RoomCard room={room} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}