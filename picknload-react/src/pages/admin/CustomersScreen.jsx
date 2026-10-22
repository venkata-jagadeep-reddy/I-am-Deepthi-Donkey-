import React, { useState, useEffect } from "react";
import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { AdminHeader } from "../../components/layout/AdminHeader";
import { adminApi } from "../../api/adminApi";
import { MOCK_ADMIN_CUSTOMERS } from "../../mock/mockData";

export const CustomersScreen = () => {
  const [customers, setCustomers] = useState(MOCK_ADMIN_CUSTOMERS);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // BACKEND PLACEHOLDER: GET /api/v1/admin/customers?search=
    const load = async () => {
      const data = await adminApi.getCustomers(search);
      setCustomers(data);
    };
    load();
  }, [search]);

  return (
    <div className="min-h-screen bg-surface">
      <AdminSidebar />
      <div className="pl-64 flex flex-col min-h-screen">
        <AdminHeader title="Consignors Directory" breadcrumb="Accounts" />

        <main className="flex-1 px-8 pt-20 pb-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
                Consignors & Traders
              </h1>
              <p className="text-secondary text-xs mt-1">
                Directory of businesses, APMC merchants, and active booking accounts
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="bg-white rounded-2xl border border-outline-variant/50 shadow-xs p-4 mb-6">
            <div className="relative max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search by consignor name, trade, or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 pl-9 pr-4 rounded-xl bg-surface-container-low text-xs text-on-surface border border-transparent focus:border-primary-container focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-outline-variant/50 shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-outline-variant/40 text-secondary uppercase font-semibold bg-surface-container-low/40">
                  <th className="py-3 px-4">Consignor / Business</th>
                  <th className="py-3 px-4">Contact Phone</th>
                  <th className="py-3 px-4">City Hub</th>
                  <th className="py-3 px-4">Total Bookings</th>
                  <th className="py-3 px-4">Total Spend</th>
                  <th className="py-3 px-4">Last Active</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center font-bold text-on-surface">
                          <span className="material-symbols-outlined text-[20px]">storefront</span>
                        </div>
                        <div>
                          <p className="font-bold text-on-surface text-[13px]">{c.name}</p>
                          <p className="text-secondary text-[11px]">{c.business}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-secondary">{c.phone}</td>
                    <td className="py-3.5 px-4 font-medium text-on-surface">{c.city}</td>
                    <td className="py-3.5 px-4 font-bold text-on-surface">{c.totalBookings} trips</td>
                    <td className="py-3.5 px-4 font-bold text-on-surface">{c.totalSpend}</td>
                    <td className="py-3.5 px-4 text-secondary">{c.lastTrip}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-tertiary-container/30 text-tertiary">
                        {c.status}
                      </span>
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
