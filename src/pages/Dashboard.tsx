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

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <UserIcon size={40} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{user.role}</p>
            <div className="flex items-center space-x-1 text-yellow-500">
              <span className="font-bold">{user.rating}</span>
              <span>★</span>
            </div>
            <div className="mt-4 w-full text-left space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>{user.university}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Center */}
        <div className="md:col-span-2 space-y-6">
          {showRequestForm ? (
            <CreateRideRequest 
              onSuccess={() => setShowRequestForm(false)} 
              onCancel={() => setShowRequestForm(false)} 
            />
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {user.role === 'RIDER' ? 'Request a Ride' : 'Manage Offers'}
              </h3>
              
              {user.role === 'RIDER' ? (
                <div className="space-y-4">
                  <p className="text-gray-600">Where are you heading today?</p>
                  <button 
                    onClick={() => setShowRequestForm(true)}
                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <MapPin size={20} />
                    <span>Create New Request</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-600">Share your route and help fellow students.</p>
                  <button className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                    <Calendar size={20} />
                    <span>Post Ride Offer</span>
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Your Recent Activity</h3>
            <RideList userId={user.id} role={user.role as 'RIDER' | 'DRIVER'} />
          </div>
        </div>
      </main>
    </div>
  );
};
