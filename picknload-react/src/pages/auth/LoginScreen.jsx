import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Button } from "../../components/common/Button";

export const LoginScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { role, loginWithPhone, loading } = useAuth();
  const targetRole = searchParams.get("role") || role || "customer";

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(val);
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit Indian mobile number");
      return;
    }

    try {
      // BACKEND PLACEHOLDER: Calls POST /api/v1/auth/otp/send
      await loginWithPhone(phone, targetRole);
      navigate(`/verify-otp?phone=${encodeURIComponent(phone)}&role=${targetRole}`);
    } catch (err) {
      setError(err.message || "Failed to send verification code. Try again.");
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Phone Login" showBack />

      <div className="flex flex-col gap-4 mt-6">
        <div>
          <span className="font-label-sm text-secondary">Step 2 of 3</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1">
            Welcome to PickNLoad
          </h2>
          <p className="font-body-md text-secondary mt-1">
            Enter your mobile number to receive a 4-digit verification code.
          </p>
        </div>

        {/* Input box */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
          <label className="font-label-sm text-secondary font-medium">Mobile Number</label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center gap-1.5 pr-2 border-r border-outline-variant/60 text-on-surface font-medium text-[15px] select-none">
              <span className="text-sm">🇮🇳</span>
              <span>+91</span>
            </div>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="98765 43210"
              value={phone}
              onChange={handlePhoneChange}
              autoFocus
              className={`
                w-full min-h-[52px] pl-24 pr-4 rounded-xl bg-surface-container-lowest text-on-surface font-headline-md text-[17px] tracking-wide
                border border-outline-variant/60 shadow-sm transition-all focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container
                ${error ? "border-error focus:border-error focus:ring-error bg-error-container/10" : ""}
              `}
            />
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3 rounded-xl bg-error-container/40 border border-error/30 text-on-error-container text-xs flex items-center gap-2 mt-1">
              <span className="material-symbols-outlined text-[18px] text-error">error</span>
              <span>{error}</span>
            </div>
          )}

          <div className="mt-2 flex items-center gap-2 text-xs text-secondary">
            <span className="material-symbols-outlined text-[16px] text-tertiary">lock</span>
            <span>We never share your number or spam you.</span>
          </div>
        </form>
      </div>

      <div className="flex flex-col gap-3 pt-6 pb-2">
        <Button
          fullWidth
          size="lg"
          onClick={handleSubmit}
          loading={loading}
          disabled={phone.length !== 10}
          icon="sms"
        >
          Send Verification Code
        </Button>
        <p className="text-center text-[11px] text-secondary">
          By signing in, you agree to our Terms of Freight Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};
