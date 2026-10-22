import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const MobileBottomNav = () => {
  const { role } = useAuth();

  const customerTabs = [
    { label: "Home", path: "/customer/home", icon: "home" },
    { label: "My Trips", path: "/customer/trips", icon: "route" },
    { label: "Profile", path: "/customer/profile", icon: "person" },
  ];

  const driverTabs = [
    { label: "Duty", path: "/driver/home", icon: "speed" },
    { label: "Requests", path: "/driver/requests", icon: "notifications_active", badge: "2" },
    { label: "Earnings", path: "/driver/earnings", icon: "payments" },
    { label: "Profile", path: "/driver/profile", icon: "account_circle" },
  ];

  const tabs = role === "driver" ? driverTabs : customerTabs;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/40 pb-safe shadow-[0_-1px_6px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) => `
              relative flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors
              ${isActive ? "text-on-surface font-semibold" : "text-secondary hover:text-on-surface font-normal"}
            `}
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <span
                    className={`material-symbols-outlined text-[24px] ${
                      isActive ? "text-primary font-bold" : "text-secondary"
                    }`}
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {tab.icon}
                  </span>
                  {tab.badge && (
                    <span className="absolute -top-1 -right-2 bg-primary-container text-on-primary-container text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-white">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[12px] leading-tight mt-0.5 ${isActive ? "text-primary font-semibold" : "text-secondary"}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-1 w-5 h-1 bg-primary-container rounded-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
