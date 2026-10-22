import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { AdminHeader } from "../../components/layout/AdminHeader";
import { adminApi } from "../../api/adminApi";
import { MapPlaceholder } from "../../components/common/MapPlaceholder";

export const TripDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    // BACKEND PLACEHOLDER: GET /api/v1/admin/trips/:id
    const fetchAudit = async () => {
      const data = await adminApi.getTripAudit(id || "PNL-1042");
      setTrip(data);
    };
    fetchAudit();
  }, [id]);

  if (!trip) return null;

  return (
    <div className="min-h-screen bg-surface">
      <AdminSidebar />
      <div className="pl-64 flex flex-col min-h-screen">
        <AdminHeader title={`Audit #${trip.id}`} breadcrumb="Trips" />

        <main className="flex-1 px-8 pt-20 pb-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={() => navigate("/admin/trips")}
              className="flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back to Trips Control Room</span>
            </button>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-tertiary-container/30 text-tertiary">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
              {trip.status}
            </span>
          </div>

          {/* Top Summary Banner */}
          <div className="p-6 rounded-2xl bg-white border border-outline-variant/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <span className="text-[11px] font-bold text-secondary uppercase">Dispatched Freight Movement</span>
              <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-0.5">
                Trip #{trip.id}
              </h1>
              <p className="text-secondary text-xs mt-1">
                Dispatched: {trip.createdAt} IST · Tumakuru APMC Yard to Kunigal
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs">
              <div>
                <span className="text-secondary uppercase text-[11px] font-bold block">Fare (COD)</span>
                <span className="text-[22px] font-bold text-on-surface font-headline-lg">
                  ₹{trip.pricing?.total || 950}
                </span>
              </div>
              <div className="h-8 w-px bg-outline-variant/50"></div>
              <div>
                <span className="text-secondary uppercase text-[11px] font-bold block">Consignor PIN</span>
                <span className="text-[20px] font-bold text-primary font-mono">{trip.otp}</span>
              </div>
            </div>
          </div>

          {/* Two-Column Grid: Map & Stakeholders vs Audit Trail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Column 1: Live Route & Stakeholders */}
            <div className="flex flex-col gap-6">
              <MapPlaceholder
                status="IN_TRANSIT"
                eta="18 mins"
                driverName="Ravi Kumar (Tata Ace)"
                origin="APMC Yard Gate 2"
                destination="Kunigal Market"
                className="h-64"
              />

              {/* Stakeholders Card */}
              <div className="p-6 rounded-2xl bg-white border border-outline-variant/60 shadow-xs flex flex-col gap-4 text-xs">
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface border-b border-outline-variant/30 pb-3">
                  Trip Stakeholders & Cargo
                </h3>

                <div className="flex justify-between">
                  <span className="text-secondary">Consignor</span>
                  <strong className="text-on-surface">Keerthana R. (+91 98765 43210)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Assigned Driver</span>
                  <strong className="text-on-surface">Ravi Kumar (+91 94481 23456)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Commercial Vehicle</span>
                  <strong className="text-on-surface">Tata Ace (KA-06-XX-1234)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Cargo Specifications</span>
                  <strong className="text-on-surface">Vegetables (550 kg / 28 crates)</strong>
                </div>
              </div>
            </div>

            {/* Column 2: Chronological Audit Trail */}
            <div className="p-6 rounded-2xl bg-white border border-outline-variant/60 shadow-xs flex flex-col gap-4">
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface border-b border-outline-variant/30 pb-3">
                Chronological Audit Trail
              </h3>

              <div className="flex flex-col gap-4 mt-2">
                {trip.auditTrail?.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></span>
                    <div className="flex-1">
                      <span className="font-mono font-bold text-primary mr-2">{log.time}</span>
                      <span className="text-on-surface">{log.event}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
