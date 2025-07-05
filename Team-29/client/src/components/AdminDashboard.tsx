import React, { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Wheat, Loader2 } from "lucide-react";

// Fallback data in case API fails
const fallbackData = {
  visitorsCount: 48294,
  totalDonations: [
    { month: "Jan", amount: 1200 },
    { month: "Feb", amount: 1500 },
    { month: "Mar", amount: 1800 },
    { month: "Apr", amount: 2000 },
    { month: "May", amount: 2200 },
    { month: "Jun", amount: 2500 }
  ],
  volunteerActivity: [
    { month: "Jan", count: 30 },
    { month: "Feb", count: 45 },
    { month: "Mar", count: 40 },
    { month: "Apr", count: 55 },
    { month: "May", count: 60 },
    { month: "Jun", count: 70 }
  ],
  farmersEnrolled: [
    { month: "Jan", count: 100 },
    { month: "Feb", count: 250 },
    { month: "Mar", count: 400 },
    { month: "Apr", count: 600 },
    { month: "May", count: 850 },
    { month: "Jun", count: 1100 }
  ],
  impactData: [
    { month: "Jan", value: 10 },
    { month: "Feb", value: 25 },
    { month: "Mar", value: 45 },
    { month: "Apr", value: 70 },
    { month: "May", value: 90 },
    { month: "Jun", value: 95 }
  ]
};

function useAnimatedCounter(target: number) {
  const motionValue = useMotionValue(0);

  useEffect(() => {
    const controls = animate(motionValue, target, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [target, motionValue]);

  return motionValue;
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch data from backend API
        const response = await fetch('http://localhost:5001/api/admin/dashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      
        // Keep using fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const { visitorsCount, totalDonations, volunteerActivity, farmersEnrolled, impactData } = dashboardData;

  const visitorsCounter = useAnimatedCounter(visitorsCount);
  const donationsCounter = useAnimatedCounter(
    totalDonations.reduce((acc, item) => acc + item.amount, 0)
  );
  const volunteerCounter = useAnimatedCounter(
    volunteerActivity.reduce((acc, item) => acc + item.count, 0)
  );
  const farmersCounter = useAnimatedCounter(
    farmersEnrolled.reduce((acc, item) => acc + item.count, 0)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 py-8 px-6">
      <motion.section
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div className="text-center mb-8" {...fadeInUp}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wheat className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Track our progress in empowering communities and supporting farmers in Northeast India.
          </p>
          {error && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
              <p className="text-yellow-800 text-sm">{error}</p>
            </div>
          )}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Visitors Count */}
          <motion.div
            className="bg-white shadow-lg rounded-xl p-4 border border-green-100 text-center"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Visitors Count</h3>
            <motion.span className="text-2xl font-bold text-green-700">
              {Math.floor(visitorsCounter.get())}+
            </motion.span>
          </motion.div>

          {/* Donations */}
          <motion.div
            className="bg-white shadow-lg rounded-xl p-4 border border-green-100 text-center"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Total Donations</h3>
            <motion.span className="text-2xl font-bold text-green-700">
              ₹{Math.floor(donationsCounter.get()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </motion.span>
          </motion.div>

          {/* Volunteers */}
          <motion.div
            className="bg-white shadow-lg rounded-xl p-4 border border-green-100 text-center"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Volunteers Active</h3>
            <motion.span className="text-2xl font-bold text-green-700">
              {Math.floor(volunteerCounter.get())}+
            </motion.span>
          </motion.div>

          {/* Farmers */}
          <motion.div
            className="bg-white shadow-lg rounded-xl p-4 border border-green-100 text-center"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Farmers Enrolled</h3>
            <motion.span className="text-2xl font-bold text-green-700">
              {Math.floor(farmersCounter.get())}+
            </motion.span>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Total Donations */}
          <motion.div
            className="bg-white shadow-lg rounded-xl p-4 border border-green-100"
            variants={fadeInUp}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Total Donations</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={totalDonations}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="amount" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Volunteer Activity */}
          <motion.div
            className="bg-white shadow-lg rounded-xl p-4 border border-green-100"
            variants={fadeInUp}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Volunteer Activity</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={volunteerActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Farmers Enrolled */}
          <motion.div
            className="bg-white shadow-lg rounded-xl p-4 border border-green-100"
            variants={fadeInUp}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Farmers Enrolled</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={farmersEnrolled}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Impact */}
          <motion.div
            className="bg-white shadow-lg rounded-xl p-4 border border-green-100"
            variants={fadeInUp}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Impact Over the Months (%)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={impactData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#EF4444" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
} 