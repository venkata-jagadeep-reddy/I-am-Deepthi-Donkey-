import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { AdminHeader } from "../../components/layout/AdminHeader";
import { adminApi } from "../../api/adminApi";
import { MOCK_ADMIN_TRIPS } from "../../mock/mockData";

export const TripsScreen = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState(MOCK_ADMIN_TRIPS);
  const [filter, setFilter] = useState("ALL"); // "ALL" | "IN_TRANSIT" | "COMPLETED" | "CANCELLED"

  useEffect(() => {
    // BACKEND PLACEHOLDER: GET /api/v1/admin/trips?status=
    const load = async () => {
      const data = await adminApi.getAllTrips(filter);
      setTrips(data);
    };
    load();
  }, [filter]);

  return (
    <div className="min-h-screen bg-surface">
      <AdminSidebar />
      <div className="pl-64 flex flex-col min-h-screen">
        <AdminHeader title="Dispatch Control Room" breadcrumb="Operations" />

        <main className="flex-1 px-8 pt-20 pb-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
                Dispatches & Trips
              </h1>
              <p className="text-secondary text-xs mt-1">
                Central tracking of live, scheduled, and completed intra-city freight trips
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2">
              {["ALL", "IN_TRANSIT", "COMPLETED", "CANCELLED"].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    filter === f
                      ? "bg-primary-container text-on-primary-container shadow-xs"
                      : "bg-surface-container-low text-secondary hover:text-on-surface"
                  }`}
                >
                  {f === "ALL" ? "All Trips" : f.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-outline-variant/50 shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-outline-variant/40 text-secondary uppercase font-semibold bg-surface-container-low/40">
                  <th className="py-3 px-4">Trip ID & Date</th>
                  <th className="py-3 px-4">Consignor</th>
                  <th className="py-3 px-4">Assigned Driver & Plate</th>
                  <th className="py-3 px-4">Route & Cargo</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Fare</th>
                  <th className="py-3 px-4 text-right">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {trips.map((t) => (
                  <tr key={t.id} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-primary text-[13px]">{t.id}</p>
                      <p className="text-secondary text-[11px]">{t.date}</p>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-on-surface">{t.customer}</td>
                    <td className="py-3.5 px-4 text-secondary">
                      <span className="text-on-surface font-medium">{t.driver}</span>
                      <span className="block text-[11px] font-mono">{t.plate}</span>
                    </td>
                    <td className="py-3.5 px-4 text-secondary">
                      <span className="text-on-surface font-semibold">{t.route}</span>
                      <span className="block text-[11px]">{t.goods} • {t.distance}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          t.status === "IN_TRANSIT"
                            ? "bg-tertiary-container/30 text-tertiary"
                            : t.status === "COMPLETED"
                            ? "bg-surface-container text-secondary"
                            : "bg-error-container text-on-error-container"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-on-surface text-[14px]">
                      {t.amount}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => navigate(`/admin/trips/${t.id}`)}
                        className="px-2.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-bold text-xs"
                      >
                        Audit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};
