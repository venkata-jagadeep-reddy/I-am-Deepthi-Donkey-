import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Button } from "../../components/common/Button";
import { authApi } from "../../api/authApi";

export const DriverDocsSetupScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Document states
  const [docs, setDocs] = useState({
    dl: { name: "driving_license_front.jpg", uploaded: true },
    rc: { name: "rc_smart_card.pdf", uploaded: true },
    insurance: { name: "vehicle_insurance_2026.pdf", uploaded: true },
  });

  const handleFakeUpload = (key) => {
    setDocs((prev) => ({
      ...prev,
      [key]: { name: `${key}_uploaded.jpg`, uploaded: true },
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // BACKEND PLACEHOLDER: Calls POST /api/v1/drivers/documents with multipart FormData
      const formData = new FormData();
      formData.append("license", docs.dl.name);
      formData.append("rc", docs.rc.name);
      formData.append("insurance", docs.insurance.name);
      await authApi.uploadDriverDocuments(formData);

      navigate("/driver/verification-pending");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Document Upload" showBack />

      <div className="flex flex-col gap-4 mt-2">
        <div>
          <span className="font-label-sm text-secondary">Step 2 of 2</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1">
            Upload your documents
          </h2>
          <p className="font-body-md text-secondary mt-1">
            Required by Karnataka Transport Department for commercial goods hauling.
          </p>
        </div>

        {/* Document Upload Cards */}
        <div className="flex flex-col gap-3 mt-2">
          {/* 1. Commercial Driving License */}
          <div className="p-4 rounded-2xl border border-outline-variant/60 bg-surface-container-low/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-[22px]">badge</span>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-on-surface">Driving License (DL)</p>
                <p className="text-[12px] text-secondary">
                  {docs.dl.uploaded ? docs.dl.name : "Front & back photo"}
                </p>
              </div>
            </div>

            {docs.dl.uploaded ? (
              <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-tertiary bg-tertiary-container/20 px-2.5 py-1 rounded-full">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                Attached
              </span>
            ) : (
              <Button size="sm" variant="secondary" onClick={() => handleFakeUpload("dl")}>
                Upload
              </Button>
            )}
          </div>

          {/* 2. Vehicle Registration Certificate (RC) */}
          <div className="p-4 rounded-2xl border border-outline-variant/60 bg-surface-container-low/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-[22px]">description</span>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-on-surface">Vehicle RC Book</p>
                <p className="text-[12px] text-secondary">
                  {docs.rc.uploaded ? docs.rc.name : "Commercial permit copy"}
                </p>
              </div>
            </div>

            {docs.rc.uploaded ? (
              <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-tertiary bg-tertiary-container/20 px-2.5 py-1 rounded-full">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                Attached
              </span>
            ) : (
              <Button size="sm" variant="secondary" onClick={() => handleFakeUpload("rc")}>
                Upload
              </Button>
            )}
          </div>

          {/* 3. Commercial Vehicle Insurance */}
          <div className="p-4 rounded-2xl border border-outline-variant/60 bg-surface-container-low/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-[22px]">verified_user</span>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-on-surface">Vehicle Insurance</p>
                <p className="text-[12px] text-secondary">
                  {docs.insurance.uploaded ? docs.insurance.name : "Active policy document"}
                </p>
              </div>
            </div>

            {docs.insurance.uploaded ? (
              <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-tertiary bg-tertiary-container/20 px-2.5 py-1 rounded-full">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                Attached
              </span>
            ) : (
              <Button size="sm" variant="secondary" onClick={() => handleFakeUpload("insurance")}>
                Upload
              </Button>
            )}
          </div>
        </div>

        {/* Security assurance note */}
        <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center gap-2.5 mt-2">
          <span className="material-symbols-outlined text-[20px] text-primary">security</span>
          <p className="text-[12px] text-secondary leading-snug">
            Your documents are securely encrypted and verified solely for regulatory dispatch compliance.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-6 pb-2">
        <Button
          fullWidth
          size="lg"
          onClick={handleSubmit}
          loading={loading}
          disabled={!docs.dl.uploaded || !docs.rc.uploaded}
          icon="upload_file"
        >
          Submit for Hub Verification
        </Button>
      </div>
    </div>
  );
};
