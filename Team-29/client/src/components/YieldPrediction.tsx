import React, { useState, useEffect } from 'react'
import { TrendingUp, BarChart3, Calendar, MapPin, Package, Target } from 'lucide-react'

const YieldPrediction = ({ farmer }) => {
  const [yieldData, setYieldData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (farmer) {
      fetchYieldPrediction()
    }
  }, [farmer])

  const fetchYieldPrediction = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/yield-prediction/${farmer.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch yield prediction')
      }
      const data = await response.json()
      setYieldData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!farmer) return null

  if (loading) {
    return (
      <div className="dashboard-card rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="h-6 w-6 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-800">Yield Prediction</h3>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Generating yield predictions...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-card rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="h-6 w-6 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-800">Yield Prediction</h3>
        </div>
        <div className="text-red-600 text-center py-4">{error}</div>
      </div>
    )
  }

  if (!yieldData) return null

  const getYieldStatus = (yieldValue, crop) => {
    const thresholds = {
      'Rice': { good: 2.5, excellent: 3.0 },
      'Lemon': { good: 8, excellent: 10 },
      'Black Pepper': { good: 0.8, excellent: 1.0 },
      'Pineapple': { good: 15, excellent: 18 },
      'Tea': { good: 2, excellent: 2.5 }
    }
    
    const threshold = thresholds[crop] || { good: 2, excellent: 2.5 }
    
    if (yieldValue >= threshold.excellent) return 'excellent'
    if (yieldValue >= threshold.good) return 'good'
    return 'average'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100'
      case 'good': return 'text-blue-600 bg-blue-100'
      case 'average': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="dashboard-card rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className="h-6 w-6 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-800">Crop Yield Prediction</h3>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Total Area</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{yieldData.summary.total_area} acres</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Total Production</span>
          </div>
          <p className="text-2xl font-bold text-green-900">{yieldData.summary.total_predicted_production} tons</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Avg Yield</span>
          </div>
          <p className="text-2xl font-bold text-purple-900">{yieldData.summary.average_yield} tons/acre</p>
        </div>
      </div>

      {/* Crop Predictions */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 mb-3">Crop-wise Predictions</h4>
        
        {yieldData.predictions.map((prediction, index) => {
          const status = getYieldStatus(prediction.yield, prediction.crop)
          const statusColor = getStatusColor(status)
          
          return (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  <h5 className="font-medium text-gray-900">{prediction.crop}</h5>
                  <span className={`px-2 py-1 text-xs rounded-full ${statusColor}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)} Yield
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{prediction.production} tons</p>
                  <p className="text-sm text-gray-600">{prediction.yield} tons/acre</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Season:</span>
                  <p className="font-medium">{prediction.season}</p>
                </div>
                <div>
                  <span className="text-gray-600">Area:</span>
                  <p className="font-medium">{prediction.area} acres</p>
                </div>
                <div>
                  <span className="text-gray-600">Rainfall:</span>
                  <p className="font-medium">{prediction.annual_rainfall}mm</p>
                </div>
                <div>
                  <span className="text-gray-600">Fertilizer:</span>
                  <p className="font-medium">{prediction.fertilizer}</p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Yield Efficiency</span>
                  <span>{Math.round((prediction.yield / 3) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      status === 'excellent' ? 'bg-green-500' :
                      status === 'good' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${Math.min((prediction.yield / 3) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Insights */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h5 className="font-medium text-gray-900 mb-2">AI Insights</h5>
        <div className="space-y-2 text-sm text-gray-700">
          <p>• Based on current weather patterns and historical data</p>
          <p>• Predictions account for soil type, fertilizer usage, and farming practices</p>
          <p>• Seasonal variations and rainfall patterns are considered</p>
          <p>• Recommendations for optimal harvest timing will be available soon</p>
        </div>
      </div>
    </div>
  )
}

export default YieldPrediction 