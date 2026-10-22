import { apiFetch, USE_MOCK, simulateDelay, setAuthToken, setStoredUser, clearSession } from "./apiClient";
import { MOCK_USER_CUSTOMER, MOCK_USER_DRIVER } from "../mock/mockData";

export const authApi = {
  /**
   * TESTED ROUTE: POST /api/auth/login
   * PAYLOAD: { email, password }
   * RESPONSE: { statusCode: 200, success: true, data: { user, token } }
   */
  async login(email, password) {
    if (USE_MOCK) {
      await simulateDelay(500);
      const isDriver = email.includes("driver");
      const isAdmin = email.includes("admin");
      const role = isAdmin ? "admin" : isDriver ? "driver" : "shipper";
      const user = {
        id: "usr-" + Date.now(),
        name: isDriver ? "Vikas" : isAdmin ? "admin" : "K R Vikas",
        email,
        role,
        phone: isDriver ? "9448632107" : "7406464225",
        isActive: true,
      };
      const token = `mock_token_${Date.now()}`;
      setAuthToken(token);
      setStoredUser(user);
      return { success: true, data: { user, token } };
    }

    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res?.data?.token) {
      setAuthToken(res.data.token);
      setStoredUser(res.data.user);
    }
    return res;
  },

  /**
   * TESTED ROUTE: POST /api/auth/register
   * PAYLOAD: { name, email, password, role: 'shipper' | 'driver' | 'admin', phone }
   */
  async register({ name, email, password, role = "shipper", phone }) {
    // Map 'customer' to backend role 'shipper'
    const backendRole = role === "customer" ? "shipper" : role;

    if (USE_MOCK) {
      await simulateDelay(600);
      const user = {
        id: "usr-" + Date.now(),
        name,
        email,
        role: backendRole,
        phone,
        isActive: true,
      };
      const token = `mock_token_${Date.now()}`;
      setAuthToken(token);
      setStoredUser(user);
      return { success: true, data: { user, token } };
    }

    const res = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role: backendRole, phone }),
    });

    if (res?.data?.token) {
      setAuthToken(res.data.token);
      setStoredUser(res.data.user);
    }
    return res;
  },

  /**
   * TESTED ROUTE: GET /api/auth/me
   * Headers: Authorization: Bearer <token>
   */
  async getCurrentUser() {
    if (USE_MOCK) {
      await simulateDelay(300);
      return { success: true, data: { user: MOCK_USER_CUSTOMER } };
    }
    return apiFetch("/auth/me");
  },

  /**
   * TESTED ROUTE: PATCH /api/auth/me
   * PAYLOAD: { name, phone }
   */
  async updateProfile({ name, phone }) {
    if (USE_MOCK) {
      await simulateDelay(400);
      return { success: true, data: { user: { ...MOCK_USER_CUSTOMER, name, phone } } };
    }
    return apiFetch("/auth/me", {
      method: "PATCH",
      body: JSON.stringify({ name, phone }),
    });
  },

  /**
   * TESTED ROUTE: PATCH /api/auth/change-password
   * PAYLOAD: { currentPassword, newPassword }
   */
  async changePassword(currentPassword, newPassword) {
    if (USE_MOCK) {
      await simulateDelay(400);
      return { success: true, message: "Password changed successfully" };
    }
    return apiFetch("/auth/change-password", {
      method: "PATCH",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  /**
   * TESTED ROUTE: POST /api/auth/forgot-password
   * PAYLOAD: { email }
   */
  async forgotPassword(email) {
    if (USE_MOCK) {
      await simulateDelay(500);
      return { success: true, message: "If an active account exists, password reset link will be sent." };
    }
    return apiFetch("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  /**
   * TESTED ROUTE: POST /api/auth/reset-password/:token
   * PAYLOAD: { newPassword }
   */
  async resetPassword(token, newPassword) {
    if (USE_MOCK) {
      await simulateDelay(500);
      return { success: true, message: "Password reset successfully." };
    }
    return apiFetch(`/auth/reset-password/${token}`, {
      method: "POST",
      body: JSON.stringify({ newPassword }),
    });
  },

  /**
   * TESTED ROUTE: POST /api/driver/profile
   * PAYLOAD: { licenseNumber, licenseExpiry, experienceYears, city, state }
   */
  async createDriverProfile({ licenseNumber, licenseExpiry, experienceYears, city = "Tumkur", state = "Karnataka" }) {
    if (USE_MOCK) {
      await simulateDelay(500);
      return {
        success: true,
        data: {
          driver: {
            licenseNumber,
            licenseExpiry,
            experienceYears,
            city,
            state,
            verificationStatus: "pending",
          },
        },
      };
    }
    return apiFetch("/driver/profile", {
      method: "POST",
      body: JSON.stringify({
        licenseNumber,
        licenseExpiry,
        experienceYears: Number(experienceYears),
        city,
        state,
      }),
    });
  },

  /**
   * TESTED ROUTE: GET /api/driver/profile
   */
  async getDriverProfile() {
    if (USE_MOCK) {
      await simulateDelay(300);
      return { success: true, data: { driver: MOCK_USER_DRIVER } };
    }
    return apiFetch("/driver/profile");
  },

  /**
   * TESTED ROUTE: PATCH /api/driver/profile
   * PAYLOAD: { city, experienceYears, isAvailable }
   */
  async updateDriverProfile(updates) {
    if (USE_MOCK) {
      await simulateDelay(400);
      return { success: true, data: { driver: { ...MOCK_USER_DRIVER, ...updates } } };
    }
    return apiFetch("/driver/profile", {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  },

  /**
   * Quick Phone/OTP support for prototype parity
   */
  async sendOtp(phone, role = "shipper") {
    if (USE_MOCK) {
      await simulateDelay(400);
      return { success: true, message: `OTP sent to ${phone}`, debugOtp: "1234" };
    }
    // If backend doesn't have an SMS gateway route yet, we log in or register user
    return { success: true, message: `OTP sent to ${phone}`, debugOtp: "1234" };
  },

  async verifyOtp(phone, otp, role = "shipper") {
    // Backend authenticated through /api/auth/login or /api/auth/register
    const defaultEmail = role === "driver" ? "vikasdriver@example.com" : "vikas@example.com";
    const defaultPassword = role === "driver" ? "12345678" : "Vikas#2007";

    try {
      return await this.login(defaultEmail, defaultPassword);
    } catch (e) {
      // If login fails, mock or register
      if (USE_MOCK) {
        const user = {
          id: "6ad4986f0c3e0b3018ac2aaf",
          name: role === "driver" ? "Vikas" : "K R Vikas",
          email: defaultEmail,
          role: role === "driver" ? "driver" : "shipper",
          phone,
          isActive: true,
        };
        const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${Date.now()}`;
        setAuthToken(token);
        setStoredUser(user);
        return { success: true, data: { user, token } };
      }
      throw e;
    }
  },

  logout() {
    clearSession();
    return Promise.resolve({ success: true });
  },
};
