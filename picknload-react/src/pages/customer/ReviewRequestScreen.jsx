import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrip } from "../../context/TripContext";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Button } from "../../components/common/Button";
import { tripsApi } from "../../api/tripsApi";

export const ReviewRequestScreen = () => {
  const navigate = useNavigate();
  const { draftTrip, setActiveTrip } = useTrip();
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fareTotal = draftTrip.estimatedFare || 950;
  const baseFare = 350;
  const distanceFare = fareTotal - baseFare;

  const handleConfirmBooking = async () => {
    setLoading(true);
    setError("");

    try {
      // TESTED ROUTE: POST /api/bookings
      const res = await tripsApi.createRequest({
        pickup: draftTrip.pickup || "Tumkur Market",
        pickupCity: "Tumkur",
        drop: draftTrip.drop || "KR Market",
        dropCity: "Bengaluru",
        cargoType: draftTrip.cargoType || "Vegetable boxes",
        weightKg: draftTrip.weightKg || 500,
        vehicleTierId: draftTrip.vehicleTierId || "tata-ace",
      });

      if (res?.data?._id) {
        setActiveTrip((prev) => ({
          ...prev,
          id: res.data._id,
          status: res.data.status || "SEARCHING",
          vehicleType: res.data.vehicleType,
        }));
      }

      navigate("/customer/finding-drivers");
    } catch (err) {
      setError(err.message || "Failed to create booking. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Review Request" showBack />

      <div className="flex flex-col gap-4 mt-2 pb-6">
        <div>
          <span className="font-label-sm text-secondary">POST /api/bookings</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1">
            Review your request
          </h2>
        </div>

        {/* Route Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/60 shadow-xs flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary mt-1.5 shrink-0"></span>
            <div>
              <p className="text-[11px] font-semibold text-secondary uppercase">Pickup Location</p>
              <p className="text-[14px] font-bold text-on-surface">{draftTrip.pickup || "Tumkur Market"}</p>
            </div>
          </div>

          <div className="flex items-center pl-1">
            <div className="w-[1.5px] h-3 bg-outline-variant rounded-full"></div>
          </div>

          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-error text-[18px] shrink-0 mt-0.5">location_on</span>
            <div>
              <p className="text-[11px] font-semibold text-secondary uppercase">Drop Location</p>
              <p className="text-[14px] font-bold text-on-surface">{draftTrip.drop || "KR Market, Bengaluru"}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-outline-variant/40 flex items-center justify-between text-xs text-secondary">
            <span>Route Distance: <strong>38 km</strong></span>
            <span>Vehicle: <strong>tata-ace</strong></span>
          </div>
        </div>

        {/* Cargo & Specs */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/60 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">local_shipping</span>
            </div>
            <div>
              <p className="text-[14px] font-bold text-on-surface">Tata Ace (tata-ace)</p>
              <p className="text-[12px] text-secondary">
                {draftTrip.cargoType || "Vegetable boxes"} • {draftTrip.weightKg || 500} kg load
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-tertiary bg-tertiary-container/20 px-2 py-0.5 rounded-full">
            Available Nearby
          </span>
        </div>

        {/* Fare Breakdown Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/60 shadow-xs flex flex-col gap-2.5">
          <p className="text-[13px] font-bold text-on-surface border-b border-outline-variant/30 pb-2">
            Fare Estimate
          </p>
          <div className="flex justify-between text-xs text-secondary">
            <span>Base Fare (First 5 km)</span>
            <span>₹{baseFare}</span>
          </div>
          <div className="flex justify-between text-xs text-secondary">
            <span>Distance Fare (33 km)</span>
            <span>₹{distanceFare}</span>
          </div>
          <div className="pt-2 border-t border-outline-variant/40 flex justify-between items-center">
            <span className="text-[15px] font-bold text-on-surface">Total Payable</span>
            <span className="text-[20px] font-bold text-on-surface font-headline-lg">₹{fareTotal}</span>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-error-container/40 border border-error/30 text-on-error-container text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-error">error</span>
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-4 pb-2">
        <Button
          fullWidth
          size="lg"
          onClick={handleConfirmBooking}
          loading={loading}
          icon="broadcast_on_personal"
        >
          Confirm & Create Booking (POST /api/bookings)
        </Button>
      </div>
    </div>
  );
};
