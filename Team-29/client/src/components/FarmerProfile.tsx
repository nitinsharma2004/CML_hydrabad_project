import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './FarmerProfile.css';

interface FarmerProfile {
  id: string;
  basicInfo: {
    fullName: string;
    gender: string;
    age: number;
    dateOfBirth: string;
    phoneNumber: string;
    aadhaarNumber: string;
    address: string;
    village: string;
    district: string;
    state: string;
    educationLevel: string;
  };
  agriculturalDetails: {
    crops: string[];
    landSize: number;
    soilType: string;
    seedType: string;
    usesFertilizers: boolean;
    fertilizerTypes: string[];
    agriPractices: string[];
  };
  toolsEquipment: {
    tools: string[];
    ownership: string;
  };
  livestock: {
    ownsLivestock: boolean;
    livestockDetails: string;
  };
  productionIncome: {
    agriculturalIncome: number;
    cropProduction: { crop: string; quantity: number; unit: string }[];
    sellingMode: string;
  };
  governmentSchemes: {
    participates: boolean;
    schemes: string[];
  };
}

const farmerProfiles: Record<string, FarmerProfile> = {
  '+91 98765 43210': {
    id: '+91 98765 43210',
    basicInfo: {
      fullName: 'Rajesh Kumar',
      gender: 'Male',
      age: 45,
      dateOfBirth: '1978-03-15',
      phoneNumber: '+91 98765 43210',
      aadhaarNumber: '1234-5678-9012',
      address: 'House No. 45, Main Street',
      village: 'Karnal',
      district: 'Karnal',
      state: 'Haryana',
      educationLevel: 'Secondary'
    },
    agriculturalDetails: {
      crops: ['Rice', 'Wheat', 'Mustard'],
      landSize: 8.5,
      soilType: 'Clay Loam',
      seedType: 'Hybrid',
      usesFertilizers: true,
      fertilizerTypes: ['Chemical', 'Organic'],
      agriPractices: ['Crop Rotation', 'Intercropping']
    },
    toolsEquipment: {
      tools: ['Tractor', 'Irrigation Pump', 'Sprayer', 'Hoe'],
      ownership: 'Own'
    },
    livestock: {
      ownsLivestock: true,
      livestockDetails: '2 Cows, 5 Chickens'
    },
    productionIncome: {
      agriculturalIncome: 450000,
      cropProduction: [
        { crop: 'Rice', quantity: 3200, unit: 'kg' },
        { crop: 'Wheat', quantity: 2800, unit: 'kg' },
        { crop: 'Mustard', quantity: 800, unit: 'kg' }
      ],
      sellingMode: 'Local Market'
    },
    governmentSchemes: {
      participates: true,
      schemes: ['PM-KISAN', 'MGNREGA']
    }
  },
  '+91 87654 32109': {
    id: '+91 87654 32109',
    basicInfo: {
      fullName: 'Lakshmi Devi',
      gender: 'Female',
      age: 38,
      dateOfBirth: '1985-07-22',
      phoneNumber: '+91 87654 32109',
      aadhaarNumber: '2345-6789-0123',
      address: 'Village Center, Near Temple',
      village: 'Anantapur',
      district: 'Anantapur',
      state: 'Andhra Pradesh',
      educationLevel: 'Primary'
    },
    agriculturalDetails: {
      crops: ['Pulses', 'Vegetables'],
      landSize: 3.2,
      soilType: 'Red Soil',
      seedType: 'Local',
      usesFertilizers: false,
      fertilizerTypes: ['Organic'],
      agriPractices: ['Organic Farming']
    },
    toolsEquipment: {
      tools: ['Hoe', 'Sickle', 'Sprayer'],
      ownership: 'Rent'
    },
    livestock: {
      ownsLivestock: false,
      livestockDetails: 'None'
    },
    productionIncome: {
      agriculturalIncome: 280000,
      cropProduction: [
        { crop: 'Pulses', quantity: 1200, unit: 'kg' },
        { crop: 'Vegetables', quantity: 800, unit: 'kg' }
      ],
      sellingMode: 'Local Market'
    },
    governmentSchemes: {
      participates: true,
      schemes: ['PM-KISAN']
    }
  },
  '+91 76543 21098': {
    id: '+91 76543 21098',
    basicInfo: {
      fullName: 'Mohammed Ali',
      gender: 'Male',
      age: 52,
      dateOfBirth: '1971-11-08',
      phoneNumber: '+91 76543 21098',
      aadhaarNumber: '3456-7890-1234',
      address: 'Farm House, Rural Road',
      village: 'Malappuram',
      district: 'Malappuram',
      state: 'Kerala',
      educationLevel: 'Higher Secondary'
    },
    agriculturalDetails: {
      crops: ['Rice', 'Banana', 'Coconut'],
      landSize: 12.0,
      soilType: 'Laterite Soil',
      seedType: 'Certified',
      usesFertilizers: true,
      fertilizerTypes: ['Mixed'],
      agriPractices: ['Crop Rotation', 'Mixed Farming']
    },
    toolsEquipment: {
      tools: ['Tractor', 'Irrigation Pump', 'Sprayer', 'Hoe', 'Sickle'],
      ownership: 'Own'
    },
    livestock: {
      ownsLivestock: true,
      livestockDetails: '3 Cows, 2 Goats, 10 Chickens'
    },
    productionIncome: {
      agriculturalIncome: 680000,
      cropProduction: [
        { crop: 'Rice', quantity: 4800, unit: 'kg' },
        { crop: 'Banana', quantity: 12000, unit: 'kg' },
        { crop: 'Coconut', quantity: 8000, unit: 'pieces' }
      ],
      sellingMode: 'Government Procurement'
    },
    governmentSchemes: {
      participates: true,
      schemes: ['PM-KISAN', 'MGNREGA', 'PMFBY']
    }
  },
  '+91 65432 10987': {
    id: '+91 65432 10987',
    basicInfo: {
      fullName: 'Sunita Patel',
      gender: 'Female',
      age: 41,
      dateOfBirth: '1982-09-14',
      phoneNumber: '+91 65432 10987',
      aadhaarNumber: '4567-8901-2345',
      address: 'Agricultural Colony',
      village: 'Vadodara',
      district: 'Vadodara',
      state: 'Gujarat',
      educationLevel: 'Graduate'
    },
    agriculturalDetails: {
      crops: ['Cotton', 'Groundnut'],
      landSize: 6.8,
      soilType: 'Black Soil',
      seedType: 'Hybrid',
      usesFertilizers: true,
      fertilizerTypes: ['Chemical'],
      agriPractices: ['Crop Rotation', 'Precision Farming']
    },
    toolsEquipment: {
      tools: ['Tractor', 'Irrigation Pump', 'Sprayer'],
      ownership: 'Own'
    },
    livestock: {
      ownsLivestock: false,
      livestockDetails: 'None'
    },
    productionIncome: {
      agriculturalIncome: 520000,
      cropProduction: [
        { crop: 'Cotton', quantity: 2400, unit: 'kg' },
        { crop: 'Groundnut', quantity: 1800, unit: 'kg' }
      ],
      sellingMode: 'Middleman'
    },
    governmentSchemes: {
      participates: true,
      schemes: ['PM-KISAN', 'PMFBY']
    }
  },
  '+91 91234 56789': {
    id: '+91 91234 56789',
    basicInfo: {
      fullName: 'Asha Rani',
      gender: 'Female',
      age: 36,
      dateOfBirth: '1987-05-20',
      phoneNumber: '+91 91234 56789',
      aadhaarNumber: '5678-1234-9012',
      address: 'Near School, Main Road',
      village: 'Barabanki',
      district: 'Barabanki',
      state: 'Uttar Pradesh',
      educationLevel: 'Secondary'
    },
    agriculturalDetails: {
      crops: ['Wheat', 'Pulses'],
      landSize: 4.5,
      soilType: 'Alluvial Soil',
      seedType: 'Local',
      usesFertilizers: true,
      fertilizerTypes: ['Organic'],
      agriPractices: ['Crop Rotation']
    },
    toolsEquipment: {
      tools: ['Hoe', 'Sickle', 'Sprayer'],
      ownership: 'Own'
    },
    livestock: {
      ownsLivestock: false,
      livestockDetails: 'None'
    },
    productionIncome: {
      agriculturalIncome: 320000,
      cropProduction: [
        { crop: 'Wheat', quantity: 1800, unit: 'kg' },
        { crop: 'Pulses', quantity: 600, unit: 'kg' }
      ],
      sellingMode: 'Local Market'
    },
    governmentSchemes: {
      participates: true,
      schemes: ['PM-KISAN']
    }
  },
  '+91 99887 66554': {
    id: '+91 99887 66554',
    basicInfo: {
      fullName: 'Ramesh Singh',
      gender: 'Male',
      age: 50,
      dateOfBirth: '1973-12-03',
      phoneNumber: '+91 99887 66554',
      aadhaarNumber: '6789-0123-4567',
      address: 'Plot No. 12, Village End',
      village: 'Sikar',
      district: 'Sikar',
      state: 'Rajasthan',
      educationLevel: 'Primary'
    },
    agriculturalDetails: {
      crops: ['Mustard', 'Maize', 'Wheat'],
      landSize: 10.0,
      soilType: 'Sandy Soil',
      seedType: 'Hybrid',
      usesFertilizers: true,
      fertilizerTypes: ['Chemical', 'Organic'],
      agriPractices: ['Crop Rotation', 'Mixed Farming']
    },
    toolsEquipment: {
      tools: ['Tractor', 'Irrigation Pump', 'Sprayer', 'Hoe'],
      ownership: 'Own'
    },
    livestock: {
      ownsLivestock: true,
      livestockDetails: '1 Cow, 3 Goats'
    },
    productionIncome: {
      agriculturalIncome: 540000,
      cropProduction: [
        { crop: 'Mustard', quantity: 1200, unit: 'kg' },
        { crop: 'Maize', quantity: 3600, unit: 'kg' },
        { crop: 'Wheat', quantity: 2400, unit: 'kg' }
      ],
      sellingMode: 'Government Procurement'
    },
    governmentSchemes: {
      participates: true,
      schemes: ['PM-KISAN', 'MGNREGA']
    }
  }
};

