import React from "react";

export const AdminHeader = ({ title = "Overview", breadcrumb = "Admin Portal", actions }) => {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl z-40 border-b border-outline-variant/40 flex items-center justify-between px-6 shadow-xs">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-secondary text-[13px] font-medium">
          <span>{breadcrumb}</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-on-surface font-semibold">{title}</span>
        </div>
        <div className="h-4 w-px bg-outline-variant/60"></div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-on-surface text-[12px] font-medium">
          <span className="material-symbols-outlined text-[16px] text-tertiary">hub</span>
          <span>Tumakuru Logistics Hub</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {actions ? (
          actions
        ) : (
          <>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-secondary text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search driver, trip ID, RC..."
                className="h-10 pl-9 pr-4 bg-surface-container-low rounded-xl text-[14px] text-on-surface placeholder:text-secondary border border-transparent focus:border-primary-container focus:bg-white focus:outline-none w-64 transition-all"
              />
            </div>

            <button
              type="button"
              className="relative w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-secondary hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error"></span>
            </button>

            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
