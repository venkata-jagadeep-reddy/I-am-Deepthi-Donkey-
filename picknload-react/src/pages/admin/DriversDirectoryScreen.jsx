import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { AdminHeader } from "../../components/layout/AdminHeader";
import { adminApi } from "../../api/adminApi";
import { MOCK_ADMIN_DRIVERS } from "../../mock/mockData";

export const DriversDirectoryScreen = () => {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState(MOCK_ADMIN_DRIVERS);
  const [filter, setFilter] = useState("ALL"); // "ALL" | "VERIFIED" | "PENDING" | "ONLINE"
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // BACKEND PLACEHOLDER: GET /api/v1/admin/drivers?filter=&search=
    const loadDrivers = async () => {
      setLoading(true);
      try {
        const list = await adminApi.getDrivers({ filter, search });
        setDrivers(list);
      } finally {
        setLoading(false);
      }
    };
    loadDrivers();
  }, [filter, search]);

  return (
    <div className="min-h-screen bg-surface">
      <AdminSidebar />
      <div className="pl-64 flex flex-col min-h-screen">
        <AdminHeader title="Drivers Directory" breadcrumb="Fleet Partners" />

        <main className="flex-1 px-8 pt-20 pb-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
                Commercial Fleet Drivers
              </h1>
              <p className="text-secondary text-xs mt-1">
                Manage registered drivers, vehicle permits, and KYC approvals
              </p>
            </div>

            <button
              type="button"
              onClick={() => alert("Quick driver enrollment form")}
              className="h-10 px-4 rounded-xl bg-primary-container text-on-primary-container text-xs font-bold flex items-center gap-1.5 shadow-sm hover:brightness-95 transition-all self-start md:self-auto"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span>Enroll New Driver</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="bg-white rounded-2xl border border-outline-variant/50 shadow-xs p-4 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search by driver name, phone, RC..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 pl-9 pr-4 rounded-xl bg-surface-container-low text-xs text-on-surface border border-transparent focus:border-primary-container focus:bg-white focus:outline-none"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
              {["ALL", "VERIFIED", "PENDING", "ONLINE"].map((f) => (
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
                  {f === "ALL"
                    ? "All Drivers"
                    : f === "VERIFIED"
                    ? "KYC Verified"
                    : f === "PENDING"
                    ? "Pending Review"
                    : "Active Duty"}
                </button>
              ))}
            </div>
          </div>

          {/* Drivers Table */}
          <div className="bg-white rounded-2xl border border-outline-variant/50 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-outline-variant/40 text-secondary uppercase font-semibold bg-surface-container-low/40">
                    <th className="py-3 px-4">Driver Name</th>
                    <th className="py-3 px-4">Vehicle Tier</th>
                    <th className="py-3 px-4">RC Number</th>
                    <th className="py-3 px-4">Duty Status</th>
                    <th className="py-3 px-4">KYC Compliance</th>
                    <th className="py-3 px-4">Rating & Trips</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {drivers.map((d) => (
                    <tr key={d.id} className="hover:bg-surface-container-low/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center font-bold text-on-surface">
                            <span className="material-symbols-outlined text-[20px]">person</span>
                          </div>
                          <div>
                            <p className="font-bold text-on-surface text-[13px]">{d.name}</p>
                            <p className="text-secondary text-[11px]">{d.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-on-surface">{d.vehicleType}</td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-secondary">{d.plateNumber}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            d.isOnline
                              ? "bg-tertiary-container/30 text-tertiary"
                              : "bg-surface-container text-secondary"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              d.isOnline ? "bg-tertiary" : "bg-secondary"
                            }`}
                          />
                          {d.isOnline ? "Online" : "Offline"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            d.kycStatus === "VERIFIED"
                              ? "bg-tertiary-container/30 text-tertiary"
                              : d.kycStatus === "PENDING"
                              ? "bg-primary-fixed text-on-primary-fixed font-bold animate-pulse"
                              : "bg-error-container text-on-error-container"
                          }`}
                        >
                          {d.kycStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-on-surface">⭐ {d.rating > 0 ? d.rating : "New"}</span>
                        <span className="text-secondary block text-[11px]">{d.totalTrips} dispatches</span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => navigate(`/admin/drivers/${d.id}`)}
                          className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-bold text-xs"
                        >
                          Inspect Dossier
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
