import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { VEHICLE_TIERS } from "../../mock/mockData";
import { authApi } from "../../api/authApi";

export const DriverVehicleSetupScreen = () => {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState("tata_ace");
  const [plateNumber, setPlateNumber] = useState("KA-06-XX-1234");
  const [vehicleModel, setVehicleModel] = useState("Tata Ace Gold Diesel");
  const [loading, setLoading] = useState(false);

  const handleNext = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // BACKEND PLACEHOLDER: POST /api/v1/drivers/vehicle
      await authApi.setupDriverVehicle({
        vehicleTier: selectedTier,
        plateNumber,
        vehicleModel,
      });
      navigate("/driver/docs-setup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Vehicle Details" showBack />

      <form onSubmit={handleNext} className="flex flex-col gap-4 mt-2">
        <div>
          <span className="font-label-sm text-secondary">Step 1 of 2</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1">
            Add your vehicle
          </h2>
          <p className="font-body-md text-secondary mt-1">
            Select your commercial transport category and enter registration details.
          </p>
        </div>

        {/* Vehicle Selection Grid */}
        <div className="flex flex-col gap-2 mt-2">
          <label className="font-label-sm text-secondary font-medium">Select Vehicle Category *</label>
          <div className="grid grid-cols-1 gap-2.5">
            {VEHICLE_TIERS.map((v) => {
              const isSelected = selectedTier === v.id;
              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedTier(v.id)}
                  className={`
                    p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between
                    ${
                      isSelected
                        ? "border-primary-container bg-surface-container-low/40 shadow-sm"
                        : "border-outline-variant/50 bg-white hover:border-outline-variant"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        isSelected ? "bg-primary-container text-on-primary-container" : "bg-surface-container text-secondary"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[24px]">{v.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-headline-md text-[15px] font-bold text-on-surface">
                        {v.name} <span className="text-secondary font-normal text-xs">({v.subtitle})</span>
                      </h4>
                      <p className="text-[12px] text-secondary">
                        Capacity: <strong>{v.capacity}</strong> • {v.dimensions}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? "border-primary-container bg-primary-container" : "border-outline-variant"
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-slate-900" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Plate number & Model */}
        <div className="flex flex-col gap-3 mt-1">
          <Input
            label="Vehicle Registration Number (RC Plate) *"
            placeholder="e.g. KA-06-XX-1234"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
            leadingIcon="badge"
            helperText="State transport commercial permit number"
            required
          />

          <Input
            label="Vehicle Model / Make"
            placeholder="e.g. Tata Ace Gold / Mahindra Bolero Maxx"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            leadingIcon="directions_car"
          />
        </div>
      </form>

      <div className="flex flex-col gap-3 pt-6 pb-2">
        <Button
          fullWidth
          size="lg"
          onClick={handleNext}
          loading={loading}
          disabled={!plateNumber.trim()}
          icon="arrow_forward"
        >
          Next: Upload Documents
        </Button>
      </div>
    </div>
  );
};
