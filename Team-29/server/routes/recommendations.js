const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

// Get recommendations for a specific farmer
router.get('/:farmerId', async (req, res) => {
  try {
    const farmerId = req.params.farmerId;
    
    // Get farmer data
    const farmersDataPath = path.join(__dirname, '../../farmers_data.json');
    const data = await fs.readFile(farmersDataPath, 'utf8');
    const farmers = JSON.parse(data);
    
    const farmer = farmers.find(f => f.id === farmerId);
    
    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }

    // Generate recommendations based on farmer data
    const recommendations = generateRecommendations(farmer);
    
    res.json({ recommendations });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
});

// Generate recommendations based on farmer data
function generateRecommendations(farmer) {
  const recommendations = [];
  const currentMonth = new Date().getMonth();
  const currentSeason = getSeason(currentMonth);

  // Crop-specific recommendations
  if (farmer.crops?.primary) {
    const primaryCrop = farmer.crops.primary.toLowerCase();
    
    if (primaryCrop.includes('rice')) {
      recommendations.push({
        type: 'crop_management',
        title: 'Rice Cultivation Optimization',
        priority: 'high',
        description: 'Optimize your rice farming practices for better yield and quality.',
        actions: [
          'Maintain water level at 2-3 inches during vegetative stage',
          'Apply nitrogen fertilizer in split doses (basal, tillering, panicle initiation)',
          'Monitor for common pests: stem borer, leaf folder, and brown plant hopper',
          'Use resistant varieties for better pest management',
          'Practice proper spacing (20x15 cm) for optimal plant density'
        ],
        timing: 'Immediate',
        impact: 'High yield improvement potential'
      });
    }
    
    if (primaryCrop.includes('tea')) {
      recommendations.push({
        type: 'crop_management',
        title: 'Tea Plantation Best Practices',
        priority: 'high',
        description: 'Enhance your tea cultivation with these proven techniques.',
        actions: [
          'Prune tea bushes regularly for new flush growth',
          'Maintain soil pH between 4.5-5.5 for optimal tea growth',
          'Apply organic mulch to retain soil moisture and control weeds',
          'Implement shade management for quality tea production',
          'Monitor for tea mosquito bug and red spider mite'
        ],
        timing: 'Seasonal',
        impact: 'Improved tea quality and yield'
      });
    }
  }

  // Seasonal recommendations
  if (currentSeason === 'monsoon') {
    recommendations.push({
      type: 'seasonal',
      title: 'Monsoon Season Preparation',
      priority: 'high',
      description: 'Prepare your farm for the monsoon season to minimize crop damage.',
      actions: [
        'Clear and repair drainage channels to prevent waterlogging',
        'Strengthen field bunds and embankments',
        'Stock up on essential farming supplies and equipment',
        'Plan crop rotation for post-monsoon season',
        'Ensure proper storage facilities for harvested crops'
      ],
      timing: 'Pre-monsoon',
      impact: 'Reduced crop damage and better preparedness'
    });
  }

  // Technology adoption recommendations
  recommendations.push({
    type: 'technology',
    title: 'Modern Farming Technology',
    priority: 'low',
    description: 'Adopt modern farming technologies for improved efficiency.',
    actions: [
      'Consider precision farming techniques for better resource management',
      'Explore mobile apps for crop monitoring and weather updates',
      'Implement drip irrigation for water conservation',
      'Use quality seeds and certified planting materials',
      'Adopt integrated pest management (IPM) practices'
    ],
    timing: 'Gradual adoption',
    impact: 'Improved efficiency and reduced input costs'
  });

  return recommendations;
}

// Get season based on month
function getSeason(month) {
  if (month >= 2 && month <= 5) return 'summer';
  if (month >= 6 && month <= 9) return 'monsoon';
  if (month >= 10 && month <= 11) return 'autumn';
  return 'winter';
}

module.exports = router; 