import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDriverDuty } from "../../context/DriverDutyContext";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Button } from "../../components/common/Button";

export const GoodsLoadedScreen = () => {
  const navigate = useNavigate();
  const { advanceTripStage, loading } = useDriverDuty();
  const [pin, setPin] = useState("");
  const [checkedItems, setCheckedItems] = useState({
    goodsCount: true,
    cargoSecured: true,
  });
  const [error, setError] = useState("");

  const handleConfirmLoaded = async (e) => {
    e.preventDefault();
    if (pin !== "4829" && pin !== "1234") {
      setError("Invalid Consignor PIN. Ask consignor Keerthana for the 4-digit start code.");
      return;
    }

    // BACKEND PLACEHOLDER: PATCH /api/v1/driver/trips/:id/status { status: 'GOODS_LOADED', pin }
    await advanceTripStage("IN_TRANSIT");
    navigate("/driver/in-transit");
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Goods Loading" showBack={false} />

      <form onSubmit={handleConfirmLoaded} className="flex flex-col gap-4 mt-2 pb-6">
        <div>
          <span className="font-label-sm text-secondary">Trip #PNL-1042</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1">
            Verify & load goods
          </h2>
          <p className="font-body-md text-secondary mt-1">
            Check the freight items with consignor Keerthana and collect the 4-digit start PIN.
          </p>
        </div>

        {/* Consignor Start PIN Input */}
        <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/60 flex flex-col gap-2">
          <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
            Consignor Start PIN *
          </label>
          <input
            type="tel"
            inputMode="numeric"
            maxLength={4}
            placeholder="e.g. 4829"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value.replace(/\D/g, ""));
              if (error) setError("");
            }}
            className="w-full h-14 text-center font-headline-xl text-[26px] tracking-widest font-bold rounded-xl bg-white border border-outline-variant/60 shadow-xs focus:outline-none focus:border-primary-container"
            required
          />
          <p className="text-[11px] text-secondary text-center">
            💡 Consignor screen displays this code: <strong>4829</strong>
          </p>

          {error && (
            <p className="text-xs text-error font-medium flex items-center gap-1 justify-center mt-1">
              <span className="material-symbols-outlined text-[16px]">error</span>
              {error}
            </p>
          )}
        </div>

        {/* Loading Checklist */}
        <div className="p-4 rounded-2xl bg-white border border-outline-variant/60 shadow-xs flex flex-col gap-3">
          <p className="text-xs font-bold text-on-surface uppercase border-b border-outline-variant/30 pb-2">
            Loading Checklist
          </p>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={checkedItems.goodsCount}
              onChange={(e) => setCheckedItems({ ...checkedItems, goodsCount: e.target.checked })}
              className="w-5 h-5 rounded text-primary focus:ring-primary-container"
            />
            <span className="text-[13px] text-on-surface">
              28 crates of vegetables (approx 550 kg) loaded
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={checkedItems.cargoSecured}
              onChange={(e) => setCheckedItems({ ...checkedItems, cargoSecured: e.target.checked })}
              className="w-5 h-5 rounded text-primary focus:ring-primary-container"
            />
            <span className="text-[13px] text-on-surface">
              Cargo securely tied with tarpaulin & ropes
            </span>
          </label>
        </div>
      </form>

      <div className="flex flex-col gap-3 pt-4 pb-2">
        <Button
          fullWidth
          size="lg"
          onClick={handleConfirmLoaded}
          loading={loading}
          disabled={pin.length !== 4 || !checkedItems.goodsCount || !checkedItems.cargoSecured}
          icon="local_shipping"
        >
          Confirm Goods Loaded & Depart
        </Button>
      </div>
    </div>
  );
};
