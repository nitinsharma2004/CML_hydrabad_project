import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './CropDetail.css';

interface CropDetail {
  name: string;
  image: string;
  icon: string;
  requirements: string[];
  growingTips: string[];
  fertilizers: string[];
  buyingOptions: string[];
}

const cropDetails: Record<string, CropDetail> = {
  rice: {
    name: 'Rice',
    image: 'https://media.istockphoto.com/id/1151784210/photo/ripe-rice-field-and-sky-background-at-sunset.jpg?s=612x612&w=0&k=20&c=DZz4wxIbPXnMhmoTsEV06uYKup9MEZTtRFe2XkDb0mY=',
    icon: '🌾',
    requirements: [
      'Warm climate (20-35°C)',
      'Plenty of water (flooded fields)',
      'Clay loam soil with good water retention',
      '6-8 hours of sunlight daily',
      'pH level between 6.0-7.0'
    ],
    growingTips: [
      'Start with certified seeds for better yield',
      'Maintain 2-3 inches of water level during growth',
      'Transplant seedlings when 25-30 days old',
      'Apply nitrogen fertilizer in split doses',
      'Control weeds regularly for optimal growth',
      'Harvest when 80-85% of grains are mature'
    ],
    fertilizers: [
      'NPK 20:20:20 - Apply 50kg per acre',
      'Urea (46-0-0) - 100kg per acre in 3 splits',
      'DAP (18-46-0) - 50kg per acre as basal',
      'Potash (0-0-60) - 25kg per acre',
      'Organic fertilizers like farmyard manure'
    ],
    buyingOptions: [
      'AgriBazaar - Online agricultural marketplace',
      'Katyayani Krishi Direct - D2C agriculture brand',
      'Government e-Marketplace (GeM) - NPK fertilizers',
      'Local agricultural cooperatives',
      'State agricultural departments'
    ]
  },
  mustard: {
    name: 'Mustard',
    image: 'https://media.istockphoto.com/id/1149840299/photo/wild-mustard-plant-in-flower.jpg?s=612x612&w=0&k=20&c=fv2AP-tpq8j8ohdfb9OAHFHOUbz_-6MtbJ43bHWB6mY=',
    icon: '🌿',
    requirements: [
      'Cool weather (15-25°C)',
      'Moderate rainfall (400-600mm)',
      'Well-drained loamy soil',
      'Full sunlight exposure',
      'pH level between 6.0-7.5'
    ],
    growingTips: [
      'Sow seeds directly in prepared beds',
      'Maintain proper spacing (30x10cm)',
      'Irrigate immediately after sowing',
      'Apply irrigation at critical growth stages',
      'Control aphids and white rust diseases',
      'Harvest when pods turn yellow'
    ],
    fertilizers: [
      'NPK 12:32:16 - 250kg per hectare',
      'Urea - 100kg per hectare',
      'DAP - 125kg per hectare',
      'Sulphur - 20kg per hectare',
      'Zinc sulphate - 25kg per hectare'
    ],
    buyingOptions: [
      'AgriBazaar - Online agricultural marketplace',
      'Katyayani Krishi Direct - D2C agriculture brand',
      'Government e-Marketplace (GeM) - NPK fertilizers',
      'Local seed shops and cooperatives',
      'Direct from certified seed producers'
    ]
  },
  pulses: {
    name: 'Pulses',
    image: 'https://media.istockphoto.com/id/964325260/photo/various-of-legumes-in-sack-bag.jpg?s=612x612&w=0&k=20&c=CNM8WqPgGwlR7UUMoZejem2EfsQp5wFBk5skVk14FnE=',
    icon: '🫘',
    requirements: [
      'Moderate temperature (20-30°C)',
      'Well-drained sandy loam soil',
      'Moderate rainfall (400-800mm)',
      'Good sunlight exposure',
      'pH level between 6.0-7.5'
    ],
    growingTips: [
      'Use certified seeds for better germination',
      'Treat seeds with rhizobium culture',
      'Sow at proper depth (3-5cm)',
      'Maintain adequate spacing',
      'Control weeds in early stages',
      'Harvest when pods are fully mature'
    ],
    fertilizers: [
      'NPK 20:20:20 - 100kg per hectare',
      'DAP - 50kg per hectare as basal',
      'Urea - 25kg per hectare',
      'Organic manure - 5-10 tons per hectare',
      'Micronutrients as per soil test'
    ],
    buyingOptions: [
      'AgriBazaar - Online agricultural marketplace',
      'Katyayani Krishi Direct - D2C agriculture brand',
      'Government e-Marketplace (GeM) - NPK fertilizers',
      'Local agricultural input stores',
      'Farmer producer organizations'
    ]
  },
  jute: {
    name: 'Jute',
    image: 'https://media.istockphoto.com/id/1416047417/photo/jute-plants-in-the-field-jute-cultivation-in-assam-in-india.jpg?s=612x612&w=0&k=20&c=TV_wV6PNlRLK1DiN4hb_380mwrnG8MELBeef2xcwBb8=',
    icon: '🌿',
    requirements: [
      'Warm and humid climate (24-37°C)',
      'High rainfall (1500-2000mm)',
      'Alluvial soil with good drainage',
      'High humidity (70-90%)',
      'pH level between 6.0-7.5'
    ],
    growingTips: [
      'Broadcast seeds in well-prepared soil',
      'Maintain proper plant density',
      'Provide adequate irrigation',
      'Control weeds regularly',
      'Harvest at proper maturity stage',
      'Ret in clean water for fiber extraction'
    ],
    fertilizers: [
      'NPK 20:20:20 - 200kg per hectare',
      'Urea - 100kg per hectare',
      'DAP - 100kg per hectare',
      'Organic manure - 10 tons per hectare',
      'Micronutrients as needed'
    ],
    buyingOptions: [
      'AgriBazaar - Online agricultural marketplace',
      'Katyayani Krishi Direct - D2C agriculture brand',
      'Government e-Marketplace (GeM) - NPK fertilizers',
      'Local jute cooperatives',
      'Direct from jute farmers'
    ]
  },
  banana: {
    name: 'Banana',
    image: 'https://media.istockphoto.com/id/1094246926/photo/banana-bunch-at-the-banana-plantation.jpg?s=612x612&w=0&k=20&c=Jk2jkGBrLE6pSSo_i_00PpOU_nF43tmS20eRgl55gKU=',
    icon: '🍌',
    requirements: [
      'Tropical climate (25-35°C)',
      'High humidity (60-80%)',
      'Deep, well-drained soil',
      'Regular irrigation',
      'pH level between 6.0-7.5'
    ],
    growingTips: [
      'Plant suckers or tissue culture plants',
      'Maintain proper spacing (2x2m)',
      'Provide support to prevent lodging',
      'Remove unwanted suckers regularly',
      'Control pests like nematodes and weevils',
      'Harvest when fingers are fully developed'
    ],
    fertilizers: [
      'NPK 20:20:20 - 300kg per hectare',
      'Urea - 200kg per hectare',
      'DAP - 100kg per hectare',
      'Potash - 100kg per hectare',
      'Organic manure - 20 tons per hectare'
    ],
    buyingOptions: [
      'AgriBazaar - Online agricultural marketplace',
      'Katyayani Krishi Direct - D2C agriculture brand',
      'Government e-Marketplace (GeM) - NPK fertilizers',
      'Local nurseries and garden centers',
      'Direct from banana farmers'
    ]
  },
  maize: {
    name: 'Maize',
    image: 'https://www.ugaoo.com/cdn/shop/articles/9f9b3771a2.jpg?v=1727692315',
    icon: '🌽',
    requirements: [
      'Warm climate (18-32°C)',
      'Well-drained loamy soil',
      'Moderate rainfall (500-800mm)',
      'Full sunlight exposure',
      'pH level between 6.0-7.5'
    ],
    growingTips: [
      'Use hybrid seeds for better yield',
      'Sow at proper depth (3-5cm)',
      'Maintain plant population (60,000-70,000/ha)',
      'Apply irrigation at critical stages',
      'Control weeds and pests regularly',
      'Harvest when kernels are hard and dry'
    ],
    fertilizers: [
      'NPK 20:20:20 - 250kg per hectare',
      'Urea - 150kg per hectare',
      'DAP - 125kg per hectare',
      'Potash - 50kg per hectare',
      'Organic manure - 10 tons per hectare'
    ],
    buyingOptions: [
      'AgriBazaar - Online agricultural marketplace',
      'Katyayani Krishi Direct - D2C agriculture brand',
      'Government e-Marketplace (GeM) - NPK fertilizers',
      'Local agricultural input stores',
      'Direct from certified seed producers'
    ]
  }
};

