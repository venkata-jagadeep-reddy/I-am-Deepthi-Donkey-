import React from "react";
import { useNavigate } from "react-router-dom";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Button } from "../../components/common/Button";

export const DriverTripCompletedScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Trip Summary" showLogo />

      <div className="flex flex-col items-center text-center my-auto py-6">
        <div className="w-16 h-16 rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary mb-3">
          <span
            className="material-symbols-outlined text-[36px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </div>

        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
          Trip Completed!
        </h2>
        <p className="font-body-md text-secondary mt-1">
          Trip ID: <span className="font-bold text-on-surface">#PNL-1042</span>
        </p>

        {/* Earnings Card */}
        <div className="w-full max-w-xs p-5 rounded-2xl bg-surface-container-low/70 border border-outline-variant/40 mt-6 flex flex-col items-center">
          <span className="text-[11px] font-bold text-secondary uppercase">You Earned</span>
          <span className="text-[36px] font-bold text-tertiary tracking-tight font-headline-xl my-1">
            +₹950
          </span>
          <span className="text-xs text-secondary font-medium">Added to today's payout wallet</span>
        </div>

        {/* Trip Stats */}
        <div className="w-full max-w-xs grid grid-cols-2 gap-3 mt-4 text-left">
          <div className="p-3 bg-white rounded-xl border border-outline-variant/50">
            <span className="text-[11px] text-secondary">Distance Driven</span>
            <p className="font-bold text-[15px] text-on-surface mt-0.5">38 km</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-outline-variant/50">
            <span className="text-[11px] text-secondary">Trip Duration</span>
            <p className="font-bold text-[15px] text-on-surface mt-0.5">1h 05m</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-6 pb-2">
        <Button
          fullWidth
          size="lg"
          onClick={() => navigate("/driver/home")}
          icon="speed"
        >
          Return to Online Duty
        </Button>
      </div>
    </div>
  );
};
