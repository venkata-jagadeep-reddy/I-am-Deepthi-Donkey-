import React, { createContext, useContext, useState } from "react";
import { tripsApi } from "../api/tripsApi";
import { MOCK_ACTIVE_TRIP, MOCK_RESPONDING_DRIVERS } from "../mock/mockData";

const TripContext = createContext(null);

export const TripProvider = ({ children }) => {
  const [draftTrip, setDraftTrip] = useState({
    pickup: "APMC Yard, Gate 2, Tumakuru",
    drop: "Kunigal Town Market",
    distanceKm: 38,
    cargoType: "Vegetables",
    weightKg: 550,
    vehicleTierId: "tata_ace",
    vehicleName: "Tata Ace",
    estimatedFare: 950,
  });

  const [activeTrip, setActiveTrip] = useState(MOCK_ACTIVE_TRIP);
  const [respondingDrivers, setRespondingDrivers] = useState(MOCK_RESPONDING_DRIVERS);
  const [loading, setLoading] = useState(false);

  const updateDraft = (fields) => {
    setDraftTrip((prev) => ({ ...prev, ...fields }));
  };

  const createRequest = async (overrideDraft) => {
    setLoading(true);
    try {
      const data = await tripsApi.createRequest(overrideDraft || draftTrip);
      setActiveTrip({
        ...MOCK_ACTIVE_TRIP,
        id: data.tripId || "PNL-1042",
        status: "SEARCHING",
        pickup: { ...MOCK_ACTIVE_TRIP.pickup, address: draftTrip.pickup },
        drop: { ...MOCK_ACTIVE_TRIP.drop, address: draftTrip.drop },
      });
      return data;
    } finally {
      setLoading(false);
    }
  };

  const acceptDriverBid = async (driverId) => {
    setLoading(true);
    try {
      const result = await tripsApi.acceptDriverBid(activeTrip?.id || "PNL-1042", driverId);
      setActiveTrip((prev) => ({
        ...prev,
        status: "GOING_TO_PICKUP",
        driver: result.assignedDriver,
      }));
      return result;
    } finally {
      setLoading(false);
    }
  };

  const cancelActiveTrip = () => {
    setActiveTrip(null);
  };

  return (
    <TripContext.Provider
      value={{
        draftTrip,
        updateDraft,
        activeTrip,
        setActiveTrip,
        respondingDrivers,
        setRespondingDrivers,
        createRequest,
        acceptDriverBid,
        cancelActiveTrip,
        loading,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTrip must be used within a TripProvider");
  }
  return context;
};
