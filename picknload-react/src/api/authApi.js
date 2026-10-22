import { apiFetch, USE_MOCK, simulateDelay, setAuthToken, setStoredUser, clearSession } from "./apiClient";
import { MOCK_USER_CUSTOMER, MOCK_USER_DRIVER } from "../mock/mockData";

export const authApi = {
  /**
   * Request OTP for mobile authentication
   * BACKEND ENDPOINT: POST /api/v1/auth/otp/send
   * PAYLOAD: { phone: string, role: 'customer' | 'driver' }
   */
  async sendOtp(phone, role = "customer") {
    if (USE_MOCK) {
      await simulateDelay(600);
      if (phone.replace(/\D/g, "").length !== 10) {
        throw new Error("Please enter a valid 10-digit mobile number");
      }
      return { success: true, message: `OTP sent successfully to ${phone}`, debugOtp: "1234" };
    }
    return apiFetch("/auth/otp/send", {
      method: "POST",
      body: JSON.stringify({ phone, role }),
    });
  },

  /**
   * Verify OTP and retrieve session token
   * BACKEND ENDPOINT: POST /api/v1/auth/otp/verify
   * PAYLOAD: { phone: string, otp: string, role: string }
   */
  async verifyOtp(phone, otp, role = "customer") {
    if (USE_MOCK) {
      await simulateDelay(700);
      if (otp !== "1234" && otp !== "4829") {
        throw new Error("Invalid verification code. Please check and try again.");
      }

      const user = role === "driver" ? { ...MOCK_USER_DRIVER, phone } : { ...MOCK_USER_CUSTOMER, phone };
      const token = `mock_jwt_token_${role}_${Date.now()}`;
      setAuthToken(token);
      setStoredUser({ ...user, role });

      return {
        token,
        user: { ...user, role },
        isNewUser: false,
      };
    }

    const data = await apiFetch("/auth/otp/verify", {
      method: "POST",
      body: JSON.stringify({ phone, otp, role }),
    });

    if (data.token) {
      setAuthToken(data.token);
      setStoredUser(data.user);
    }
    return data;
  },

  /**
   * Complete Customer Profile Setup
   * BACKEND ENDPOINT: POST /api/v1/customers/profile
   * PAYLOAD: { fullName, email, businessName, gstin }
   */
  async setupCustomerProfile(profileData) {
    if (USE_MOCK) {
      await simulateDelay(500);
      const updated = { ...MOCK_USER_CUSTOMER, ...profileData, role: "customer" };
      setStoredUser(updated);
      return { success: true, user: updated };
    }
    return apiFetch("/customers/profile", {
      method: "POST",
      body: JSON.stringify(profileData),
    });
  },

  /**
   * Driver Step 1: Vehicle Setup
   * BACKEND ENDPOINT: POST /api/v1/drivers/vehicle
   * PAYLOAD: { vehicleType, plateNumber, capacityKg, model }
   */
  async setupDriverVehicle(vehicleData) {
    if (USE_MOCK) {
      await simulateDelay(500);
      return { success: true, vehicle: vehicleData };
    }
    return apiFetch("/drivers/vehicle", {
      method: "POST",
      body: JSON.stringify(vehicleData),
    });
  },

  /**
   * Driver Step 2: Upload KYC Documents
   * BACKEND ENDPOINT: POST /api/v1/drivers/documents (Multipart / Form-Data)
   * PAYLOAD: FormData with dlFile, rcFile, insuranceFile
   */
  async uploadDriverDocuments(formData) {
    if (USE_MOCK) {
      await simulateDelay(1200);
      return {
        success: true,
        kycStatus: "PENDING",
        message: "Documents uploaded successfully. Verification in progress.",
      };
    }
    // When using fetch with FormData, omit Content-Type header so browser sets boundary
    const token = localStorage.getItem("picknload_auth_token");
    const response = await fetch(`${API_BASE_URL}/drivers/documents`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });
    return response.json();
  },

  /**
   * Get Driver Verification Status
   * BACKEND ENDPOINT: GET /api/v1/drivers/verification-status
   */
  async getDriverVerificationStatus() {
    if (USE_MOCK) {
      await simulateDelay(300);
      return {
        kycStatus: "VERIFIED", // Can be "PENDING", "VERIFIED", "REJECTED"
        slaHoursRemaining: 1.5,
        submittedAt: "2026-10-22 10:30 IST",
      };
    }
    return apiFetch("/drivers/verification-status");
  },

  /**
   * Administrator Portal Login
   * BACKEND ENDPOINT: POST /api/v1/admin/auth/login
   * PAYLOAD: { email, password }
   */
  async adminLogin(email, password) {
    if (USE_MOCK) {
      await simulateDelay(600);
      if (!email.includes("@") || password.length < 4) {
        throw new Error("Invalid admin credentials");
      }
      const adminUser = {
        id: "ADMIN-01",
        name: "Admin Ops",
        email,
        role: "admin",
        hub: "Tumakuru Central Fleet Hub",
      };
      const token = `mock_admin_token_${Date.now()}`;
      setAuthToken(token);
      setStoredUser(adminUser);
      return { token, user: adminUser };
    }
    return apiFetch("/admin/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  /**
   * Log out current user
   */
  logout() {
    clearSession();
    return Promise.resolve({ success: true });
  },
};
