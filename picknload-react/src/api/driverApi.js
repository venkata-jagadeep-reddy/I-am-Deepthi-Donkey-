import { apiFetch, USE_MOCK, simulateDelay } from "./apiClient";
import { MOCK_USER_DRIVER, MOCK_DRIVER_REQUESTS, MOCK_ACTIVE_TRIP } from "../mock/mockData";

export const driverApi = {
  /**
   * Toggle Driver Online / Offline Duty Status
   * BACKEND ENDPOINT: PATCH /api/v1/driver/duty-status
   * PAYLOAD: { isOnline: boolean, currentLat: number, currentLng: number }
   */
  async toggleDutyStatus(isOnline, location = { lat: 13.3409, lng: 77.1010 }) {
    if (USE_MOCK) {
      await simulateDelay(300);
      return { success: true, isOnline, message: isOnline ? "You are now ONLINE" : "You are now OFFLINE" };
    }
    return apiFetch("/driver/duty-status", {
      method: "PATCH",
      body: JSON.stringify({ isOnline, ...location }),
    });
  },

  /**
   * Get Live Broadcast Transport Requests within Driver Radius
   * BACKEND ENDPOINT: GET /api/v1/driver/requests/nearby?radius=5
   */
  async getNearbyRequests(radiusKm = 5) {
    if (USE_MOCK) {
      await simulateDelay(400);
      return MOCK_DRIVER_REQUESTS;
    }
    return apiFetch(`/driver/requests/nearby?radius=${radiusKm}`);
  },

  /**
   * Get Specific Request Details for Bid/Acceptance
   * BACKEND ENDPOINT: GET /api/v1/driver/requests/:id
   */
  async getRequestDetails(requestId) {
    if (USE_MOCK) {
      await simulateDelay(300);
      return MOCK_DRIVER_REQUESTS.find((r) => r.id === requestId) || MOCK_DRIVER_REQUESTS[0];
    }
    return apiFetch(`/driver/requests/${requestId}`);
  },

  /**
   * Driver Accepts or Bids on a Request
   * BACKEND ENDPOINT: POST /api/v1/driver/requests/:id/accept
   * PAYLOAD: { bidAmount?: number }
   */
  async acceptRequest(requestId, bidAmount) {
    if (USE_MOCK) {
      await simulateDelay(500);
      // Simulate random race condition availability (90% success)
      const isAvailable = true;
      if (!isAvailable) {
        throw new Error("This request has already been assigned to another driver.");
      }
      return {
        success: true,
        tripId: "PNL-1042",
        assignedAt: new Date().toISOString(),
        trip: MOCK_ACTIVE_TRIP,
      };
    }
    return apiFetch(`/driver/requests/${requestId}/accept`, {
      method: "POST",
      body: JSON.stringify({ bidAmount }),
    });
  },

  /**
   * Update Trip Stage (going_to_pickup -> goods_loaded -> in_transit -> mark_delivered)
   * BACKEND ENDPOINT: PATCH /api/v1/driver/trips/:id/status
   * PAYLOAD: { status: 'GOING_TO_PICKUP' | 'GOODS_LOADED' | 'IN_TRANSIT' | 'DELIVERED', coordinates }
   */
  async updateTripStatus(tripId, status, meta = {}) {
    if (USE_MOCK) {
      await simulateDelay(400);
      return {
        success: true,
        tripId,
        newStatus: status,
        updatedAt: new Date().toISOString(),
        ...meta,
      };
    }
    return apiFetch(`/driver/trips/${tripId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status, ...meta }),
    });
  },

  /**
   * Verify Delivery with Consignor Delivery OTP
   * BACKEND ENDPOINT: POST /api/v1/driver/trips/:id/verify-delivery
   * PAYLOAD: { otp: string, signatureUrl?: string }
   */
  async verifyDeliveryOtp(tripId, otp) {
    if (USE_MOCK) {
      await simulateDelay(600);
      if (otp !== "4829" && otp !== "1234") {
        throw new Error("Invalid delivery verification code. Ask consignee for the correct 4-digit code.");
      }
      return {
        success: true,
        tripId,
        deliveredAt: new Date().toISOString(),
        earningsEarned: 950,
      };
    }
    return apiFetch(`/driver/trips/${tripId}/verify-delivery`, {
      method: "POST",
      body: JSON.stringify({ otp }),
    });
  },

  /**
   * Get Driver Earnings Summary
   * BACKEND ENDPOINT: GET /api/v1/driver/earnings
   */
  async getEarnings() {
    if (USE_MOCK) {
      await simulateDelay(300);
      return {
        todayEarnings: MOCK_USER_DRIVER.todayEarnings,
        todayTrips: MOCK_USER_DRIVER.todayTrips,
        todayKm: MOCK_USER_DRIVER.todayKm,
        weekEarnings: MOCK_USER_DRIVER.weekEarnings,
        recentPayouts: [
          { id: "PAY-1", date: "21 Oct 2026", amount: 1450, status: "Deposited" },
          { id: "PAY-2", date: "20 Oct 2026", amount: 2100, status: "Deposited" },
          { id: "PAY-3", date: "19 Oct 2026", amount: 980, status: "Deposited" },
        ],
      };
    }
    return apiFetch("/driver/earnings");
  },

  /**
   * Get Driver Profile and Compliance
   * BACKEND ENDPOINT: GET /api/v1/driver/profile
   */
  async getProfile() {
    if (USE_MOCK) {
      await simulateDelay(300);
      return MOCK_USER_DRIVER;
    }
    return apiFetch("/driver/profile");
  },
};
