const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

// Path to the farmers data JSON file
const farmersDataPath = path.join(__dirname, '../../farmers_data.json');

// Get all farmers
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(farmersDataPath, 'utf8');
    const farmers = JSON.parse(data);
    res.json(farmers);
  } catch (error) {
    console.error('Error reading farmers data:', error);
    res.status(500).json({ error: 'Failed to fetch farmers data' });
  }
});

// Get farmer by ID
router.get('/:id', async (req, res) => {
  try {
    const farmerId = req.params.id;
    const data = await fs.readFile(farmersDataPath, 'utf8');
    const farmers = JSON.parse(data);
    
    const farmer = farmers.find(f => f.id === farmerId);
    
    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }
    
    res.json(farmer);
  } catch (error) {
    console.error('Error fetching farmer:', error);
    res.status(500).json({ error: 'Failed to fetch farmer data' });
  }
});

// Search farmers by location
router.get('/search/location/:location', async (req, res) => {
  try {
    const location = req.params.location.toLowerCase();
    const data = await fs.readFile(farmersDataPath, 'utf8');
    const farmers = JSON.parse(data);
    
    const filteredFarmers = farmers.filter(f => 
      f.location.toLowerCase().includes(location)
    );
    
    res.json(filteredFarmers);
  } catch (error) {
    console.error('Error searching farmers:', error);
    res.status(500).json({ error: 'Failed to search farmers' });
  }
});

// Search farmers by crop
router.get('/search/crop/:crop', async (req, res) => {
  try {
    const crop = req.params.crop.toLowerCase();
    const data = await fs.readFile(farmersDataPath, 'utf8');
    const farmers = JSON.parse(data);
    
    const filteredFarmers = farmers.filter(f => 
      f.crops?.primary?.toLowerCase().includes(crop) ||
      f.crops?.all?.some(c => c.toLowerCase().includes(crop))
    );
    
    res.json(filteredFarmers);
  } catch (error) {
    console.error('Error searching farmers by crop:', error);
    res.status(500).json({ error: 'Failed to search farmers by crop' });
  }
});

module.exports = router; 