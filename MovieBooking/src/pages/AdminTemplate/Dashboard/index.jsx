import { useState, useEffect } from 'react'
import CountUp from 'react-countup';
import {
  BarChart, Bar,
  XAxis, YAxis,
  CartesianGrid, Tooltip
} from "recharts";

const Dashboard = () => {
  const [messagesBuy, setMessagesBuy] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const revenueData = [
    { day: 'Mon', value: 2000 },
    { day: 'Tue', value: 3000 },
    { day: 'Wed', value: 2500 },
    { day: 'Thu', value: 4000 },
    { day: 'Fri', value: 3500 },
    { day: 'Sat', value: 5000 },
    { day: 'Sun', value: 6500 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setMessagesBuy((previousMessage) => {
        if (previousMessage.length >= 8) {
          return previousMessage;
        } else {
          return [...previousMessage, "A customer just booked a ticket!"];
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-0.5">
      <h1 className="text-3xl font-bold text-black dark:text-amber-600 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border-l-4 border-blue-700 dark:border-blue-500 hover:shadow-xl transition-shadow duration-300">
          <p className="text-sm font-medium text-gray-500 dark:text-emerald-800">Total Revenue</p>
          <div className="text-2xl font-bold text-black dark:text-amber-600 mt-1">{isMounted && <CountUp start={0} end={12500} duration={3} separator="," prefix="$" />}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border-l-4 border-green-900 dark:border-green-500 hover:shadow-xl transition-shadow duration-300">
          <p className="text-sm font-medium text-gray-500 dark:text-emerald-800">Tickets Sold</p>
          <div className="text-2xl font-bold text-black dark:text-amber-600 mt-1">{isMounted && <CountUp start={0} end={500} duration={3} separator="," />}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border-l-4 border-yellow-900 dark:border-yellow-500 hover:shadow-xl transition-shadow duration-300">
          <p className="text-sm font-medium text-gray-500 dark:text-emerald-800">Movies Showing</p>
          <div className="text-2xl font-bold text-black dark:text-amber-600 mt-1">{isMounted && <CountUp start={0} end={5} duration={3} separator="," />}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border-l-4 border-red-800 dark:border-red-500 hover:shadow-xl transition-shadow duration-300">
          <p className="text-sm font-medium text-gray-500 dark:text-emerald-800">New Users</p>
          <div className="text-2xl font-bold text-black dark:text-amber-600 mt-1">{isMounted && <CountUp start={0} end={50} duration={3} separator="," />}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border-l-4 border-purple-600 dark:border-purple-500 hover:shadow-xl transition-shadow duration-300">
          <p className="text-sm font-medium text-gray-500 dark:text-emerald-800">Active Screens</p>
          <div className="text-2xl font-bold text-black dark:text-amber-600 mt-1">{isMounted && <CountUp start={0} end={8} duration={3} />}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border-l-4 border-pink-600 dark:border-pink-500 hover:shadow-xl transition-shadow duration-300">
          <p className="text-sm font-medium text-gray-500 dark:text-emerald-800">Bookings Today</p>
          <div className="text-2xl font-bold text-black dark:text-amber-600 mt-1">{isMounted && <CountUp start={0} end={120} duration={3} />}</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-5/8 flex flex-col gap-6">
          <div className="bg-indigo-600 dark:bg-gray-800 p-4 rounded-xl shadow flex flex-col">
            <h3 className="text-lg font-semibold mb-2 text-green-400 dark:text-green-300">Revenue</h3>
            <BarChart width="100%" height={250} data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </div>
        </div>

        <div className="w-full lg:w-3/8 flex flex-col gap-6">
          <div className="bg-yellow-600 dark:bg-gray-800 p-4 rounded-xl shadow flex flex-col">
            <h2 className="text-xl font-bold mb-3 border-b pb-2 text-black dark:text-amber-600">Recent Updates</h2>
            <div className="flex flex-col gap-2 h-40 overflow-y-auto mt-2 pr-2">
              {messagesBuy.map((message, index) => (
                <div key={index} className="flex items-center text-gray-800 dark:text-gray-200 px-3 py-1 gap-2">
                  <i className="fas fa-circle text-green-500 text-xs"></i>
                  <span>{message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard