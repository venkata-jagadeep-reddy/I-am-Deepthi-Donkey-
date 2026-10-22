import React from "react";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { MobileBottomNav } from "../../components/layout/MobileBottomNav";
import { Button } from "../../components/common/Button";

export const DriverEarningsScreen = () => {
  const payouts = [
    { id: "TXN-901", date: "Today, 14:40", route: "Tumakuru APMC -> Kunigal", amount: 950, type: "COD Settled" },
    { id: "TXN-900", date: "Today, 11:20", route: "APMC Gate 1 -> Batawadi", amount: 300, type: "UPI" },
    { id: "TXN-899", date: "Yesterday", route: "Antharasanahalli -> Sira Gate", amount: 720, type: "UPI" },
    { id: "TXN-898", date: "22 Oct 2026", route: "Tumakuru -> Gubbi", amount: 680, type: "Cash" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-surface min-h-[780px] pb-24">
      <MobileHeader title="Driver Earnings" showBack={false} />

      <main className="flex-1 flex flex-col px-margin pt-20">
        {/* Earnings Hero Card */}
        <div className="p-5 rounded-2xl bg-white border border-outline-variant/60 shadow-xs flex flex-col gap-3 mt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-secondary uppercase">Today's Earnings</span>
            <span className="text-xs font-semibold text-tertiary bg-tertiary-container/20 px-2.5 py-0.5 rounded-full">
              4 Completed Trips
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-[32px] font-bold text-on-surface font-headline-xl">₹1,250</span>
            <span className="text-xs text-secondary">Earned today</span>
          </div>

          <div className="pt-3 border-t border-outline-variant/30 flex justify-between items-center text-xs">
            <span className="text-secondary">Weekly Cumulative: <strong className="text-on-surface">₹8,750</strong></span>
            <span className="text-primary font-bold">Incentive: +₹250 next trip</span>
          </div>
        </div>

        {/* Bank Account Settlement Card */}
        <div className="p-4 rounded-2xl bg-surface-container-low/80 border border-outline-variant/40 mt-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-outline-variant/40 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">account_balance</span>
            </div>
            <div>
              <p className="font-bold text-on-surface">State Bank of India</p>
              <p className="text-secondary">A/C: •••• 4821 (IFSC: SBIN0001234)</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert("Initiating instant bank settlement to SBI account.")}
            className="px-3 py-1.5 rounded-xl bg-primary-container text-on-primary-container font-bold shadow-xs hover:brightness-95 transition-all"
          >
            Withdraw
          </button>
        </div>

        {/* Trip Payout Logs */}
        <div className="flex flex-col gap-2 mt-6">
          <h3 className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">
            Recent Trips Payout
          </h3>

          <div className="flex flex-col gap-2.5">
            {payouts.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-2xl bg-white border border-outline-variant/50 shadow-xs flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[14px] text-on-surface">{p.route}</span>
                  </div>
                  <span className="text-[11px] text-secondary">{p.date} • {p.type}</span>
                </div>

                <div className="text-right">
                  <span className="font-bold text-[16px] text-tertiary block">+₹{p.amount}</span>
                  <span className="text-[10px] text-secondary">Credited</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <MobileBottomNav />
    </div>
  );
};
