import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTrip } from "../../context/TripContext";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { MobileBottomNav } from "../../components/layout/MobileBottomNav";
import { Button } from "../../components/common/Button";

export const CustomerHomeScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { draftTrip, updateDraft } = useTrip();

  const handleStartBooking = () => {
    navigate("/customer/create-request");
  };

  const handleSelectQuickLocation = (loc) => {
    updateDraft({ drop: loc });
    navigate("/customer/create-request");
  };

  return (
    <div className="flex-1 flex flex-col bg-surface-container-lowest min-h-[780px] pb-24">
      <MobileHeader />

      <main className="flex-1 flex flex-col px-margin pt-20">
        {/* Greeting Block */}
        <div className="flex flex-col pt-2">
          <span className="font-body-md text-secondary">
            Good morning, {user?.name?.split(" ")[0] || "Keerthana"}
          </span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold mt-0.5">
            Where are you moving goods?
          </h1>
        </div>

        {/* Main Route Booking Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md border border-outline-variant/60 shadow-sm flex flex-col gap-space-md mt-4">
          <div className="flex flex-col gap-2">
            {/* Pickup Point Trigger */}
            <div
              onClick={handleStartBooking}
              className="w-full min-h-[50px] bg-surface-container-low rounded-xl px-space-md flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors"
            >
              <div className="flex items-center gap-space-md min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary shrink-0"></span>
                <div className="flex flex-col truncate">
                  <span className="text-[11px] font-medium text-secondary">Pickup point</span>
                  <span className="text-[14px] font-semibold text-on-surface truncate">
                    {draftTrip.pickup}
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">
                my_location
              </span>
            </div>

            {/* Connecting Line */}
            <div className="flex items-center pl-[21px] py-0.5">
              <div className="w-[2px] h-3.5 bg-outline-variant/80 rounded-full"></div>
            </div>

            {/* Drop Point Trigger */}
            <div
              onClick={handleStartBooking}
              className="w-full min-h-[50px] bg-surface-container-low rounded-xl px-space-md flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors"
            >
              <div className="flex items-center gap-space-md min-w-0">
                <span className="material-symbols-outlined text-error text-[20px] shrink-0">
                  location_on
                </span>
                <div className="flex flex-col truncate">
                  <span className="text-[11px] font-medium text-secondary">Drop point</span>
                  <span className="text-[14px] text-on-surface truncate">
                    {draftTrip.drop || "Enter delivery destination"}
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">
                search
              </span>
            </div>
          </div>

          {/* Quick Location Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            <button
              type="button"
              onClick={() => handleSelectQuickLocation("Industrial Area, Antharasanahalli")}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low hover:bg-surface-container rounded-lg shrink-0 border border-outline-variant/30 text-xs text-on-surface"
            >
              <span className="material-symbols-outlined text-secondary text-[16px]">history</span>
              <span>Industrial Area</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectQuickLocation("Batawadi Bypass, NH-48")}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low hover:bg-surface-container rounded-lg shrink-0 border border-outline-variant/30 text-xs text-on-surface"
            >
              <span className="material-symbols-outlined text-secondary text-[16px]">warehouse</span>
              <span>Batawadi Bypass</span>
            </button>
          </div>

          {/* Primary Action Button */}
          <Button fullWidth size="lg" onClick={handleStartBooking} icon="local_shipping">
            Move Goods
          </Button>
        </div>

        {/* Live Logistics Assurance Stats */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-surface-container-lowest rounded-2xl p-3.5 border border-outline-variant/50 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-tertiary text-[20px]">verified_user</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] text-secondary truncate">Verified Fleet</span>
              <span className="text-[13px] font-bold text-on-surface">100% KYC Passed</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-3.5 border border-outline-variant/50 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] text-secondary truncate">Avg. Allocation</span>
              <span className="text-[13px] font-bold text-on-surface">Under 4 Mins</span>
            </div>
          </div>
        </div>

        {/* Recent Trips Section */}
        <div className="flex flex-col gap-2 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">
              Recent Trips
            </h2>
            <button
              onClick={() => navigate("/customer/trips")}
              className="font-label-md text-primary text-xs hover:underline"
            >
              View all
            </button>
          </div>

          {/* Recent Trip Card 1 */}
          <div
            onClick={() => navigate("/customer/active-trip")}
            className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/50 shadow-xs flex items-center justify-between gap-3 hover:bg-surface-container-low/50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface shrink-0">
                <span className="material-symbols-outlined text-[22px]">local_shipping</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-on-surface text-[14px] truncate">Tumakuru APMC</span>
                  <span className="material-symbols-outlined text-secondary text-[14px]">arrow_forward</span>
                  <span className="font-semibold text-on-surface text-[14px] truncate">Kunigal</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-secondary">
                  <span>Tata Ace</span>
                  <span>•</span>
                  <span>24 Oct, 14:15</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end shrink-0">
              <span className="font-headline-md text-[16px] font-bold text-on-surface">₹950</span>
              <span className="text-[10px] font-semibold text-tertiary bg-tertiary-container/20 px-2 py-0.5 rounded-full mt-0.5">
                On-Road
              </span>
            </div>
          </div>
        </div>
      </main>

      <MobileBottomNav />
    </div>
  );
};
