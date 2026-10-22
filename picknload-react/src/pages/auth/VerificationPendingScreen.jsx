import React from "react";
import { useNavigate } from "react-router-dom";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Button } from "../../components/common/Button";

export const VerificationPendingScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Verification Status" showLogo />

      <div className="flex flex-col items-center text-center my-auto py-6">
        <div className="relative flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary-fixed/60 flex items-center justify-center text-on-primary-fixed animate-pulse">
            <span className="material-symbols-outlined text-[40px]">hourglass_top</span>
          </div>
        </div>

        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
          We're verifying your documents
        </h2>
        <p className="font-body-md text-secondary mt-2 max-w-xs">
          Tumakuru Regional Hub ops team is reviewing your Driving License and Vehicle RC.
        </p>

        {/* SLA Card */}
        <div className="w-full max-w-xs p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/40 mt-6 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
            <span className="text-[12px] text-secondary font-medium">Estimated Activation</span>
            <span className="text-[13px] font-bold text-primary">Within 2 to 4 Hours</span>
          </div>

          <div className="flex flex-col gap-3 pt-3">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
              <span className="text-[12px] text-on-surface">Vehicle Registration Submitted</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
              <span className="text-[12px] text-on-surface">Documents Uploaded</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-primary text-[18px] animate-spin">sync</span>
              <span className="text-[12px] font-medium text-on-surface">Backoffice RTO Verification in Progress</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-6 pb-2">
        <Button
          fullWidth
          size="lg"
          onClick={() => navigate("/driver/home")}
          icon="speed"
        >
          Go to Driver Home
        </Button>
        <Button
          fullWidth
          size="md"
          variant="secondary"
          onClick={() => alert("Calling PickNLoad Fleet Helpline: 1800-419-5500")}
          icon="call"
        >
          Call Hub Support Helpline
        </Button>
      </div>
    </div>
  );
};
