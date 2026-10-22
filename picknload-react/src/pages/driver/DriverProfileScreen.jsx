import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { MobileBottomNav } from "../../components/layout/MobileBottomNav";

export const DriverProfileScreen = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex-1 flex flex-col bg-surface min-h-[780px] pb-24">
      <MobileHeader title="Driver Profile" showBack={false} />

      <main className="flex-1 flex flex-col px-margin pt-20">
        {/* Profile Card */}
        <div className="p-4 rounded-2xl bg-white border border-outline-variant/60 shadow-xs flex items-center gap-4 mt-2">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary-container shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80"
              alt="Driver"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-headline-md text-[17px] font-bold text-on-surface truncate">
                {user?.name || "Ravi Kumar"}
              </h3>
              <span
                className="material-symbols-outlined text-tertiary text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
            <p className="text-[12px] text-secondary">{user?.phone || "+91 94481 23456"}</p>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="flex items-center text-amber-500 font-bold gap-0.5">
                <span className="material-symbols-outlined text-[14px]">star</span>
                4.85
              </span>
              <span>•</span>
              <span className="text-secondary font-medium">456 total dispatches</span>
            </div>
          </div>
        </div>

        {/* Commercial Vehicle Specs Card */}
        <div className="p-4 rounded-2xl bg-white border border-outline-variant/60 shadow-xs flex flex-col gap-2.5 mt-3 text-xs">
          <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
            <span className="font-bold text-on-surface text-[13px]">Vehicle Information</span>
            <span className="text-[11px] font-semibold text-tertiary bg-tertiary-container/20 px-2 py-0.5 rounded-full">
              Commercial RC Active
            </span>
          </div>
          <div className="flex justify-between text-secondary">
            <span>Vehicle Type & Model</span>
            <strong className="text-on-surface">Tata Ace Gold Diesel</strong>
          </div>
          <div className="flex justify-between text-secondary">
            <span>RC Plate Number</span>
            <strong className="text-on-surface">KA-06-XX-1234</strong>
          </div>
          <div className="flex justify-between text-secondary">
            <span>Rated Payload Capacity</span>
            <strong className="text-on-surface">750 kg</strong>
          </div>
        </div>

        {/* Verification & Compliance Status */}
        <div className="p-4 rounded-2xl bg-white border border-outline-variant/60 shadow-xs flex flex-col gap-2.5 mt-3 text-xs">
          <span className="font-bold text-on-surface text-[13px] border-b border-outline-variant/30 pb-2">
            RTO Compliance & Documents
          </span>
          <div className="flex justify-between items-center text-secondary">
            <span>Driving License (Commercial)</span>
            <span className="font-semibold text-tertiary flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              Verified (Till 2032)
            </span>
          </div>
          <div className="flex justify-between items-center text-secondary">
            <span>Vehicle Insurance Policy</span>
            <span className="font-semibold text-tertiary flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              Valid till Jan 2027
            </span>
          </div>
          <div className="flex justify-between items-center text-secondary">
            <span>Aadhaar KYC</span>
            <span className="font-semibold text-tertiary flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              Passed
            </span>
          </div>
        </div>

        {/* Helpline and Sign out */}
        <div className="mt-6 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => alert("Connecting to PickNLoad 24x7 Driver SOS Support")}
            className="w-full py-3 rounded-xl bg-surface-container-low text-on-surface text-[13px] font-semibold flex items-center justify-center gap-2 border border-outline-variant/40"
          >
            <span className="material-symbols-outlined text-[18px]">support_agent</span>
            <span>Driver Partner Support Desk</span>
          </button>

          <button
            type="button"
            onClick={handleSignOut}
            className="w-full py-3 rounded-xl border border-error/30 text-error text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-error-container/20 transition-colors"
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
