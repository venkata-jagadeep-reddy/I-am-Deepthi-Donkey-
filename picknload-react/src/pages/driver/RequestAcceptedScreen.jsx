import React from "react";
import { useNavigate } from "react-router-dom";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Button } from "../../components/common/Button";

export const RequestAcceptedScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Request Accepted" showLogo />

      <div className="flex flex-col items-center text-center my-auto py-6">
        <div className="w-16 h-16 rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary mb-4">
          <span
            className="material-symbols-outlined text-[36px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </div>

        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
          Request Accepted!
        </h2>
        <p className="font-body-md text-secondary mt-1">
          Trip ID: <span className="font-bold text-on-surface">#PNL-1042</span>
        </p>

        {/* Pickup Action Box */}
        <div className="w-full max-w-xs p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/40 mt-6 text-left">
          <p className="text-[11px] font-bold text-secondary uppercase">Pickup Destination</p>
          <p className="text-[15px] font-bold text-on-surface mt-1">APMC Yard, Gate 2, Tumakuru</p>
          <p className="text-xs text-secondary mt-0.5">Shop #14 (Onion & Potato Mandi)</p>
          <div className="mt-3 pt-3 border-t border-outline-variant/30 flex justify-between items-center text-xs">
            <span className="text-secondary">Distance to pickup:</span>
            <span className="font-bold text-tertiary">1.2 km (~4 mins)</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-6 pb-2">
        <Button
          fullWidth
          size="lg"
          onClick={() => navigate("/driver/going-to-pickup")}
          icon="navigation"
        >
          Navigate to Pickup Point
        </Button>
      </div>
    </div>
  );
};
