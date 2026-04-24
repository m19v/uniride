import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon, Car, MapPin, Calendar } from 'lucide-react';
import { CreateRideRequest } from '../components/CreateRideRequest';
import { RideList } from '../components/RideList';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [showRequestForm, setShowRequestForm] = useState(false);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <Car className="text-blue-600" size={32} />
          <h1 className="text-2xl font-bold text-gray-800">UniRide</h1>
        </div>
        <button 
          onClick={logout}
          className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Summary */}
        <div className="md:col-span-1 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6 border-4 border-white shadow-inner">
              <UserIcon size={48} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mt-2 uppercase tracking-wider">{user.role}</p>
            <div className="flex items-center space-x-1 text-yellow-500 mt-4">
              <span className="font-bold text-lg">{user.rating}</span>
              <span className="text-xl">★</span>
            </div>
            <div className="mt-8 w-full space-y-4 pt-6 border-t border-gray-50 text-sm text-gray-600">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <MapPin size={18} className="text-blue-500" />
                </div>
                <span className="font-medium">{user.university}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Center */}
        <div className="md:col-span-2 space-y-8">
          {showRequestForm ? (
            <CreateRideRequest 
              onSuccess={() => setShowRequestForm(false)} 
              onCancel={() => setShowRequestForm(false)} 
            />
          ) : (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Car size={120} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {user.role === 'RIDER' ? 'Need a ride?' : 'Ready to drive?'}
              </h3>
              <p className="text-gray-500 mb-8 max-w-sm">
                {user.role === 'RIDER' 
                  ? 'Connect with fellow students heading to campus today.' 
                  : 'Share your route and help others while earning rewards.'}
              </p>
              
              {user.role === 'RIDER' ? (
                <button 
                  onClick={() => setShowRequestForm(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center space-x-3 active:scale-[0.98]"
                >
                  <MapPin size={22} />
                  <span>Request a Ride</span>
                </button>
              ) : (
                <button className="w-full sm:w-auto px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center space-x-3 active:scale-[0.98]">
                  <Calendar size={22} />
                  <span>Post Ride Offer</span>
                </button>
              )}
            </div>
          )}

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Your Activity</h3>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Updates</div>
            </div>
            <RideList userId={user.id} role={user.role as 'RIDER' | 'DRIVER'} />
          </div>
        </div>
      </main>
    </div>
  );
};
