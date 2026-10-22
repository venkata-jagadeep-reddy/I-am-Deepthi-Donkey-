# PickNLoad Logistics System — React Frontend

A production-ready **React 18 + Tailwind CSS** application faithfully converted from the 50 high-fidelity screens of the **PickNLoad Logistics System** intra-city freight platform.

Built specifically for the intra-city commercial hauling corridor in India (Tumakuru / Karnataka), supporting commercial vehicle tiers such as **Tata Ace (Chota Hathi)**, **8ft Pickup**, and **3-Wheelers**.

---

## 🌟 What Was Built

- **3 Core User Flows in 1 Application:**
  1. **Consignor / Customer Mobile App:** Freight booking, cargo specification (weight, category), upfront fare quotes (₹), live driver bidding, GPS trip tracking, consignor security PIN, invoice receipts, and 5-star ratings.
  2. **Driver Partner Mobile App:** Instant duty online/offline toggle, nearby load broadcast radar, trip execution flow (*Going to Pickup ➔ Goods Loaded ➔ In Transit ➔ Mark Delivered*), daily earnings counter, and KYC verification tracker.
  3. **Operations & Backoffice Admin Portal (Desktop Web):** Full 12-column dispatch control room with 5 live KPIs, driver compliance dossier review, KYC approval/rejection modal, customer registry, trip forensic audit (*#PNL-1042*), vehicle share analytics, and support ticketing desk.
- **50-Screen Visual Directory:** Route `/screens` allows instantaneous preview and inspection of every single screen from the original prototype.
- **Interactive Dev Simulator Toolbar:** Built-in floating header allowing seamless switching between **Mobile Phone Viewport (390px)** and **Desktop Fullscreen**, persona switching (*Consignor | Driver | Admin*), and screen jumping.
- **Dual Mode (Mock / Live Backend):** Runs 100% out of the box with built-in realistic mock data, and provides clean, structured placeholders ready to connect to any backend (REST, FastAPI, Node/Express, Supabase, Go).

---

## 📁 Directory Structure

```text
picknload-react/
├── .env.example                     # Environment configuration (API base URL & mock toggle)
├── package.json                     # React 18, React Router DOM, Tailwind CSS, Lucide
├── vite.config.js                   # Vite bundler config
├── tailwind.config.js               # Tokens from DESIGN.md (colors, typography, spacing)
├── postcss.config.js                # Tailwind PostCSS plugin
├── index.html                       # HTML shell with Inter font & Material Symbols
└── src/
    ├── main.jsx                     # Application entry point
    ├── App.jsx                      # Router configuration with all 50 screen routes
    ├── index.css                    # Tailwind base, safe-area insets & utilities
    │
    ├── mock/
    │   └── mockData.js              # Comprehensive mock datasets (users, trips, bids, drivers, KPIs)
    │
    ├── api/                         # 🔌 BACKEND PLACEHOLDERS & API LAYER
    │   ├── apiClient.js             # Universal fetch client with auth token management
    │   ├── authApi.js               # Mobile OTP login, profile setup, driver vehicle & KYC docs
    │   ├── tripsApi.js              # Fare estimation, request creation, bidding, ratings
    │   ├── driverApi.js             # Online/offline duty, nearby leads, trip stage updates, earnings
    │   └── adminApi.js              # Operations KPIs, driver approvals, customer registry, reports
    │
    ├── context/                     # REACT STATE CONTEXTS
    │   ├── AuthContext.jsx          # User session & persona switching (customer/driver/admin)
    │   ├── TripContext.jsx          # Customer active trip & draft booking state
    │   └── DriverDutyContext.jsx    # Driver duty status & active trip execution lifecycle
    │
    ├── components/
    │   ├── common/                  # Reusable UI components
    │   │   ├── Button.jsx           # Amber primary, secondary, destructive buttons
    │   │   ├── Input.jsx            # Form input with leading/trailing icons and errors
    │   │   ├── Badge.jsx            # Status tags (success, warning, error)
    │   │   ├── Card.jsx             # 16px rounded surface cards with 1px border
    │   │   └── MapPlaceholder.jsx   # Live GPS route map with animated vehicle marker
    │   │
    │   └── layout/
    │       ├── MobileHeader.jsx     # Mobile app header with back navigation & icons
    │       ├── MobileBottomNav.jsx  # Bottom tab navigation (Customer & Driver variants)
    │       ├── AdminSidebar.jsx     # Desktop sidebar for Operations portal
    │       ├── AdminHeader.jsx      # Desktop header with hub status & search
    │       └── AppSimulator.jsx     # Interactive dev toolbar & phone frame wrapper
    │
    └── pages/
        ├── auth/                    # Onboarding & Auth screens
        │   ├── SplashScreen.jsx
        │   ├── WelcomeRoleScreen.jsx
        │   ├── ChooseRoleScreen.jsx
        │   ├── LoginScreen.jsx
        │   ├── VerifyOtpScreen.jsx
        │   ├── CustomerProfileSetupScreen.jsx
        │   ├── DriverVehicleSetupScreen.jsx
        │   ├── DriverDocsSetupScreen.jsx
        │   └── VerificationPendingScreen.jsx
        │
        ├── customer/                # Consignor / Customer screens
        │   ├── CustomerHomeScreen.jsx
        │   ├── CreateRequestScreen.jsx
        │   ├── ReviewRequestScreen.jsx
        │   ├── FindingDriversScreen.jsx
        │   ├── DriversRespondingScreen.jsx
        │   ├── NoDriversRespondedScreen.jsx
        │   ├── BookingConfirmedScreen.jsx
        │   ├── ActiveTripScreen.jsx
        │   ├── TripCompletedRatingScreen.jsx
        │   ├── CustomerProfileScreen.jsx
        │   └── CustomerTripsScreen.jsx
        │
        ├── driver/                  # Driver Partner screens
        │   ├── DriverHomeScreen.jsx
        │   ├── DriverRequestsScreen.jsx
        │   ├── DriverRequestDetailsScreen.jsx
        │   ├── RequestAcceptedScreen.jsx
        │   ├── RequestUnavailableScreen.jsx
        │   ├── GoingToPickupScreen.jsx
        │   ├── GoodsLoadedScreen.jsx
        │   ├── InTransitScreen.jsx
        │   ├── MarkDeliveredScreen.jsx
        │   ├── DriverTripCompletedScreen.jsx
        │   ├── DriverEarningsScreen.jsx
        │   └── DriverProfileScreen.jsx
        │
        ├── admin/                   # Backoffice Operations Portal screens
        │   ├── AdminLoginScreen.jsx
        │   ├── AdminDashboardScreen.jsx
        │   ├── DriversDirectoryScreen.jsx
        │   ├── DriverDetailScreen.jsx
        │   ├── CustomersScreen.jsx
        │   ├── TripsScreen.jsx
        │   ├── TripDetailScreen.jsx
        │   ├── ReportsScreen.jsx
        │   └── SupportScreen.jsx
        │
        └── ScreenDirectory.jsx      # Visual 50-screen master launcher
```

---

## 🔌 Connecting to Your Backend

The application has been designed specifically with backend integration in mind. Every API service in `src/api/` contains clear placeholders, endpoint paths, request bodies, and response types.

### 1. Enable Real API Mode

In your `.env` (or copy `.env.example` to `.env`):

```bash
# 1. Point to your backend server URL
VITE_API_BASE_URL=https://api.yourdomain.com/v1

# 2. Disable mock mode
VITE_USE_MOCK_API=false
```

### 2. Backend Endpoint Specification Table

| API Service | Function | Method & Endpoint | Payload / Description |
|---|---|---|---|
| **Auth** | `sendOtp` | `POST /auth/otp/send` | `{ phone: "9876543210", role: "customer" }` |
| **Auth** | `verifyOtp` | `POST /auth/otp/verify` | `{ phone, otp: "4829", role }` ➔ returns `{ token, user }` |
| **Auth** | `setupCustomerProfile` | `POST /customers/profile` | `{ fullName, businessName, email, gstin }` |
| **Auth** | `setupDriverVehicle` | `POST /drivers/vehicle` | `{ vehicleType, plateNumber, model, capacityKg }` |
| **Auth** | `uploadDriverDocuments` | `POST /drivers/documents` | Multipart `FormData` (`license`, `rc`, `insurance`) |
| **Trips** | `estimateFare` | `POST /trips/estimate` | `{ pickupAddress, dropAddress, vehicleTierId, weightKg }` |
| **Trips** | `createRequest` | `POST /trips/create` | `{ pickup, drop, cargoType, weightKg, vehicleTierId, fare }` |
| **Trips** | `getRespondingDrivers` | `GET /trips/:id/bids` | Polls or WebSocket stream of nearby responding driver bids |
| **Trips** | `acceptDriverBid` | `POST /trips/:id/accept-bid`| `{ driverId }` ➔ confirms booking & sets assigned driver |
| **Trips** | `submitRating` | `POST /trips/:id/rating` | `{ rating: 5, feedback: "Fast loading", tipAmount: 50 }` |
| **Driver** | `toggleDutyStatus` | `PATCH /driver/duty-status` | `{ isOnline: true, lat: 13.3409, lng: 77.1010 }` |
| **Driver** | `getNearbyRequests` | `GET /driver/requests/nearby?radius=5` | Returns broadcast cargo leads within 5 km |
| **Driver** | `acceptRequest` | `POST /driver/requests/:id/accept` | Driver accepts consignment lead |
| **Driver** | `updateTripStatus` | `PATCH /driver/trips/:id/status`| `{ status: 'GOODS_LOADED' | 'IN_TRANSIT', pin: '4829' }` |
| **Driver** | `verifyDeliveryOtp` | `POST /driver/trips/:id/verify-delivery` | `{ otp: '4829', cashCollected: true }` |
| **Admin** | `getMetrics` | `GET /admin/dashboard/metrics` | Returns active trips, registered drivers, revenue stats |
| **Admin** | `getDrivers` | `GET /admin/drivers?filter=PENDING` | Filterable driver registry |
| **Admin** | `updateDriverKyc` | `PATCH /admin/drivers/:id/kyc`| `{ status: 'VERIFIED' | 'REJECTED', reason: '' }` |
| **Admin** | `getAllTrips` | `GET /admin/trips?status=IN_TRANSIT` | All real-time dispatches |

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn or pnpm

### Quick Start

1. Open your terminal in the `picknload-react` directory:
   ```bash
   cd picknload-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```

4. Open your browser at:
   ```
   http://localhost:3000
   ```

5. Build for production deployment:
   ```bash
   npm run build
   ```

---

## 🎨 Design System Implementation (`DESIGN.md` Compliance)

- **Pure Canvas Surfaces:** Uses `#FFFFFF` for cards and form containers with zero ornamental gradients or glassmorphism.
- **High-Contrast Sunlight Action Color:** Warm Amber (`#F59E0B`) paired with Near-Black Slate (`#111827`) text for maximum outdoor legibility on drivers' screens.
- **Verified Status Tokens:** Emerald Green (`#16A34A` / `#DCFCE7`) for verified checkmarks and completed trips.
- **Ergonomics:** All touch targets maintain a minimum height of **48px–52px** for single-hand mobile operation in warehouse and mandi environments.
