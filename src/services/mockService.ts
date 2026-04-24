import type { User, RideRequest, RideOffer, RideStatus } from '../types';
import { SEED_USERS, SEED_RIDE_OFFERS } from './mockData';

const STORAGE_KEYS = {
  USERS: 'uniride_users',
  RIDES: 'uniride_rides',
  OFFERS: 'uniride_offers',
  AUTH_TOKEN: 'uniride_token',
  CURRENT_USER: 'uniride_current_user',
};

export const mockService = {
  init: () => {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.OFFERS)) {
      localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(SEED_RIDE_OFFERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.RIDES)) {
      localStorage.setItem(STORAGE_KEYS.RIDES, JSON.stringify([]));
    }
  },

  login: async (email: string): Promise<User | null> => {
    const users: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const user = users.find(u => u.email === email);
    if (user) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'mock-jwt-token');
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      return user;
    }
    return null;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },

  getRideOffers: async (): Promise<RideOffer[]> => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFERS) || '[]');
  },

  createRideRequest: async (request: Omit<RideRequest, 'id' | 'createdAt' | 'status'>): Promise<RideRequest> => {
    const rides: RideRequest[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.RIDES) || '[]');
    const newRide: RideRequest = {
      ...request,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: 'OPEN',
    };
    rides.push(newRide);
    localStorage.setItem(STORAGE_KEYS.RIDES, JSON.stringify(rides));
    return newRide;
  },

  getMyRides: async (userId: string): Promise<RideRequest[]> => {
    const rides: RideRequest[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.RIDES) || '[]');
    return rides.filter(r => r.riderId === userId || r.matchedDriverId === userId);
  },

  getMatchedOffers: async (request: RideRequest): Promise<RideOffer[]> => {
    const offers: RideOffer[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFERS) || '[]');
    // Simple matching: time overlap (naive)
    return offers.filter(offer => {
      return offer.status === 'OPEN' && 
             offer.availabilitySlot.start <= request.requestedTimeWindow.end &&
             offer.availabilitySlot.end >= request.requestedTimeWindow.start;
    });
  },

  updateRideStatus: async (rideId: string, status: RideStatus, driverId?: string): Promise<void> => {
    const rides: RideRequest[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.RIDES) || '[]');
    const index = rides.findIndex(r => r.id === rideId);
    if (index !== -1) {
      rides[index].status = status;
      if (driverId) rides[index].matchedDriverId = driverId;
      localStorage.setItem(STORAGE_KEYS.RIDES, JSON.stringify(rides));
    }
  }
};
