import { apiFetch, USE_MOCK, simulateDelay } from "./apiClient";
import { MOCK_ACTIVE_TRIP, MOCK_RESPONDING_DRIVERS, VEHICLE_TIERS, MOCK_ADMIN_TRIPS } from "../mock/mockData";

export const tripsApi = {
  /**
   * TESTED ROUTE: POST /api/bookings
   * PAYLOAD: {
   *   pickupLocation: { address, city },
   *   dropLocation: { address, city },
   *   goods: { description, weightKg },
   *   vehicleType: 'tata-ace'
   * }
   */
  async createRequest(payload) {
    // Format to tested backend schema
    const formattedPayload = {
      pickupLocation: {
        address: typeof payload.pickup === "string" ? payload.pickup : payload.pickupLocation?.address || "Tumkur Market",
        city: payload.pickupCity || payload.pickupLocation?.city || "Tumkur",
      },
      dropLocation: {
        address: typeof payload.drop === "string" ? payload.drop : payload.dropLocation?.address || "KR Market",
        city: payload.dropCity || payload.dropLocation?.city || "Bengaluru",
      },
      goods: {
        description: payload.cargoType || payload.goods?.description || "Vegetable boxes",
        weightKg: Number(payload.weightKg || payload.goods?.weightKg || 500),
      },
      vehicleType: payload.vehicleTierId ? payload.vehicleTierId.replace("_", "-") : "tata-ace",
    };

    if (USE_MOCK) {
      await simulateDelay(600);
      const newTripId = `PNL-${Math.floor(1000 + Math.random() * 9000)}`;
      return {
        statusCode: 201,
        success: true,
        message: "Transport request created successfully",
        data: {
          _id: "6ad9f303004402b2fbfe5337",
          tripId: newTripId,
          status: "pending",
          ...formattedPayload,
          createdAt: new Date().toISOString(),
        },
      };
    }

    return apiFetch("/bookings", {
      method: "POST",
      body: JSON.stringify(formattedPayload),
    });
  },

  /**
   * TESTED ROUTE: GET /api/bookings/my
   * Returns current user's (shipper) bookings
   */
  async getMyBookings() {
    if (USE_MOCK) {
      await simulateDelay(400);
      return { success: true, data: MOCK_ADMIN_TRIPS.slice(0, 3) };
    }
    return apiFetch("/bookings/my");
  },

  /**
   * TESTED ROUTE: GET /api/bookings/available
   * Returns unassigned available bookings for drivers
   */
  async getAvailableBookings() {
    if (USE_MOCK) {
      await simulateDelay(400);
      return { success: true, data: [MOCK_ACTIVE_TRIP] };
    }
    return apiFetch("/bookings/available");
  },

  /**
   * TESTED ROUTE: PATCH /api/bookings/:bookingId/accept
   * Driver accepts a booking request
   */
  async acceptBooking(bookingId) {
    if (USE_MOCK) {
      await simulateDelay(500);
      return { statusCode: 200, success: true, message: "Booking accepted successfully" };
    }
    return apiFetch(`/bookings/${bookingId}/accept`, {
      method: "PATCH",
    });
  },

  /**
   * TESTED ROUTE: PATCH /api/bookings/:bookingId/status
   * Updates booking status (e.g. 'goods_loaded', 'in_transit', 'completed')
   */
  async updateBookingStatus(bookingId, status) {
    if (USE_MOCK) {
      await simulateDelay(400);
      return { statusCode: 200, success: true, message: `Status updated to ${status}` };
    }
    return apiFetch(`/bookings/${bookingId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  /**
   * UI Helpers & Pricing Models
   */
  async getVehicleTiers() {
    return VEHICLE_TIERS;
  },

  async estimateFare({ pickupAddress, dropAddress, vehicleTierId, weightKg }) {
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
  },

  async getRespondingDrivers(tripId) {
    if (USE_MOCK) {
      await simulateDelay(400);
      return MOCK_RESPONDING_DRIVERS;
    }
    // Backend may return available bookings or bids
    return MOCK_RESPONDING_DRIVERS;
  },

  async acceptDriverBid(tripId, driverId) {
    if (USE_MOCK) {
      await simulateDelay(500);
      const driver = MOCK_RESPONDING_DRIVERS.find((d) => d.id === driverId) || MOCK_RESPONDING_DRIVERS[0];
      return { success: true, tripId, status: "GOING_TO_PICKUP", assignedDriver: driver, otp: "4829" };
    }
    return this.acceptBooking(tripId);
  },

  async getActiveTrip() {
    return MOCK_ACTIVE_TRIP;
  },

  async submitRating(tripId, ratingData) {
    await simulateDelay(400);
    return { success: true, message: "Rating recorded" };
  },
};
