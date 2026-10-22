import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDriverDuty } from "../../context/DriverDutyContext";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { MobileBottomNav } from "../../components/layout/MobileBottomNav";
import { Button } from "../../components/common/Button";

export const DriverRequestsScreen = () => {
  const navigate = useNavigate();
  const { nearbyRequests, isOnline } = useDriverDuty();
  const [showEmpty, setShowEmpty] = useState(false);

  const displayRequests = showEmpty ? [] : nearbyRequests;

  return (
    <div className="flex-1 flex flex-col bg-surface min-h-[780px] pb-24">
      <MobileHeader title="New Requests" showBack={false} />

      <main className="flex-1 flex flex-col px-margin pt-20">
        <div className="flex items-center justify-between pt-2">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Nearby Loads
            </h2>
            <p className="text-xs text-secondary mt-0.5">
              Commercial haul requests within 5 km of Tumakuru APMC
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowEmpty(!showEmpty)}
            className="text-[11px] text-primary font-semibold underline"
          >
            {showEmpty ? "Show Leads" : "Show Empty State"}
          </button>
        </div>

        {/* Requests Listing or Empty State */}
        {displayRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center my-auto py-12">
            <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-secondary mb-4 border border-outline-variant/40">
              <span className="material-symbols-outlined text-[36px]">inbox</span>
            </div>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
              No requests right now
            </h3>
            <p className="text-xs text-secondary mt-1 max-w-xs">
              Keep your duty ONLINE. We will ring you immediately when a consignor creates a booking in your area.
            </p>

            <div className="mt-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low border border-outline-variant/30 text-xs text-secondary">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
              <span>Scanning APMC Gate 1 & 2</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mt-4">
            {displayRequests.map((req) => (
              <div
                key={req.id}
                onClick={() => navigate(`/driver/request-details?id=${req.id}`)}
                className="p-4 rounded-2xl bg-white border border-outline-variant/60 shadow-xs flex flex-col gap-3 cursor-pointer hover:border-primary-container transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-secondary uppercase">
                      {req.id} • {req.timeAgo}
                    </span>
                    <h3 className="font-bold text-[16px] text-on-surface mt-1">
                      {req.pickupLocation.split(",")[0]}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-[20px] font-bold text-on-surface font-headline-md block">
                      ₹{req.fare}
                    </span>
                    <span className="text-[11px] text-secondary font-medium">{req.distanceKm} km</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-secondary">
                  <span className="material-symbols-outlined text-error text-[16px]">location_on</span>
                  <span className="truncate">Drop: <strong>{req.dropLocation}</strong></span>
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t border-outline-variant/30 text-xs">
                  <span className="text-secondary font-medium">
                    {req.cargoType} • {req.weightKg} kg
                  </span>
                  <span className="font-bold text-primary flex items-center gap-0.5">
                    <span>Accept / Details</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <MobileBottomNav />
    </div>
  );
};
