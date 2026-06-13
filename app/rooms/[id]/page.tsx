"use client";

import { useEffect, useState } from "react";
import { use, useMemo } from "react";
import {
  ArrowLeft,
  MapPin,
  Star,
  ShieldCheck,
  Phone,
  MessageCircle,
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

  function formatMoney(value: number) {
    return new Intl.NumberFormat("en-ZA").format(value);
  }

  function submitReport() {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setReportOpen(false);
    }, 1200);
  }

  // 👉 DISTANCE (Haversine)
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
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // 👉 fallback coords (if you haven't added them yet)
  const coords = useMemo(() => {
    return {
      lat: -26.2041,
      lng: 28.0473,
    };
  }, []);

  const distance = userLocation
    ? getDistanceKm(
        userLocation.lat,
        userLocation.lng,
        coords.lat,
        coords.lng
      )
    : null;

  // 👉 CONTACT
  const phoneNumber = "+27723255319";
  const whatsappNumber = "27723255319";

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi%20I%20am%20interested%20in%20your%20room%20listing`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}`;

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
            src={room.images[0]}
            alt={room.name}
            className="w-full h-[220px] sm:h-[280px] md:h-[380px] object-cover"
          />

          <div className="absolute bottom-3 left-3 bg-white/95 px-3 py-2 rounded-xl">
            <p className="text-lg font-semibold text-violet-600">
              R{formatMoney(room.price)}
            </p>
            <p className="text-xs text-gray-500">per month</p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-6 mt-6">

          {/* LEFT */}
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">
              {room.name}
            </h1>

            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin size={15} />
                {room.location.address}
              </div>

              {distance !== null && (
                <div className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                  📍 {distance.toFixed(1)} km from you
                </div>
              )}

              <div className="flex items-center gap-1">
                <Star size={15} className="fill-yellow-400 text-yellow-400" />
                {avgRating.toFixed(1)}
              </div>

              <div className="flex items-center gap-1 text-green-600">
                <ShieldCheck size={15} />
                Verified
              </div>
            </div>

            {/* MAP */}
            <div className="mt-6">
              <h2 className="font-semibold mb-2">Location</h2>

              <iframe
                className="w-full h-[250px] rounded-xl"
                loading="lazy"
                src={`https://www.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`}
              />

              <a
                href={directionsUrl}
                target="_blank"
                className="block mt-3 bg-violet-600 text-white text-center py-3 rounded-xl"
              >
                Get Directions
              </a>
            </div>

            {/* ABOUT */}
            <div className="mt-8">
              <h2 className="font-semibold text-lg mb-2">About</h2>
              <p className="text-sm text-gray-600">
                {room.description}
              </p>
            </div>

            <ReviewSection reviews={room.reviews} />
          </div>

          {/* SIDEBAR */}
          <div className="hidden lg:block">
            <div className="sticky top-6 bg-white rounded-2xl p-5 shadow-lg">

              <a
                href={`tel:${phoneNumber}`}
                className="w-full h-11 rounded-xl bg-violet-600 text-white flex items-center justify-center gap-2"
              >
                <Phone size={16} />
                Call Owner
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                className="mt-3 w-full h-11 rounded-xl border flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>

              <button
                onClick={() => setReportOpen(true)}
                className="mt-3 w-full border border-red-500 text-red-500 py-2 rounded-xl"
              >
                Report Listing
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* MOBILE CTA */}
            {/* MOBILE CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg p-3 z-50 border-t">
        <div className="grid grid-cols-3 gap-2">

          {/* CALL */}
          <a
            href={`tel:${phoneNumber}`}
            className="h-11 rounded-xl bg-violet-600 text-white flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Phone size={16} className="shrink-0" />
            <span className="whitespace-nowrap">Call</span>
          </a>

          {/* WHATSAPP */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 rounded-xl border border-gray-300 bg-white flex items-center justify-center gap-2 text-sm"
          >
            <MessageCircle size={16} className="shrink-0 text-green-600" />
            <span className="whitespace-nowrap">WhatsApp</span>
          </a>

          {/* REPORT */}
          <button
            onClick={() => setReportOpen(true)}
            className="h-11 rounded-xl border border-red-500 text-red-500 text-sm font-medium whitespace-nowrap"
          >
            Report
          </button>

        </div>
      </div>

      {/* Spacer for fixed bottom bar */}
      <div className="h-20 lg:hidden" />

            {/* REPORT MODAL */}
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
          <h2 className="text-lg font-bold">Report Business</h2>

          <p className="text-sm text-gray-500 mt-1">
            Tell us what's wrong
          </p>

          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border p-3 mt-4 rounded-xl"
          >
            <option>Fake business</option>
            <option>Scam / fraud</option>
            <option>Wrong information</option>
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