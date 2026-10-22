import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: "dashboard" },
    { label: "Drivers", path: "/admin/drivers", icon: "person_pin" },
    { label: "Customers", path: "/admin/customers", icon: "group" },
    { label: "Trips", path: "/admin/trips", icon: "route" },
    { label: "Reports", path: "/admin/reports", icon: "monitoring" },
    { label: "Support Desk", path: "/admin/support", icon: "support_agent" },
  ];

  const handleSignOut = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest z-50 flex flex-col justify-between border-r border-outline-variant/40 shadow-sm">
      <div className="flex flex-col">
        {/* Brand header */}
        <div className="h-16 px-space-md flex items-center justify-between border-b border-outline-variant/30">
          <div className="flex items-center gap-space-sm cursor-pointer" onClick={() => navigate("/admin/dashboard")}>
            <div className="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container shadow-sm">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <span className="font-headline-md text-headline-md text-on-surface tracking-tight">PickNLoad</span>
          </div>
          <span className="px-2 py-0.5 rounded-lg bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
            Admin
          </span>
        </div>

        {/* Navigation list */}
        <nav className="flex flex-col gap-1 px-3 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150
                ${
                  isActive
                    ? "bg-primary-container text-on-primary-container font-semibold shadow-sm"
                    : "text-secondary hover:bg-surface-container-low hover:text-on-surface font-medium"
                }
              `}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="text-[14px]">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* User profile & Sign out */}
      <div className="p-4 bg-surface-container-low/60 border-t border-outline-variant/40 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
            <span className="material-symbols-outlined text-[18px]">badge</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[14px] font-semibold text-on-surface truncate">Admin Operations</span>
            <span className="text-[12px] text-secondary truncate">admin@picknload.com</span>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          type="button"
          className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-surface-container-lowest text-secondary hover:text-error hover:bg-error-container/30 border border-outline-variant/40 transition-colors shadow-xs text-[13px] font-medium"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
