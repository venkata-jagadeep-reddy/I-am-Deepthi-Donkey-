import React from "react";
import { useNavigate } from "react-router-dom";
import { useTrip } from "../../context/TripContext";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Button } from "../../components/common/Button";

export const BookingConfirmedScreen = () => {
  const navigate = useNavigate();
  const { activeTrip } = useTrip();

  const driver = activeTrip?.driver || {
    name: "Ravi Kumar",
    phone: "+91 94481 23456",
    plateNumber: "KA-06-XX-1234",
    vehicleModel: "Tata Ace",
    rating: 4.85,
    etaMins: 4,
  };

  const otp = activeTrip?.otp || "4829";

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Booking Confirmed" showLogo />

      <div className="flex flex-col items-center text-center my-auto py-4">
        {/* Success Icon */}
        <div className="relative flex items-center justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary">
            <span
              className="material-symbols-outlined text-[36px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>
        </div>

        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
          Booking Confirmed!
        </h2>
        <p className="font-body-md text-secondary mt-1">
          Trip ID: <span className="font-bold text-on-surface">#PNL-1042</span>
        </p>

        {/* Start PIN Box */}
        <div className="w-full max-w-xs p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/40 mt-5 flex flex-col items-center">
          <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">
            Consignment Start PIN
          </span>
          <span className="text-[32px] font-bold text-primary tracking-widest font-headline-xl my-1">
            {otp}
          </span>
          <p className="text-[11px] text-secondary text-center">
            Share this 4-digit PIN with driver <strong className="text-on-surface">{driver.name}</strong> after goods are loaded.
          </p>
        </div>

        {/* Assigned Driver Card */}
        <div className="w-full max-w-xs p-4 rounded-2xl bg-white border border-outline-variant/60 shadow-xs mt-4 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center font-bold text-on-surface">
                <span className="material-symbols-outlined text-[24px]">local_shipping</span>
              </div>
              <div>
                <p className="text-[14px] font-bold text-on-surface">{driver.name}</p>
                <p className="text-[12px] text-secondary">{driver.vehicleModel} • {driver.plateNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-0.5 text-xs font-bold text-amber-500">
              <span className="material-symbols-outlined text-[14px]">star</span>
              <span>{driver.rating}</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-xs">
            <span className="text-secondary">Driver arriving at pickup in</span>
            <span className="font-bold text-tertiary">~{driver.etaMins} mins</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-6 pb-2">
        <Button
          fullWidth
          size="lg"
          onClick={() => navigate("/customer/active-trip")}
          icon="navigation"
        >
          Track Live Trip
        </Button>
      </div>
    </div>
  );
};
