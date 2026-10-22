import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { MobileBottomNav } from "../../components/layout/MobileBottomNav";
import { Button } from "../../components/common/Button";

export const CustomerTripsScreen = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("completed"); // "active" | "completed"

  const completedTrips = [
    {
      id: "PNL-1041",
      date: "23 Oct 2026, 12:30",
      origin: "Batawadi Bypass",
      destination: "Gubbi Bus Terminal Road",
      vehicle: "Tata Ace",
      plate: "KA-06-B-9988",
      goods: "Fertilisers (400 kg)",
      fare: 680,
      payment: "Online UPI",
    },
    {
      id: "PNL-1039",
      date: "20 Oct 2026, 09:15",
      origin: "APMC Yard Tumakuru",
      destination: "Sira Gate Industrial",
      vehicle: "Tata Ace",
      plate: "KA-06-XX-1234",
      goods: "Vegetables (600 kg)",
      fare: 750,
      payment: "Cash",
    },
    {
      id: "PNL-1035",
      date: "18 Oct 2026, 15:00",
      origin: "Antharasanahalli",
      destination: "Kunigal Town Market",
      vehicle: "8ft Pickup",
      plate: "KA-06-C-4521",
      goods: "Plywood Sheets (800 kg)",
      fare: 1100,
      payment: "Online UPI",
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-surface-container-lowest min-h-[780px] pb-24">
      <MobileHeader title="My Trips" showBack={false} />

      <main className="flex-1 flex flex-col px-margin pt-20">
        {/* Tab switch */}
        <div className="flex bg-surface-container-low p-1 rounded-xl mt-2 border border-outline-variant/40">
          <button
            type="button"
            onClick={() => setTab("active")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              tab === "active"
                ? "bg-surface-container-lowest text-on-surface shadow-xs"
                : "text-secondary hover:text-on-surface"
            }`}
          >
            Active (1)
          </button>
          <button
            type="button"
            onClick={() => setTab("completed")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              tab === "completed"
                ? "bg-surface-container-lowest text-on-surface shadow-xs"
                : "text-secondary hover:text-on-surface"
            }`}
          >
            Completed ({completedTrips.length})
          </button>
        </div>

        {/* Tab Content */}
        {tab === "active" ? (
          <div className="flex flex-col gap-3 mt-4">
            <div
              onClick={() => navigate("/customer/active-trip")}
              className="p-4 rounded-2xl bg-white border-2 border-primary-container shadow-sm cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary">#PNL-1042</span>
                <span className="text-xs font-bold text-tertiary bg-tertiary-container/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping"></span>
                  In Transit
                </span>
              </div>

              <div className="flex flex-col gap-1.5 my-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  <span className="font-semibold text-on-surface">APMC Yard, Tumakuru</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="material-symbols-outlined text-[14px] text-error">location_on</span>
                  <span className="font-semibold text-on-surface">Kunigal Town Market</span>
                </div>
              </div>

              <div className="pt-3 border-t border-outline-variant/30 flex items-center justify-between text-xs">
                <span className="text-secondary">Tata Ace • Ravi Kumar</span>
                <span className="font-bold text-on-surface text-[15px]">₹950</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mt-4">
            {completedTrips.map((trip) => (
              <div
                key={trip.id}
                className="p-4 rounded-2xl bg-white border border-outline-variant/50 shadow-xs flex flex-col gap-2.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-on-surface">{trip.id}</span>
                  <span className="text-secondary">{trip.date}</span>
                </div>

                <div className="flex flex-col gap-1 my-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                    <span className="text-on-surface truncate">{trip.origin}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="material-symbols-outlined text-[14px] text-error">location_on</span>
                    <span className="text-on-surface truncate">{trip.destination}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-secondary">
                  <span>{trip.goods} • {trip.vehicle}</span>
                  <span className="font-bold text-on-surface text-[15px]">₹{trip.fare}</span>
                </div>

                <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-tertiary bg-tertiary-container/20 px-2 py-0.5 rounded-full">
                    Delivered
                  </span>
                  <button
                    type="button"
                    onClick={() => navigate("/customer/create-request")}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5"
                  >
                    <span className="material-symbols-outlined text-[14px]">repeat</span>
                    <span>Book Again</span>
                  </button>
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
