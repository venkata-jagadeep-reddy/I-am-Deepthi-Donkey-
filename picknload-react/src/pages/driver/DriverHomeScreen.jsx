import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useDriverDuty } from "../../context/DriverDutyContext";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { MobileBottomNav } from "../../components/layout/MobileBottomNav";
import { Button } from "../../components/common/Button";

export const DriverHomeScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isOnline, toggleDuty, nearbyRequests } = useDriverDuty();

  return (
    <div className="flex-1 flex flex-col bg-surface min-h-[780px] pb-24">
      <MobileHeader title="Driver Partner" showLogo />

      <main className="flex-1 flex flex-col px-margin pt-20">
        {/* Driver Profile Header */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Good morning, {user?.name?.split(" ")[0] || "Ravi"}
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs text-secondary">
                {user?.vehicleType || "Tata Ace"} • {user?.plateNumber || "KA-06-XX-1234"}
              </span>
              <span className="inline-flex items-center px-1.5 py-0.2 rounded-full bg-tertiary-container/30 text-tertiary text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[13px] mr-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                Verified
              </span>
            </div>
          </div>

          <div
            onClick={() => navigate("/driver/profile")}
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-container shadow-xs cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80"
              alt="Driver Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Duty Status Card */}
        <div
          className={`
            w-full rounded-2xl p-4 shadow-sm flex flex-col gap-3 mt-4 border transition-all
            ${
              isOnline
                ? "bg-white border-tertiary/30"
                : "bg-surface-container-low/70 border-outline-variant/60"
            }
          `}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                {isOnline && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
                )}
                <span
                  className={`relative inline-flex rounded-full h-3 w-3 ${
                    isOnline ? "bg-tertiary" : "bg-secondary"
                  }`}
                ></span>
              </span>
              <span
                className={`font-headline-md text-headline-md tracking-wider font-bold uppercase ${
                  isOnline ? "text-tertiary" : "text-secondary"
                }`}
              >
                {isOnline ? "ONLINE" : "OFFLINE"}
              </span>
            </div>

            {/* Toggle Switch */}
            <button
              type="button"
              onClick={toggleDuty}
              className={`
                w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300
                ${isOnline ? "bg-tertiary" : "bg-outline-variant"}
              `}
            >
              <div
                className={`
                  bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center
                  ${isOnline ? "translate-x-6" : "translate-x-0"}
                `}
              >
                <span className={`material-symbols-outlined text-[16px] ${isOnline ? "text-tertiary" : "text-secondary"}`}>
                  power_settings_new
                </span>
              </div>
            </button>
          </div>

          <p className="text-xs text-secondary">
            {isOnline
              ? "You're available for new transport requests."
              : "You're offline. Switch online to receive intra-city freight requests."}
          </p>

          {isOnline && (
            <div className="flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 text-xs text-on-surface">
              <svg className="w-4 h-4 text-primary animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                <path className="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor"></path>
              </svg>
              <span className="font-medium truncate">Searching nearby APMC & Industrial hubs • 5 km radius</span>
            </div>
          )}
        </div>

        {/* Driver 3-Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 mt-4">
          <div
            onClick={() => navigate("/driver/earnings")}
            className="bg-white p-3.5 rounded-2xl border border-outline-variant/50 shadow-xs flex flex-col justify-between cursor-pointer hover:bg-surface-container-low"
          >
            <div className="flex items-center justify-between text-secondary">
              <span className="text-[11px] font-semibold">Today</span>
              <span className="material-symbols-outlined text-[16px] text-tertiary">payments</span>
            </div>
            <div className="mt-2">
              <span className="font-bold text-[16px] text-on-surface block">₹1,250</span>
              <span className="text-[10px] text-secondary">4 trips</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-outline-variant/50 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-secondary">
              <span className="text-[11px] font-semibold">Trips</span>
              <span className="material-symbols-outlined text-[16px] text-primary">local_shipping</span>
            </div>
            <div className="mt-2">
              <span className="font-bold text-[16px] text-on-surface block">4</span>
              <span className="text-[10px] text-secondary">38 km driven</span>
            </div>
          </div>

          <div
            onClick={() => navigate("/driver/requests")}
            className="bg-white p-3.5 rounded-2xl border border-outline-variant/50 shadow-xs flex flex-col justify-between cursor-pointer hover:bg-surface-container-low"
          >
            <div className="flex items-center justify-between text-secondary">
              <span className="text-[11px] font-semibold">Loads</span>
              <span className="material-symbols-outlined text-[16px] text-primary-container">notifications_active</span>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-bold text-[16px] text-on-surface">2</span>
              <span className="bg-primary-fixed text-on-primary-fixed text-[9px] font-bold px-1 rounded">New</span>
            </div>
          </div>
        </div>

        {/* Requests Feed Section */}
        <div className="flex flex-col gap-2 mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">
                New Requests
              </h2>
              {isOnline && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-container"></span>
                </span>
              )}
            </div>
            <button
              onClick={() => navigate("/driver/requests")}
              className="text-primary text-xs font-semibold hover:underline"
            >
              View all
            </button>
          </div>

          {/* Request Card 1 */}
          {nearbyRequests.map((req) => (
            <div
              key={req.id}
              onClick={() => navigate(`/driver/request-details?id=${req.id}`)}
              className="p-4 rounded-2xl bg-white border border-outline-variant/60 shadow-xs flex flex-col gap-3 cursor-pointer hover:border-primary-container transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-secondary uppercase">{req.id} • {req.timeAgo}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-[15px] text-on-surface">{req.pickupLocation.split(",")[0]}</span>
                    <span className="material-symbols-outlined text-secondary text-[14px]">arrow_forward</span>
                    <span className="font-bold text-[15px] text-on-surface">{req.dropLocation.split(",")[0]}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[18px] font-bold text-on-surface font-headline-md">₹{req.fare}</span>
                  <span className="block text-[10px] text-secondary">{req.distanceKm} km</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-outline-variant/30 text-xs">
                <span className="text-secondary">{req.cargoType} • {req.weightKg} kg</span>
                <span className="font-bold text-primary flex items-center gap-0.5">
                  <span>View Details</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <MobileBottomNav />
    </div>
  );
};
