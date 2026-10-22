import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authApi } from "../../api/authApi";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";

export const AdminLoginScreen = () => {
  const navigate = useNavigate();
  const { setUser, setRole } = useAuth();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // TESTED ROUTE: POST /api/auth/login
      const res = await authApi.login(email, password);
      if (res?.data?.user) {
        setUser(res.data.user);
        setRole("admin");
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError(err.message || "Invalid administrator credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-low flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-outline-variant/60 shadow-lg flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary-container shadow-sm mb-3">
            <span className="material-symbols-outlined text-[32px]">local_shipping</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
            PickNLoad Admin
          </h1>
          <p className="text-xs text-secondary mt-1">
            Operations & Fleet Dispatch Control Room
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Administrator Email (Tested in HAR)"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leadingIcon="mail"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leadingIcon="lock"
            required
          />

          {error && (
            <div className="p-3 rounded-xl bg-error-container/40 border border-error/30 text-on-error-container text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-error">error</span>
              <span>{error}</span>
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={loading}
            icon="login"
            className="mt-2"
          >
            Sign In (POST /api/auth/login)
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-outline-variant/30 text-xs text-secondary">
          <span>Tested backend endpoint: <code>http://localhost:5000/api/auth/login</code></span>
        </div>
      </div>
    </div>
  );
};
