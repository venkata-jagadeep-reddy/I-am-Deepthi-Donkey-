import React from "react";
import { useNavigate } from "react-router-dom";
import { useDriverDuty } from "../../context/DriverDutyContext";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { MapPlaceholder } from "../../components/common/MapPlaceholder";
import { Button } from "../../components/common/Button";

export const GoingToPickupScreen = () => {
  const navigate = useNavigate();
  const { advanceTripStage, loading } = useDriverDuty();

  const handleArrived = async () => {
    // BACKEND PLACEHOLDER: PATCH /api/v1/driver/trips/:id/status { status: 'ARRIVED_PICKUP' }
    await advanceTripStage("GOODS_LOADED");
    navigate("/driver/goods-loaded");
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Going to Pickup" showBack={false} />

      <div className="flex flex-col gap-4 mt-2 pb-6">
        {/* GPS Map Route to Pickup */}
        <MapPlaceholder
          status="GOING_TO_PICKUP"
          eta="4 mins"
          driverName="Ravi Kumar (Tata Ace)"
          origin="Your Location (Bypass)"
          destination="APMC Yard Gate 2"
          className="h-56"
        />

        {/* Consignor Pickup Details Card */}
        <div className="p-4 rounded-2xl bg-white border border-outline-variant/60 shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-secondary uppercase">Consignor</span>
              <h3 className="font-bold text-[16px] text-on-surface mt-0.5">Keerthana M L</h3>
              <p className="text-xs text-secondary">Sri Balaji Agro Commodities</p>
            </div>

            <button
              type="button"
              onClick={() => alert("Calling Consignor: +91 98765 43210")}
              className="w-11 h-11 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-xs"
              title="Call Consignor"
            >
              <span className="material-symbols-outlined text-[22px]">call</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-surface-container-low/70 border border-outline-variant/30 flex items-start gap-2.5 text-xs">
            <span className="material-symbols-outlined text-[18px] text-tertiary shrink-0 mt-0.5">
              pin_drop
            </span>
            <div>
              <p className="font-bold text-on-surface">APMC Yard, Gate 2, Tumakuru</p>
              <p className="text-secondary mt-0.5">Shop #14 (Onion & Potato Section)</p>
            </div>
          </div>
        </div>

        {/* Cargo Summary Pill */}
        <div className="p-3 rounded-xl bg-surface-container-low/50 border border-outline-variant/30 flex justify-between items-center text-xs text-secondary">
          <span>Cargo: <strong>Vegetables (550 kg)</strong></span>
          <span className="font-bold text-on-surface text-[14px]">Fare: ₹950 (COD)</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-4 pb-2">
        <Button
          fullWidth
          size="lg"
          onClick={handleArrived}
          loading={loading}
          icon="storefront"
        >
          Arrived at Pickup Gate
        </Button>
      </div>
    </div>
  );
};
