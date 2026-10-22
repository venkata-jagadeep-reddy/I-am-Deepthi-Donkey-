/**
 * PickNLoad Logistics - Comprehensive Mock Data Store
 * Mirrors production data schemas for intra-city logistics dispatch in India.
 */

export const MOCK_USER_CUSTOMER = {
  id: "CUST-8821",
  name: "Keerthana R.",
  phone: "+91 98765 43210",
  email: "keerthana.ml@gmail.com",
  businessName: "Sri Balaji Agro Commodities",
  gstin: "29AABCU9603R1ZM",
  defaultAddress: "APMC Yard, Gate 2, Tumakuru",
  rating: 4.9,
  totalTrips: 28,
};

export const MOCK_USER_DRIVER = {
  id: "DRV-104",
  name: "Ravi Kumar",
  phone: "+91 94481 23456",
  photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
  vehicleType: "Tata Ace",
  vehicleModel: "Tata Ace Gold Diesel",
  plateNumber: "KA-06-XX-1234",
  capacityKg: 750,
  isOnline: true,
  kycStatus: "VERIFIED", // "PENDING", "VERIFIED", "REJECTED"
  rating: 4.85,
  totalTrips: 456,
  todayTrips: 4,
  todayKm: 38,
  todayEarnings: 1250,
  weekEarnings: 8750,
  location: { lat: 13.3409, lng: 77.1010, address: "APMC Market Gate 1, Tumakuru" }
};

export const VEHICLE_TIERS = [
  {
    id: "tata_ace",
    name: "Tata Ace",
    subtitle: "Chota Hathi",
    capacity: "750 kg",
    dimensions: "7ft x 4.8ft x 4.8ft",
    baseFare: 350,
    perKm: 22,
    icon: "local_shipping",
    description: "Ideal for market goods, retail boxes, FMCG",
  },
  {
    id: "pickup_8ft",
    name: "8ft Pickup",
    subtitle: "Bolero / Dost",
    capacity: "1.25 Ton",
    dimensions: "8ft x 5.5ft x 5ft",
    baseFare: 550,
    perKm: 28,
    icon: "rv_hookup",
    description: "Ideal for industrial supplies, machinery, furniture",
  },
  {
    id: "three_wheeler",
    name: "3-Wheeler",
    subtitle: "Ape / Piaggio",
    capacity: "500 kg",
    dimensions: "5.5ft x 4ft x 4ft",
    baseFare: 220,
    perKm: 18,
    icon: "electric_rickshaw",
    description: "Ideal for tight alleys, cartons, small loads",
  },
];

export const MOCK_ACTIVE_TRIP = {
  id: "PNL-1042",
  status: "IN_TRANSIT", // "SEARCHING", "BID_ACCEPTED", "GOING_TO_PICKUP", "GOODS_LOADED", "IN_TRANSIT", "DELIVERED"
  otp: "4829",
  createdAt: "2026-10-22 14:15",
  pickup: {
    title: "APMC Yard, Gate 2",
    city: "Tumakuru",
    address: "Shop #14, Onion & Potato Yard, APMC Tumakuru",
    contactPerson: "Keerthana M L",
    contactPhone: "+91 98765 43210"
  },
  drop: {
    title: "Kunigal Town Market",
    city: "Kunigal",
    address: "B.M. Road, Near Bus Stand, Kunigal",
    contactPerson: "Venkatesh Agro Agencies",
    contactPhone: "+91 98450 11223"
  },
  distanceKm: 38,
  estimatedTimeMin: 65,
  cargo: {
    type: "Vegetables & Agro Produce",
    weightKg: 550,
    boxesCount: "28 crates",
  },
  vehicle: {
    tier: "Tata Ace",
    plateNumber: "KA-06-XX-1234",
  },
  driver: {
    id: "DRV-104",
    name: "Ravi Kumar",
    phone: "+91 94481 23456",
    rating: 4.85,
    plateNumber: "KA-06-XX-1234",
    vehicleModel: "Tata Ace",
    etaMins: 18,
    photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80"
  },
  pricing: {
    baseFare: 350,
    distanceFare: 480,
    loadingHelper: 120,
    gst: 45,
    discount: 45,
    total: 950,
    paymentMethod: "Cash on Delivery",
    isPaid: false
  }
};

