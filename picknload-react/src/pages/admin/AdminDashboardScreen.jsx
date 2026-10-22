import React from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { AdminHeader } from "../../components/layout/AdminHeader";
import { MOCK_ADMIN_METRICS, MOCK_ADMIN_TRIPS } from "../../mock/mockData";

export const AdminDashboardScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface">
      <AdminSidebar />
      <div className="pl-64 flex flex-col min-h-screen">
        <AdminHeader title="Operations Overview" />

        <main className="flex-1 px-8 pt-20 pb-12">
          {/* Top Operational Context Strip */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
                  Operations Dashboard
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  System Operational
                </span>
              </div>
              <p className="text-secondary text-xs mt-1">
                Live intra-city dispatch overview · Tumakuru Logistics Zone
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-outline-variant/40 shadow-xs text-xs font-semibold text-on-surface">
                <span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
                <span>Thursday, Oct 24 · 14:38 IST</span>
              </div>

              <button
                type="button"
                onClick={() => navigate("/admin/trips")}
                className="h-10 px-4 rounded-xl bg-primary-container text-on-primary-container text-xs font-bold flex items-center gap-1.5 shadow-sm hover:brightness-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">add_box</span>
                <span>Quick Dispatch</span>
              </button>
            </div>
          </div>

          {/* 5 Core Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {/* Card 1: Total Customers */}
            <div
              onClick={() => navigate("/admin/customers")}
              className="p-5 rounded-2xl bg-white border border-outline-variant/50 shadow-xs flex flex-col justify-between cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-secondary uppercase">Total Customers</span>
                <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface">
                  <span className="material-symbols-outlined text-[18px]">group</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-[26px] font-bold text-on-surface font-headline-xl">
                  {MOCK_ADMIN_METRICS.totalCustomers.toLocaleString()}
                </div>
                <div className="mt-1 flex items-center gap-1 text-[11px] text-tertiary font-semibold">
                  <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                  <span>+{MOCK_ADMIN_METRICS.newCustomersWeek} this week</span>
                </div>
              </div>
            </div>

            {/* Card 2: Registered Drivers */}
            <div
              onClick={() => navigate("/admin/drivers")}
              className="p-5 rounded-2xl bg-white border border-outline-variant/50 shadow-xs flex flex-col justify-between cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-secondary uppercase">Registered Drivers</span>
                <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface">
                  <span className="material-symbols-outlined text-[18px]">badge</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-[26px] font-bold text-on-surface font-headline-xl">
                  {MOCK_ADMIN_METRICS.registeredDrivers}
                </div>
                <div className="mt-1 flex items-center gap-1 text-[11px] text-tertiary font-semibold">
                  <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                  <span>+{MOCK_ADMIN_METRICS.newDriversMonth} this month</span>
                </div>
              </div>
            </div>

            {/* Card 3: Active Trips */}
            <div
              onClick={() => navigate("/admin/trips")}
              className="p-5 rounded-2xl bg-white border border-outline-variant/50 shadow-xs flex flex-col justify-between cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-secondary uppercase">Active Trips</span>
                <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-[26px] font-bold text-on-surface font-headline-xl">
                    {MOCK_ADMIN_METRICS.activeTripsCount}
                  </span>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary"></span>
                  </span>
                </div>
                <div className="mt-1 text-[11px] text-tertiary font-semibold">
                  On-road real-time
                </div>
              </div>
            </div>

            {/* Card 4: Completed Trips */}
            <div
              onClick={() => navigate("/admin/trips")}
              className="p-5 rounded-2xl bg-white border border-outline-variant/50 shadow-xs flex flex-col justify-between cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-secondary uppercase">Completed Trips</span>
                <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface">
                  <span className="material-symbols-outlined text-[18px]">task_alt</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-[26px] font-bold text-on-surface font-headline-xl">
                  {MOCK_ADMIN_METRICS.completedTripsCount.toLocaleString()}
                </div>
                <div className="mt-1 text-[11px] text-secondary">
                  Intra-city logs
                </div>
              </div>
            </div>

            {/* Card 5: Daily Revenue */}
            <div
              onClick={() => navigate("/admin/reports")}
              className="p-5 rounded-2xl bg-white border border-outline-variant/50 shadow-xs flex flex-col justify-between cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-secondary uppercase">Daily Revenue</span>
                <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">payments</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-[24px] font-bold text-on-surface font-headline-xl truncate">
                  {MOCK_ADMIN_METRICS.dailyRevenue}
                </div>
                <div className="mt-1 text-[11px] text-secondary">
                  84 trips today
                </div>
              </div>
            </div>
          </div>

          {/* Live Dispatch Management Table */}
          <div className="bg-white rounded-2xl border border-outline-variant/50 shadow-xs p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Live Dispatch Management
                </h3>
                <p className="text-xs text-secondary mt-0.5">
                  Real-time monitored consignments across Tumakuru & Bangalore corridors
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/admin/trips")}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                <span>View All In Transit</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-outline-variant/40 text-secondary uppercase font-semibold">
                    <th className="py-3 px-3">Trip ID</th>
                    <th className="py-3 px-3">Consignor</th>
                    <th className="py-3 px-3">Driver & Vehicle</th>
                    <th className="py-3 px-3">Route & Cargo</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Fare</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {MOCK_ADMIN_TRIPS.map((trip) => (
                    <tr key={trip.id} className="hover:bg-surface-container-low/40 transition-colors">
                      <td className="py-3 px-3 font-bold text-primary">{trip.id}</td>
                      <td className="py-3 px-3 font-semibold text-on-surface">{trip.customer}</td>
                      <td className="py-3 px-3 text-secondary">{trip.driver} ({trip.plate})</td>
                      <td className="py-3 px-3 text-secondary">
                        <span className="text-on-surface font-medium">{trip.route}</span> • {trip.goods}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            trip.status === "IN_TRANSIT"
                              ? "bg-tertiary-container/30 text-tertiary"
                              : trip.status === "COMPLETED"
                              ? "bg-surface-container text-secondary"
                              : "bg-error-container text-on-error-container"
                          }`}
                        >
                          {trip.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-on-surface">{trip.amount}</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => navigate(`/admin/trips/${trip.id}`)}
                          className="px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-bold text-[11px]"
                        >
                          Audit
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
