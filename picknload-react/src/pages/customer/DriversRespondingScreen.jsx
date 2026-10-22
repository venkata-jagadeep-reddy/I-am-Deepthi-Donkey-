import React from "react";
import { useNavigate } from "react-router-dom";
import { useTrip } from "../../context/TripContext";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Button } from "../../components/common/Button";

export const DriversRespondingScreen = () => {
  const navigate = useNavigate();
  const { respondingDrivers, acceptDriverBid, loading } = useTrip();

  const handleAccept = async (driverId) => {
    // BACKEND PLACEHOLDER: POST /api/v1/trips/:id/accept-bid { driverId }
    await acceptDriverBid(driverId);
    navigate("/customer/booking-confirmed");
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Drivers Responding" showBack onBack={() => navigate("/customer/finding-drivers")} />

      <div className="flex flex-col gap-4 mt-2 pb-6">
        <div>
          <span className="font-label-sm text-secondary">3 Bids Received</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1">
            Choose your driver
          </h2>
          <p className="font-body-md text-secondary mt-1">
            Verified local commercial drivers available to pick up your cargo immediately.
          </p>
        </div>

        {/* Drivers List */}
        <div className="flex flex-col gap-3 mt-2">
          {respondingDrivers.map((driver) => (
            <div
              key={driver.id}
              className="p-4 rounded-2xl border border-outline-variant/60 bg-surface-container-lowest shadow-sm flex flex-col gap-3 hover:border-outline-variant transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-on-surface font-bold shrink-0">
                    <span className="material-symbols-outlined text-[26px]">local_shipping</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-[15px] text-on-surface">{driver.name}</h4>
                      {driver.verified && (
                        <span
                          className="material-symbols-outlined text-tertiary text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                          title="KYC Verified"
                        >
                          verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-secondary mt-0.5">
                      <span className="flex items-center text-amber-500 font-semibold gap-0.5">
                        <span className="material-symbols-outlined text-[14px]">star</span>
                        {driver.rating}
                      </span>
                      <span>•</span>
                      <span>{driver.tripsCount} trips</span>
                      <span>•</span>
                      <span className="font-medium text-tertiary">{driver.etaMins} mins away</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[18px] font-bold text-on-surface font-headline-md">
                    ₹{driver.bidAmount}
                  </span>
                  <span className="block text-[11px] text-secondary">Fixed Fare</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-outline-variant/30 text-xs">
                <span className="text-secondary font-medium">{driver.vehicleModel}</span>
                <Button
                  size="sm"
                  onClick={() => handleAccept(driver.id)}
                  loading={loading}
                  icon="check"
                >
                  Accept Driver
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-4 pb-2">
        <Button
          fullWidth
          size="sm"
          variant="outline"
          onClick={() => navigate("/customer/no-drivers")}
        >
          Simulate No Drivers Fallback State
        </Button>
      </div>
    </div>
  );
};