export const MOCK_RESPONDING_DRIVERS = [
  {
    id: "DRV-104",
    name: "Ravi Kumar",
    rating: 4.9,
    tripsCount: 456,
    vehicleModel: "Tata Ace (KA-06-XX-1234)",
    etaMins: 4,
    distanceKm: "1.2 km away",
    bidAmount: 950,
    verified: true,
  },
  {
    id: "DRV-208",
    name: "Manjunath H.",
    rating: 4.8,
    tripsCount: 312,
    vehicleModel: "Tata Ace (KA-06-B-9988)",
    etaMins: 7,
    distanceKm: "2.8 km away",
    bidAmount: 920,
    verified: true,
  },
  {
    id: "DRV-315",
    name: "Syed Imran",
    rating: 4.7,
    tripsCount: 189,
    vehicleModel: "8ft Pickup (KA-06-C-4521)",
    etaMins: 11,
    distanceKm: "4.1 km away",
    bidAmount: 1100,
    verified: true,
  }
];

export const MOCK_DRIVER_REQUESTS = [
  {
    id: "REQ-7821",
    pickupLocation: "Tumakuru APMC Yard, Gate 2",
    dropLocation: "Kunigal Town Market",
    distanceKm: 38,
    cargoType: "Vegetables (Crates)",
    weightKg: 550,
    vehicleRequired: "Tata Ace",
    fare: 950,
    pickupDistance: "1.2 km from you",
    timeAgo: "2 mins ago",
    specialInstructions: "Loading assistance required at gate. Gate pass available."
  },
  {
    id: "REQ-7822",
    pickupLocation: "Batawadi Bypass Industrial Warehouse",
    dropLocation: "Gubbi Bus Terminal Road",
    distanceKm: 24,
    cargoType: "Hardware & PVC Pipes",
    weightKg: 400,
    vehicleRequired: "Tata Ace / 8ft Pickup",
    fare: 680,
    pickupDistance: "3.5 km from you",
    timeAgo: "5 mins ago",
    specialInstructions: "Keep tarpaulin ready in case of rain."
  }
];

export const MOCK_ADMIN_METRICS = {
  totalCustomers: 1248,
  newCustomersWeek: 12,
  registeredDrivers: 312,
  newDriversMonth: 6,
  activeTripsCount: 18,
  completedTripsCount: 4560,
  dailyDispatches: 84,
  pendingKycCount: 5,
  dailyRevenue: "₹82,450",
  monthlyRevenue: "₹24,18,000"
};

export const MOCK_ADMIN_DRIVERS = [
  {
    id: "DRV-104",
    name: "Ravi Kumar",
    phone: "+91 94481 23456",
    vehicleType: "Tata Ace",
    plateNumber: "KA-06-XX-1234",
    kycStatus: "VERIFIED",
    isOnline: true,
    rating: 4.85,
    totalTrips: 456,
    joiningDate: "12 Jan 2025",
    documents: {
      drivingLicense: { number: "DL-KA06-201500123", validTill: "2032-05-18", status: "VERIFIED" },
      vehicleRc: { number: "KA-06-XX-1234", status: "VERIFIED" },
      insurance: { policy: "HDFC-ERGO-884920", validTill: "2027-01-10", status: "VERIFIED" }
    }
  },
  {
    id: "DRV-105",
    name: "Siddalingappa G.",
    phone: "+91 98450 67890",
    vehicleType: "8ft Pickup",
    plateNumber: "KA-06-M-5521",
    kycStatus: "PENDING",
    isOnline: false,
    rating: 0,
    totalTrips: 0,
    joiningDate: "21 Oct 2026",
    documents: {
      drivingLicense: { number: "DL-KA06-201800994", validTill: "2035-11-20", status: "PENDING" },
      vehicleRc: { number: "KA-06-M-5521", status: "PENDING" },
      insurance: { policy: "ICICI-LOMB-112233", validTill: "2027-08-15", status: "VERIFIED" }
    }
  },
  {
    id: "DRV-106",
    name: "Manjunath H.",
    phone: "+91 97412 34567",
    vehicleType: "Tata Ace",
    plateNumber: "KA-06-B-9988",
    kycStatus: "VERIFIED",
    isOnline: true,
    rating: 4.80,
    totalTrips: 312,
    joiningDate: "04 Mar 2025"
  },
  {
    id: "DRV-107",
    name: "Prakash Chand",
    phone: "+91 99801 23111",
    vehicleType: "3-Wheeler",
    plateNumber: "KA-06-TR-4401",
    kycStatus: "REJECTED",
    isOnline: false,
    rating: 3.90,
    totalTrips: 18,
    rejectionReason: "Driving License photo is blurry and unreadable",
    joiningDate: "15 Oct 2026"
  }
];

