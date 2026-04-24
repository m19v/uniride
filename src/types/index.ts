export type Role = 'RIDER' | 'DRIVER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  university: string;
  homeAddress?: string;
  verifiedStudent: boolean;
  profilePhoto?: string;
  rating: number;
}

export interface DriverProfile {
  userId: string;
  carMakeModel: string;
  licensePlate: string;
  seats: number;
  baseFare: number;
  totalEarnings: number;
}

export type RideStatus = 'OPEN' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface RideRequest {
  id: string;
  riderId: string;
  pickupAddress: string;
  pickupLatLng: [number, number];
  destination: string; // Typically "Campus" for MVP
  requestedTimeWindow: {
    start: string;
    end: string;
  };
  seatsRequested: number;
  status: RideStatus;
  matchedDriverId?: string;
  fare?: number;
  createdAt: string;
}

export interface RideOffer {
  id: string;
  driverId: string;
  availabilitySlot: {
    start: string;
    end: string;
  };
  seatsAvailable: number;
  pricePerRider: number;
  status: 'OPEN' | 'EXPIRED';
}

export interface ChatMessage {
  id: string;
  rideId: string;
  senderId: string;
  text: string;
  timestamp: string;
}
