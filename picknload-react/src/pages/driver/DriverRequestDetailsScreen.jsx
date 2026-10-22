import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDriverDuty } from "../../context/DriverDutyContext";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Button } from "../../components/common/Button";

export const DriverRequestDetailsScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reqId = searchParams.get("id") || "REQ-7821";
  const { acceptRequest, loading } = useDriverDuty();
  const [simulateRaceCondition, setSimulateRaceCondition] = useState(false);

  const handleAccept = async () => {
    if (simulateRaceCondition) {
      navigate("/driver/request-unavailable");
      return;
    }

    try {
      // BACKEND PLACEHOLDER: POST /api/v1/driver/requests/:id/accept
      await acceptRequest(reqId);
      navigate("/driver/request-accepted");
    } catch (err) {
      navigate("/driver/request-unavailable");
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Request Details" showBack />

      <div className="flex flex-col gap-4 mt-2 pb-6">
        {/* Top Fare Pill */}
        <div className="p-4 rounded-2xl bg-surface-container-low/80 border border-outline-variant/60 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-secondary uppercase">Estimated Payout</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-[26px] font-bold text-on-surface font-headline-xl">₹950</span>
              <span className="text-xs text-secondary">Net after platform fee</span>
            </div>
          </div>
          <span className="text-xs font-bold text-tertiary bg-tertiary-container/30 px-3 py-1 rounded-full">
            Instant Pay
          </span>
        </div>

        {/* Route Details Card */}
        <div className="p-4 rounded-2xl bg-white border border-outline-variant/60 shadow-xs flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary mt-1.5 shrink-0"></span>
            <div>
              <p className="text-[11px] font-semibold text-secondary uppercase">Pickup (1.2 km away)</p>
              <p className="text-[14px] font-bold text-on-surface">APMC Yard, Gate 2, Tumakuru</p>
              <p className="text-xs text-secondary mt-0.5">Shop #14, Onion & Potato Yard</p>
            </div>
          </div>

          <div className="flex items-center pl-1">
            <div className="w-[1.5px] h-3 bg-outline-variant rounded-full"></div>
          </div>

          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-error text-[18px] shrink-0 mt-0.5">location_on</span>
            <div>
              <p className="text-[11px] font-semibold text-secondary uppercase">Drop (38 km)</p>
              <p className="text-[14px] font-bold text-on-surface">Kunigal Town Market</p>
              <p className="text-xs text-secondary mt-0.5">B.M. Road, Near Bus Stand</p>
            </div>
          </div>
        </div>

        {/* Cargo Manifest Card */}
        <div className="p-4 rounded-2xl bg-white border border-outline-variant/60 shadow-xs flex flex-col gap-2.5 text-xs">
          <p className="font-bold text-on-surface text-[13px] border-b border-outline-variant/30 pb-2">
            Cargo Manifest
          </p>
          <div className="flex justify-between text-secondary">
            <span>Commodity Type</span>
            <strong className="text-on-surface">Vegetables (Fresh Crates)</strong>
          </div>
          <div className="flex justify-between text-secondary">
            <span>Weight / Units</span>
            <strong className="text-on-surface">550 kg (~28 crates)</strong>
          </div>
          <div className="flex justify-between text-secondary">
            <span>Vehicle Required</span>
            <strong className="text-on-surface">Tata Ace / 8ft Pickup</strong>
          </div>
          <div className="flex justify-between text-secondary">
            <span>Consignor</span>
            <strong className="text-on-surface">Sri Balaji Agro (Keerthana)</strong>
          </div>
          <div className="pt-2 border-t border-outline-variant/30 text-secondary">
            <span>Note: <strong>Loading assistance available at gate.</strong></span>
          </div>
        </div>

        {/* Development simulator toggle for race condition */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs">
          <span className="text-secondary">Simulate "Already Taken" State:</span>
          <input
            type="checkbox"
            checked={simulateRaceCondition}
            onChange={(e) => setSimulateRaceCondition(e.target.checked)}
            className="w-4 h-4 text-primary rounded"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2.5 pt-2 pb-2">
        <Button
          fullWidth
          size="lg"
          onClick={handleAccept}
          loading={loading}
          icon="check_circle"
        >
          Accept Request (₹950)
        </Button>
        <Button
          fullWidth
          size="md"
          variant="secondary"
          onClick={() => navigate("/driver/requests")}
        >
          Decline & Back
        </Button>
      </div>
    </div>
  );
};
