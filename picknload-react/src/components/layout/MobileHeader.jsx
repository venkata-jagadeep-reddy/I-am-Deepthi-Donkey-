import React from "react";
import { useNavigate } from "react-router-dom";

export const MobileHeader = ({
  title,
  showBack = false,
  onBack,
  showProfile = true,
  showLogo = true,
  rightAction,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline-variant/40 pt-safe">
      <div className="h-16 px-margin flex items-center justify-between">
        {/* Left: Back button or Logo + Title */}
        <div className="flex items-center gap-space-sm min-w-0">
          {showBack ? (
            <button
              type="button"
              onClick={handleBack}
              aria-label="Go back"
              className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          ) : showLogo ? (
            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-primary-container text-[20px]">
                local_shipping
              </span>
            </div>
          ) : null}

          {title ? (
            <h1 className="font-headline-md text-headline-md text-on-surface truncate tracking-tight">
              {title}
            </h1>
          ) : (
            <span className="font-headline-md text-headline-md tracking-tight text-on-surface">
              PickNLoad
            </span>
          )}
        </div>

        {/* Right Action or Notifications & Profile */}
        <div className="flex items-center gap-space-xs shrink-0">
          {rightAction ? (
            rightAction
          ) : (
            <>
              <button
                type="button"
                aria-label="Notifications"
                className="w-10 h-10 flex items-center justify-center text-secondary rounded-full hover:bg-surface-container-low transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
              </button>
              {showProfile && (
                <div
                  className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-medium text-xs cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  <span className="material-symbols-outlined text-[18px]">person</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};
