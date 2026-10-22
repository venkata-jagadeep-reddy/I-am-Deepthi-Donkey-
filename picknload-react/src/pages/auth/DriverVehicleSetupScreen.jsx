import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { VEHICLE_TIERS } from "../../mock/mockData";
import { driverApi } from "../../api/driverApi";

export const DriverVehicleSetupScreen = () => {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState("tata_ace");
  const [plateNumber, setPlateNumber] = useState("KA06AB1234");
  const [vehicleModel, setVehicleModel] = useState("Tata Ace Gold");
  const [payloadKg, setPayloadKg] = useState(750);
  const [lengthFeet, setLengthFeet] = useState(7);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNext = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // TESTED ROUTE: POST /api/vehicles
      await driverApi.addVehicle({
        vehicleType: selectedTier === "tata_ace" ? "tata-ace" : selectedTier,
        model: vehicleModel,
        registrationNumber: plateNumber,
        payloadCapacityKg: Number(payloadKg),
        lengthFeet: Number(lengthFeet),
      });

      navigate("/driver/docs-setup");
    } catch (err) {
      setError(err.message || "Failed to add vehicle. Check registration details.");
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
            Registered via <code>POST /api/vehicles</code> with RC number and payload specifications.
          </p>
        </div>

        {/* Vehicle Selection Grid */}
        <div className="flex flex-col gap-2 mt-1">
          <label className="font-label-sm text-secondary font-medium">Select Vehicle Category *</label>
          <div className="grid grid-cols-1 gap-2.5">
            {VEHICLE_TIERS.map((v) => {
              const isSelected = selectedTier === v.id;
              return (
                <div
                  key={v.id}
                  onClick={() => {
                    setSelectedTier(v.id);
                    if (v.id === "tata_ace") {
                      setVehicleModel("Tata Ace Gold");
                      setPayloadKg(750);
                      setLengthFeet(7);
                    } else if (v.id === "pickup_8ft") {
                      setVehicleModel("Bolero Maxi Truck");
                      setPayloadKg(1250);
                      setLengthFeet(8);
                    } else {
                      setVehicleModel("Piaggio Ape Extra");
                      setPayloadKg(500);
                      setLengthFeet(5.5);
                    }
                  }}
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
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected ? "bg-primary-container text-on-primary-container" : "bg-surface-container text-secondary"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[22px]">{v.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[14px] text-on-surface">
                        {v.name} <span className="text-secondary font-normal text-xs">({v.subtitle})</span>
                      </h4>
                      <p className="text-[11px] text-secondary">
                        Payload: <strong>{v.capacity}</strong> • {v.dimensions}
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

        {/* Inputs */}
        <div className="flex flex-col gap-3">
          <Input
            label="Registration Number (RC Plate) *"
            placeholder="e.g. KA06AB1234"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
            leadingIcon="badge"
            required
          />

          <Input
            label="Vehicle Model *"
            placeholder="e.g. Tata Ace Gold"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            leadingIcon="directions_car"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Payload Capacity (kg) *"
              type="number"
              value={payloadKg}
              onChange={(e) => setPayloadKg(e.target.value)}
              required
            />
            <Input
              label="Cargo Length (feet) *"
              type="number"
              value={lengthFeet}
              onChange={(e) => setLengthFeet(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-error-container/40 border border-error/30 text-on-error-container text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-error">error</span>
              <span>{error}</span>
            </div>
          )}
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
          Save Vehicle & Continue
        </Button>
      </div>
    </div>
  );
};
