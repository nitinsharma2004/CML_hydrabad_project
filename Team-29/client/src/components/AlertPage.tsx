import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WeatherAlerts from './WeatherAlerts';
import Chatbot from './Chatbot';

interface AlertPageProps {
  farmer?: any;
  weatherData?: any;
  farmerId?: string;
}

const AlertPage: React.FC<AlertPageProps> = ({ farmer: propFarmer, weatherData: propWeather, farmerId: propFarmerId }) => {
  const params = useParams();
  const navigate = useNavigate();
  const urlFarmerId = params.id as string | undefined;
  const [farmerId, setFarmerId] = useState(propFarmerId || urlFarmerId || '');
  const [farmer, setFarmer] = useState<any>(propFarmer || null);
  const [weatherData, setWeatherData] = useState<any>(propWeather || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (idOverride?: string) => {
    const idToFetch = idOverride || farmerId;
    if (!idToFetch.trim()) {
      setError('Please enter a farmer ID');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const farmerResponse = await fetch(`/api/farmers/${idToFetch}`);
      if (!farmerResponse.ok) throw new Error('Farmer not found');
      const farmerData = await farmerResponse.json();
      setFarmer(farmerData);
      const weatherResponse = await fetch(`/api/weather/${idToFetch}`);
      if (weatherResponse.ok) {
        const weatherData = await weatherResponse.json();
        setWeatherData(weatherData);
      }
    } catch (err: any) {
      setError(err.message);
      setFarmer(null);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if ((urlFarmerId && !farmer) || (propFarmerId && !farmer)) {
      handleSearch(urlFarmerId || propFarmerId);
    }
    // eslint-disable-next-line
  }, [urlFarmerId, propFarmerId]);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <button
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
        onClick={() => navigate(farmerId ? `/farmer/${farmerId}` : '/')}
      >
        ← Back to Dashboard
      </button>
      <h2 className="text-2xl font-bold text-green-800 mb-6">Active Weather Alerts & AI Advice</h2>
      {!farmer && (
        <div className="mb-6">
          <label htmlFor="farmerId" className="block text-sm font-medium text-gray-700 mb-2">
            Enter Farmer ID
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="farmerId"
              value={farmerId}
              onChange={(e) => setFarmerId(e.target.value)}
              placeholder="Enter farmer ID (e.g., 101, 102, 103)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
          {error && <div className="mt-2 text-red-600">{error}</div>}
        </div>
      )}
      {farmer && weatherData && (
        <>
          <WeatherAlerts weatherData={weatherData} farmer={farmer} />
          <div className="mt-8">
            <Chatbot
              farmerId={farmerId}
              weatherData={weatherData ? `${weatherData.current?.temperature ? `Temperature: ${weatherData.current.temperature}°C, ` : ''}${weatherData.current?.humidity ? `Humidity: ${weatherData.current.humidity}%, ` : ''}${weatherData.current?.windSpeed ? `Wind: ${weatherData.current.windSpeed} km/h, ` : ''}${weatherData.current?.visibility ? `Visibility: ${weatherData.current.visibility} km, ` : ''}${weatherData.current?.visibility ? `Visibility: ${weatherData.current.visibility} km` : ''}` : ''}
              forecast={weatherData?.forecast?.map(day => `${day.day}: High ${day.high}°C, Low ${day.low}°C, ${day.condition}`).join(' | ') || ''}
              crop={farmer?.crops?.join(', ') || ''}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AlertPage; 