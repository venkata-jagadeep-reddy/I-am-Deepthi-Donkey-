import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authApi } from "../../api/authApi";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";

export const CustomerProfileSetupScreen = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [fullName, setFullName] = useState(user?.name || "Keerthana R.");
  const [businessName, setBusinessName] = useState(user?.businessName || "Sri Balaji Agro Commodities");
  const [email, setEmail] = useState(user?.email || "keerthana.ml@gmail.com");
  const [gstin, setGstin] = useState(user?.gstin || "29AABCU9603R1ZM");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // BACKEND PLACEHOLDER: POST /api/v1/customers/profile
      const res = await authApi.setupCustomerProfile({
        fullName,
        businessName,
        email,
        gstin,
      });
      setUser(res.user);
      navigate("/customer/home");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Profile Details" showBack />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <div>
          <span className="font-label-sm text-secondary">Consignor Setup</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1">
            Tell us about you
          </h2>
          <p className="font-body-md text-secondary mt-1">
            This information will be displayed on trip waybills and freight invoices.
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <Input
            label="Full Name *"
            placeholder="e.g. Keerthana R."
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            leadingIcon="person"
            required
          />

          <Input
            label="Business / Mandi Stall Name (Optional)"
            placeholder="e.g. Sri Balaji Agro Commodities"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            leadingIcon="storefront"
          />

          <Input
            label="Email Address (For Tax Invoices)"
            type="email"
            placeholder="e.g. keerthana@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leadingIcon="mail"
          />

          <Input
            label="GSTIN (Optional)"
            placeholder="e.g. 29AABCU9603R1ZM"
            value={gstin}
            onChange={(e) => setGstin(e.target.value.toUpperCase())}
            leadingIcon="receipt_long"
            helperText="Provide GSTIN to claim Input Tax Credit on transport charges"
          />
        </div>
      </form>

      <div className="flex flex-col gap-3 pt-6 pb-2">
        <Button
          fullWidth
          size="lg"
          onClick={handleSubmit}
          loading={loading}
          disabled={!fullName.trim()}
          icon="check_circle"
        >
          Save & Enter PickNLoad
        </Button>
      </div>
    </div>
  );
};
