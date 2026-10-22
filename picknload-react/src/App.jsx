import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TripProvider } from "./context/TripContext";
import { DriverDutyProvider } from "./context/DriverDutyContext";
import { AppSimulator } from "./components/layout/AppSimulator";

// Auth & Onboarding Pages
import { SplashScreen } from "./pages/auth/SplashScreen";
import { WelcomeRoleScreen } from "./pages/auth/WelcomeRoleScreen";
import { ChooseRoleScreen } from "./pages/auth/ChooseRoleScreen";
import { LoginScreen } from "./pages/auth/LoginScreen";
import { VerifyOtpScreen } from "./pages/auth/VerifyOtpScreen";
import { CustomerProfileSetupScreen } from "./pages/auth/CustomerProfileSetupScreen";
import { DriverVehicleSetupScreen } from "./pages/auth/DriverVehicleSetupScreen";
import { DriverDocsSetupScreen } from "./pages/auth/DriverDocsSetupScreen";
import { VerificationPendingScreen } from "./pages/auth/VerificationPendingScreen";

// Customer Pages
import { CustomerHomeScreen } from "./pages/customer/CustomerHomeScreen";
import { CreateRequestScreen } from "./pages/customer/CreateRequestScreen";
import { ReviewRequestScreen } from "./pages/customer/ReviewRequestScreen";
import { FindingDriversScreen } from "./pages/customer/FindingDriversScreen";
import { DriversRespondingScreen } from "./pages/customer/DriversRespondingScreen";
import { NoDriversRespondedScreen } from "./pages/customer/NoDriversRespondedScreen";
import { BookingConfirmedScreen } from "./pages/customer/BookingConfirmedScreen";
import { ActiveTripScreen } from "./pages/customer/ActiveTripScreen";
import { TripCompletedRatingScreen } from "./pages/customer/TripCompletedRatingScreen";
import { CustomerProfileScreen } from "./pages/customer/CustomerProfileScreen";
import { CustomerTripsScreen } from "./pages/customer/CustomerTripsScreen";

// Driver Pages
import { DriverHomeScreen } from "./pages/driver/DriverHomeScreen";
import { DriverRequestsScreen } from "./pages/driver/DriverRequestsScreen";
import { DriverRequestDetailsScreen } from "./pages/driver/DriverRequestDetailsScreen";
import { RequestAcceptedScreen } from "./pages/driver/RequestAcceptedScreen";
import { RequestUnavailableScreen } from "./pages/driver/RequestUnavailableScreen";
import { GoingToPickupScreen } from "./pages/driver/GoingToPickupScreen";
import { GoodsLoadedScreen } from "./pages/driver/GoodsLoadedScreen";
import { InTransitScreen } from "./pages/driver/InTransitScreen";
import { MarkDeliveredScreen } from "./pages/driver/MarkDeliveredScreen";
import { DriverTripCompletedScreen } from "./pages/driver/DriverTripCompletedScreen";
import { DriverEarningsScreen } from "./pages/driver/DriverEarningsScreen";
import { DriverProfileScreen } from "./pages/driver/DriverProfileScreen";

// Admin Web Pages
import { AdminLoginScreen } from "./pages/admin/AdminLoginScreen";
import { AdminDashboardScreen } from "./pages/admin/AdminDashboardScreen";
import { DriversDirectoryScreen } from "./pages/admin/DriversDirectoryScreen";
import { DriverDetailScreen } from "./pages/admin/DriverDetailScreen";
import { CustomersScreen } from "./pages/admin/CustomersScreen";
import { TripsScreen } from "./pages/admin/TripsScreen";
import { TripDetailScreen } from "./pages/admin/TripDetailScreen";
import { ReportsScreen } from "./pages/admin/ReportsScreen";
import { SupportScreen } from "./pages/admin/SupportScreen";

// Visual Screen Index & Directory
import { ScreenDirectory } from "./pages/ScreenDirectory";

