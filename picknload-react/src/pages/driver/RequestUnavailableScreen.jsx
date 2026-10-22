import React from "react";
import { useNavigate } from "react-router-dom";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Button } from "../../components/common/Button";

export const RequestUnavailableScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Request Unavailable" showBack onBack={() => navigate("/driver/requests")} />

      <div className="flex flex-col items-center text-center my-auto py-6">
        <div className="w-16 h-16 rounded-full bg-error-container/40 flex items-center justify-center text-error mb-4">
          <span className="material-symbols-outlined text-[36px]">timer_off</span>
        </div>

        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
          Request Unavailable
        </h2>
        <p className="font-body-md text-secondary mt-2 max-w-xs">
          Another nearby commercial driver accepted this transport request seconds before you.
        </p>

        <div className="w-full max-w-xs p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/40 mt-6 text-xs text-secondary text-left">
          💡 <strong className="text-on-surface">Pro-tip for drivers:</strong> Keep your app open and notifications active to grab high-paying APMC loads immediately.
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-6 pb-2">
        <Button
          fullWidth
          size="lg"
          onClick={() => navigate("/driver/requests")}
          icon="search"
        >
          View Other Nearby Loads
        </Button>
      </div>
    </div>
  );
};
