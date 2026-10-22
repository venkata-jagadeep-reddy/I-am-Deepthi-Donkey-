import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDriverDuty } from "../../context/DriverDutyContext";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Button } from "../../components/common/Button";

export const MarkDeliveredScreen = () => {
  const navigate = useNavigate();
  const { completeTrip, loading } = useDriverDuty();
  const [deliveryCode, setDeliveryCode] = useState("");
  const [cashCollected, setCashCollected] = useState(true);
  const [goodsHandedOver, setGoodsHandedOver] = useState(true);
  const [error, setError] = useState("");

  const handleComplete = async (e) => {
    e.preventDefault();
    if (deliveryCode !== "4829" && deliveryCode !== "1234") {
      setError("Invalid delivery code. Ask receiver Venkatesh for the 4-digit drop OTP.");
      return;
    }

    try {
      // BACKEND PLACEHOLDER: POST /api/v1/driver/trips/:id/verify-delivery { otp, cashCollected }
      await completeTrip(deliveryCode);
      navigate("/driver/trip-completed");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Mark Delivered" showBack={false} />

      <form onSubmit={handleComplete} className="flex flex-col gap-4 mt-2 pb-6">
        <div>
          <span className="font-label-sm text-secondary">Trip #PNL-1042</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1">
            Complete Delivery
          </h2>
          <p className="font-body-md text-secondary mt-1">
            Unload crates and collect the 4-digit delivery verification code from the receiver.
          </p>
        </div>

        {/* Delivery Code Input */}
        <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/60 flex flex-col gap-2">
          <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
            Consignee Delivery Code *
          </label>
          <input
            type="tel"
            inputMode="numeric"
            maxLength={4}
            placeholder="e.g. 4829"
            value={deliveryCode}
            onChange={(e) => {
              setDeliveryCode(e.target.value.replace(/\D/g, ""));
              if (error) setError("");
            }}
            className="w-full h-14 text-center font-headline-xl text-[26px] tracking-widest font-bold rounded-xl bg-white border border-outline-variant/60 shadow-xs focus:outline-none focus:border-primary-container"
            required
          />
          <p className="text-[11px] text-secondary text-center">
            💡 Consignee SMS OTP: <strong>4829</strong>
          </p>

          {error && (
            <p className="text-xs text-error font-medium flex items-center gap-1 justify-center mt-1">
              <span className="material-symbols-outlined text-[16px]">error</span>
              {error}
            </p>
          )}
        </div>

        {/* COD Cash Collection Box */}
        <div className="p-4 rounded-2xl bg-white border-2 border-primary-container shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-secondary uppercase">Collect from Receiver</span>
            <p className="text-[22px] font-bold text-on-surface font-headline-lg">₹950</p>
            <span className="text-xs text-secondary">Cash on Delivery</span>
          </div>

          <label className="flex items-center gap-2 cursor-pointer bg-primary-container/20 px-3 py-1.5 rounded-xl border border-primary-container/40">
            <input
              type="checkbox"
              checked={cashCollected}
              onChange={(e) => setCashCollected(e.target.checked)}
              className="w-4 h-4 text-primary rounded"
            />
            <span className="text-xs font-bold text-on-surface">Cash Collected</span>
          </label>
        </div>

        {/* Unloading confirmation */}
        <label className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={goodsHandedOver}
            onChange={(e) => setGoodsHandedOver(e.target.checked)}
            className="w-4 h-4 rounded text-primary"
          />
          <span className="text-xs text-on-surface font-medium">
            All 28 crates unloaded in good condition and handed over to receiver.
          </span>
        </label>
      </form>

      <div className="flex flex-col gap-3 pt-4 pb-2">
        <Button
          fullWidth
          size="lg"
          onClick={handleComplete}
          loading={loading}
          disabled={deliveryCode.length !== 4 || !cashCollected || !goodsHandedOver}
          icon="task_alt"
        >
          Verify Code & Complete Trip
        </Button>
      </div>
    </div>
  );
};
