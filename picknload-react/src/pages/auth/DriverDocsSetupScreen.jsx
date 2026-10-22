import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { authApi } from "../../api/authApi";

export const DriverDocsSetupScreen = () => {
  const navigate = useNavigate();
  const [licenseNumber, setLicenseNumber] = useState("KA0120261234567");
  const [licenseExpiry, setLicenseExpiry] = useState("2030-12-31");
  const [experienceYears, setExperienceYears] = useState(3);
  const [city, setCity] = useState("Tumkur");
  const [state, setState] = useState("Karnataka");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // TESTED ROUTE: POST /api/driver/profile
      await authApi.createDriverProfile({
        licenseNumber,
        licenseExpiry,
        experienceYears,
        city,
        state,
      });

      navigate("/driver/verification-pending");
    } catch (err) {
      setError(err.message || "Failed to submit driver profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Driver License & Profile" showBack />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2 pb-6">
        <div>
          <span className="font-label-sm text-secondary">Step 2 of 2</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1">
            Driver Compliance Profile
          </h2>
          <p className="font-body-md text-secondary mt-1">
            Registered via <code>POST /api/driver/profile</code> with Driving License credentials.
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-1">
          <Input
            label="Commercial Driving License (DL) Number *"
            placeholder="e.g. KA0120261234567"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value.toUpperCase())}
            leadingIcon="badge"
            required
          />

          <Input
            label="License Expiry Date *"
            type="date"
            value={licenseExpiry}
            onChange={(e) => setLicenseExpiry(e.target.value)}
            leadingIcon="calendar_today"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Experience (Years) *"
              type="number"
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
              required
            />
            <Input
              label="Operating City *"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <Input
            label="State *"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />

          {error && (
            <div className="p-3 rounded-xl bg-error-container/40 border border-error/30 text-on-error-container text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-error">error</span>
              <span>{error}</span>
            </div>
          )}
        </div>
      </form>

      <div className="flex flex-col gap-3 pt-4 pb-2">
        <Button
          fullWidth
          size="lg"
          onClick={handleSubmit}
          loading={loading}
          disabled={!licenseNumber.trim()}
          icon="upload_file"
        >
          Submit Profile (POST /api/driver/profile)
        </Button>
      </div>
    </div>
  );
};
