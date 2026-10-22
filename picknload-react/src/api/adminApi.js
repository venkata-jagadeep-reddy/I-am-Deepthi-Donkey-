import { apiFetch, USE_MOCK, simulateDelay } from "./apiClient";
import {
  MOCK_ADMIN_METRICS,
  MOCK_ADMIN_DRIVERS,
  MOCK_ADMIN_CUSTOMERS,
  MOCK_ADMIN_TRIPS,
  MOCK_SUPPORT_TICKETS,
  MOCK_ACTIVE_TRIP,
} from "../mock/mockData";

export const adminApi = {
  /**
   * Get Operations Dashboard Metrics
   * BACKEND ENDPOINT: GET /api/v1/admin/dashboard/metrics
   */
  async getMetrics() {
    if (USE_MOCK) {
      await simulateDelay(300);
      return MOCK_ADMIN_METRICS;
    }
    return apiFetch("/admin/dashboard/metrics");
  },

  /**
   * Get Registered Drivers Directory
   * BACKEND ENDPOINT: GET /api/v1/admin/drivers?filter=ALL&search=
   */
  async getDrivers({ filter = "ALL", search = "" } = {}) {
    if (USE_MOCK) {
      await simulateDelay(400);
      let list = [...MOCK_ADMIN_DRIVERS];
      if (filter === "PENDING") {
        list = list.filter((d) => d.kycStatus === "PENDING");
      } else if (filter === "VERIFIED") {
        list = list.filter((d) => d.kycStatus === "VERIFIED");
      } else if (filter === "ONLINE") {
        list = list.filter((d) => d.isOnline);
      }

      if (search.trim()) {
        const q = search.toLowerCase();
        list = list.filter(
          (d) =>
            d.name.toLowerCase().includes(q) ||
            d.phone.includes(q) ||
            d.plateNumber.toLowerCase().includes(q)
        );
      }
      return list;
    }
    return apiFetch(`/admin/drivers?filter=${filter}&search=${encodeURIComponent(search)}`);
  },

  /**
   * Get Specific Driver Detail & Documents Dossier
   * BACKEND ENDPOINT: GET /api/v1/admin/drivers/:id
   */
  async getDriverDetail(driverId) {
    if (USE_MOCK) {
      await simulateDelay(300);
      return MOCK_ADMIN_DRIVERS.find((d) => d.id === driverId) || MOCK_ADMIN_DRIVERS[0];
    }
    return apiFetch(`/admin/drivers/${driverId}`);
  },

  /**
   * Approve or Reject Driver KYC Documents
   * BACKEND ENDPOINT: PATCH /api/v1/admin/drivers/:id/kyc
   * PAYLOAD: { status: 'VERIFIED' | 'REJECTED', reason?: string }
   */
  async updateDriverKyc(driverId, status, reason = "") {
    if (USE_MOCK) {
      await simulateDelay(500);
      const driver = MOCK_ADMIN_DRIVERS.find((d) => d.id === driverId);
      if (driver) {
        driver.kycStatus = status;
        if (reason) driver.rejectionReason = reason;
      }
      return { success: true, driverId, status };
    }
    return apiFetch(`/admin/drivers/${driverId}/kyc`, {
      method: "PATCH",
      body: JSON.stringify({ status, reason }),
    });
  },

  /**
   * Get Customers / Consignors Directory
   * BACKEND ENDPOINT: GET /api/v1/admin/customers?search=
   */
  async getCustomers(search = "") {
    if (USE_MOCK) {
      await simulateDelay(350);
      let list = [...MOCK_ADMIN_CUSTOMERS];
      if (search.trim()) {
        const q = search.toLowerCase();
        list = list.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.business.toLowerCase().includes(q) ||
            c.phone.includes(q)
        );
      }
      return list;
    }
    return apiFetch(`/admin/customers?search=${encodeURIComponent(search)}`);
  },

  /**
   * Get All Intra-City Trips
   * BACKEND ENDPOINT: GET /api/v1/admin/trips?status=
   */
  async getAllTrips(status = "ALL") {
    if (USE_MOCK) {
      await simulateDelay(400);
      if (status !== "ALL") {
        return MOCK_ADMIN_TRIPS.filter((t) => t.status === status);
      }
      return MOCK_ADMIN_TRIPS;
    }
    return apiFetch(`/admin/trips?status=${status}`);
  },

  /**
   * Get Detailed Trip Audit (e.g. #PNL-1042)
   * BACKEND ENDPOINT: GET /api/v1/admin/trips/:id
   */
  async getTripAudit(tripId = "PNL-1042") {
    if (USE_MOCK) {
      await simulateDelay(350);
      return {
        ...MOCK_ACTIVE_TRIP,
        auditTrail: [
          { time: "14:15 IST", event: "Consignor Keerthana R. created trip request from APMC Yard" },
          { time: "14:17 IST", event: "Driver Ravi Kumar (KA-06-XX-1234) submitted bid of ₹950" },
          { time: "14:18 IST", event: "Consignor accepted Ravi Kumar's bid. Trip ID #PNL-1042 confirmed." },
          { time: "14:28 IST", event: "Driver arrived at APMC Yard Gate 2" },
          { time: "14:40 IST", event: "Consignor PIN verified. 28 crates of vegetables loaded." },
          { time: "14:45 IST", event: "Vehicle departed towards Kunigal via NH-75" },
        ],
      };
    }
    return apiFetch(`/admin/trips/${tripId}`);
  },

  /**
   * Get Fleet Performance Reports
   * BACKEND ENDPOINT: GET /api/v1/admin/reports?range=monthly
   */
  async getReports(range = "monthly") {
    if (USE_MOCK) {
      await simulateDelay(500);
      return {
        range,
        tripsByVehicle: [
          { vehicle: "Tata Ace", percentage: 54, count: 2462 },
          { vehicle: "8ft Pickup", percentage: 32, count: 1459 },
          { vehicle: "3-Wheeler", percentage: 14, count: 639 },
        ],
        peakDispatchHours: "06:00 - 10:00 IST (APMC Market hours)",
        averageTripDistance: "28.4 km",
        averageAllocationTime: "3 mins 45 secs",
      };
    }
    return apiFetch(`/admin/reports?range=${range}`);
  },

  /**
   * Get Operations Support Tickets
   * BACKEND ENDPOINT: GET /api/v1/admin/support
   */
  async getSupportTickets() {
    if (USE_MOCK) {
      await simulateDelay(300);
      return MOCK_SUPPORT_TICKETS;
    }
    return apiFetch("/admin/support");
  },
};
