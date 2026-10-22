import React, { useState, useEffect } from "react";
import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { AdminHeader } from "../../components/layout/AdminHeader";
import { adminApi } from "../../api/adminApi";

export const ReportsScreen = () => {
  const [reports, setReports] = useState(null);
  const [range, setRange] = useState("monthly");

  useEffect(() => {
    // BACKEND PLACEHOLDER: GET /api/v1/admin/reports?range=
    const load = async () => {
      const data = await adminApi.getReports(range);
      setReports(data);
    };
    load();
  }, [range]);

  if (!reports) return null;

  return (
    <div className="min-h-screen bg-surface">
      <AdminSidebar />
      <div className="pl-64 flex flex-col min-h-screen">
        <AdminHeader title="Fleet Performance & Reports" breadcrumb="Analytics" />

        <main className="flex-1 px-8 pt-20 pb-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
                Operations Intelligence
              </h1>
              <p className="text-secondary text-xs mt-1">
                Fleet dispatch analytics, vehicle share, and allocation speed
              </p>
            </div>

            <div className="flex items-center gap-2">
              {["weekly", "monthly", "yearly"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRange(r)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                    range === r
                      ? "bg-primary-container text-on-primary-container shadow-xs"
                      : "bg-surface-container-low text-secondary hover:text-on-surface"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* 3 Metric Banners */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-5 rounded-2xl bg-white border border-outline-variant/50 shadow-xs">
              <span className="text-xs font-bold text-secondary uppercase">Peak Dispatch Hours</span>
              <p className="text-[17px] font-bold text-on-surface mt-2">{reports.peakDispatchHours}</p>
              <span className="text-[11px] text-secondary mt-1 block">Highest freight activity window</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-outline-variant/50 shadow-xs">
              <span className="text-xs font-bold text-secondary uppercase">Average Trip Distance</span>
              <p className="text-[24px] font-bold text-on-surface mt-2 font-headline-xl">{reports.averageTripDistance}</p>
              <span className="text-[11px] text-secondary mt-1 block">Intra-city haul average</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-outline-variant/50 shadow-xs">
              <span className="text-xs font-bold text-secondary uppercase">Driver Allocation SLA</span>
              <p className="text-[24px] font-bold text-tertiary mt-2 font-headline-xl">{reports.averageAllocationTime}</p>
              <span className="text-[11px] text-secondary mt-1 block">From broadcast to driver accept</span>
            </div>
          </div>

          {/* Trips by Vehicle Type Chart Card */}
          <div className="p-6 rounded-2xl bg-white border border-outline-variant/50 shadow-xs mb-6">
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-4">
              Dispatches by Commercial Vehicle Type
            </h3>

            <div className="flex flex-col gap-4">
              {reports.tripsByVehicle?.map((item) => (
                <div key={item.vehicle} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-on-surface">{item.vehicle}</span>
                    <span className="text-secondary">
                      {item.count} trips (<strong>{item.percentage}%</strong>)
                    </span>
                  </div>
                  <div className="w-full h-3 bg-surface-container-low rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-container rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
