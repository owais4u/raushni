'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { FaUsers, FaDonate, FaProjectDiagram, FaMoneyBillWave } from 'react-icons/fa'

export default function Dashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalDonations: 0,
    totalProjects: 0,
    totalExpenses: 0,
    recentActivities: [],
    donationTrend: [],
    projectProgress: []
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const statCards = [
    { title: 'Total Members', value: stats.totalMembers, icon: FaUsers, color: 'bg-blue-500' },
    { title: 'Total Donations', value: `₹${stats.totalDonations.toLocaleString()}`, icon: FaDonate, color: 'bg-green-500' },
    { title: 'Active Projects', value: stats.totalProjects, icon: FaProjectDiagram, color: 'bg-purple-500' },
    { title: 'Total Expenses', value: `₹${stats.totalExpenses.toLocaleString()}`, icon: FaMoneyBillWave, color: 'bg-red-500' },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, {session?.user?.name}!</h1>
        <p className="text-gray-600">Here's what's happening with your NGO today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="text-white text-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Donation Trends</h2>
          <LineChart width={500} height={300} data={stats.donationTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Project Progress</h2>
          <PieChart width={500} height={300}>
            <Pie
              data={stats.projectProgress}
              cx={250}
              cy={150}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {stats.projectProgress.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {stats.recentActivities.map((activity, index) => (
            <div key={index} className="border-b pb-3">
              <p className="text-gray-800">{activity.description}</p>
              <p className="text-gray-500 text-sm">{new Date(activity.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}