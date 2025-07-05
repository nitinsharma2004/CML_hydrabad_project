import React, { useState } from 'react'
import { AlertTriangle, CloudRain, Wind, Thermometer, Eye, Droplets } from 'lucide-react'

const WeatherAlerts = ({ weatherData, farmer }) => {
  const [language, setLanguage] = useState('assamese');
  const [translatedMsg, setTranslatedMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [sentDialog, setSentDialog] = useState(false);
  
  if (!weatherData) {
    return (
      <div className="dashboard-card rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <CloudRain className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Weather Information</h3>
        </div>
        <p className="text-gray-600">Weather data not available for this location.</p>
      </div>
    )
  }

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'rain':
      case 'drizzle':
        return <CloudRain className="h-8 w-8 text-blue-500" />
      case 'storm':
      case 'thunderstorm':
        return <AlertTriangle className="h-8 w-8 text-red-500" />
      default:
        return <Thermometer className="h-8 w-8 text-orange-500" />
    }
  }

  const getAlertSeverity = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  // Helper to get the main alert message (combine all alerts for now)
  const getAlertText = () => {
    if (!weatherData?.alerts?.length) return '';
    return weatherData.alerts.map(a => `${a.title}: ${a.description}`).join('\n');
  };

  // Simulate translation API call
  const translateAlert = async (text, lang) => {
    // Call your backend translation endpoint here
    // For now, use a placeholder fetch
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language: lang })
    });
    const data = await res.json();
    return data.translated || 'Translation unavailable.';
  };

  const handleSend = async (type) => {
    const alertText = getAlertText();
    let msg = '';
    if (language === 'both') {
      const assamese = await translateAlert(alertText, 'assamese');
      const hindi = await translateAlert(alertText, 'hindi');
      msg = `Assamese:\n${assamese}\n\nHindi:\n${hindi}`;
    } else {
      msg = await translateAlert(alertText, language);
    }
    setTranslatedMsg(msg);
    setShowModal(true);
    setSentDialog(false);
  };

  const handleSendFinal = () => {
    setShowModal(false);
    setSentDialog(true);
    setTimeout(() => setSentDialog(false), 2000);
  };

  return (
    <div className="dashboard-card rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <CloudRain className="h-6 w-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Weather Alerts & Conditions</h3>
      </div>

      {/* Current Weather */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">
          Current Weather in {farmer ? `${farmer.village}, ${farmer.district}, ${farmer.state}` : 'Unknown Location'}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Thermometer className="h-6 w-6 text-red-500 mx-auto mb-1" />
            <p className="text-sm text-gray-600">Temperature</p>
            <p className="font-semibold text-gray-900">{weatherData.current?.temperature}°C</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-1" />
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="font-semibold text-gray-900">{weatherData.current?.humidity}%</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Wind className="h-6 w-6 text-gray-500 mx-auto mb-1" />
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="font-semibold text-gray-900">{weatherData.current?.windSpeed} km/h</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Eye className="h-6 w-6 text-gray-500 mx-auto mb-1" />
            <p className="text-sm text-gray-600">Visibility</p>
            <p className="font-semibold text-gray-900">{weatherData.current?.visibility} km</p>
          </div>
        </div>
      </div>

      {/* Weather Alerts */}
      {weatherData.alerts && weatherData.alerts.length > 0 ? (
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Active Weather Alerts</h4>
          <div className="space-y-3">
            {weatherData.alerts.map((alert, index) => {
              // Skip showing "Weather Conditions Normal" as a prominent alert
              if (alert.title === "Weather Conditions Normal") {
                return (
                  <div key={index} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-800 font-medium">Weather conditions are normal</span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">
                      Continue with regular farming activities.
                    </p>
                  </div>
                );
              }
              
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${getAlertSeverity(alert.severity)} weather-alert`}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h5 className="font-medium mb-1">{alert.title}</h5>
                      <p className="text-sm mb-2">{alert.description}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span>Severity: {alert.severity}</span>
                        <span>Valid until: {new Date(alert.validUntil || alert.valid_until).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Alert Action Buttons */}
          <div className="flex items-center gap-4 mt-4">
            <label className="font-medium text-gray-700">Language:</label>
            <select
              className="border rounded px-2 py-1"
              value={language}
              onChange={e => setLanguage(e.target.value)}
            >
              <option value="assamese">Assamese</option>
              <option value="hindi">Hindi</option>
              <option value="both">Both</option>
            </select>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              onClick={() => handleSend('sms')}
            >
              Send Alert to SMS
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => handleSend('whatsapp')}
            >
              Send Alert to WhatsApp
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span className="text-green-800 font-medium">No active weather alerts</span>
          </div>
          <p className="text-green-700 text-sm mt-1">
            Weather conditions are normal for your area.
          </p>
        </div>
      )}

      {/* Weather Forecast */}
      {weatherData.forecast && (
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-3">3-Day Forecast</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {weatherData.forecast.slice(0, 3).map((day, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {getWeatherIcon(day.condition)}
                  <span className="font-medium text-gray-900">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>High: {day.high}°C</p>
                  <p>Low: {day.low}°C</p>
                  <p>Condition: {day.condition}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for translated message */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full flex flex-col items-center">
            <h4 className="font-bold text-lg mb-2">Translated Alert Message Preview</h4>
            {/* Preview Image */}
            <img src="/alert-preview.jpg" alt="Alert Preview" className="w-32 h-32 object-cover rounded mb-4 border" />
            <pre className="whitespace-pre-wrap text-gray-800 mb-4 w-full text-left bg-gray-50 p-3 rounded border">
{translatedMsg}
            </pre>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handleSendFinal}
            >
              Send
            </button>
            <button
              className="px-3 py-1 mt-2 text-gray-600 hover:text-gray-900 underline"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* Sent dialog */}
      {sentDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <span className="text-green-700 font-bold text-lg">Alert sent successfully!</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default WeatherAlerts 