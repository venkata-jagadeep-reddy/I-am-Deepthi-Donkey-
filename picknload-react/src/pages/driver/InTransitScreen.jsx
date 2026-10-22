import React from "react";
import { useNavigate } from "react-router-dom";
import { useDriverDuty } from "../../context/DriverDutyContext";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { MapPlaceholder } from "../../components/common/MapPlaceholder";
import { Button } from "../../components/common/Button";

export const InTransitScreen = () => {
  const navigate = useNavigate();
  const { advanceTripStage, loading } = useDriverDuty();

  const handleArrivedAtDrop = async () => {
    // BACKEND PLACEHOLDER: PATCH /api/v1/driver/trips/:id/status { status: 'REACHED_DROP' }
    await advanceTripStage("DELIVERED");
    navigate("/driver/mark-delivered");
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Trip In Transit" showBack={false} />

      <div className="flex flex-col gap-4 mt-2 pb-6">
        {/* GPS Navigation Map */}
        <MapPlaceholder
          status="IN_TRANSIT"
          eta="55 mins"
          driverName="Ravi Kumar (Tata Ace)"
          origin="APMC Yard Tumakuru"
          destination="Kunigal Market"
          className="h-56"
        />

        {/* Live Delivery Destination Card */}
        <div className="p-4 rounded-2xl bg-white border border-outline-variant/60 shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-secondary uppercase">Destination Receiver</span>
              <h3 className="font-bold text-[16px] text-on-surface mt-0.5">Venkatesh Agro Agencies</h3>
              <p className="text-xs text-secondary">Contact: Venkatesh (+91 98450 11223)</p>
            </div>

            <button
              type="button"
              onClick={() => alert("Calling Receiver Venkatesh: +91 98450 11223")}
              className="w-11 h-11 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-xs"
              title="Call Receiver"
            >
              <span className="material-symbols-outlined text-[22px]">call</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-surface-container-low/70 border border-outline-variant/30 flex items-start gap-2.5 text-xs">
            <span className="material-symbols-outlined text-[18px] text-error shrink-0 mt-0.5">
              location_on
            </span>
            <div>
              <p className="font-bold text-on-surface">Kunigal Town Market, B.M. Road</p>
              <p className="text-secondary mt-0.5">Opposite Karnataka Bank, Kunigal</p>
            </div>
          </div>
        </div>

        {/* Toll & Expressway Note */}
        <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between text-xs text-secondary">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">alt_route</span>
            <span>Route: NH-75 Expressway (FastTag lane)</span>
          </div>
          <span className="font-bold text-on-surface">38 km</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-4 pb-2">
        <Button
          fullWidth
          size="lg"
          onClick={handleArrivedAtDrop}
          loading={loading}
          icon="where_to_vote"
        >
          Reached Delivery Point
        </Button>
      </div>
    </div>
  );
};
