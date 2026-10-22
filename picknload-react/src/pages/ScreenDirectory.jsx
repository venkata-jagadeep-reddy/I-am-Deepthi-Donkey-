import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ScreenDirectory = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  const screens = [
    // 1. Auth & Onboarding
    { id: 1, name: "Splash Screen", folder: "splash", path: "/splash", category: "Auth & Onboarding", shell: "mobile_blank" },
    { id: 2, name: "Welcome Role Selection", folder: "welcome_role_selection", path: "/welcome-role", category: "Auth & Onboarding", shell: "mobile_blank" },
    { id: 3, name: "Choose Role (Customer vs Driver)", folder: "choose_role", path: "/choose-role", category: "Auth & Onboarding", shell: "mobile_stack" },
    { id: 4, name: "Phone Login", folder: "login", path: "/login", category: "Auth & Onboarding", shell: "mobile_stack" },
    { id: 5, name: "Login Invalid Number State", folder: "login_invalid_number", path: "/login", category: "Auth & Onboarding", shell: "mobile_stack" },
    { id: 6, name: "Verify OTP (Standard)", folder: "verify_otp", path: "/verify-otp", category: "Auth & Onboarding", shell: "mobile_stack" },
    { id: 7, name: "Verify OTP (Resend Available)", folder: "verify_otp_resend_available", path: "/verify-otp", category: "Auth & Onboarding", shell: "mobile_stack" },
    { id: 8, name: "Verify OTP (Wrong Code Error)", folder: "verify_otp_wrong_code", path: "/verify-otp", category: "Auth & Onboarding", shell: "mobile_stack" },
    { id: 9, name: "Customer Profile Setup", folder: "customer_profile_setup", path: "/customer/profile-setup", category: "Auth & Onboarding", shell: "mobile_stack" },
    { id: 10, name: "Driver Vehicle Step 1 of 2", folder: "your_vehicle_step_1_of_2", path: "/driver/vehicle-setup", category: "Auth & Onboarding", shell: "mobile_stack" },
    { id: 11, name: "Driver Documents Step 2 of 2", folder: "your_documents_step_2_of_2", path: "/driver/docs-setup", category: "Auth & Onboarding", shell: "mobile_stack" },
    { id: 12, name: "Driver Verification Pending", folder: "verification_pending", path: "/driver/verification-pending", category: "Auth & Onboarding", shell: "mobile_stack" },

    // 2. Customer / Consignor Flow
    { id: 13, name: "Customer Home", folder: "customer_home", path: "/customer/home", category: "Customer App", shell: "mobile_tab" },
    { id: 14, name: "Create Request", folder: "create_request", path: "/customer/create-request", category: "Customer App", shell: "mobile_stack" },
    { id: 15, name: "Review Your Request", folder: "review_your_request", path: "/customer/review-request", category: "Customer App", shell: "mobile_stack" },
    { id: 16, name: "Finding Drivers (Radar Pulse)", folder: "finding_drivers", path: "/customer/finding-drivers", category: "Customer App", shell: "mobile_stack" },
    { id: 17, name: "Drivers Responding (Bids)", folder: "drivers_responding", path: "/customer/drivers-responding", category: "Customer App", shell: "mobile_stack" },
    { id: 18, name: "No Drivers Responded (Fallback)", folder: "no_drivers_responded", path: "/customer/no-drivers", category: "Customer App", shell: "mobile_stack" },
    { id: 19, name: "Booking Confirmed", folder: "booking_confirmed", path: "/customer/booking-confirmed", category: "Customer App", shell: "mobile_stack" },
    { id: 20, name: "Active Trip Tracking Live", folder: "active_trip", path: "/customer/active-trip", category: "Customer App", shell: "mobile_stack" },
    { id: 21, name: "Trip Completed & Rating", folder: "trip_completed_and_rating", path: "/customer/trip-rating", category: "Customer App", shell: "mobile_stack" },
    { id: 22, name: "Customer Profile", folder: "customer_profile", path: "/customer/profile", category: "Customer App", shell: "mobile_tab" },
    { id: 23, name: "Consignor Profile Alt", folder: "profile", path: "/customer/profile", category: "Customer App", shell: "mobile_tab" },
    { id: 24, name: "Customer Active Trips", folder: "trips_active", path: "/customer/trips", category: "Customer App", shell: "mobile_tab" },
    { id: 25, name: "Customer Completed Trips 1", folder: "trips_completed_1", path: "/customer/trips", category: "Customer App", shell: "mobile_tab" },
    { id: 26, name: "Customer Completed Trips 2", folder: "trips_completed_2", path: "/customer/trips", category: "Customer App", shell: "mobile_tab" },

    // 3. Driver Partner Flow
    { id: 27, name: "Driver Home Online", folder: "driver_home_online", path: "/driver/home", category: "Driver App", shell: "mobile_tab" },
    { id: 28, name: "Driver Home Offline", folder: "driver_home_offline", path: "/driver/home", category: "Driver App", shell: "mobile_tab" },
    { id: 29, name: "Driver Requests Feed", folder: "driver_requests", path: "/driver/requests", category: "Driver App", shell: "mobile_tab" },
    { id: 30, name: "Driver Requests Empty State", folder: "driver_requests_empty_state", path: "/driver/requests", category: "Driver App", shell: "mobile_tab" },
    { id: 31, name: "Driver Request Details", folder: "driver_request_details", path: "/driver/request-details", category: "Driver App", shell: "mobile_stack" },
    { id: 32, name: "Request Accepted", folder: "request_accepted", path: "/driver/request-accepted", category: "Driver App", shell: "mobile_stack" },
    { id: 33, name: "Request Unavailable (Taken)", folder: "request_unavailable", path: "/driver/request-unavailable", category: "Driver App", shell: "mobile_stack" },
    { id: 34, name: "Current Trip: Going to Pickup", folder: "current_trip_going_to_pickup", path: "/driver/going-to-pickup", category: "Driver App", shell: "mobile_stack" },
    { id: 35, name: "Current Trip: Goods Loaded", folder: "current_trip_goods_loaded", path: "/driver/goods-loaded", category: "Driver App", shell: "mobile_stack" },
    { id: 36, name: "Current Trip: In Transit", folder: "current_trip_in_transit", path: "/driver/in-transit", category: "Driver App", shell: "mobile_stack" },
    { id: 37, name: "Current Trip: Mark Delivered", folder: "current_trip_mark_delivered", path: "/driver/mark-delivered", category: "Driver App", shell: "mobile_stack" },
    { id: 38, name: "Driver Trip Completed Summary", folder: "driver_trip_completed", path: "/driver/trip-completed", category: "Driver App", shell: "mobile_stack" },
    { id: 39, name: "Driver Earnings Dashboard", folder: "driver_earnings", path: "/driver/earnings", category: "Driver App", shell: "mobile_tab" },
    { id: 40, name: "Driver Profile 1", folder: "driver_profile_1", path: "/driver/profile", category: "Driver App", shell: "mobile_stack" },
    { id: 41, name: "Driver Profile 2", folder: "driver_profile_2", path: "/driver/profile", category: "Driver App", shell: "mobile_tab" },

    // 4. Admin Web Portal
    { id: 42, name: "Admin Login", folder: "admin_login", path: "/admin/login", category: "Admin Portal", shell: "web_blank" },
    { id: 43, name: "Operations Dashboard", folder: "admin_dashboard", path: "/admin/dashboard", category: "Admin Portal", shell: "web_dashboard" },
    { id: 44, name: "Drivers Directory", folder: "drivers_directory", path: "/admin/drivers", category: "Admin Portal", shell: "web_dashboard" },
    { id: 45, name: "Driver Detail & KYC Dossier", folder: "driver_detail", path: "/admin/drivers/DRV-104", category: "Admin Portal", shell: "web_dashboard" },
    { id: 46, name: "Customers Directory", folder: "customers", path: "/admin/customers", category: "Admin Portal", shell: "web_dashboard" },
    { id: 47, name: "All Trips Dispatch Log", folder: "trips", path: "/admin/trips", category: "Admin Portal", shell: "web_dashboard" },
    { id: 48, name: "Trip Forensic Audit #PNL-1042", folder: "trip_detail_pnl_1042", path: "/admin/trips/PNL-1042", category: "Admin Portal", shell: "web_dashboard" },
    { id: 49, name: "Fleet Reports & Intelligence", folder: "reports", path: "/admin/reports", category: "Admin Portal", shell: "web_dashboard" },
    { id: 50, name: "Operations Support Desk", folder: "support", path: "/admin/support", category: "Admin Portal", shell: "web_dashboard" },
  ];

  const categories = ["ALL", "Auth & Onboarding", "Customer App", "Driver App", "Admin Portal"];

  const filteredScreens = screens.filter((s) => {
    const matchCat = activeCategory === "ALL" || s.category === activeCategory;
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.folder.toLowerCase().includes(search.toLowerCase()) ||
      s.path.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-surface-container-low p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-outline-variant/60 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[20px]">dataset</span>
              </span>
              <h1 className="font-headline-xl text-headline-xl font-bold text-on-surface">
                PickNLoad React 50-Screen Directory
              </h1>
            </div>
            <p className="text-secondary text-xs mt-1">
              Every prototype screen from <code>stitch_picknload_logistics_app</code> converted into modular React components.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/customer/home")}
              className="px-4 py-2 rounded-xl bg-primary-container text-on-primary-container font-bold text-xs shadow-xs hover:brightness-95"
            >
              Launch Consignor App
            </button>
            <button
              onClick={() => navigate("/driver/home")}
              className="px-4 py-2 rounded-xl bg-surface text-on-surface font-bold text-xs border border-outline-variant hover:bg-surface-container"
            >
              Launch Driver App
            </button>
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="px-4 py-2 rounded-xl bg-slate-900 text-amber-400 font-bold text-xs shadow-xs hover:bg-slate-800"
            >
              Launch Admin Web
            </button>
          </div>
        </div>

        {/* Search & Categories Filter */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-outline-variant/50 shadow-xs">
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Filter by screen name, folder, or route..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-xl bg-surface-container-low text-xs text-on-surface border border-transparent focus:border-primary-container focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-primary-container text-on-primary-container shadow-xs"
                    : "bg-surface-container-low text-secondary hover:text-on-surface"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Screen Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredScreens.map((screen) => (
            <div
              key={screen.id}
              onClick={() => navigate(screen.path)}
              className="p-5 rounded-2xl bg-white border border-outline-variant/60 shadow-xs flex flex-col justify-between gap-3 hover:border-primary-container hover:shadow-md cursor-pointer transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block">
                    #{screen.id} • {screen.category}
                  </span>
                  <h3 className="font-bold text-[15px] text-on-surface mt-1">{screen.name}</h3>
                </div>
                <span className="text-[10px] font-mono font-semibold bg-surface-container-low px-2 py-0.5 rounded text-secondary">
                  {screen.shell}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-outline-variant/30 text-xs">
                <span className="text-[11px] font-mono text-secondary truncate max-w-[170px]">
                  {screen.folder}/
                </span>
                <span className="font-bold text-primary flex items-center gap-0.5 text-xs">
                  <span>Open Screen</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
