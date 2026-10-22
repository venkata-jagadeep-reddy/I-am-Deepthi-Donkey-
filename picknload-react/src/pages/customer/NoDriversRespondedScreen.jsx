import React from "react";
import { useNavigate } from "react-router-dom";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Button } from "../../components/common/Button";

export const NoDriversRespondedScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="No Drivers Responded" showBack onBack={() => navigate("/customer/home")} />

      <div className="flex flex-col items-center text-center my-auto py-6">
        <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center text-secondary mb-6 border border-outline-variant/40">
          <span className="material-symbols-outlined text-[40px]">person_off</span>
        </div>

        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
          No drivers responded
        </h2>
        <p className="font-body-md text-secondary mt-2 max-w-xs">
          All commercial vehicles in Tumakuru APMC are currently busy with ongoing dispatches.
        </p>

        {/* Action recommendations */}
        <div className="w-full max-w-xs p-4 rounded-2xl bg-surface-container-low/60 border border-outline-variant/40 mt-6 flex flex-col gap-3 text-left">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[20px]">trending_up</span>
            <div className="text-xs">
              <p className="font-semibold text-on-surface">Boost Fare by ₹50</p>
              <p className="text-secondary">Higher fares get prioritized by drivers</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary text-[20px]">radar</span>
            <div className="text-xs">
              <p className="font-semibold text-on-surface">Expand Search Radius</p>
              <p className="text-secondary">Search drivers up to 10 km away</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-6 pb-2">
        <Button
          fullWidth
          size="lg"
          onClick={() => navigate("/customer/finding-drivers")}
          icon="add_circle"
        >
          Boost Fare (+₹50) & Retry
        </Button>
        <Button
          fullWidth
          size="md"
          variant="secondary"
          onClick={() => navigate("/customer/home")}
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};
