import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { Button } from "../../components/common/Button";
import { tripsApi } from "../../api/tripsApi";

export const TripCompletedRatingScreen = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(5);
  const [tip, setTip] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // BACKEND PLACEHOLDER: POST /api/v1/trips/:id/rating
      await tripsApi.submitRating("PNL-1042", {
        rating,
        feedback,
        tipAmount: tip,
      });
      navigate("/customer/home");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-margin pt-20 pb-8 min-h-[780px] bg-surface-container-lowest">
      <MobileHeader title="Trip Completed" showLogo />

      <div className="flex flex-col items-center text-center my-auto py-4">
        {/* Delivered Success Icon */}
        <div className="w-16 h-16 rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary mb-3">
          <span
            className="material-symbols-outlined text-[36px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </div>

        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
          Delivered successfully!
        </h2>
        <p className="font-body-md text-secondary mt-1">
          Trip #PNL-1042 • Tumakuru to Kunigal (38 km)
        </p>

        {/* Bill Receipt Card */}
        <div className="w-full max-w-xs p-4 rounded-2xl bg-surface-container-low/60 border border-outline-variant/40 mt-5 flex justify-between items-center text-left">
          <div>
            <p className="text-[11px] font-semibold text-secondary uppercase">Amount Paid</p>
            <p className="text-[22px] font-bold text-on-surface font-headline-lg">₹950</p>
          </div>
          <span className="text-xs font-semibold text-tertiary bg-tertiary-container/20 px-2.5 py-1 rounded-full flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">done_all</span>
            Paid (COD)
          </span>
        </div>

        {/* Driver Rating Box */}
        <div className="w-full max-w-xs p-4 rounded-2xl bg-white border border-outline-variant/60 shadow-xs mt-4 flex flex-col items-center">
          <p className="text-xs font-bold text-secondary uppercase">Rate Ravi Kumar</p>
          <p className="text-[14px] font-bold text-on-surface mt-0.5">Tata Ace • KA-06-XX-1234</p>

          {/* 5 Stars */}
          <div className="flex items-center gap-2 my-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-amber-400 hover:scale-110 transition-transform"
              >
                <span
                  className="material-symbols-outlined text-[32px]"
                  style={star <= rating ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  star
                </span>
              </button>
            ))}
          </div>

          {/* Tip Chips */}
          <div className="w-full pt-3 border-t border-outline-variant/30 flex flex-col gap-2">
            <span className="text-[11px] font-semibold text-secondary text-left">
              Add a tip for your driver?
            </span>
            <div className="grid grid-cols-4 gap-2">
              {[0, 20, 50, 100].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setTip(amount)}
                  className={`py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    tip === amount
                      ? "bg-primary-container text-on-primary-container border-primary-container"
                      : "bg-surface-container-low text-secondary border-outline-variant/40 hover:bg-surface-container"
                  }`}
                >
                  {amount === 0 ? "None" : `+₹${amount}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-6 pb-2">
        <Button
          fullWidth
          size="lg"
          onClick={handleSubmit}
          loading={loading}
          icon="send"
        >
          Submit Feedback & Done
        </Button>
      </div>
    </div>
  );
};
