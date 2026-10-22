import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrip } from "../../context/TripContext";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Button } from "../../components/common/Button";
import { VEHICLE_TIERS } from "../../mock/mockData";

export const CreateRequestScreen = () => {
  const navigate = useNavigate();
  const { draftTrip, updateDraft } = useTrip();

  const [pickup, setPickup] = useState(draftTrip.pickup || "APMC Yard, Gate 2, Tumakuru");
  const [drop, setDrop] = useState(draftTrip.drop || "Kunigal Town Market");
  const [cargoType, setCargoType] = useState(draftTrip.cargoType || "Vegetables");
  const [weightKg, setWeightKg] = useState(draftTrip.weightKg || 550);
  const [selectedVehicle, setSelectedVehicle] = useState(draftTrip.vehicleTierId || "tata_ace");

  const cargoChips = ["Vegetables", "Furniture", "Grains", "Boxes", "Hardware", "Cement"];

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle.id);
    const approxKm = 38;
    const estFare = vehicle.baseFare + approxKm * vehicle.perKm;
    updateDraft({
      vehicleTierId: vehicle.id,
      vehicleName: vehicle.name,
      estimatedFare: estFare,
    });
  };

  const handleContinue = (e) => {
    e.preventDefault();
    const vehicle = VEHICLE_TIERS.find((v) => v.id === selectedVehicle) || VEHICLE_TIERS[0];
    const approxKm = 38;
    const estFare = vehicle.baseFare + approxKm * vehicle.perKm;

    updateDraft({
      pickup,
      drop,
      cargoType,
      weightKg: Number(weightKg),
      vehicleTierId: selectedVehicle,
      vehicleName: vehicle.name,
      distanceKm: approxKm,
      estimatedFare: estFare,
    });

    navigate("/customer/review-request");
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Create Request" showBack />

      <form onSubmit={handleContinue} className="flex flex-col gap-4 mt-2 pb-6">
        {/* 1. Route Section */}
        <div className="flex flex-col gap-2">
          <label className="font-label-sm text-secondary font-medium">Pickup & Drop Locations</label>
          <div className="bg-surface-container-lowest rounded-2xl p-3 border border-outline-variant/60 shadow-xs flex flex-col gap-2">
            {/* Pickup */}
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary shrink-0"></span>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Enter pickup address"
                className="w-full text-[14px] font-semibold text-on-surface bg-transparent focus:outline-none"
                required
              />
            </div>

            <div className="flex items-center pl-1 py-0.5">
              <div className="w-[1.5px] h-3 bg-outline-variant rounded-full"></div>
            </div>

            {/* Drop */}
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-error text-[18px] shrink-0">location_on</span>
              <input
                type="text"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                placeholder="Enter delivery destination"
                className="w-full text-[14px] font-semibold text-on-surface bg-transparent focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-1 text-xs text-secondary">
            <span className="material-symbols-outlined text-[16px]">straighten</span>
            <span>Approx. 38 km intra-city route</span>
          </div>
        </div>

        {/* 2. Cargo Type Section */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-sm text-secondary font-medium">What are you moving?</label>
          <input
            type="text"
            value={cargoType}
            onChange={(e) => setCargoType(e.target.value)}
            placeholder="e.g. Vegetables, furniture, cement bags"
            className="w-full min-h-[50px] px-4 rounded-xl bg-surface-container-lowest text-on-surface text-[14px] border border-outline-variant/60 shadow-xs focus:outline-none focus:border-primary-container"
            required
          />

          {/* Quick-pick chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            {cargoChips.map((chip) => {
              const isSelected = cargoType.toLowerCase() === chip.toLowerCase();
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setCargoType(chip)}
                  className={`
                    px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-colors border
                    ${
                      isSelected
                        ? "bg-primary-container text-on-primary-container border-primary-container font-semibold"
                        : "bg-surface-container-lowest text-on-surface border-outline-variant/60 hover:bg-surface-container-low"
                    }
                  `}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Weight Input */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-sm text-secondary font-medium">Approximate weight</label>
          <div className="relative flex items-center">
            <input
              type="number"
              inputMode="numeric"
              placeholder="e.g. 550"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              className="w-full min-h-[50px] pl-4 pr-12 rounded-xl bg-surface-container-lowest text-on-surface text-[15px] font-semibold border border-outline-variant/60 shadow-xs focus:outline-none focus:border-primary-container"
              required
            />
            <span className="absolute right-4 text-xs font-bold text-secondary">kg</span>
          </div>
        </div>

        {/* 4. Vehicle Selection Grid */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="font-label-sm text-secondary font-medium">Select Vehicle *</label>
            <span className="text-[11px] text-secondary">Capacity guide</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {VEHICLE_TIERS.map((v) => {
              const isSelected = selectedVehicle === v.id;
              const approxKm = 38;
              const fare = v.baseFare + approxKm * v.perKm;

              return (
                <div
                  key={v.id}
                  onClick={() => handleSelectVehicle(v)}
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
                      <h4 className="font-bold text-[14px] text-on-surface">{v.name}</h4>
                      <p className="text-[11px] text-secondary">Max {v.capacity} • {v.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="font-bold text-[15px] text-on-surface">₹{fare}</span>
                    <span className="text-[10px] text-secondary">Est. Fare</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </form>

      <div className="flex flex-col gap-3 pt-4 pb-2">
        <Button fullWidth size="lg" onClick={handleContinue} icon="arrow_forward">
          Review Request Details
        </Button>
      </div>
    </div>
  );
};
