import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";

export const WelcomeRoleScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-between px-margin py-8 min-h-[780px] bg-surface-container-lowest">
      {/* Top Brand Banner */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary-container text-[20px]">
              local_shipping
            </span>
          </div>
          <span className="font-headline-md text-headline-md font-bold text-on-surface">PickNLoad</span>
        </div>
        <span className="text-xs text-secondary bg-surface-container-low px-2 py-0.5 rounded-full">
          Karnataka Freight
        </span>
      </div>

      {/* Visual illustration / hero block */}
      <div className="flex flex-col items-center text-center my-auto py-6">
        <div className="w-24 h-24 rounded-3xl bg-surface-container-low flex items-center justify-center mb-6 shadow-xs border border-outline-variant/30">
          <span className="material-symbols-outlined text-[48px] text-primary">
            forklift
          </span>
        </div>

        <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
          Reliable Logistics at your fingertips
        </h1>
        <p className="font-body-md text-body-md text-secondary mt-3 max-w-xs">
          Direct intra-city freight transport for businesses, APMC traders, and verified drivers.
        </p>

        {/* Value props */}
        <div className="flex flex-col gap-3 mt-8 w-full max-w-xs text-left">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low/70 border border-outline-variant/30">
            <span className="material-symbols-outlined text-tertiary text-[22px]">verified_user</span>
            <div>
              <p className="text-[13px] font-semibold text-on-surface">100% KYC Verified Fleet</p>
              <p className="text-[11px] text-secondary">Aadhaar & RC background check</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low/70 border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary text-[22px]">currency_rupee</span>
            <div>
              <p className="text-[13px] font-semibold text-on-surface">Transparent Upfront Pricing</p>
              <p className="text-[11px] text-secondary">Zero hidden costs or surge pricing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="flex flex-col gap-3 pb-4">
        <Button
          fullWidth
          size="lg"
          onClick={() => navigate("/choose-role")}
          icon="arrow_forward"
        >
          Get Started
        </Button>
        <p className="text-center text-[12px] text-secondary">
          By continuing, you agree to PickNLoad Freight Terms & Policies
        </p>
      </div>
    </div>
  );
};