// Customized organic farming guides for each crop
const organicGuides: Record<string, string[]> = {
  rice: [
    'Prepare the field with compost or cow dung before planting.',
    'Use organic-certified or traditional rice seeds.',
    'Transplant healthy seedlings and weed by hand.',
    'Use neem oil spray or light traps for pest control.',
    'Grow azolla or use green manure for natural nutrients.'
  ],
  mustard: [
    'Mix compost or vermicompost into the soil before sowing.',
    'Use organic-certified mustard seeds.',
    'Mulch with straw and remove weeds by hand.',
    'Spray diluted buttermilk or neem oil to prevent diseases.',
    'Harvest when pods turn yellow.'
  ],
  pulses: [
    'Treat seeds with rhizobium culture for natural nitrogen.',
    'Add compost or farmyard manure before sowing.',
    'Sow seeds at the right depth and spacing.',
    'Use neem oil or garlic-chili spray for pests.',
    'Rotate pulses with cereals to keep soil healthy.'
  ],
  jute: [
    'Apply organic manure before sowing jute seeds.',
    'Use certified seeds and maintain proper spacing.',
    'Remove weeds by hand and irrigate as needed.',
    'Use neem oil spray for pest control.',
    'Ret jute in clean water after harvest.'
  ],
  banana: [
    'Fill planting pits with compost and neem cake before planting.',
    'Use healthy, organic-certified suckers or tissue-cultured plants.',
    'Mulch with dry leaves to keep soil moist.',
    'Apply vermicompost and cow dung every few months.',
    'Spray neem oil to control pests.'
  ],
  maize: [
    'Add compost or farmyard manure before sowing.',
    'Use biofertilizers like Azospirillum for natural growth.',
    'Sow seeds at the right spacing and depth.',
    'Mulch with crop residues to keep soil moist.',
    'Use neem oil spray for pest control.'
  ]
};

