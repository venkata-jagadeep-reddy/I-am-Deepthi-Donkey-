import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SplashScreen = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(20);
  const [statusText, setStatusText] = useState("Verifying GPS signal...");

  useEffect(() => {
    // BACKEND PLACEHOLDER: Fetch app initialization config, check network & GPS
    const steps = [
      { width: 45, text: "Connecting nearby fleet..." },
      { width: 75, text: "Loading vehicle rates..." },
      { width: 100, text: "Ready" },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].width);
        setStatusText(steps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          navigate("/welcome-role");
        }, 300);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="flex-1 flex flex-col justify-between items-center px-margin py-12 select-none min-h-[780px] bg-surface-container-lowest">
      <div className="w-full flex justify-end items-center opacity-70">
        <span className="font-label-sm text-label-sm text-secondary">v2.4.0</span>
      </div>

      <div className="flex flex-col items-center justify-center text-center -mt-8">
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute -inset-2 bg-primary-container/20 rounded-3xl blur-md"></div>
          <div className="relative w-20 h-20 bg-primary-container rounded-2xl flex items-center justify-center shadow-md">
            <span
              className="material-symbols-outlined text-surface-container-lowest text-[44px]"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}
            >
              local_shipping
            </span>
          </div>
        </div>

        <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold">
          PickNLoad
        </h1>
        <p className="font-body-md text-body-md text-secondary mt-1 tracking-normal font-normal">
          Move goods. Find nearby drivers.
        </p>

        <div className="mt-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-secondary border border-outline-variant/30">
          <span
            className="material-symbols-outlined text-[15px] text-tertiary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Intra-City Logistics Network
          </span>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center gap-4 pb-4">
        <div className="w-48 h-1.5 bg-surface-container-high rounded-full overflow-hidden relative">
          <div
            className="h-full bg-primary-container rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-tertiary-container animate-ping"></div>
          <span className="font-label-sm text-label-sm text-secondary tracking-wide">
            {statusText}
          </span>
        </div>
        <div className="mt-2 text-center">
          <p className="font-label-sm text-label-sm text-secondary/60">
            Fast. Reliable. Verified Hauling.
          </p>
        </div>
      </div>
    </div>
  );
};
