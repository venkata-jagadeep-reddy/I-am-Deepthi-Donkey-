import React, { createContext, useContext, useState } from "react";
import { driverApi } from "../api/driverApi";
import { MOCK_DRIVER_REQUESTS, MOCK_ACTIVE_TRIP, MOCK_USER_DRIVER } from "../mock/mockData";

const DriverDutyContext = createContext(null);

export const DriverDutyProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(MOCK_USER_DRIVER.isOnline);
  const [driverProfile, setDriverProfile] = useState(MOCK_USER_DRIVER);
  const [nearbyRequests, setNearbyRequests] = useState(MOCK_DRIVER_REQUESTS);
  const [assignedTrip, setAssignedTrip] = useState(MOCK_ACTIVE_TRIP);
  const [tripStage, setTripStage] = useState("GOING_TO_PICKUP"); // "GOING_TO_PICKUP" | "GOODS_LOADED" | "IN_TRANSIT" | "DELIVERED"
  const [loading, setLoading] = useState(false);

  const toggleDuty = async () => {
    const nextState = !isOnline;
    setIsOnline(nextState);
    await driverApi.toggleDutyStatus(nextState);
  };

  const acceptRequest = async (requestId) => {
    setLoading(true);
    try {
      const result = await driverApi.acceptRequest(requestId);
      setAssignedTrip(result.trip || MOCK_ACTIVE_TRIP);
      setTripStage("GOING_TO_PICKUP");
      return result;
    } finally {
      setLoading(false);
    }
  };

  const advanceTripStage = async (nextStage) => {
    setLoading(true);
    try {
      await driverApi.updateTripStatus(assignedTrip?.id || "PNL-1042", nextStage);
      setTripStage(nextStage);
    } finally {
      setLoading(false);
    }
  };

  const completeTrip = async (otp) => {
    setLoading(true);
    try {
      const result = await driverApi.verifyDeliveryOtp(assignedTrip?.id || "PNL-1042", otp);
      setTripStage("DELIVERED");
      return result;
    } finally {
      setLoading(false);
    }
  };

  return (
    <DriverDutyContext.Provider
      value={{
        isOnline,
        toggleDuty,
        driverProfile,
        setDriverProfile,
        nearbyRequests,
        setNearbyRequests,
        assignedTrip,
        tripStage,
        advanceTripStage,
        acceptRequest,
        completeTrip,
        loading,
      }}
    >
      {children}
    </DriverDutyContext.Provider>
  );
};

export const useDriverDuty = () => {
  const context = useContext(DriverDutyContext);
  if (!context) {
    throw new Error("useDriverDuty must be used within a DriverDutyProvider");
  }
  return context;
};
