# PickNLoad Logistics System — React Frontend

A production-ready **React 18 + Tailwind CSS** application converted from the 50 prototype screens of **PickNLoad Logistics System** and **100% compatible with the tested Express backend routes** in [`Insomnia_2026-10-22-16-59-10.har`](file:///home/jagadeep-reddy/Downloads/stitch_picknload_logistics_app%20%284%29/Insomnia_2026-10-22-16-59-10.har).

---

## 🎯 Tested Routes Compatibility Matrix (`Insomnia_2026-10-22-16-59-10.har`)

The frontend has been wired to match the exact schemas, payloads, and response envelopes tested in Insomnia on **`http://localhost:5000/api`**:

| Insomnia Request Name | Method & Endpoint | Request Body / Params | React Component / API Hook |
|---|---|---|---|
| **`Login`** | `POST /api/auth/login` | `{ "email": "vikas@example.com", "password": "..." }` | [`LoginScreen.jsx`](file:///home/jagadeep-reddy/Downloads/stitch_picknload_logistics_app%20%284%29/picknload-react/src/pages/auth/LoginScreen.jsx) ➔ `authApi.login` |
| **`register_user`** | `POST /api/auth/register` | `{ "name": "Vikas", "email": "...", "password": "...", "role": "shipper" \| "driver", "phone": "..." }` | `authApi.register` |
| **`get-current-user`** | `GET /api/auth/me` | Headers: `Authorization: Bearer <token>` | `authApi.getCurrentUser` |
| **`update-profile`** | `PATCH /api/auth/me` | `{ "name": "K R Vikas", "phone": "7406464225" }` | `authApi.updateProfile` |
| **`change-current-password`** | `PATCH /api/auth/change-password` | `{ "currentPassword": "...", "newPassword": "..." }` | `authApi.changePassword` |
| **`forgot-password`** | `POST /api/auth/forgot-password` | `{ "email": "vikas@example.com" }` | `authApi.forgotPassword` |
| **`reset-password`** | `POST /api/auth/reset-password/:token` | `{ "newPassword": "..." }` | `authApi.resetPassword` |
| **`new-booking`** | `POST /api/bookings` | `{ "pickupLocation": { "address": "...", "city": "Tumkur" }, "dropLocation": { "address": "...", "city": "Bengaluru" }, "goods": { "description": "Vegetable boxes", "weightKg": 500 }, "vehicleType": "tata-ace" }` | [`ReviewRequestScreen.jsx`](file:///home/jagadeep-reddy/Downloads/stitch_picknload_logistics_app%20%284%29/picknload-react/src/pages/customer/ReviewRequestScreen.jsx) ➔ `tripsApi.createRequest` |
| **`get-my-bookings`** | `GET /api/bookings/my` | Headers: `Authorization: Bearer <token>` | [`CustomerTripsScreen.jsx`](file:///home/jagadeep-reddy/Downloads/stitch_picknload_logistics_app%20%284%29/picknload-react/src/pages/customer/CustomerTripsScreen.jsx) ➔ `tripsApi.getMyBookings` |
| **`get-vailable-bookings`** | `GET /api/bookings/available` | Headers: `Authorization: Bearer <token>` | [`DriverRequestsScreen.jsx`](file:///home/jagadeep-reddy/Downloads/stitch_picknload_logistics_app%20%284%29/picknload-react/src/pages/driver/DriverRequestsScreen.jsx) ➔ `driverApi.getNearbyRequests` |
| **`Driver accepts a request`** | `PATCH /api/bookings/:id/accept` | Headers: `Authorization: Bearer <token>` | [`DriverRequestDetailsScreen.jsx`](file:///home/jagadeep-reddy/Downloads/stitch_picknload_logistics_app%20%284%29/picknload-react/src/pages/driver/DriverRequestDetailsScreen.jsx) ➔ `driverApi.acceptRequest` |
| **`driver-starts-trip`** | `PATCH /api/bookings/:id/status` | `{ "status": "goods_loaded" \| "in_transit" \| "completed" }` | [`GoodsLoadedScreen.jsx`](file:///home/jagadeep-reddy/Downloads/stitch_picknload_logistics_app%20%284%29/picknload-react/src/pages/driver/GoodsLoadedScreen.jsx) & [`MarkDeliveredScreen.jsx`](file:///home/jagadeep-reddy/Downloads/stitch_picknload_logistics_app%20%284%29/picknload-react/src/pages/driver/MarkDeliveredScreen.jsx) |
| **`create-driver-profile`** | `POST /api/driver/profile` | `{ "licenseNumber": "KA0120261234567", "licenseExpiry": "2030-12-31", "experienceYears": 3, "city": "Tumkur", "state": "Karnataka" }` | [`DriverDocsSetupScreen.jsx`](file:///home/jagadeep-reddy/Downloads/stitch_picknload_logistics_app%20%284%29/picknload-react/src/pages/auth/DriverDocsSetupScreen.jsx) ➔ `authApi.createDriverProfile` |
| **`retrive-profile`** | `GET /api/driver/profile` | Headers: `Authorization: Bearer <token>` | [`DriverProfileScreen.jsx`](file:///home/jagadeep-reddy/Downloads/stitch_picknload_logistics_app%20%284%29/picknload-react/src/pages/driver/DriverProfileScreen.jsx) ➔ `driverApi.getProfile` |
| **`update-profile`** | `PATCH /api/driver/profile` | `{ "city": "Bengaluru", "experienceYears": 4 }` | `driverApi.updateDriverProfile` |
| **`add-vehicle`** | `POST /api/vehicles` | `{ "vehicleType": "tata-ace", "model": "Tata Ace Gold", "registrationNumber": "KA06AB1234", "payloadCapacityKg": 750, "lengthFeet": 7 }` | [`DriverVehicleSetupScreen.jsx`](file:///home/jagadeep-reddy/Downloads/stitch_picknload_logistics_app%20%284%29/picknload-react/src/pages/auth/DriverVehicleSetupScreen.jsx) ➔ `driverApi.addVehicle` |
| **`get-all-vehicles`** | `GET /api/vehicles` | Headers: `Authorization: Bearer <token>` | `driverApi.getVehicles` |
| **`get-vehicle-byID`** | `GET /api/vehicles/:id` | Headers: `Authorization: Bearer <token>` | `driverApi.getVehicleById` |
| **`update-vehicle-details`** | `PATCH /api/vehicles/:id` | `{ "payloadCapacityKg": 800, "model": "Tata Ace Gold Plus" }` | `driverApi.updateVehicle` |
| **`deactivate-vehicle`** | `DELETE /api/vehicles/:id` | Headers: `Authorization: Bearer <token>` | `driverApi.deactivateVehicle` |
| **`get-pending-drivers`** | `GET /api/admin/drivers/pending` | Headers: `Authorization: Bearer <token>` | [`DriversDirectoryScreen.jsx`](file:///home/jagadeep-reddy/Downloads/stitch_picknload_logistics_app%20%284%29/picknload-react/src/pages/admin/DriversDirectoryScreen.jsx) ➔ `adminApi.getPendingDrivers` |
| **`verify-driver`** | `PATCH /api/admin/drivers/:id/verify` | `{ "verificationStatus": "verified" }` | [`DriverDetailScreen.jsx`](file:///home/jagadeep-reddy/Downloads/stitch_picknload_logistics_app%20%284%29/picknload-react/src/pages/admin/DriverDetailScreen.jsx) ➔ `adminApi.updateDriverKyc` |

---

## ⚡ Quick Test Credentials (from Insomnia Archive)

You can sign in immediately using these pre-configured accounts:
- **Consignor / Shipper:** `vikas@example.com` / `Vikas#2007`
- **Driver Partner:** `vikasdriver@example.com` / `12345678`
- **Operations Admin:** `admin@gmail.com` / `admin123`

---

## 🚀 Running the Frontend

```bash
cd picknload-react
npm install
npm run dev
```

1. Opens at `http://localhost:3000`
2. Automatically sends requests to `http://localhost:5000/api`
3. Fallback to realistic mock state when offline (`VITE_USE_MOCK_API=true`)
