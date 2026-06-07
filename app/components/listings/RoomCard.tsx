import Link from "next/link";
import { Room } from "@/app/types/room";
import {
  Star,
  MapPin,
  Wifi,
  Car,
  ShieldAlert,
} from "lucide-react";

export default function RoomCard({
  room,
}: {
  room: Room;
}) {
  const avg =
    room.reviews.length > 0
      ? room.reviews.reduce(
          (a, r) => a + r.rating,
          0
        ) / room.reviews.length
      : 0;

  // 🔥 NEW: mock report count (replace with real backend later)
  const reportCount = (room as any).reports ?? 0;

  function getReportStatus(count: number) {
    if (count === 0)
      return {
        label: "Safe",
        color: "text-green-600 bg-green-50 border-green-200",
      };

    if (count <= 2)
      return {
        label: "Few reports",
        color: "text-yellow-600 bg-yellow-50 border-yellow-200",
      };

    return {
      label: "Flagged",
      color: "text-red-600 bg-red-50 border-red-200",
    };
  }

  const reportStatus = getReportStatus(reportCount);

  // function renderStars(value: number) {
  //   return Array.from({ length: 5 }).map((_, i) => {
  //     const diff = value - i;

  //     let type: "full" | "half" | "empty" = "empty";

  //     if (diff >= 1) type = "full";
  //     else if (diff >= 0.5) type = "half";

  //     return (
  //       <div key={i} className="relative w-3.5 h-3.5">
  //         <Star size={14} className="text-gray-400 absolute" />

  //         {type === "full" && (
  //           <Star
  //             size={14}
  //             className="text-yellow-400 fill-yellow-400 absolute"
  //           />
  //         )}

  //         {type === "half" && (
  //           <div className="absolute overflow-hidden w-1/2">
  //             <Star
  //               size={14}
  //               className="text-yellow-400 fill-yellow-400"
  //             />
  //           </div>
  //         )}
  //       </div>
  //     );
  //   });
  // }

  return (
    <Link href={`/rooms/${room.id}`}>
      <div
        className="
          group
          bg-white/80
          backdrop-blur-xl
          rounded-3xl
          overflow-hidden
          border
          border-white/50
          shadow-lg
          hover:shadow-2xl
          hover:-translate-y-2
          transition-all
          duration-500
        "
      >
        {/* IMAGE */}
        <div className="relative overflow-hidden">

          <img
            src={room.image}
            alt={room.title}
            className="
              h-60
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
            "
          />

          {/* Price */}
          <div
            className="
              absolute
              top-4
              left-4
              bg-white/90
              backdrop-blur
              px-4
              py-2
              rounded-full
              shadow-md
            "
          >
            <span className="font-bold text-violet-700">
              R{room.price}
            </span>
            <span className="text-xs text-gray-500">
              /month
            </span>
          </div>

          {/* Rating */}
          {/* <div
            className="
              absolute
              top-4
              right-4
              bg-black/80
              text-white
              px-3
              py-2
              rounded-full
              flex
              items-center
              gap-2
            "
          > */}
            {/* <span className="text-sm font-medium">
              {avg.toFixed(1)}
            </span> */}

            {/* <div className="flex items-center gap-[2px]">
              {renderStars(avg)}
            </div> */}
          </div>

          {/* 🔥 NEW: Safety / Reports badge */}
          <div
            className={`
              absolute
              bottom-3
              right-3
              px-3
              py-1.5
              rounded-full
              text-xs
              font-medium
              border
              flex
              items-center
              gap-1
              ${reportStatus.color}
            `}
          >
            <ShieldAlert size={12} />
            {reportCount === 0
              ? "No reports"
              : `${reportCount} report${reportCount > 1 ? "s" : ""}`}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-5">

          <h3 className="font-bold text-lg line-clamp-1">
            {room.title}
          </h3>

          <div className="flex items-center gap-1 mt-2 text-gray-500">
            <MapPin size={15} />
            <span className="text-sm">
              {room.location}
            </span>
          </div>

          {/* Features */}
          <div className="flex gap-3 mt-4">

            <div className="flex items-center gap-1 text-xs bg-gray-100 px-3 py-2 rounded-full">
              <Wifi size={14} />
              WiFi
            </div>

            <div className="flex items-center gap-1 text-xs bg-gray-100 px-3 py-2 rounded-full">
              <Car size={14} />
              Parking
            </div>
          </div>

          {/* Footer */}
          <div
            className="
              flex
              items-center
              justify-between
              mt-5
              pt-4
              border-t
            "
          >
            <span className="text-sm text-gray-500">
              {room.reviews.length} reviews
            </span>

            <span
              className="
                text-violet-600
                font-semibold
                group-hover:translate-x-1
                transition-transform
              "
            >
              View →
            </span>
          </div>
        </div>
      {/* </div> */}
    </Link>
  );
}