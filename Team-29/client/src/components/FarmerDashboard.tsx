import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Search, AlertTriangle, Sun, CloudRain, Wind, Thermometer, Shield } from 'lucide-react'
import WeatherAlerts from './WeatherAlerts'
import FarmerInfo from './FarmerInfo'
import Recommendations from './Recommendations'
import YieldPrediction from './YieldPrediction'
import Chatbot from './Chatbot'
import PhoneVerification from './PhoneVerification'
import ReactMarkdown from 'react-markdown'

type WeatherData = {
  current?: {
    temperature?: number;
    humidity?: number;
    windSpeed?: number;
    visibility?: number;
  };
  forecast?: {
    day: string;
    high: number;
    low: number;
    condition: string;
  }[];
};

type Farmer = {
  id: string;
  name: string;
  phone: string;
  address: string;
  crops: string[];
  [key: string]: any;
};

interface FarmerDashboardProps {
  userType?: 'admin' | 'user';
}

const FarmerDashboard: React.FC<FarmerDashboardProps> = ({ userType }) => {
  const { id } = useParams()
  const isAdmin = userType === 'admin'
  // Only pre-fill farmerId for admin users, keep empty for regular users
  const [farmerId, setFarmerId] = useState(isAdmin ? (id || '') : '')
  const [farmer, setFarmer] = useState<Farmer | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [aiAdvice, setAiAdvice] = useState('')
  const [showPhoneVerification, setShowPhoneVerification] = useState(false)
  const [isUserVerified, setIsUserVerified] = useState(false)
  const [verifiedPhone, setVerifiedPhone] = useState('')
  const lastWeatherData: React.MutableRefObject<any> = useRef(null)

  const handleSearch = async () => {
    if (!farmerId.trim()) {
      setError('Please enter a farmer ID')
      return
    }

    // If user is not admin and not verified, show phone verification
    if (!isAdmin && !isUserVerified) {
      setShowPhoneVerification(true)
      return
    }

    setLoading(true)
    setError('')

    try {
      // Fetch farmer data
      const farmerResponse = await fetch(`/api/farmers/${farmerId}`)
      if (!farmerResponse.ok) {
        throw new Error('Farmer not found')
      }
      const farmerData = await farmerResponse.json()
      setFarmer(farmerData)

      // Fetch weather data
      const weatherResponse = await fetch(`/api/weather/${farmerId}`)
      if (weatherResponse.ok) {
        const weatherData = await weatherResponse.json()
        setWeatherData(weatherData)
        lastWeatherData.current = weatherData
        // Fetch AI advice
        const aiResponse = await fetch('/api/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            farmerId,
            weatherData: `${weatherData.current?.temperature ? `Temperature: ${weatherData.current.temperature}°C, ` : ''}${weatherData.current?.humidity ? `Humidity: ${weatherData.current.humidity}%, ` : ''}${weatherData.current?.windSpeed ? `Wind: ${weatherData.current.windSpeed} km/h, ` : ''}${weatherData.current?.visibility ? `Visibility: ${weatherData.current.visibility} km` : ''}`,
            forecast: weatherData.forecast?.map(day => `${day.day}: High ${day.high}°C, Low ${day.low}°C, ${day.condition}`).join(' | ') || '',
            crop: farmerData?.crops?.join(', ') || ''
          })
        })
        const aiData = await aiResponse.json()
        setAiAdvice(aiData.reply || 'No AI advice available.')
      }
    } catch (err) {
      setError(err.message)
      setFarmer(null)
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  const handleVerificationSuccess = (phoneNumber: string) => {
    setIsUserVerified(true)
    setVerifiedPhone(phoneNumber)
    setShowPhoneVerification(false)
    // Only proceed with search if there's a valid farmer ID
    if (farmerId.trim()) {
      handleSearch()
    }
  }

  const handleVerificationCancel = () => {
    setShowPhoneVerification(false)
  }

  useEffect(() => {
    if (id) {
      // Only auto-search for admin users or verified users
      if (isAdmin || isUserVerified) {
        handleSearch()
      }
    } else {
      // Clear farmer data when no ID in URL
      setFarmer(null)
      setWeatherData(null)
      setAiAdvice('')
      setError('')
    }
  }, [id, isAdmin, isUserVerified])

  return (
    <div className="space-y-6 w-full min-h-screen px-6">
      {/* Search Section */}
      <div className="dashboard-card rounded-lg p-6 shadow-lg w-full mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Farmer Dashboard</h2>
          {isUserVerified && (
            <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
              <Shield className="h-3 w-3" />
              <span>Verified: {verifiedPhone}</span>
            </div>
          )}
          {isAdmin && (
            <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
              <Shield className="h-3 w-3" />
              <span>Admin Access</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="farmerId" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Farmer ID
            </label>
            <div className="relative">
              <input
                type="text"
                id="farmerId"
                value={farmerId}
                onChange={(e) => setFarmerId(e.target.value)}
                placeholder="Enter farmer ID (e.g., 101, 102, 103)"
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            {error}
          </div>
        )}

        {/* User Verification Notice - Only show for user login, not admin */}
        {!isAdmin && !isUserVerified && !farmer && (
          <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <span>Phone verification required to access farmer data</span>
          </div>
        )}
      </div>

      {/* Results Section */}
      {farmer && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
          {/* Farmer Information */}
          <div className="col-span-1">
            <FarmerInfo farmer={farmer} />
          </div>

          {/* Weather Alerts, Recommendations, Yield Prediction */}
          <div className="col-span-3 space-y-8">
            <div className="w-full">
              <WeatherAlerts weatherData={weatherData} farmer={farmer} />
            </div>
            {/* AI Smart Advice Card */}
            {aiAdvice && (
              <div className="w-full bg-white rounded-lg shadow-lg p-6 border border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🤖</span>
                  <span className="font-bold text-lg text-green-700">Smart Advice</span>
                </div>
                <div className="prose prose-green max-w-none text-base text-gray-800">
                  <ReactMarkdown>{aiAdvice}</ReactMarkdown>
                </div>
              </div>
            )}
            <div className="w-full">
              <Recommendations farmer={farmer} weatherData={weatherData} />
            </div>
            <div className="w-full">
              <YieldPrediction farmer={farmer} />
            </div>
          </div>
        </div>
      )}

      {/* Welcome Message */}
      {!farmer && !loading && !error && (
        <div className="dashboard-card rounded-lg p-8 text-center w-full">
          <div className="w-full flex flex-col items-center">
            <Sun className="h-16 w-16 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Welcome to Assam Farmers Platform
            </h3>
            <p className="text-gray-600 mb-4">
              Enter a farmer ID to access personalized weather alerts, crop recommendations, yield predictions, and agricultural insights.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 w-full">
              <div className="flex items-center gap-2 justify-center">
                <CloudRain className="h-4 w-4" />
                <span>Weather Alerts</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Thermometer className="h-4 w-4" />
                <span>Crop Insights</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Wind className="h-4 w-4" />
                <span>Smart Recommendations</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Thermometer className="h-4 w-4" />
                <span>Yield Predictions</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chatbot */}
      <Chatbot
        farmerId={farmerId}
        weatherData={
          weatherData && weatherData.current
            ? [
                weatherData.current.temperature !== undefined ? `Temperature: ${weatherData.current.temperature}°C` : '',
                weatherData.current.humidity !== undefined ? `Humidity: ${weatherData.current.humidity}%` : '',
                weatherData.current.windSpeed !== undefined ? `Wind: ${weatherData.current.windSpeed} km/h` : '',
                weatherData.current.visibility !== undefined ? `Visibility: ${weatherData.current.visibility} km` : ''
              ].filter(Boolean).join(', ')
            : ''
        }
        forecast={weatherData?.forecast?.map(day => `${day.day}: High ${day.high}°C, Low ${day.low}°C, ${day.condition}`).join(' | ') || ''}
        crop={farmer?.crops?.join(', ') || ''}
      />

      {/* Phone Verification Modal - Only show for user login, not admin */}
      {showPhoneVerification && !isAdmin && (
        <PhoneVerification
          onVerificationSuccess={handleVerificationSuccess}
          onCancel={handleVerificationCancel}
        />
      )}
    </div>
  )
}

export default FarmerDashboard 