const FarmerProfile: React.FC = () => {
  const { phone } = useParams<{ phone: string }>();
  // Decode the URL parameter to handle special characters
  const decodedPhone = phone ? decodeURIComponent(phone) : '';
  const farmer = farmerProfiles[decodedPhone];

  if (!farmer) {
    return (
      <div className="farmer-profile-container">
        <div className="error-message">
          <h2>Farmer not found</h2>
          <p>Farmer with ID: {decodedPhone} could not be found.</p>
          <Link to="/farmers" className="back-button">Back to Farmers</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="farmer-profile-container">
      <div className="farmer-profile-header">
        <Link to="/farmers" className="back-button">← Back to Farmers</Link>
        <div className="farmer-title">
          <div className="farmer-avatar-large">
            {farmer.basicInfo.fullName.charAt(0)}
          </div>
          <h1>{farmer.basicInfo.fullName}</h1>
        </div>
      </div>

      <div className="farmer-profile-content">
        <div className="profile-section">
          <h2>Basic Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Full Name:</label>
              <span>{farmer.basicInfo.fullName}</span>
            </div>
            <div className="info-item">
              <label>Gender:</label>
              <span>{farmer.basicInfo.gender}</span>
            </div>
            <div className="info-item">
              <label>Age:</label>
              <span>{farmer.basicInfo.age} years</span>
            </div>
            <div className="info-item">
              <label>Date of Birth:</label>
              <span>{farmer.basicInfo.dateOfBirth}</span>
            </div>
            <div className="info-item">
              <label>Phone Number:</label>
              <span>{farmer.basicInfo.phoneNumber}</span>
            </div>
            <div className="info-item">
              <label>Aadhaar Number:</label>
              <span>{farmer.basicInfo.aadhaarNumber}</span>
            </div>
            <div className="info-item">
              <label>Address:</label>
              <span>{farmer.basicInfo.address}</span>
            </div>
            <div className="info-item">
              <label>Village:</label>
              <span>{farmer.basicInfo.village}</span>
            </div>
            <div className="info-item">
              <label>District:</label>
              <span>{farmer.basicInfo.district}</span>
            </div>
            <div className="info-item">
              <label>State:</label>
              <span>{farmer.basicInfo.state}</span>
            </div>
            <div className="info-item">
              <label>Education Level:</label>
              <span>{farmer.basicInfo.educationLevel}</span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Agricultural Details</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Crops Currently Grown:</label>
              <span>{farmer.agriculturalDetails.crops.join(', ')}</span>
            </div>
            <div className="info-item">
              <label>Land Size:</label>
              <span>{farmer.agriculturalDetails.landSize} acres</span>
            </div>
            <div className="info-item">
              <label>Soil Type:</label>
              <span>{farmer.agriculturalDetails.soilType}</span>
            </div>
            <div className="info-item">
              <label>Type of Seeds Used:</label>
              <span>{farmer.agriculturalDetails.seedType}</span>
            </div>
            <div className="info-item">
              <label>Uses Fertilizers/Pesticides:</label>
              <span>{farmer.agriculturalDetails.usesFertilizers ? 'Yes' : 'No'}</span>
            </div>
            {farmer.agriculturalDetails.usesFertilizers && (
              <div className="info-item">
                <label>Fertilizer Types:</label>
                <span>{farmer.agriculturalDetails.fertilizerTypes.join(', ')}</span>
              </div>
            )}
            <div className="info-item">
              <label>Agricultural Practices:</label>
              <span>{farmer.agriculturalDetails.agriPractices.join(', ')}</span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Tools & Equipment</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Tools Currently Used:</label>
              <span>{farmer.toolsEquipment.tools.join(', ')}</span>
            </div>
            <div className="info-item">
              <label>Tool Ownership:</label>
              <span>{farmer.toolsEquipment.ownership}</span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Livestock</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Owns Livestock:</label>
              <span>{farmer.livestock.ownsLivestock ? 'Yes' : 'No'}</span>
            </div>
            {farmer.livestock.ownsLivestock && (
              <div className="info-item">
                <label>Livestock Details:</label>
                <span>{farmer.livestock.livestockDetails}</span>
              </div>
            )}
          </div>
        </div>

        <div className="profile-section">
          <h2>Production and Income</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Agricultural Income (Last Year):</label>
              <span>₹{farmer.productionIncome.agriculturalIncome.toLocaleString()}</span>
            </div>
            <div className="info-item">
              <label>Mode of Selling Produce:</label>
              <span>{farmer.productionIncome.sellingMode}</span>
            </div>
            <div className="info-item full-width">
              <label>Crop Production (Last Year):</label>
              <div className="crop-production-list">
                {farmer.productionIncome.cropProduction.map((crop, index) => (
                  <div key={index} className="crop-production-item">
                    {crop.crop}: {crop.quantity.toLocaleString()} {crop.unit}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Government Scheme Participation</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Participates in Government Schemes:</label>
              <span>{farmer.governmentSchemes.participates ? 'Yes' : 'No'}</span>
            </div>
            {farmer.governmentSchemes.participates && (
              <div className="info-item">
                <label>Schemes Participated:</label>
                <span>{farmer.governmentSchemes.schemes.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile; 