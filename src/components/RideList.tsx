import React, { useEffect, useState } from 'react';
import { mockService } from '../services/mockService';
import type { RideRequest, RideOffer } from '../types';
import { Clock, MapPin, User as UserIcon, CheckCircle } from 'lucide-react';

interface Props {
  userId: string;
  role: 'RIDER' | 'DRIVER';
}

export const RideList: React.FC<Props> = ({ userId, role }) => {
  const [rides, setRides] = useState<RideRequest[]>([]);
  const [matchedOffers, setMatchedOffers] = useState<Record<string, RideOffer[]>>({});

  const loadData = async () => {
    const myRides = await mockService.getMyRides(userId);
    setRides(myRides);

    if (role === 'RIDER') {
      const offersMap: Record<string, RideOffer[]> = {};
      for (const ride of myRides) {
        if (ride.status === 'OPEN') {
          offersMap[ride.id] = await mockService.getMatchedOffers(ride);
        }
      }
      setMatchedOffers(offersMap);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 3000); // Poll for changes in mock store
    return () => clearInterval(interval);
  }, [userId, role]);

  const handleAcceptOffer = async (rideId: string, offer: RideOffer) => {
    await mockService.updateRideStatus(rideId, 'ACCEPTED', offer.driverId);
    loadData();
  };

  const handleCompleteRide = async (rideId: string) => {
    await mockService.updateRideStatus(rideId, 'COMPLETED');
    loadData();
  };

  return (
    <div className="space-y-4">
      {rides.length === 0 ? (
        <div className="text-center py-8 text-gray-500 italic">No active rides.</div>
      ) : (
        rides.map(ride => (
          <div key={ride.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2 text-sm font-bold uppercase tracking-wider">
                <span className={`px-2 py-0.5 rounded ${
                  ride.status === 'OPEN' ? 'bg-blue-100 text-blue-700' :
                  ride.status === 'ACCEPTED' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {ride.status}
                </span>
                <span className="text-gray-400">#{ride.id.slice(0, 4)}</span>
              </div>
              <div className="text-xs text-gray-400">
                {new Date(ride.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-700">
                <MapPin size={16} className="text-blue-500" />
                <span className="font-medium">{ride.pickupAddress}</span>
                <span className="text-gray-400">→</span>
                <span className="font-medium">{ride.destination}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <Clock size={16} />
                <span>{ride.requestedTimeWindow.start} - {ride.requestedTimeWindow.end}</span>
              </div>
            </div>

            {role === 'RIDER' && ride.status === 'OPEN' && matchedOffers[ride.id]?.length > 0 && (
              <div className="mt-4 pt-4 border-t border-dashed">
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Available Offers</p>
                <div className="space-y-2">
                  {matchedOffers[ride.id].map(offer => (
                    <div key={offer.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700">
                          <UserIcon size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">Ben Torres</p>
                          <p className="text-xs text-gray-500">${offer.pricePerRider} • {offer.seatsAvailable} seats</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleAcceptOffer(ride.id, offer)}
                        className="px-4 py-1.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700"
                      >
                        Book
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {role === 'DRIVER' && ride.status === 'ACCEPTED' && (
              <button 
                onClick={() => handleCompleteRide(ride.id)}
                className="w-full mt-2 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
              >
                <CheckCircle size={18} />
                <span>Mark as Completed</span>
              </button>
            )}

            {ride.status === 'ACCEPTED' && (
              <div className="flex items-center space-x-2 text-sm text-blue-600 font-medium">
                <CheckCircle size={16} />
                <span>Ride confirmed with {role === 'RIDER' ? 'Ben' : 'Alice'}</span>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};
