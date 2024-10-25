// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import sendRequest from '../../services/aixosRequestFunction';
import useCurrentUser from '../../hooks/useAuth';

const Dashboard = () => {
  const user = useCurrentUser();
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [bookingStats, setBookingStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    const endpoint = `/api/users`; 
    const method = 'get';
    try {
        const response = await sendRequest(endpoint, method, {}, true);
        setUsers(response['hydra:member']);
        return response;
    } catch (error) {
        console.error('Failed to get Users:', error); 
    }
  };

  const fetchBookings = async (role) => {
    if(user) {
        const endpoint = role == "ROLE_ADMIN" ? `/api/bookings` :`/api/bookings?service_provider_id=${user.id}`; 

        const method = 'get';
    
        try {
            const response = await sendRequest(endpoint, method, {}, true);
            setBookings(response['hydra:member']);
            return response;
        } catch (error) {
            setError('Erreur lors du chargement des réservations.');
        }
    }
  };

  const processUserStats = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const stats = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      registrations: 0,
    }));

    users.forEach(user => {
      const createdAt = new Date(user.created_at); 
      if (createdAt.getMonth() === currentMonth && createdAt.getFullYear() === currentYear) {
        stats[createdAt.getDate() - 1].registrations += 1;
      }
    });

    setUserStats(stats);
  };

  const processBookingStats = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Initialiser un tableau avec les jours du mois
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const stats = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      bookings: 0,
    }));

    bookings.forEach(booking => {
      const bookingDate = new Date(booking.create_at); // Assurez-vous que 'createdAt' est le bon champ
      if (bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear) {
        stats[bookingDate.getDate() - 1].bookings += 1;
      }
    });

    setBookingStats(stats);
  };

  useEffect(() => {
    if(user && user.role.join() === 'ROLE_ADMIN') {
        const fetchData = async () => {
            await Promise.all([fetchUsers(), fetchBookings('ROLE_ADMIN')]);
            setLoading(false);
          };
        fetchData();
    } else {
        const fetchData = async () => {
            await fetchBookings('ROLE_WORKER')
            setLoading(false);
          };
        fetchData();
    }

  }, [user]);

  useEffect(() => {
    if (!loading && users.length > 0) {
      processUserStats();
    }
  }, [users, loading]);

  useEffect(() => {
    if (!loading && bookings.length > 0) {
      processBookingStats();
    }
  }, [bookings, loading]);

  if (loading) {
    return <div className="text-center text-gray-500">Chargement...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-800">Statistics Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        { 
          user && user.role.join() === 'ROLE_ADMIN' && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Inscriptions Utilisateurs ce Mois-ci</h2>
              <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" label={{ value: 'Jour', position: 'insideBottomRight', offset: -5 }} />
                  <YAxis label={{ value: 'Inscriptions', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="registrations" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
              </ResponsiveContainer>
          </div>) 
            
        }

        {
          bookingStats.length > 0 ?
          <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Réservations ce Mois-ci</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" label={{ value: 'Jour', position: 'insideBottomRight', offset: -5 }} />
              <YAxis label={{ value: 'Réservations', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        : 'Loading...'
        }

  


      </div>
      <div>
        {
          bookingStats.length === 0 && <h1 className="text-xl">Vous n'avez pas de statistiques</h1>
        }

      </div>

    </main>
  );
};

export default Dashboard;
