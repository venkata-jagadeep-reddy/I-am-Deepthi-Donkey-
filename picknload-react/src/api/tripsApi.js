import { apiFetch, USE_MOCK, simulateDelay } from "./apiClient";
import { MOCK_ACTIVE_TRIP, MOCK_RESPONDING_DRIVERS, VEHICLE_TIERS, MOCK_ADMIN_TRIPS } from "../mock/mockData";

export const tripsApi = {
  /**
   * Get Vehicle Tiers and Pricing Models
   * BACKEND ENDPOINT: GET /api/v1/vehicles/tiers
   */
  async getVehicleTiers() {
    if (USE_MOCK) {
      await simulateDelay(200);
      return VEHICLE_TIERS;
    }
    return apiFetch("/vehicles/tiers");
  },

  /**
   * Calculate Fare Estimate and Route Distance
   * BACKEND ENDPOINT: POST /api/v1/trips/estimate
   * PAYLOAD: { pickupAddress, dropAddress, vehicleTierId, weightKg }
   */
  async estimateFare({ pickupAddress, dropAddress, vehicleTierId, weightKg }) {
    if (USE_MOCK) {
      await simulateDelay(400);
      const tier = VEHICLE_TIERS.find((v) => v.id === vehicleTierId) || VEHICLE_TIERS[0];
      const approxKm = 38;
      const baseFare = tier.baseFare;
      const distanceFare = approxKm * tier.perKm;
      const total = baseFare + distanceFare;

      return {
        distanceKm: approxKm,
        estimatedTimeMin: 65,
        baseFare,
        distanceFare,
        totalFare: total,
        currency: "₹",
        pickupAddress,
        dropAddress,
        vehicleTier: tier.name,
      };
    }

    return apiFetch("/trips/estimate", {
      method: "POST",
      body: JSON.stringify({ pickupAddress, dropAddress, vehicleTierId, weightKg }),
    });
  },

  /**
   * Create New Freight Booking Request
   * BACKEND ENDPOINT: POST /api/v1/trips/create
   * PAYLOAD: { pickup, drop, goodsType, weightKg, vehicleTierId, totalFare }
   */
  async createRequest(payload) {
    if (USE_MOCK) {
      await simulateDelay(600);
      const newTripId = `PNL-${Math.floor(1000 + Math.random() * 9000)}`;
      return {
        success: true,
        tripId: newTripId,
        status: "SEARCHING",
        otp: "4829",
        message: "Broadcasting request to nearby commercial drivers...",
        ...payload,
      };
    }

    return apiFetch("/trips/create", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Poll or Listen for Responding Driver Bids
   * BACKEND ENDPOINT: GET /api/v1/trips/:id/bids
   */
  async getRespondingDrivers(tripId) {
    if (USE_MOCK) {
      await simulateDelay(500);
      return MOCK_RESPONDING_DRIVERS;
    }
    return apiFetch(`/trips/${tripId}/bids`);
  },

  /**
   * Customer Accepts a Driver's Bid
   * BACKEND ENDPOINT: POST /api/v1/trips/:id/accept-bid
   * PAYLOAD: { driverId }
   */
  async acceptDriverBid(tripId, driverId) {
    if (USE_MOCK) {
      await simulateDelay(600);
      const driver = MOCK_RESPONDING_DRIVERS.find((d) => d.id === driverId) || MOCK_RESPONDING_DRIVERS[0];
      return {
        success: true,
        tripId,
        status: "GOING_TO_PICKUP",
        assignedDriver: driver,
        otp: "4829",
      };
    }
    return apiFetch(`/trips/${tripId}/accept-bid`, {
      method: "POST",
      body: JSON.stringify({ driverId }),
    });
  },

  /**
   * Get Active In-Progress Trip for Customer
   * BACKEND ENDPOINT: GET /api/v1/trips/active
   */
  async getActiveTrip() {
    if (USE_MOCK) {
      await simulateDelay(300);
      return MOCK_ACTIVE_TRIP;
    }
    return apiFetch("/trips/active");
  },

  /**
   * Get Specific Trip Details
   * BACKEND ENDPOINT: GET /api/v1/trips/:id
   */
  async getTripById(tripId) {
    if (USE_MOCK) {
      await simulateDelay(300);
      return { ...MOCK_ACTIVE_TRIP, id: tripId || "PNL-1042" };
    }
    return apiFetch(`/trips/${tripId}`);
  },

  /**
   * Get Customer Historical Trips
   * BACKEND ENDPOINT: GET /api/v1/customers/trips?status=completed
   */
  async getCustomerTripHistory() {
    if (USE_MOCK) {
      await simulateDelay(400);
      return MOCK_ADMIN_TRIPS.slice(0, 3);
    }
    return apiFetch("/customers/trips");
  },

  /**
   * Submit Trip Rating and Tip
   * BACKEND ENDPOINT: POST /api/v1/trips/:id/rating
   * PAYLOAD: { rating: number, feedback: string, tipAmount: number }
   */
  async submitRating(tripId, { rating, feedback, tipAmount = 0 }) {
    if (USE_MOCK) {
      await simulateDelay(500);
      return {
        success: true,
        tripId,
        message: "Thank you for rating your driver partner!",
      };
    }
    return apiFetch(`/trips/${tripId}/rating`, {
      method: "POST",
      body: JSON.stringify({ rating, feedback, tipAmount }),
    });
  },
};
