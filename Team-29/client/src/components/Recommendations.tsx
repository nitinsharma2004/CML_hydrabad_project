import React from 'react'
import { Lightbulb, Calendar, TrendingUp, Shield, Clock, Target } from 'lucide-react'

const Recommendations = ({ farmer, weatherData }) => {
  if (!farmer) return null

  // Generate recommendations based on farmer data and weather
  const generateRecommendations = () => {
    const recommendations = []

    // Weather-based recommendations
    if (weatherData?.alerts?.length > 0) {
      recommendations.push({
        type: 'weather',
        title: 'Weather Alert Response',
        description: 'Take immediate action to protect your crops from adverse weather conditions.',
        priority: 'high',
        icon: Shield,
        actions: [
          'Cover sensitive crops with protective materials',
          'Ensure proper drainage to prevent waterlogging',
          'Secure farm equipment and structures'
        ]
      })
    }

    // Crop-specific recommendations
    if (farmer.crops?.primary) {
      const primaryCrop = farmer.crops.primary.toLowerCase()
      
      if (primaryCrop.includes('rice')) {
        recommendations.push({
          type: 'crop',
          title: 'Rice Cultivation Tips',
          description: 'Optimize your rice farming practices for better yield.',
          priority: 'medium',
          icon: TrendingUp,
          actions: [
            'Maintain water level at 2-3 inches during vegetative stage',
            'Apply nitrogen fertilizer in split doses',
            'Monitor for common pests like stem borer and leaf folder'
          ]
        })
      } else if (primaryCrop.includes('tea')) {
        recommendations.push({
          type: 'crop',
          title: 'Tea Plantation Management',
          description: 'Enhance your tea cultivation with these best practices.',
          priority: 'medium',
          icon: TrendingUp,
          actions: [
            'Prune tea bushes regularly for new flush growth',
            'Maintain soil pH between 4.5-5.5',
            'Apply organic mulch to retain soil moisture'
          ]
        })
      }
    }

    // Seasonal recommendations
    const currentMonth = new Date().getMonth()
    if (currentMonth >= 5 && currentMonth <= 9) {
      recommendations.push({
        type: 'seasonal',
        title: 'Monsoon Season Preparation',
        description: 'Prepare your farm for the upcoming monsoon season.',
        priority: 'medium',
        icon: Calendar,
        actions: [
          'Clear drainage channels and repair bunds',
          'Stock up on essential farming supplies',
          'Plan crop rotation for post-monsoon season'
        ]
      })
    }

    // General farming recommendations
    recommendations.push({
      type: 'general',
      title: 'Sustainable Farming Practices',
      description: 'Adopt these practices for long-term farm sustainability.',
      priority: 'low',
      icon: Lightbulb,
      actions: [
        'Implement crop rotation to maintain soil health',
        'Use organic fertilizers and natural pest control methods',
        'Practice water conservation techniques'
      ]
    })

    return recommendations
  }

  const recommendations = generateRecommendations()

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-red-300 bg-red-50'
      case 'medium':
        return 'border-yellow-300 bg-yellow-50'
      case 'low':
        return 'border-blue-300 bg-blue-50'
      default:
        return 'border-gray-300 bg-gray-50'
    }
  }

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high':
        return 'High Priority'
      case 'medium':
        return 'Medium Priority'
      case 'low':
        return 'Low Priority'
      default:
        return 'General'
    }
  }

  return (
    <div className="dashboard-card rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Lightbulb className="h-6 w-6 text-yellow-600" />
        <h3 className="text-lg font-semibold text-gray-800">Smart Recommendations</h3>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => {
          const IconComponent = rec.icon
          return (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getPriorityColor(rec.priority)}`}
            >
              <div className="flex items-start gap-3">
                <IconComponent className="h-5 w-5 mt-0.5 text-gray-600 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-gray-900">{rec.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                      rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {getPriorityText(rec.priority)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{rec.description}</p>
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-900">Recommended Actions:</h5>
                    <ul className="space-y-1">
                      {rec.actions.map((action, actionIndex) => (
                        <li key={actionIndex} className="flex items-start gap-2 text-sm text-gray-700">
                          <Target className="h-3 w-3 mt-1 text-green-600 flex-shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Recommendations 