import type { User, DriverProfile, RideRequest, RideOffer } from '../types';

export const SEED_USERS: User[] = [
  {
    id: 'student1',
    name: 'Alice Park',
    email: 'alice@uni-due.de',
    phone: '+1-555-0101',
    role: 'RIDER',
    university: 'University of Duisburg-Essen',
    homeAddress: '42 Elm St, Town',
    verifiedStudent: true,
    rating: 4.8,
  },
  {
    id: 'student2',
    name: 'Ben Torres',
    email: 'ben@uni-due.de',
    phone: '+1-555-0202',
    role: 'DRIVER',
    university: 'University of Duisburg-Essen',
    homeAddress: '18 Maple Ave, Town',
    verifiedStudent: true,
    rating: 4.9,
  },
];

export const SEED_DRIVER_PROFILES: DriverProfile[] = [
  {
    userId: 'student2',
    carMakeModel: 'Toyota Corolla 2016',
    licensePlate: 'ABC-1234',
    seats: 3,
    baseFare: 2.50,
    totalEarnings: 0,
  },
];

export const SEED_RIDE_REQUESTS: RideRequest[] = [];
export const SEED_RIDE_OFFERS: RideOffer[] = [
  {
    id: 'offer1',
    driverId: 'student2',
    availabilitySlot: {
      start: '07:30',
      end: '09:30',
    },
    seatsAvailable: 3,
    pricePerRider: 2.50,
    status: 'OPEN',
  },
];
