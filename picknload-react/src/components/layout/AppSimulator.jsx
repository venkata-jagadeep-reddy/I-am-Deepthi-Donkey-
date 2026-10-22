import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { USE_MOCK } from "../../api/apiClient";

export const AppSimulator = ({ children, isMobileLayout = true }) => {
  const { role, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [frameMode, setFrameMode] = useState("auto"); // "mobile-frame", "full-width", "auto"
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine if current route is admin or mobile
  const isAdminRoute = location.pathname.startsWith("/admin");
  const showMobileFrame = frameMode === "mobile-frame" || (frameMode === "auto" && !isAdminRoute && isMobileLayout);

  const handleRoleChange = (newRole) => {
    switchRole(newRole);
    if (newRole === "admin") {
      navigate("/admin/dashboard");
    } else if (newRole === "driver") {
      navigate("/driver/home");
    } else {
      navigate("/customer/home");
    }
  };

  const quickScreens = [
    { label: "📱 Splash Screen", path: "/splash" },
    { label: "📱 Role Selection", path: "/welcome-role" },
    { label: "📱 Phone Login", path: "/login" },
    { label: "📱 Verify OTP", path: "/verify-otp" },
    { label: "👤 Customer Home", path: "/customer/home" },
    { label: "📦 Create Request", path: "/customer/create-request" },
    { label: "📋 Review Request", path: "/customer/review-request" },
    { label: "📡 Finding Drivers", path: "/customer/finding-drivers" },
    { label: "🚚 Drivers Responding", path: "/customer/drivers-responding" },
    { label: "✅ Booking Confirmed", path: "/customer/booking-confirmed" },
    { label: "🗺️ Active Trip Live", path: "/customer/active-trip" },
    { label: "⭐ Trip Rating", path: "/customer/trip-rating" },
    { label: "🚛 Driver Duty (Online/Offline)", path: "/driver/home" },
    { label: "🔔 Driver Requests Feed", path: "/driver/requests" },
    { label: "📄 Request Details", path: "/driver/request-details" },
    { label: "📍 Going to Pickup", path: "/driver/going-to-pickup" },
    { label: "📦 Goods Loaded", path: "/driver/goods-loaded" },
    { label: "🛣️ In Transit", path: "/driver/in-transit" },
    { label: "🏁 Mark Delivered", path: "/driver/mark-delivered" },
    { label: "💰 Driver Earnings", path: "/driver/earnings" },
    { label: "🪪 Driver KYC Setup", path: "/driver/vehicle-setup" },
    { label: "💻 Admin Dashboard", path: "/admin/dashboard" },
    { label: "👥 Admin Drivers Directory", path: "/admin/drivers" },
    { label: "🗂️ Driver Detail & KYC", path: "/admin/drivers/DRV-104" },
    { label: "🏢 Customers List", path: "/admin/customers" },
    { label: "📜 Trips Audit Log", path: "/admin/trips" },
    { label: "🔍 Trip PNL-1042 Audit", path: "/admin/trips/PNL-1042" },
    { label: "📊 Reports & Analytics", path: "/admin/reports" },
    { label: "🛟 Operations Support", path: "/admin/support" },
    { label: "📑 All 50 Screens Directory", path: "/screens" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans">
      {/* Dev Simulator Top Toolbar */}
      <div className="bg-slate-950 text-slate-200 border-b border-slate-800 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-amber-400">
            <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            <span>PickNLoad React Dev Toolbar</span>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>

          {/* Role switcher buttons */}
          <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800">
            <button
              onClick={() => handleRoleChange("customer")}
              className={`px-2.5 py-1 rounded-md transition-all ${
                role === "customer" && !isAdminRoute
                  ? "bg-amber-500 text-slate-950 font-semibold shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Consignor
            </button>
            <button
              onClick={() => handleRoleChange("driver")}
              className={`px-2.5 py-1 rounded-md transition-all ${
                role === "driver" && !isAdminRoute
                  ? "bg-amber-500 text-slate-950 font-semibold shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Driver Partner
            </button>
            <button
              onClick={() => handleRoleChange("admin")}
              className={`px-2.5 py-1 rounded-md transition-all ${
                isAdminRoute ? "bg-amber-500 text-slate-950 font-semibold shadow-xs" : "text-slate-400 hover:text-white"
              }`}
            >
              Admin Portal
            </button>
          </div>
        </div>

        {/* Center / Right Quick Jumps */}
        <div className="flex items-center gap-2">
          {/* Screen Jumper Dropdown */}
          <select
            value={location.pathname}
            onChange={(e) => navigate(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-amber-500"
          >
            <option value="">Jump to Screen...</option>
            {quickScreens.map((s) => (
              <option key={s.path} value={s.path}>
                {s.label}
              </option>
            ))}
          </select>

          {/* Viewport Frame Toggle */}
          {!isAdminRoute && (
            <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800">
              <button
                title="Mobile Viewport Frame (390px)"
                onClick={() => setFrameMode("mobile-frame")}
                className={`p-1 rounded ${showMobileFrame ? "bg-slate-800 text-amber-400" : "text-slate-400"}`}
              >
                <span className="material-symbols-outlined text-[16px]">smartphone</span>
              </button>
              <button
                title="Full Responsive Width"
                onClick={() => setFrameMode("full-width")}
                className={`p-1 rounded ${!showMobileFrame ? "bg-slate-800 text-amber-400" : "text-slate-400"}`}
              >
                <span className="material-symbols-outlined text-[16px]">laptop</span>
              </button>
            </div>
          )}

          {/* Backend Status indicator */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px]">
            <span className={`w-2 h-2 rounded-full ${USE_MOCK ? "bg-amber-400" : "bg-emerald-400"}`}></span>
            <span className="text-slate-400">{USE_MOCK ? "Mock Mode" : "API Live"}</span>
          </div>

          <button
            onClick={() => navigate("/screens")}
            className="px-2 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded hover:bg-amber-500/30 font-medium"
          >
            Screen Directory
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex justify-center items-start overflow-auto p-0 sm:p-4 bg-slate-900">
        {showMobileFrame ? (
          <div className="w-full max-w-[420px] min-h-[844px] bg-surface rounded-none sm:rounded-[36px] shadow-2xl border-0 sm:border-8 border-slate-800 overflow-hidden relative flex flex-col my-auto">
            {/* Phone Notch Simulation */}
            <div className="w-32 h-4 bg-slate-800 rounded-b-xl mx-auto absolute top-0 left-1/2 -translate-x-1/2 z-50 hidden sm:block"></div>
            <div className="flex-1 flex flex-col w-full relative">{children}</div>
          </div>
        ) : (
          <div className="w-full min-h-screen bg-surface flex flex-col">{children}</div>
        )}
      </div>
    </div>
  );
};
