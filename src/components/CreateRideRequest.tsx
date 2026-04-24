import React, { useState } from 'react';
import { mockService } from '../services/mockService';
import { useAuth } from '../context/AuthContext';
import { MapPin, Clock, Users } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

export const CreateRideRequest: React.FC<Props> = ({ onSuccess, onCancel }) => {
  const { user } = useAuth();
  const [pickup, setPickup] = useState('');
  const [timeStart, setTimeStart] = useState('08:00');
  const [timeEnd, setTimeEnd] = useState('09:00');
  const [seats, setSeats] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    await mockService.createRideRequest({
      riderId: user.id,
      pickupAddress: pickup,
      pickupLatLng: [40.7128, -74.0060], // Mocked LatLng
      destination: 'Campus',
      requestedTimeWindow: { start: timeStart, end: timeEnd },
      seatsRequested: seats,
    });
    onSuccess();
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Request a Ride</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 42 Elm St"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time From</label>
            <div className="relative">
              <Clock className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="time"
                value={timeStart}
                onChange={(e) => setTimeStart(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time To</label>
            <div className="relative">
              <Clock className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="time"
                value={timeEnd}
                onChange={(e) => setTimeEnd(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Seats Needed</label>
          <div className="relative">
            <Users className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <select
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} {n === 1 ? 'seat' : 'seats'}</option>)}
            </select>
          </div>
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
          >
            Confirm Request
          </button>
        </div>
      </form>
    </div>
  );
};