export default function App() {
  return (
    <AuthProvider>
      <TripProvider>
        <DriverDutyProvider>
          <BrowserRouter>
            <AppSimulator>
              <Routes>
                {/* Default route */}
                <Route path="/" element={<Navigate to="/customer/home" replace />} />

                {/* 1. Auth & Onboarding Routes */}
                <Route path="/splash" element={<SplashScreen />} />
                <Route path="/welcome-role" element={<WelcomeRoleScreen />} />
                <Route path="/choose-role" element={<ChooseRoleScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/verify-otp" element={<VerifyOtpScreen />} />
                <Route path="/customer/profile-setup" element={<CustomerProfileSetupScreen />} />
                <Route path="/driver/vehicle-setup" element={<DriverVehicleSetupScreen />} />
                <Route path="/driver/docs-setup" element={<DriverDocsSetupScreen />} />
                <Route path="/driver/verification-pending" element={<VerificationPendingScreen />} />

                {/* 2. Customer Application Routes */}
                <Route path="/customer/home" element={<CustomerHomeScreen />} />
                <Route path="/customer/create-request" element={<CreateRequestScreen />} />
                <Route path="/customer/review-request" element={<ReviewRequestScreen />} />
                <Route path="/customer/finding-drivers" element={<FindingDriversScreen />} />
                <Route path="/customer/drivers-responding" element={<DriversRespondingScreen />} />
                <Route path="/customer/no-drivers" element={<NoDriversRespondedScreen />} />
                <Route path="/customer/booking-confirmed" element={<BookingConfirmedScreen />} />
                <Route path="/customer/active-trip" element={<ActiveTripScreen />} />
                <Route path="/customer/trip-rating" element={<TripCompletedRatingScreen />} />
                <Route path="/customer/profile" element={<CustomerProfileScreen />} />
                <Route path="/customer/trips" element={<CustomerTripsScreen />} />
                <Route path="/profile" element={<CustomerProfileScreen />} />

                {/* 3. Driver Application Routes */}
                <Route path="/driver/home" element={<DriverHomeScreen />} />
                <Route path="/driver/requests" element={<DriverRequestsScreen />} />
                <Route path="/driver/request-details" element={<DriverRequestDetailsScreen />} />
                <Route path="/driver/request-accepted" element={<RequestAcceptedScreen />} />
                <Route path="/driver/request-unavailable" element={<RequestUnavailableScreen />} />
                <Route path="/driver/going-to-pickup" element={<GoingToPickupScreen />} />
                <Route path="/driver/goods-loaded" element={<GoodsLoadedScreen />} />
                <Route path="/driver/in-transit" element={<InTransitScreen />} />
                <Route path="/driver/mark-delivered" element={<MarkDeliveredScreen />} />
                <Route path="/driver/trip-completed" element={<DriverTripCompletedScreen />} />
                <Route path="/driver/earnings" element={<DriverEarningsScreen />} />
                <Route path="/driver/profile" element={<DriverProfileScreen />} />

                {/* 4. Operations & Backoffice Admin Routes */}
                <Route path="/admin/login" element={<AdminLoginScreen />} />
                <Route path="/admin/dashboard" element={<AdminDashboardScreen />} />
                <Route path="/admin/drivers" element={<DriversDirectoryScreen />} />
                <Route path="/admin/drivers/:id" element={<DriverDetailScreen />} />
                <Route path="/admin/customers" element={<CustomersScreen />} />
                <Route path="/admin/trips" element={<TripsScreen />} />
                <Route path="/admin/trips/:id" element={<TripDetailScreen />} />
                <Route path="/admin/reports" element={<ReportsScreen />} />
                <Route path="/admin/support" element={<SupportScreen />} />

                {/* 5. Master 50-Screen Directory */}
                <Route path="/screens" element={<ScreenDirectory />} />

                {/* Catch-all fallback */}
                <Route path="*" element={<Navigate to="/customer/home" replace />} />
              </Routes>
            </AppSimulator>
          </BrowserRouter>
        </DriverDutyProvider>
      </TripProvider>
    </AuthProvider>
  );
}
