"use client";

import { motion } from "framer-motion";
import { mockRooms } from "@/app/data/mockRooms";
import RoomCard from "./RoomCard";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function FeaturedListings() {
  return (
    <section className="relative py-14 md:py-20">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-8 md:mb-12"
        >
          <div>
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider">
              Discover
            </span>

            <h2 className="text-3xl md:text-5xl font-black mt-2">
              Featured Rooms
            </h2>

            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Handpicked rooms available right now.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
            md:gap-8
          "
        >
          {mockRooms.map((room, index) => (
            <motion.div
              key={room.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
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