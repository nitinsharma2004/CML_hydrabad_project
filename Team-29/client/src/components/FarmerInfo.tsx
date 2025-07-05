import React from 'react'
import { User, MapPin, Crop, Calendar, Phone, Mail, Map } from 'lucide-react'

const FarmerInfo = ({ farmer }) => {
  if (!farmer) return null

  // Calculate experience based on DOB
  const calculateExperience = (dob) => {
    if (!dob) return 'Not specified'
    const birthYear = new Date(dob).getFullYear()
    const currentYear = new Date().getFullYear()
    const age = currentYear - birthYear
    // Assume farming experience starts around age 20
    const experience = Math.max(0, age - 20)
    return experience
  }

  return (
    <div className="dashboard-card rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <User className="h-6 w-6 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-800">Farmer Information</h3>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900">{farmer.full_name}</h4>
          <p className="text-sm text-gray-600">ID: {farmer.id}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              {farmer.village}, {farmer.district}, {farmer.state}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Crop className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              Primary Crop: {farmer.crops && farmer.crops.length > 0 ? farmer.crops[0] : 'Not specified'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              Experience: {calculateExperience(farmer.dob)} years
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">{farmer.phone}</span>
          </div>

          <div className="flex items-center gap-2">
            <Map className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              Land Size: {farmer.land_size_acres} acres
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Crop className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              Soil Type: {farmer.soil_type}
            </span>
          </div>
        </div>

        {farmer.crops && farmer.crops.length > 0 && (
          <div className="mt-4">
            <h5 className="font-medium text-gray-900 mb-2">Crops Grown</h5>
            <div className="flex flex-wrap gap-2">
              {farmer.crops.map((crop, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                >
                  {crop}
                </span>
              ))}
            </div>
          </div>
        )}

        {farmer.agri_practices && farmer.agri_practices.length > 0 && (
          <div className="mt-4">
            <h5 className="font-medium text-gray-900 mb-2">Farming Practices</h5>
            <div className="flex flex-wrap gap-2">
              {farmer.agri_practices.map((practice, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {practice}
                </span>
              ))}
            </div>
          </div>
        )}

        {farmer.has_livestock === "Yes" && (
          <div className="mt-4">
            <h5 className="font-medium text-gray-900 mb-2">Livestock</h5>
            <div className="text-sm text-gray-700">
              <p>{farmer.livestock_details}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FarmerInfo 