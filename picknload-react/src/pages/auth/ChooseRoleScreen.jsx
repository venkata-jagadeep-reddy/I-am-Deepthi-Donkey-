import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Button } from "../../components/common/Button";

export const ChooseRoleScreen = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuth();
  const [selected, setSelected] = useState("customer"); // "customer" | "driver"

  const handleContinue = () => {
    switchRole(selected);
    navigate(`/login?role=${selected}`);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Choose Account Type" showBack />

      <div className="flex flex-col gap-2 mt-4">
        <span className="font-label-sm text-secondary">Step 1 of 3</span>
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
          How will you use PickNLoad?
        </h2>
        <p className="font-body-md text-secondary">
          Choose your role to get a tailored transport and dispatch experience.
        </p>

        {/* Option 1: Consignor / Business */}
        <div
          onClick={() => setSelected("customer")}
          className={`
            p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 mt-4
            ${
              selected === "customer"
                ? "border-primary-container bg-surface-container-low/40 shadow-sm"
                : "border-outline-variant/50 bg-white hover:border-outline-variant"
            }
          `}
        >
          <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[28px]">inventory_2</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-md text-[17px] font-bold text-on-surface">
                I want to ship goods
              </h3>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selected === "customer" ? "border-primary-container bg-primary-container" : "border-outline-variant"
                }`}
              >
                {selected === "customer" && <div className="w-2 h-2 rounded-full bg-slate-900" />}
              </div>
            </div>
            <p className="text-[13px] text-secondary mt-1">
              For traders, APMC merchants, retail shops, and individuals needing intra-city hauling.
            </p>
          </div>
        </div>

        {/* Option 2: Driver Partner */}
        <div
          onClick={() => setSelected("driver")}
          className={`
            p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 mt-3
            ${
              selected === "driver"
                ? "border-primary-container bg-surface-container-low/40 shadow-sm"
                : "border-outline-variant/50 bg-white hover:border-outline-variant"
            }
          `}
        >
          <div className="w-12 h-12 rounded-xl bg-tertiary-container/20 flex items-center justify-center text-tertiary shrink-0">
            <span className="material-symbols-outlined text-[28px]">local_shipping</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-md text-[17px] font-bold text-on-surface">
                I own or drive a vehicle
              </h3>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selected === "driver" ? "border-primary-container bg-primary-container" : "border-outline-variant"
                }`}
              >
                {selected === "driver" && <div className="w-2 h-2 rounded-full bg-slate-900" />}
              </div>
            </div>
            <p className="text-[13px] text-secondary mt-1">
              Tata Ace, Pickup truck, or 3-wheeler owners looking for daily commercial loads and instant payouts.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-6 pb-2">
        <Button fullWidth size="lg" onClick={handleContinue} icon="arrow_forward">
          Continue as {selected === "customer" ? "Consignor" : "Driver Partner"}
        </Button>
      </div>
    </div>
  );
};
