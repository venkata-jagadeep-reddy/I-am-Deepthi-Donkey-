import React, { useState, useEffect } from "react";
import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { AdminHeader } from "../../components/layout/AdminHeader";
import { adminApi } from "../../api/adminApi";
import { MOCK_SUPPORT_TICKETS } from "../../mock/mockData";

export const SupportScreen = () => {
  const [tickets, setTickets] = useState(MOCK_SUPPORT_TICKETS);

  useEffect(() => {
    // BACKEND PLACEHOLDER: GET /api/v1/admin/support
    const load = async () => {
      const data = await adminApi.getSupportTickets();
      setTickets(data);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <AdminSidebar />
      <div className="pl-64 flex flex-col min-h-screen">
        <AdminHeader title="Operations Support Desk" breadcrumb="Support" />

        <main className="flex-1 px-8 pt-20 pb-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
                Dispute & Support Desk
              </h1>
              <p className="text-secondary text-xs mt-1">
                Manage consignor and driver inquiries, delay escalations, and payment issues
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-outline-variant/50 shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-outline-variant/40 text-secondary uppercase font-semibold bg-surface-container-low/40">
                  <th className="py-3 px-4">Ticket ID</th>
                  <th className="py-3 px-4">Issue Subject</th>
                  <th className="py-3 px-4">Reporting Stakeholder</th>
                  <th className="py-3 px-4">Linked Trip ID</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {tickets.map((t) => (
                  <tr key={t.id} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-primary font-mono">{t.id}</td>
                    <td className="py-3.5 px-4 font-semibold text-on-surface">{t.subject}</td>
                    <td className="py-3.5 px-4 text-secondary">{t.user}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-on-surface">{t.tripId}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          t.priority === "HIGH"
                            ? "bg-error-container text-on-error-container"
                            : "bg-surface-container text-secondary"
                        }`}
                      >
                        {t.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          t.status === "RESOLVED"
                            ? "bg-tertiary-container/30 text-tertiary"
                            : t.status === "IN_PROGRESS"
                            ? "bg-primary-fixed text-on-primary-fixed"
                            : "bg-surface-container text-secondary"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => alert(`Opening ticket #${t.id}: ${t.subject}`)}
                        className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-bold text-xs"
                      >
                        Resolve
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
