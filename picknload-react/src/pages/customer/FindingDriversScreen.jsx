import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTrip } from "../../context/TripContext";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Button } from "../../components/common/Button";

export const FindingDriversScreen = () => {
  const navigate = useNavigate();
  const { cancelActiveTrip } = useTrip();
  const [secondsLeft, setSecondsLeft] = useState(28);

  useEffect(() => {
    // BACKEND PLACEHOLDER: Connect to WebSocket or Polling: GET /api/v1/trips/:id/bids
    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timer);
          navigate("/customer/drivers-responding");
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Finding Drivers" showBack onBack={() => navigate("/customer/home")} />

      <div className="flex flex-col items-center text-center my-auto py-6">
        {/* Animated Sonar Radar Circle */}
        <div className="relative flex items-center justify-center my-8">
          <div className="w-48 h-48 rounded-full bg-primary-container/10 animate-ping absolute"></div>
          <div className="w-36 h-36 rounded-full bg-primary-container/20 animate-pulse absolute"></div>
          <div className="relative w-24 h-24 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shadow-lg">
            <span className="material-symbols-outlined text-[44px]">local_shipping</span>
          </div>
        </div>

        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
          Finding nearby drivers...
        </h2>
        <p className="font-body-md text-secondary mt-2 max-w-xs">
          Broadcasting your consignment to commercial drivers within a 5 km radius of Tumakuru APMC.
        </p>

        {/* Status card */}
        <div className="flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-surface-container-low border border-outline-variant/40 text-xs">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
          <span className="font-medium text-on-surface">3 drivers notified • Auto-allocating in {secondsLeft}s</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-6 pb-2">
        <Button
          fullWidth
          size="lg"
          onClick={() => navigate("/customer/drivers-responding")}
          icon="visibility"
        >
          View Responding Drivers (3)
        </Button>
        <Button
          fullWidth
          size="md"
          variant="ghost"
          onClick={() => {
            cancelActiveTrip();
            navigate("/customer/home");
          }}
        >
          Cancel Request
        </Button>
      </div>
    </div>
  );
};
