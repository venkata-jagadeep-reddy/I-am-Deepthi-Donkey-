import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { authApi } from "../../api/authApi";

export const LoginScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { role, setUser, setRole, loginWithPhone, loading } = useAuth();
  const targetRole = searchParams.get("role") || role || "customer";

  const [loginMethod, setLoginMethod] = useState("email"); // "email" (tested in HAR) | "phone"
  const [email, setEmail] = useState(
    targetRole === "driver" ? "vikasdriver@example.com" : "vikas@example.com"
  );
  const [password, setPassword] = useState(targetRole === "driver" ? "12345678" : "Vikas#2007");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(val);
    if (error) setError("");
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // TESTED ROUTE: POST /api/auth/login
      const res = await authApi.login(email, password);
      if (res?.data?.user) {
        setUser(res.data.user);
        const actualRole = res.data.user.role === "driver" ? "driver" : "customer";
        setRole(actualRole);
        if (actualRole === "driver") {
          navigate("/driver/home");
        } else {
          navigate("/customer/home");
        }
      }
    } catch (err) {
      setError(err.message || "Login failed. Check your email and password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit Indian mobile number");
      return;
    }

    try {
      await loginWithPhone(phone, targetRole);
      navigate(`/verify-otp?phone=${encodeURIComponent(phone)}&role=${targetRole}`);
    } catch (err) {
      setError(err.message || "Failed to send verification code. Try again.");
    }
  };

  const setPresetCredentials = (presetRole) => {
    if (presetRole === "shipper") {
      setEmail("vikas@example.com");
      setPassword("Vikas#2007");
    } else if (presetRole === "driver") {
      setEmail("vikasdriver@example.com");
      setPassword("12345678");
    } else if (presetRole === "admin") {
      setEmail("admin@gmail.com");
      setPassword("admin123");
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Account Login" showBack />

      <div className="flex flex-col gap-4 mt-4">
        <div>
          <span className="font-label-sm text-secondary">Authentication</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1">
            Welcome to PickNLoad
          </h2>
          <p className="font-body-md text-secondary mt-1">
            Sign in with tested backend credentials or mobile OTP.
          </p>
        </div>

        {/* Login Method Toggle */}
        <div className="flex bg-surface-container-low p-1 rounded-xl border border-outline-variant/40 mt-1">
          <button
            type="button"
            onClick={() => setLoginMethod("email")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              loginMethod === "email"
                ? "bg-white text-on-surface shadow-xs"
                : "text-secondary hover:text-on-surface"
            }`}
          >
            Email & Password (API Tested)
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod("phone")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              loginMethod === "phone"
                ? "bg-white text-on-surface shadow-xs"
                : "text-secondary hover:text-on-surface"
            }`}
          >
            Phone & OTP
          </button>
        </div>

        {loginMethod === "email" ? (
          <form onSubmit={handleEmailLogin} className="flex flex-col gap-3 mt-2">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. vikas@example.com"
              leadingIcon="mail"
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              leadingIcon="lock"
              required
            />

            {/* Error Notification */}
            {error && (
              <div className="p-3 rounded-xl bg-error-container/40 border border-error/30 text-on-error-container text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-error">error</span>
                <span>{error}</span>
              </div>
            )}

            {/* Quick Presets from HAR */}
            <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-surface-container-low/70 border border-outline-variant/30 text-xs mt-1">
              <span className="text-[11px] font-bold text-secondary uppercase">
                🚀 Insomnia Tested Quick Credentials:
              </span>
              <div className="flex items-center gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setPresetCredentials("shipper")}
                  className="px-2 py-1 bg-white hover:bg-surface border border-outline-variant/50 rounded-lg text-[11px] font-semibold text-primary"
                >
                  Consignor (vikas@...)
                </button>
                <button
                  type="button"
                  onClick={() => setPresetCredentials("driver")}
                  className="px-2 py-1 bg-white hover:bg-surface border border-outline-variant/50 rounded-lg text-[11px] font-semibold text-primary"
                >
                  Driver (vikasdriver@...)
                </button>
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={isSubmitting}
              icon="login"
              className="mt-2"
            >
              Sign In (POST /api/auth/login)
            </Button>
          </form>
        ) : (
          <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-3 mt-2">
            <label className="font-label-sm text-secondary font-medium">Mobile Number</label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 flex items-center gap-1.5 pr-2 border-r border-outline-variant/60 text-on-surface font-medium text-[15px] select-none">
                <span>+91</span>
              </div>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="98765 43210"
                value={phone}
                onChange={handlePhoneChange}
                autoFocus
                className="w-full min-h-[52px] pl-20 pr-4 rounded-xl bg-surface-container-lowest text-on-surface font-headline-md text-[17px] border border-outline-variant/60 shadow-sm focus:outline-none focus:border-primary-container"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-error-container/40 border border-error/30 text-on-error-container text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-error">error</span>
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={loading}
              disabled={phone.length !== 10}
              icon="sms"
              className="mt-2"
            >
              Send Verification Code
            </Button>
          </form>
        )}
      </div>

      <div className="flex flex-col gap-2 pt-6 pb-2 text-center text-xs text-secondary">
        <span>Backend target: <code>http://localhost:5000/api</code></span>
      </div>
    </div>
  );
};
