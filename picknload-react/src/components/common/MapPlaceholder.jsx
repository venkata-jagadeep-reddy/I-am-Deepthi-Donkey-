import React from "react";

export const MapPlaceholder = ({
  status = "IN_TRANSIT", // "SEARCHING", "GOING_TO_PICKUP", "IN_TRANSIT", "DELIVERED"
  eta = "18 mins",
  driverName = "Ravi Kumar (Tata Ace)",
  origin = "APMC Yard, Tumakuru",
  destination = "Kunigal Town",
  className = "h-56",
}) => {
  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden bg-slate-100 border border-outline-variant/60 shadow-inner flex flex-col justify-between p-3 select-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px), radial-gradient(#cbd5e1 1px, #f1f5f9 1px)`,
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 10px 10px",
      }}
    >
      {/* Top Floating Status Pill */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest/95 backdrop-blur-md border border-outline-variant/40 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary"></span>
          </span>
          <span className="font-label-sm text-label-sm font-semibold text-on-surface">
            {status === "SEARCHING"
              ? "Radar searching nearby fleet..."
              : status === "GOING_TO_PICKUP"
              ? "Driver heading to pickup"
              : status === "GOODS_LOADED"
              ? "Goods secured & loaded"
              : status === "IN_TRANSIT"
              ? `Live tracking • ${eta} ETA`
              : "Trip completed"}
          </span>
        </div>

        <div className="px-2.5 py-1 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md border border-outline-variant/40 text-[11px] font-medium text-secondary">
          GPS Live
        </div>
      </div>

      {/* Center Simulated Route Line & Truck */}
      <div className="relative w-full h-24 my-auto flex items-center justify-between px-6">
        {/* Origin Marker */}
        <div className="flex flex-col items-center z-10">
          <div className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center text-white shadow-md">
            <span className="material-symbols-outlined text-[18px]">warehouse</span>
          </div>
          <span className="text-[11px] font-semibold text-on-surface mt-1 bg-white/90 px-1.5 py-0.5 rounded shadow-xs truncate max-w-[90px]">
            {origin.split(",")[0]}
          </span>
        </div>

        {/* Route Line Graphic with pulsing dot */}
        <div className="flex-1 relative h-1.5 bg-slate-300 mx-3 rounded-full overflow-hidden">
          <div className="h-full bg-primary-container w-2/3 rounded-full transition-all duration-700"></div>
          {/* Animated vehicle along the route */}
          <div
            className="absolute top-1/2 -translate-y-1/2 left-2/3 -translate-x-1/2 w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-lg border-2 border-white animate-pulse"
            title={driverName}
          >
            <span className="material-symbols-outlined text-[20px]">local_shipping</span>
          </div>
        </div>

        {/* Destination Marker */}
        <div className="flex flex-col items-center z-10">
          <div className="w-8 h-8 rounded-full bg-error flex items-center justify-center text-white shadow-md">
            <span className="material-symbols-outlined text-[18px]">location_on</span>
          </div>
          <span className="text-[11px] font-semibold text-on-surface mt-1 bg-white/90 px-1.5 py-0.5 rounded shadow-xs truncate max-w-[90px]">
            {destination.split(",")[0]}
          </span>
        </div>
      </div>

      {/* Bottom Route Summary Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md border border-outline-variant/40 z-10">
        <span className="font-label-sm text-secondary truncate">NH-75 Expressway Route</span>
        <span className="font-label-sm font-semibold text-primary">Distance: 38 km</span>
      </div>
    </div>
  );
};
