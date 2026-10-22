import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Button } from "../../components/common/Button";

export const VerifyOtpScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { verifyOtp, loading } = useAuth();

  const phone = searchParams.get("phone") || "98765 43210";
  const role = searchParams.get("role") || "customer";

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(29);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    inputRefs[0]?.current?.focus();
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (error) setError("");

    if (value && index < 3) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1]?.current?.focus();
    }
  };

  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    const enteredCode = otp.join("");
    if (enteredCode.length !== 4) {
      setError("Please enter the complete 4-digit code.");
      return;
    }

    try {
      // BACKEND PLACEHOLDER: POST /api/v1/auth/otp/verify { phone, otp, role }
      await verifyOtp(phone, enteredCode, role);

      if (role === "driver") {
        navigate("/driver/vehicle-setup");
      } else {
        navigate("/customer/profile-setup");
      }
    } catch (err) {
      setError(err.message || "Incorrect verification code. Please try again.");
    }
  };

  const handleResend = () => {
    setTimer(30);
    setError("");
    setOtp(["", "", "", ""]);
    inputRefs[0]?.current?.focus();
    // BACKEND PLACEHOLDER: Call resend OTP endpoint
  };

  const isComplete = otp.every((d) => d !== "");

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Verify OTP" showBack />

      <div className="flex flex-col gap-4 mt-6">
        <div>
          <span className="font-label-sm text-secondary">Step 3 of 3</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1">
            Verify your number
          </h2>
          <p className="font-body-md text-secondary mt-1">
            We sent a 4-digit code to <span className="font-semibold text-on-surface">+91 {phone}</span>
          </p>
        </div>

        {/* 4 Digit OTP Box */}
        <div className="flex justify-center gap-3 my-4">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={inputRefs[idx]}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className={`
                w-14 h-16 text-center font-headline-xl text-[24px] font-bold rounded-2xl bg-surface-container-low/50
                border-2 transition-all focus:outline-none focus:border-primary-container focus:bg-white
                ${
                  error
                    ? "border-error text-error bg-error-container/10"
                    : digit
                    ? "border-primary-container text-on-surface"
                    : "border-outline-variant/60 text-on-surface"
                }
              `}
            />
          ))}
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-3.5 rounded-xl bg-error-container/40 border border-error/30 text-on-error-container text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-error">warning</span>
            <span>{error}</span>
          </div>
        )}

        {/* Resend timer block */}
        <div className="flex items-center justify-between text-sm pt-2">
          {timer > 0 ? (
            <span className="text-secondary text-xs">
              Resend code in <strong className="text-on-surface">{timer}s</strong>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-primary font-semibold text-xs hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
              Resend verification code
            </button>
          )}

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-secondary text-xs hover:text-on-surface"
          >
            Change number
          </button>
        </div>

        {/* Development Hint */}
        <div className="p-2.5 rounded-lg bg-surface-container-low text-[11px] text-secondary text-center mt-2 border border-outline-variant/30">
          💡 Test OTP hint: enter <strong>1234</strong> or <strong>4829</strong>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-6 pb-2">
        <Button
          fullWidth
          size="lg"
          onClick={handleVerify}
          loading={loading}
          disabled={!isComplete}
          icon="verified"
        >
          Verify & Continue
        </Button>
      </div>
    </div>
  );
};