export const MOCK_ADMIN_CUSTOMERS = [
  {
    id: "CUST-8821",
    name: "Keerthana R.",
    business: "Sri Balaji Agro Commodities",
    phone: "+91 98765 43210",
    email: "keerthana.ml@gmail.com",
    city: "Tumakuru",
    totalBookings: 28,
    totalSpend: "₹24,800",
    lastTrip: "Today",
    status: "ACTIVE"
  },
  {
    id: "CUST-8822",
    name: "Chandrasekhar Gowda",
    business: "Gowda Fertilisers & Seeds",
    phone: "+91 94490 88211",
    email: "gowda.agro@yahoo.com",
    city: "Tumakuru",
    totalBookings: 14,
    totalSpend: "₹12,450",
    lastTrip: "Yesterday",
    status: "ACTIVE"
  },
  {
    id: "CUST-8823",
    name: "Anand Murthy",
    business: "Murthy Timber & Plywood",
    phone: "+91 98860 33441",
    email: "anand.timber@gmail.com",
    city: "Kunigal",
    totalBookings: 6,
    totalSpend: "₹7,200",
    lastTrip: "3 days ago",
    status: "ACTIVE"
  }
];

export const MOCK_ADMIN_TRIPS = [
  {
    id: "PNL-1042",
    date: "24 Oct 2026, 14:15",
    customer: "Keerthana R. (Sri Balaji Agro)",
    driver: "Ravi Kumar (Tata Ace)",
    plate: "KA-06-XX-1234",
    route: "Tumakuru APMC -> Kunigal",
    distance: "38 km",
    goods: "Vegetables (550 kg)",
    status: "IN_TRANSIT",
    amount: "₹950",
    payment: "COD"
  },
  {
    id: "PNL-1041",
    date: "24 Oct 2026, 12:30",
    customer: "Chandrasekhar Gowda",
    driver: "Manjunath H. (Tata Ace)",
    plate: "KA-06-B-9988",
    route: "Batawadi -> Gubbi",
    distance: "24 km",
    goods: "Fertilisers (400 kg)",
    status: "COMPLETED",
    amount: "₹680",
    payment: "Online UPI"
  },
  {
    id: "PNL-1040",
    date: "24 Oct 2026, 10:10",
    customer: "Murthy Timber",
    driver: "Syed Imran (8ft Pickup)",
    plate: "KA-06-C-4521",
    route: "Antharasanahalli -> Sira Gate",
    distance: "16 km",
    goods: "Plywood Sheets (800 kg)",
    status: "COMPLETED",
    amount: "₹720",
    payment: "Online UPI"
  },
  {
    id: "PNL-1039",
    date: "24 Oct 2026, 09:00",
    customer: "Suresh Hardware",
    driver: "Unassigned",
    plate: "-",
    route: "Tumakuru -> Koratagere",
    distance: "29 km",
    goods: "Cement Bags (900 kg)",
    status: "CANCELLED",
    amount: "₹850",
    payment: "COD"
  }
];

export const MOCK_SUPPORT_TICKETS = [
  {
    id: "TCK-501",
    subject: "Loading delay at APMC Gate 2",
    user: "Keerthana R. (Customer)",
    tripId: "PNL-1042",
    priority: "HIGH",
    status: "IN_PROGRESS",
    createdAt: "30 mins ago"
  },
  {
    id: "TCK-500",
    subject: "Driver document verification reminder",
    user: "Siddalingappa G. (Driver)",
    tripId: "-",
    priority: "MEDIUM",
    status: "OPEN",
    createdAt: "2 hours ago"
  },
  {
    id: "TCK-499",
    subject: "Fare calculation discrepancy for toll",
    user: "Manjunath H. (Driver)",
    tripId: "PNL-1038",
    priority: "LOW",
    status: "RESOLVED",
    createdAt: "1 day ago"
  }
];
