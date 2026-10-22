import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { AdminHeader } from "../../components/layout/AdminHeader";
import { adminApi } from "../../api/adminApi";
import { Button } from "../../components/common/Button";

export const DriverDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    // BACKEND PLACEHOLDER: GET /api/v1/admin/drivers/:id
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await adminApi.getDriverDetail(id || "DRV-104");
        setDriver(res);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleApprove = async () => {
    // BACKEND PLACEHOLDER: PATCH /api/v1/admin/drivers/:id/kyc { status: 'VERIFIED' }
    await adminApi.updateDriverKyc(driver.id, "VERIFIED");
    setDriver({ ...driver, kycStatus: "VERIFIED" });
    alert("Driver KYC documents approved successfully!");
  };

  const handleReject = async () => {
    // BACKEND PLACEHOLDER: PATCH /api/v1/admin/drivers/:id/kyc { status: 'REJECTED', reason: rejectReason }
    await adminApi.updateDriverKyc(driver.id, "REJECTED", rejectReason);
    setDriver({ ...driver, kycStatus: "REJECTED", rejectionReason: rejectReason });
    setShowRejectModal(false);
    alert("Driver application rejected. SMS sent to driver with correction guidelines.");
  };

  if (!driver) return null;

  return (
    <div className="min-h-screen bg-surface">
      <AdminSidebar />
      <div className="pl-64 flex flex-col min-h-screen">
        <AdminHeader title={`Driver Dossier #${driver.id}`} breadcrumb="Drivers" />

        <main className="flex-1 px-8 pt-20 pb-12">
          {/* Back button & Action Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={() => navigate("/admin/drivers")}
              className="flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back to Drivers Directory</span>
            </button>

            {/* KYC Approval Actions */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="destructiveOutline"
                onClick={() => setShowRejectModal(true)}
              >
                Reject Documents
              </Button>
              <Button size="sm" onClick={handleApprove} icon="verified">
                Approve Driver KYC
              </Button>
            </div>
          </div>

          {/* Driver Overview Banner */}
          <div className="p-6 rounded-2xl bg-white border border-outline-variant/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center font-bold text-on-surface text-2xl">
                <span className="material-symbols-outlined text-[36px]">person</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                    {driver.name}
                  </h1>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      driver.kycStatus === "VERIFIED"
                        ? "bg-tertiary-container/30 text-tertiary"
                        : driver.kycStatus === "PENDING"
                        ? "bg-primary-fixed text-on-primary-fixed"
                        : "bg-error-container text-on-error-container"
                    }`}
                  >
                    {driver.kycStatus}
                  </span>
                </div>
                <p className="text-secondary text-xs mt-1">
                  Phone: <strong>{driver.phone}</strong> • Enrolled: {driver.joiningDate || "12 Jan 2025"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs">
              <div>
                <span className="text-secondary uppercase text-[11px] font-bold block">Rating</span>
                <span className="text-[18px] font-bold text-on-surface">⭐ {driver.rating || "4.85"}</span>
              </div>
              <div className="h-8 w-px bg-outline-variant/50"></div>
              <div>
                <span className="text-secondary uppercase text-[11px] font-bold block">Completed</span>
                <span className="text-[18px] font-bold text-on-surface">{driver.totalTrips || 456} trips</span>
              </div>
            </div>
          </div>

          {/* Two-Column Grid: Vehicle Specs & Documents */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Column 1: Vehicle RC Specs */}
            <div className="p-6 rounded-2xl bg-white border border-outline-variant/60 shadow-xs flex flex-col gap-4">
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface border-b border-outline-variant/30 pb-3">
                Vehicle Specifications
              </h3>

              <div className="flex flex-col gap-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-secondary">Vehicle Category</span>
                  <strong className="text-on-surface">{driver.vehicleType || "Tata Ace"}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Registration Plate Number</span>
                  <strong className="text-on-surface font-mono">{driver.plateNumber}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Fuel Type & Model</span>
                  <strong className="text-on-surface">Diesel • Tata Ace Gold 2023</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Commercial Goods Permit</span>
                  <strong className="text-tertiary">All-Karnataka Freight Permit</strong>
                </div>
              </div>
            </div>

            {/* Column 2: Documents Verification Dossier */}
            <div className="p-6 rounded-2xl bg-white border border-outline-variant/60 shadow-xs flex flex-col gap-4">
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface border-b border-outline-variant/30 pb-3">
                KYC Regulatory Documents
              </h3>

              <div className="flex flex-col gap-3">
                {/* DL */}
                <div className="p-3.5 rounded-xl bg-surface-container-low/60 border border-outline-variant/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[22px] text-secondary">badge</span>
                    <div>
                      <p className="font-bold text-on-surface">Commercial Driving License (DL)</p>
                      <p className="text-secondary">DL-KA06-201500123 • Valid till 2032</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-tertiary">Verified</span>
                </div>

                {/* RC */}
                <div className="p-3.5 rounded-xl bg-surface-container-low/60 border border-outline-variant/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[22px] text-secondary">description</span>
                    <div>
                      <p className="font-bold text-on-surface">Vehicle Registration Certificate (RC)</p>
                      <p className="text-secondary">{driver.plateNumber} • Commercial Goods Carrier</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-tertiary">Verified</span>
                </div>

                {/* Insurance */}
                <div className="p-3.5 rounded-xl bg-surface-container-low/60 border border-outline-variant/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[22px] text-secondary">verified_user</span>
                    <div>
                      <p className="font-bold text-on-surface">Commercial Vehicle Insurance</p>
                      <p className="text-secondary">HDFC ERGO Policy #884920 • Exp: Jan 2027</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-tertiary">Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rejection Modal */}
          {showRejectModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-outline-variant/60 shadow-xl flex flex-col gap-4">
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Reject Driver Documents
                </h3>
                <p className="text-xs text-secondary">
                  Specify the compliance reason for rejecting {driver.name}'s application.
                </p>

                <textarea
                  rows={3}
                  placeholder="e.g. Driving License photograph is unreadable or blurred..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl bg-surface-container-low border border-outline-variant/60 focus:outline-none focus:border-error"
                />

                <div className="flex justify-end gap-2 pt-2">
                  <Button size="sm" variant="outline" onClick={() => setShowRejectModal(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" variant="destructive" onClick={handleReject}>
                    Confirm Rejection
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
