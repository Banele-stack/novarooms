"use client";

import { use, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Star,
  ShieldCheck,
  Phone,
} from "lucide-react";

import ReviewSection from "@/app/components/reviews/ReviewSection";
import { mockRooms } from "@/app/data/mockRooms";

export default function RoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const room = mockRooms.find((r) => r.id === id);

  const [reportOpen, setReportOpen] = useState(false);
  const [reason, setReason] = useState("Fake listing");
  const [success, setSuccess] = useState(false);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Room not found
      </div>
    );
  }

  const avgRating =
    room.reviews.length > 0
      ? room.reviews.reduce((a, r) => a + r.rating, 0) /
        room.reviews.length
      : 0;

  function submitReport() {
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setReportOpen(false);
    }, 1200);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-4 md:py-6">

        {/* BACK */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-4"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* IMAGE */}
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm">
          <img
            src={room.image}
            alt={room.title}
            className="w-full h-[220px] sm:h-[280px] md:h-[380px] object-cover"
          />

          <div className="absolute bottom-3 left-3 bg-white/95 px-3 py-2 rounded-xl">
            <p className="text-lg font-semibold text-violet-600">
              R{room.price}
            </p>
            <p className="text-xs text-gray-500">per month</p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-6 mt-6">

          {/* LEFT */}
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">
              {room.title}
            </h1>

            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin size={15} />
                {room.location}
              </div>

              <div className="flex items-center gap-1">
                <Star
                  size={15}
                  className="fill-yellow-400 text-yellow-400"
                />
                {avgRating.toFixed(1)}
              </div>

              <div className="flex items-center gap-1 text-green-600">
                <ShieldCheck size={15} />
                Verified
              </div>
            </div>

            <div className="mt-8">
              <h2 className="font-semibold text-lg mb-4">
                About this room
              </h2>

              <p className="text-sm text-gray-600">
                {room.description}
              </p>
            </div>

            <ReviewSection reviews={room.reviews} />
          </div>

          {/* SIDEBAR */}
          <div className="hidden lg:block">
            <div className="sticky top-6 bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg">

              <div className="text-center">
                <p className="text-2xl font-semibold text-violet-600">
                  R{room.price}
                </p>
                <p className="text-sm text-gray-500">per month</p>
              </div>

              <button className="mt-4 w-full h-11 rounded-xl bg-violet-600 text-white flex items-center justify-center gap-2">
                <Phone size={16} />
                Contact Owner
              </button>

              <button
                onClick={() => setReportOpen(true)}
                className="mt-3 w-full border border-red-500 text-red-500 py-2 rounded-xl text-sm"
              >
                Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 p-3 z-50 shadow-md">
        <div className="flex gap-2">
          <button className="flex-1 h-11 rounded-xl bg-violet-600 text-white flex items-center justify-center gap-2">
            <Phone size={16} />
            Contact Owner
          </button>

          <button
            onClick={() => setReportOpen(true)}
            className="flex-1 border border-red-500 text-red-500 rounded-xl"
          >
            Report
          </button>
        </div>
      </div>

      <div className="h-20 lg:hidden" />

      {/* ================= MODAL (CENTERED PROPERLY) ================= */}
      {reportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl">

            {success ? (
              <div className="text-center py-10">
                <p className="text-green-600 font-bold text-lg">
                  Report submitted successfully ✅
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-bold">
                  Report Listing
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Tell us what’s wrong
                </p>

                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border p-3 mt-4 rounded-xl"
                >
                  <option>Fake listing</option>
                  <option>Scam / fraud</option>
                  <option>Already rented</option>
                  <option>Inappropriate content</option>
                </select>

                <button
                  onClick={submitReport}
                  className="w-full bg-red-600 text-white py-3 mt-4 rounded-xl"
                >
                  Submit Report
                </button>

                <button
                  onClick={() => setReportOpen(false)}
                  className="w-full mt-3 text-sm text-gray-500"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}