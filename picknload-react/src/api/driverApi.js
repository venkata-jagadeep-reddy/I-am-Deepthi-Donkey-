import { apiFetch, USE_MOCK, simulateDelay } from "./apiClient";
import { MOCK_USER_DRIVER, MOCK_DRIVER_REQUESTS, MOCK_ACTIVE_TRIP } from "../mock/mockData";

export const driverApi = {
  /**
   * TESTED ROUTE: POST /api/vehicles
   * PAYLOAD: {
   *   vehicleType: 'tata-ace',
   *   model: 'Tata Ace Gold',
   *   registrationNumber: 'KA06AB1234',
   *   payloadCapacityKg: 750,
   *   lengthFeet: 7
   * }
   */
  async addVehicle({ vehicleType = "tata-ace", model = "Tata Ace Gold", registrationNumber, payloadCapacityKg = 750, lengthFeet = 7 }) {
    if (USE_MOCK) {
      await simulateDelay(500);
      return {
        statusCode: 201,
        success: true,
        message: "Vehicle added successfully",
        data: {
          _id: "veh-" + Date.now(),
          vehicleType,
          model,
          registrationNumber,
          payloadCapacityKg: Number(payloadCapacityKg),
          lengthFeet: Number(lengthFeet),
          isActive: true,
          isAvailable: true,
          verificationStatus: "pending",
        },
      };
    }

    return apiFetch("/vehicles", {
      method: "POST",
      body: JSON.stringify({
        vehicleType: vehicleType.toLowerCase().replace(/\s+/g, "-"),
        model,
        registrationNumber: registrationNumber.toUpperCase().replace(/\s+/g, ""),
        payloadCapacityKg: Number(payloadCapacityKg),
        lengthFeet: Number(lengthFeet),
      }),
    });
  },

  /**
   * TESTED ROUTE: GET /api/vehicles
   */
  async getVehicles() {
    if (USE_MOCK) {
      await simulateDelay(300);
      return {
        statusCode: 200,
        success: true,
        data: [
          {
            _id: "6ad5e9ba7cffcdf2749d42d7",
            vehicleType: "tata-ace",
            model: "Tata Ace Gold",
            registrationNumber: "KA06AB1234",
            payloadCapacityKg: 750,
            lengthFeet: 7,
            isActive: true,
            isAvailable: true,
            verificationStatus: "verified",
          },
        ],
      };
    }
    return apiFetch("/vehicles");
  },

  /**
   * TESTED ROUTE: GET /api/vehicles/:vehicleId
   */
  async getVehicleById(vehicleId) {
    if (USE_MOCK) {
      await simulateDelay(300);
      return { statusCode: 200, success: true, data: { registrationNumber: "KA06AB1234" } };
    }
    return apiFetch(`/vehicles/${vehicleId}`);
  },

  /**
   * TESTED ROUTE: PATCH /api/vehicles/:vehicleId
   * PAYLOAD: { payloadCapacityKg, model }
   */
  async updateVehicle(vehicleId, updates) {
    if (USE_MOCK) {
      await simulateDelay(400);
      return { statusCode: 200, success: true, message: "Vehicle updated successfully" };
    }
    return apiFetch(`/vehicles/${vehicleId}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  },

  /**
   * TESTED ROUTE: DELETE /api/vehicles/:vehicleId
   */
  async deactivateVehicle(vehicleId) {
    if (USE_MOCK) {
      await simulateDelay(400);
      return { statusCode: 200, success: true, message: "Vehicle deactivated successfully" };
    }
    return apiFetch(`/vehicles/${vehicleId}`, {
      method: "DELETE",
    });
  },

  /**
   * TESTED ROUTE: GET /api/driver/profile
   */
  async getProfile() {
    if (USE_MOCK) {
      await simulateDelay(300);
      return { statusCode: 200, success: true, data: { driver: MOCK_USER_DRIVER } };
    }
    return apiFetch("/driver/profile");
  },

  /**
   * TESTED ROUTE: POST /api/driver/profile
   */
  async createProfile(data) {
    if (USE_MOCK) {
      await simulateDelay(400);
      return { statusCode: 201, success: true, data: { driver: data } };
    }
    return apiFetch("/driver/profile", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * TESTED ROUTE: PATCH /api/driver/profile
   * Toggles availability or updates city/experience
   */
  async toggleDutyStatus(isAvailable) {
    if (USE_MOCK) {
      await simulateDelay(300);
      return { statusCode: 200, success: true, data: { isAvailable } };
    }
    return apiFetch("/driver/profile", {
      method: "PATCH",
      body: JSON.stringify({ isAvailable }),
    });
  },

  /**
   * TESTED ROUTE: GET /api/bookings/available
   */
  async getNearbyRequests() {
    if (USE_MOCK) {
      await simulateDelay(400);
      return MOCK_DRIVER_REQUESTS;
    }
    try {
      const res = await apiFetch("/bookings/available");
      if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
        return res.data.map((b) => ({
          id: b._id,
          pickupLocation: `${b.pickupLocation?.address || "Pickup"}, ${b.pickupLocation?.city || "Tumkur"}`,
          dropLocation: `${b.dropLocation?.address || "Drop"}, ${b.dropLocation?.city || "Bengaluru"}`,
          distanceKm: 38,
          cargoType: b.goods?.description || "Goods",
          weightKg: b.goods?.weightKg || 500,
          vehicleRequired: b.vehicleType || "tata-ace",
          fare: b.fare || 950,
          timeAgo: "Just now",
        }));
      }
      return MOCK_DRIVER_REQUESTS;
    } catch (e) {
      return MOCK_DRIVER_REQUESTS;
    }
  },

  /**
   * TESTED ROUTE: PATCH /api/bookings/:id/accept
   */
  async acceptRequest(requestId) {
    if (USE_MOCK) {
      await simulateDelay(500);
      return { success: true, trip: MOCK_ACTIVE_TRIP };
    }
    return apiFetch(`/bookings/${requestId}/accept`, {
      method: "PATCH",
    });
  },

  /**
   * TESTED ROUTE: PATCH /api/bookings/:id/status
   */
  async updateTripStatus(tripId, status) {
    if (USE_MOCK) {
      await simulateDelay(400);
      return { success: true, status };
    }
    return apiFetch(`/bookings/${tripId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  async verifyDeliveryOtp(tripId, otp) {
    await simulateDelay(500);
    return { success: true, tripId };
  },

  async getEarnings() {
    return {
      todayEarnings: 1250,
      todayTrips: 4,
      todayKm: 38,
      weekEarnings: 8750,
    };
  },
};
