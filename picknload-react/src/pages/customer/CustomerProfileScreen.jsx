import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { MobileBottomNav } from "../../components/layout/MobileBottomNav";

export const CustomerProfileScreen = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex-1 flex flex-col bg-surface-container-lowest min-h-[780px] pb-24">
      <MobileHeader title="My Account" showBack={false} />

      <main className="flex-1 flex flex-col px-margin pt-20">
        {/* User Card */}
        <div className="p-4 rounded-2xl bg-white border border-outline-variant/60 shadow-xs flex items-center gap-4 mt-2">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white text-xl font-bold">
            <span className="material-symbols-outlined text-[32px]">person</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-headline-md text-[17px] font-bold text-on-surface truncate">
              {user?.name || "Keerthana R."}
            </h3>
            <p className="text-[12px] text-secondary truncate">{user?.businessName || "Sri Balaji Agro Commodities"}</p>
            <p className="text-[12px] text-primary font-semibold mt-0.5">{user?.phone || "+91 98765 43210"}</p>
          </div>
        </div>

        {/* GSTIN badge */}
        <div className="p-3 rounded-xl bg-surface-container-low/70 border border-outline-variant/40 mt-3 flex items-center justify-between text-xs">
          <span className="text-secondary font-medium">GSTIN Registered:</span>
          <span className="font-bold text-on-surface">{user?.gstin || "29AABCU9603R1ZM"}</span>
        </div>

        {/* Menu Options */}
        <div className="flex flex-col gap-1 mt-5">
          <span className="font-label-sm text-secondary uppercase text-[11px] font-bold px-1 mb-1">
            Account & Operations
          </span>

          <div
            onClick={() => navigate("/customer/trips")}
            className="p-3.5 rounded-xl bg-white border border-outline-variant/40 flex items-center justify-between cursor-pointer hover:bg-surface-container-low"
          >
            <div className="flex items-center gap-3 text-on-surface">
              <span className="material-symbols-outlined text-[20px] text-secondary">history</span>
              <span className="text-[14px] font-medium">Trip History & Waybills</span>
            </div>
            <span className="material-symbols-outlined text-secondary text-[18px]">chevron_right</span>
          </div>

          <div
            onClick={() => alert("Saved addresses: APMC Yard Tumakuru, Batawadi Bypass")}
            className="p-3.5 rounded-xl bg-white border border-outline-variant/40 flex items-center justify-between cursor-pointer hover:bg-surface-container-low"
          >
            <div className="flex items-center gap-3 text-on-surface">
              <span className="material-symbols-outlined text-[20px] text-secondary">pin_drop</span>
              <span className="text-[14px] font-medium">Saved Mandi & Warehouse Locations</span>
            </div>
            <span className="material-symbols-outlined text-secondary text-[18px]">chevron_right</span>
          </div>

          <div
            onClick={() => alert("App language is set to Kannada & English")}
            className="p-3.5 rounded-xl bg-white border border-outline-variant/40 flex items-center justify-between cursor-pointer hover:bg-surface-container-low"
          >
            <div className="flex items-center gap-3 text-on-surface">
              <span className="material-symbols-outlined text-[20px] text-secondary">translate</span>
              <span className="text-[14px] font-medium">App Language (ಕನ್ನಡ / English)</span>
            </div>
            <span className="text-xs text-secondary font-semibold">English</span>
          </div>

          <div
            onClick={() => alert("Connecting to 24/7 Consignor Helpline: 1800-419-5500")}
            className="p-3.5 rounded-xl bg-white border border-outline-variant/40 flex items-center justify-between cursor-pointer hover:bg-surface-container-low"
          >
            <div className="flex items-center gap-3 text-on-surface">
              <span className="material-symbols-outlined text-[20px] text-secondary">support_agent</span>
              <span className="text-[14px] font-medium">Help & Freight Support</span>
            </div>
            <span className="material-symbols-outlined text-secondary text-[18px]">chevron_right</span>
          </div>
        </div>

        {/* Sign out */}
        <div className="mt-8">
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full py-3 rounded-xl border border-error/30 text-error text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-error-container/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </main>

      <MobileBottomNav />
    </div>
  );
};
