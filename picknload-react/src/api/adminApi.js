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
   * TESTED ROUTE: GET /api/admin/drivers/pending
   */
  async getPendingDrivers() {
    if (USE_MOCK) {
      await simulateDelay(300);
      return {
        statusCode: 200,
        success: true,
        message: "Pending drivers fetched successfully",
        data: MOCK_ADMIN_DRIVERS.filter((d) => d.kycStatus === "PENDING"),
      };
    }
    return apiFetch("/admin/drivers/pending");
  },

  /**
   * TESTED ROUTE: PATCH /api/admin/drivers/:driverId/verify
   * PAYLOAD: { verificationStatus: 'verified' | 'rejected' }
   */
  async updateDriverKyc(driverId, verificationStatus = "verified", reason = "") {
    if (USE_MOCK) {
      await simulateDelay(500);
      const driver = MOCK_ADMIN_DRIVERS.find((d) => d.id === driverId);
      if (driver) {
        driver.kycStatus = verificationStatus.toUpperCase();
      }
      return {
        statusCode: 200,
        success: true,
        message: "Driver verified successfully",
        data: { _id: driverId, verificationStatus },
      };
    }

    return apiFetch(`/admin/drivers/${driverId}/verify`, {
      method: "PATCH",
      body: JSON.stringify({ verificationStatus: verificationStatus.toLowerCase() }),
    });
  },

  /**
   * Get Drivers List (Combines pending route with all drivers)
   */
  async getDrivers({ filter = "ALL", search = "" } = {}) {
    if (filter === "PENDING" && !USE_MOCK) {
      try {
        const res = await this.getPendingDrivers();
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          return res.data.map((d) => ({
            id: d._id || d.id,
            name: d.user?.name || d.name || "Driver",
            phone: d.user?.phone || d.phone || "",
            vehicleType: "Tata Ace",
            plateNumber: d.licenseNumber || "KA-06-XX-1234",
            kycStatus: (d.verificationStatus || "PENDING").toUpperCase(),
            isOnline: d.isAvailable ?? true,
            rating: 4.8,
            totalTrips: d.experienceYears * 100 || 120,
          }));
        }
      } catch (e) {
        console.warn("Could not fetch pending drivers directly from backend:", e);
      }
    }

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
  },

  async getDriverDetail(driverId) {
    return MOCK_ADMIN_DRIVERS.find((d) => d.id === driverId) || MOCK_ADMIN_DRIVERS[0];
  },

  async getMetrics() {
    return MOCK_ADMIN_METRICS;
  },

  async getCustomers(search = "") {
    return MOCK_ADMIN_CUSTOMERS;
  },

  async getAllTrips(status = "ALL") {
    if (status !== "ALL") {
      return MOCK_ADMIN_TRIPS.filter((t) => t.status === status);
    }
    return MOCK_ADMIN_TRIPS;
  },

  async getTripAudit(tripId = "PNL-1042") {
    return {
      ...MOCK_ACTIVE_TRIP,
      auditTrail: [
        { time: "14:15 IST", event: "Consignor created request via POST /api/bookings" },
        { time: "14:17 IST", event: "Driver Vikas received lead via GET /api/bookings/available" },
        { time: "14:18 IST", event: "Driver accepted via PATCH /api/bookings/:id/accept" },
        { time: "14:28 IST", event: "Driver reached pickup point" },
        { time: "14:40 IST", event: "Status updated to goods_loaded via PATCH /api/bookings/:id/status" },
        { time: "14:45 IST", event: "Status updated to in_transit" },
      ],
    };
  },

  async getReports() {
    return {
      tripsByVehicle: [
        { vehicle: "Tata Ace (tata-ace)", percentage: 54, count: 2462 },
        { vehicle: "8ft Pickup (8ft-pickup)", percentage: 32, count: 1459 },
        { vehicle: "3-Wheeler (3-wheeler)", percentage: 14, count: 639 },
      ],
      peakDispatchHours: "06:00 - 10:00 IST (APMC Market hours)",
      averageTripDistance: "28.4 km",
      averageAllocationTime: "3 mins 45 secs",
    };
  },

  async getSupportTickets() {
    return MOCK_SUPPORT_TICKETS;
  },
};
