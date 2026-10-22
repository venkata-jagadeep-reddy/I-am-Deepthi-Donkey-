import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../api/authApi";
import { getStoredUser, clearSession } from "../api/apiClient";
import { MOCK_USER_CUSTOMER, MOCK_USER_DRIVER } from "../mock/mockData";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser() || { ...MOCK_USER_CUSTOMER, role: "customer" });
  const [role, setRole] = useState(() => user?.role || "customer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.role) {
      setRole(user.role);
    }
  }, [user]);

  // Switch role simulator (Customer, Driver, Admin)
  const switchRole = (newRole) => {
    setRole(newRole);
    if (newRole === "customer") {
      setUser({ ...MOCK_USER_CUSTOMER, role: "customer" });
    } else if (newRole === "driver") {
      setUser({ ...MOCK_USER_DRIVER, role: "driver" });
    } else if (newRole === "admin") {
      setUser({ id: "ADMIN-01", name: "Admin Ops", email: "admin@picknload.com", role: "admin" });
    }
  };

  const loginWithPhone = async (phone, selectedRole = "customer") => {
    setLoading(true);
    setError(null);
    try {
      const res = await authApi.sendOtp(phone, selectedRole);
      return res;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (phone, otp, selectedRole = "customer") => {
    setLoading(true);
    setError(null);
    try {
      const res = await authApi.verifyOtp(phone, otp, selectedRole);
      setUser(res.user);
      setRole(selectedRole);
      return res;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
    setRole("customer");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        error,
        setUser,
        setRole,
        switchRole,
        loginWithPhone,
        verifyOtp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