const CropDetail: React.FC = () => {
  const { cropId } = useParams<{ cropId: string }>();
  const crop = cropDetails[cropId || ''];

  if (!crop) {
    return (
      <div className="crop-detail-container">
        <div className="error-message">
          <h2>Crop not found</h2>
          <Link to="/crops" className="back-button">Back to Crops</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="crop-detail-container">
      <div className="crop-detail-header">
        <Link to="/crops" className="back-button">← Back to Crops</Link>
        <div className="crop-title">
          <h1>{crop.name}</h1>
        </div>
      </div>

      <div className="crop-detail-content">
        <div className="crop-image-section">
          <img src={crop.image} alt={crop.name} className="crop-image-detail" />
        </div>

        <div className="crop-info-sections">
          <div className="info-section">
            <h2>What {crop.name} Needs</h2>
            <ul>
              {crop.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="info-section">
            <h2>How to Grow {crop.name} for More Yield</h2>
            <ol>
              {crop.growingTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ol>
          </div>

          {/* Organic Farming Section */}
          <div className="info-section">
            <h2>Organic Farming</h2>
            <ol>
              {(organicGuides[cropId || ''] || []).map((tip: string, idx: number) => (
                <li key={idx}>{tip}</li>
              ))}
            </ol>
          </div>

          <div className="info-section">
            <h2>Best Fertilizers</h2>
            <ul>
              {crop.fertilizers.map((fertilizer, index) => (
                <li key={index}>{fertilizer}</li>
              ))}
            </ul>
          </div>

          <div className="info-section">
            <h2>Where to Buy for Cheap</h2>
            <ul className="buying-list">
              <li>
                <a href="https://www.agribazaar.com/" target="_blank" rel="noopener noreferrer" className="buying-link">
                  AgriBazaar - Online agricultural marketplace
                </a>
              </li>
              <li>
                <a href="https://katyayanikrishidirect.com/" target="_blank" rel="noopener noreferrer" className="buying-link">
                  Katyayani Krishi Direct - D2C agriculture brand
                </a>
              </li>
              <li>
                <a href="https://mkp.gem.gov.in/live-plant-and-animal-material-and-accessories-and-supplies-fertilizers-and-plant-nutrients-and-herbicides-chemical-fertilizers-and-plant-nutrients-npk-fertilizer" target="_blank" rel="noopener noreferrer" className="buying-link">
                  Government e-Marketplace (GeM) - NPK fertilizers
                </a>
              </li>
              {crop.buyingOptions.slice(3).map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDetail; 