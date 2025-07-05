const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

// Generate yield prediction data for a farmer
const generateYieldPrediction = (farmer) => {
  const currentYear = new Date().getFullYear();
  const seasons = ['Kharif', 'Rabi', 'Zaid'];
  const currentSeason = getCurrentSeason();
  
  const predictions = [];
  
  // Generate predictions for each crop the farmer grows
  farmer.crops.forEach(crop => {
    const baseProduction = getBaseProduction(crop, farmer.land_size_acres);
    const randomFactor = 0.8 + Math.random() * 0.4; // ±20% variation
    const predictedProduction = Math.round(baseProduction * randomFactor);
    
    predictions.push({
      crop: crop,
      crop_year: currentYear,
      season: currentSeason,
      state: farmer.state,
      area: farmer.land_size_acres,
      production: predictedProduction,
      annual_rainfall: Math.floor(Math.random() * 500) + 1500, // 1500-2000mm for Assam
      fertilizer: farmer.uses_fertilizers === "Yes" ? farmer.fertilizer_type : "None",
      pesticide: Math.random() > 0.5 ? "Used" : "Not Used",
      yield: Math.round((predictedProduction / farmer.land_size_acres) * 100) / 100 // tons per acre
    });
  });
  
  return predictions;
};

// Get base production for different crops (tons per acre)
const getBaseProduction = (crop, landSize) => {
  const baseYields = {
    'Rice': 2.5, // tons per acre
    'Lemon': 8, // tons per acre
    'Black Pepper': 0.8, // tons per acre
    'Pineapple': 15, // tons per acre
    'Tea': 2, // tons per acre
    'Jute': 1.5, // tons per acre
    'Mustard': 0.8, // tons per acre
    'Potato': 12, // tons per acre
    'Tomato': 20, // tons per acre
    'Onion': 8 // tons per acre
  };
  
  const baseYield = baseYields[crop] || 2; // default 2 tons per acre
  return Math.round(baseYield * landSize);
};

// Get current season based on month
const getCurrentSeason = () => {
  const month = new Date().getMonth();
  if (month >= 5 && month <= 9) return 'Kharif';
  if (month >= 10 || month <= 2) return 'Rabi';
  return 'Zaid';
};

// Get yield prediction for a specific farmer
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

    // Generate yield predictions
    const predictions = generateYieldPrediction(farmer);
    
    res.json({
      farmer_id: farmerId,
      farmer_name: farmer.full_name,
      location: `${farmer.village}, ${farmer.district}`,
      predictions: predictions,
      summary: {
        total_area: farmer.land_size_acres,
        total_predicted_production: predictions.reduce((sum, p) => sum + p.production, 0),
        average_yield: Math.round((predictions.reduce((sum, p) => sum + p.yield, 0) / predictions.length) * 100) / 100
      }
    });
  } catch (error) {
    console.error('Error generating yield prediction:', error);
    res.status(500).json({ error: 'Failed to generate yield prediction' });
  }
});

// Get yield prediction for all farmers
router.get('/', async (req, res) => {
  try {
    const farmersDataPath = path.join(__dirname, '../../farmers_data.json');
    const data = await fs.readFile(farmersDataPath, 'utf8');
    const farmers = JSON.parse(data);
    
    const allPredictions = [];
    
    farmers.forEach(farmer => {
      const predictions = generateYieldPrediction(farmer);
      allPredictions.push({
        farmer_id: farmer.id,
        farmer_name: farmer.full_name,
        location: `${farmer.village}, ${farmer.district}`,
        predictions: predictions
      });
    });
    
    res.json(allPredictions);
  } catch (error) {
    console.error('Error generating yield predictions:', error);
    res.status(500).json({ error: 'Failed to generate yield predictions' });
  }
});

// Get yield prediction by crop type
router.get('/crop/:cropType', async (req, res) => {
  try {
    const cropType = req.params.cropType;
    const farmersDataPath = path.join(__dirname, '../../farmers_data.json');
    const data = await fs.readFile(farmersDataPath, 'utf8');
    const farmers = JSON.parse(data);
    
    const cropPredictions = [];
    
    farmers.forEach(farmer => {
      if (farmer.crops.includes(cropType)) {
        const predictions = generateYieldPrediction(farmer);
        const cropPrediction = predictions.find(p => p.crop === cropType);
        
        if (cropPrediction) {
          cropPredictions.push({
            farmer_id: farmer.id,
            farmer_name: farmer.full_name,
            location: `${farmer.village}, ${farmer.district}`,
            prediction: cropPrediction
          });
        }
      }
    });
    
    res.json({
      crop: cropType,
      predictions: cropPredictions,
      summary: {
        total_farmers: cropPredictions.length,
        total_area: cropPredictions.reduce((sum, p) => sum + p.prediction.area, 0),
        total_predicted_production: cropPredictions.reduce((sum, p) => sum + p.prediction.production, 0),
        average_yield: Math.round((cropPredictions.reduce((sum, p) => sum + p.prediction.yield, 0) / cropPredictions.length) * 100) / 100
      }
    });
  } catch (error) {
    console.error('Error generating crop yield predictions:', error);
    res.status(500).json({ error: 'Failed to generate crop yield predictions' });
  }
});

module.exports = router; 