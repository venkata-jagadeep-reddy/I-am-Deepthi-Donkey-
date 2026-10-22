import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrip } from "../../context/TripContext";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { MapPlaceholder } from "../../components/common/MapPlaceholder";
import { Button } from "../../components/common/Button";

export const ActiveTripScreen = () => {
  const navigate = useNavigate();
  const { activeTrip } = useTrip();
  const [tripStage, setTripStage] = useState("IN_TRANSIT"); // "GOING_TO_PICKUP", "GOODS_LOADED", "IN_TRANSIT", "DELIVERED"

  const driver = activeTrip?.driver || {
    name: "Ravi Kumar",
    phone: "+91 94481 23456",
    plateNumber: "KA-06-XX-1234",
    vehicleModel: "Tata Ace",
    rating: 4.85,
    etaMins: 18,
  };

  const handleSimulateDelivery = () => {
    navigate("/customer/trip-rating");
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader
        title="Active Trip #PNL-1042"
        showBack
        onBack={() => navigate("/customer/home")}
      />

      <div className="flex flex-col gap-4 mt-2 pb-6">
        {/* Live GPS Map Container */}
        <MapPlaceholder
          status={tripStage}
          eta="18 mins"
          driverName={driver.name}
          origin="APMC Yard, Tumakuru"
          destination="Kunigal Market"
          className="h-56"
        />

        {/* Live Stage Stepper */}
        <div className="p-4 rounded-2xl bg-surface-container-low/60 border border-outline-variant/40 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold text-tertiary">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Assigned</span>
          </div>
          <div className="h-0.5 w-6 bg-tertiary"></div>
          <div className="flex items-center gap-1.5 font-bold text-tertiary">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Loaded</span>
          </div>
          <div className="h-0.5 w-6 bg-primary-container"></div>
          <div className="flex items-center gap-1.5 font-bold text-on-surface">
            <span className="material-symbols-outlined text-[18px] text-primary animate-pulse">
              local_shipping
            </span>
            <span>On-Road</span>
          </div>
          <div className="h-0.5 w-6 bg-outline-variant/60"></div>
          <div className="flex items-center gap-1 text-secondary">
            <span className="material-symbols-outlined text-[18px]">sports_score</span>
            <span>Drop</span>
          </div>
        </div>

        {/* Assigned Driver Card */}
        <div className="p-4 rounded-2xl bg-white border border-outline-variant/60 shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center font-bold text-on-surface">
                <span className="material-symbols-outlined text-[28px]">local_shipping</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-[15px] text-on-surface">{driver.name}</h4>
                  <span className="text-xs bg-tertiary-container/30 text-tertiary px-1.5 py-0.2 rounded font-semibold">
                    Verified
                  </span>
                </div>
                <p className="text-[12px] text-secondary mt-0.5">
                  {driver.vehicleModel} • <strong className="text-on-surface">{driver.plateNumber}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert(`Calling driver ${driver.name}: ${driver.phone}`)}
                className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-xs"
                title="Call Driver"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
              </button>
              <button
                type="button"
                onClick={() => alert(`Opening chat with driver ${driver.name}`)}
                className="w-10 h-10 rounded-full bg-surface-container-low text-secondary flex items-center justify-center border border-outline-variant/40"
                title="Message Driver"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </button>
            </div>
          </div>

          {/* Consignor Start PIN */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low/70 border border-outline-variant/30 text-xs">
            <span className="text-secondary">Security Delivery OTP:</span>
            <span className="font-bold text-primary text-[15px] tracking-wider">
              {activeTrip?.otp || "4829"}
            </span>
          </div>
        </div>

        {/* Route Details Card */}
        <div className="p-4 rounded-2xl bg-white border border-outline-variant/60 shadow-xs flex flex-col gap-2.5 text-xs">
          <div className="flex items-center justify-between text-secondary">
            <span>Cargo: <strong>Vegetables (550 kg)</strong></span>
            <span>Total: <strong>₹950 (COD)</strong></span>
          </div>
          <div className="pt-2 border-t border-outline-variant/30 flex items-center gap-2 text-secondary">
            <span className="material-symbols-outlined text-[16px] text-error">location_on</span>
            <span className="truncate">Dropping at: <strong>Kunigal Town Market, B.M. Road</strong></span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-2 pb-2">
        <Button
          fullWidth
          size="lg"
          onClick={handleSimulateDelivery}
          icon="task_alt"
        >
          Simulate Trip Delivered
        </Button>
      </div>
    </div>
  );
};
