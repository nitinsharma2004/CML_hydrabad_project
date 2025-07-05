import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FarmerEnrollment.css';

interface EnrollmentData {
  basicInfo: {
    fullName: string;
    gender: string;
    age: string;
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
    landSize: string;
    soilType: string;
    seedType: string;
    usesFertilizers: boolean;
    fertilizerTypes: string[];
    agriPractices: string[];
    tools: string[];
    toolOwnership: string;
    ownsLivestock: boolean;
    livestockDetails: string;
    agriculturalIncome: string;
    sellingMode: string;
    participatesInSchemes: boolean;
    schemes: string[];
  };
}

const FarmerEnrollment: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<EnrollmentData>({
    basicInfo: {
      fullName: '',
      gender: '',
      age: '',
      dateOfBirth: '',
      phoneNumber: '',
      aadhaarNumber: '',
      address: '',
      village: '',
      district: '',
      state: '',
      educationLevel: ''
    },
    agriculturalDetails: {
      crops: [],
      landSize: '',
      soilType: '',
      seedType: '',
      usesFertilizers: false,
      fertilizerTypes: [],
      agriPractices: [],
      tools: [],
      toolOwnership: '',
      ownsLivestock: false,
      livestockDetails: '',
      agriculturalIncome: '',
      sellingMode: '',
      participatesInSchemes: false,
      schemes: []
    }
  });

  const cropOptions = ['Rice', 'Wheat', 'Mustard', 'Pulses', 'Vegetables', 'Cotton', 'Groundnut', 'Banana', 'Coconut', 'Maize', 'Jute'];
  const soilTypes = ['Clay Loam', 'Red Soil', 'Black Soil', 'Laterite Soil', 'Sandy Soil', 'Alluvial Soil'];
  const seedTypes = ['Hybrid', 'Local', 'Certified', 'Unknown'];
  const fertilizerTypes = ['Organic', 'Chemical', 'Mixed'];
  const agriPractices = ['Crop Rotation', 'Intercropping', 'Organic Farming', 'Mixed Farming', 'Precision Farming'];
  const toolOptions = ['Hoe', 'Sickle', 'Sprayer', 'Tractor', 'Irrigation Pump'];
  const sellingModes = ['Local Market', 'Middleman', 'Government Procurement', 'Self-consumption', 'Others'];
  const schemeOptions = ['PM-KISAN', 'MGNREGA', 'PMFBY', 'Soil Health Card', 'KCC'];

  const handleBasicInfoChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [field]: value
      }
    }));
  };

  const handleAgriculturalChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      agriculturalDetails: {
        ...prev.agriculturalDetails,
        [field]: value
      }
    }));
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      agriculturalDetails: {
        ...prev.agriculturalDetails,
        [field]: checked 
          ? [...prev.agriculturalDetails[field as keyof typeof prev.agriculturalDetails] as string[], value]
          : (prev.agriculturalDetails[field as keyof typeof prev.agriculturalDetails] as string[]).filter(item => item !== value)
      }
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    // Prepare the farmer data in the format expected by Farmers component
    const newFarmer = {
      phone: formData.basicInfo.phoneNumber,
      name: formData.basicInfo.fullName,
      address: formData.basicInfo.address,
      village: formData.basicInfo.village,
      district: formData.basicInfo.district,
      state: formData.basicInfo.state,
      aadhaar: formData.basicInfo.aadhaarNumber,
      age: parseInt(formData.basicInfo.age) || 0,
      gender: formData.basicInfo.gender,
      education: formData.basicInfo.educationLevel,
      landSize: parseFloat(formData.agriculturalDetails.landSize) || 0,
      crops: formData.agriculturalDetails.crops,
      income: parseInt(formData.agriculturalDetails.agriculturalIncome) || 0
    };

    // Store the new farmer data in localStorage so Farmers component can access it
    const existingNewFarmers = JSON.parse(localStorage.getItem('newFarmers') || '[]');
    existingNewFarmers.push(newFarmer);
    localStorage.setItem('newFarmers', JSON.stringify(existingNewFarmers));

    // Navigate back to farmers page without showing alert
    navigate('/farmers');
  };

  const renderBasicInfoStep = () => (
    <div className="enrollment-step">
      <h2>Basic Information</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            value={formData.basicInfo.fullName}
            onChange={(e) => handleBasicInfoChange('fullName', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender *</label>
          <select
            value={formData.basicInfo.gender}
            onChange={(e) => handleBasicInfoChange('gender', e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Age *</label>
          <input
            type="number"
            value={formData.basicInfo.age}
            onChange={(e) => handleBasicInfoChange('age', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            value={formData.basicInfo.dateOfBirth}
            onChange={(e) => handleBasicInfoChange('dateOfBirth', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            value={formData.basicInfo.phoneNumber}
            onChange={(e) => handleBasicInfoChange('phoneNumber', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Aadhaar Number *</label>
          <input
            type="text"
            value={formData.basicInfo.aadhaarNumber}
            onChange={(e) => handleBasicInfoChange('aadhaarNumber', e.target.value)}
            required
          />
        </div>
        <div className="form-group full-width">
          <label>Address *</label>
          <input
            type="text"
            value={formData.basicInfo.address}
            onChange={(e) => handleBasicInfoChange('address', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Village *</label>
          <input
            type="text"
            value={formData.basicInfo.village}
            onChange={(e) => handleBasicInfoChange('village', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>District *</label>
          <input
            type="text"
            value={formData.basicInfo.district}
            onChange={(e) => handleBasicInfoChange('district', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>State *</label>
          <input
            type="text"
            value={formData.basicInfo.state}
            onChange={(e) => handleBasicInfoChange('state', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Education Level *</label>
          <select
            value={formData.basicInfo.educationLevel}
            onChange={(e) => handleBasicInfoChange('educationLevel', e.target.value)}
            required
          >
            <option value="">Select Education Level</option>
            <option value="None">None</option>
            <option value="Primary">Primary</option>
            <option value="Secondary">Secondary</option>
            <option value="Higher Secondary">Higher Secondary</option>
            <option value="Graduate">Graduate</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderAgriculturalStep = () => (
    <div className="enrollment-step">
      <h2>Agricultural Details</h2>
      
      <div className="form-section">
        <div className="form-section-title">Crop Information</div>
        <div className="form-grid">
          <div className="form-group full-width">
            <label>Crops Currently Grown *</label>
            <div className="checkbox-group">
              {cropOptions.map(crop => (
                <label key={crop} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.agriculturalDetails.crops.includes(crop)}
                    onChange={(e) => handleCheckboxChange('crops', crop, e.target.checked)}
                  />
                  {crop}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Land Size (in acres) *</label>
            <input
              type="number"
              step="0.1"
              value={formData.agriculturalDetails.landSize}
              onChange={(e) => handleAgriculturalChange('landSize', e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Soil Type *</label>
            <select
              value={formData.agriculturalDetails.soilType}
              onChange={(e) => handleAgriculturalChange('soilType', e.target.value)}
              required
            >
              <option value="">Select Soil Type</option>
              {soilTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Type of Seeds Used *</label>
            <select
              value={formData.agriculturalDetails.seedType}
              onChange={(e) => handleAgriculturalChange('seedType', e.target.value)}
              required
            >
              <option value="">Select Seed Type</option>
              {seedTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-title">Farming Practices</div>
        <div className="form-grid">
          <div className="form-group">
            <label>Uses Fertilizers/Pesticides?</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="usesFertilizers"
                  checked={formData.agriculturalDetails.usesFertilizers}
                  onChange={() => handleAgriculturalChange('usesFertilizers', true)}
                />
                Yes
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="usesFertilizers"
                  checked={!formData.agriculturalDetails.usesFertilizers}
                  onChange={() => handleAgriculturalChange('usesFertilizers', false)}
                />
                No
              </label>
            </div>
          </div>
          {formData.agriculturalDetails.usesFertilizers && (
            <div className="form-group">
              <label>Fertilizer Types</label>
              <div className="conditional-group">
                <div className="checkbox-group">
                  {fertilizerTypes.map(type => (
                    <label key={type} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.agriculturalDetails.fertilizerTypes.includes(type)}
                        onChange={(e) => handleCheckboxChange('fertilizerTypes', type, e.target.checked)}
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="form-group full-width">
            <label>Agricultural Practices</label>
            <div className="checkbox-group">
              {agriPractices.map(practice => (
                <label key={practice} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.agriculturalDetails.agriPractices.includes(practice)}
                    onChange={(e) => handleCheckboxChange('agriPractices', practice, e.target.checked)}
                  />
                  {practice}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-title">Equipment & Livestock</div>
        <div className="form-grid">
          <div className="form-group full-width">
            <label>Tools Currently Used</label>
            <div className="checkbox-group">
              {toolOptions.map(tool => (
                <label key={tool} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.agriculturalDetails.tools.includes(tool)}
                    onChange={(e) => handleCheckboxChange('tools', tool, e.target.checked)}
                  />
                  {tool}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Tool Ownership</label>
            <select
              value={formData.agriculturalDetails.toolOwnership}
              onChange={(e) => handleAgriculturalChange('toolOwnership', e.target.value)}
            >
              <option value="">Select Ownership</option>
              <option value="Own">Own</option>
              <option value="Rent">Rent</option>
            </select>
          </div>
          <div className="form-group">
            <label>Owns Livestock?</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="ownsLivestock"
                  checked={formData.agriculturalDetails.ownsLivestock}
                  onChange={() => handleAgriculturalChange('ownsLivestock', true)}
                />
                Yes
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="ownsLivestock"
                  checked={!formData.agriculturalDetails.ownsLivestock}
                  onChange={() => handleAgriculturalChange('ownsLivestock', false)}
                />
                No
              </label>
            </div>
          </div>
          {formData.agriculturalDetails.ownsLivestock && (
            <div className="form-group">
              <label>Livestock Details</label>
              <div className="conditional-group">
                <input
                  type="text"
                  value={formData.agriculturalDetails.livestockDetails}
                  onChange={(e) => handleAgriculturalChange('livestockDetails', e.target.value)}
                  placeholder="e.g., 2 Cows, 5 Chickens"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-title">Financial & Marketing</div>
        <div className="form-grid">
          <div className="form-group">
            <label>Agricultural Income (₹) *</label>
            <input
              type="number"
              value={formData.agriculturalDetails.agriculturalIncome}
              onChange={(e) => handleAgriculturalChange('agriculturalIncome', e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Mode of Selling Produce *</label>
            <select
              value={formData.agriculturalDetails.sellingMode}
              onChange={(e) => handleAgriculturalChange('sellingMode', e.target.value)}
              required
            >
              <option value="">Select Selling Mode</option>
              {sellingModes.map(mode => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Participates in Government Schemes?</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="participatesInSchemes"
                  checked={formData.agriculturalDetails.participatesInSchemes}
                  onChange={() => handleAgriculturalChange('participatesInSchemes', true)}
                />
                Yes
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="participatesInSchemes"
                  checked={!formData.agriculturalDetails.participatesInSchemes}
                  onChange={() => handleAgriculturalChange('participatesInSchemes', false)}
                />
                No
              </label>
            </div>
          </div>
          {formData.agriculturalDetails.participatesInSchemes && (
            <div className="form-group">
              <label>Government Schemes</label>
              <div className="conditional-group">
                <div className="checkbox-group">
                  {schemeOptions.map(scheme => (
                    <label key={scheme} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.agriculturalDetails.schemes.includes(scheme)}
                        onChange={(e) => handleCheckboxChange('schemes', scheme, e.target.checked)}
                      />
                      {scheme}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="enrollment-container">
      <div className="enrollment-header">
        <h1>Farmer Enrollment</h1>
        <div className="step-indicator">
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1. Basic Information</div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2. Agricultural Details</div>
        </div>
      </div>

      <div className="enrollment-content">
        {currentStep === 1 && renderBasicInfoStep()}
        {currentStep === 2 && renderAgriculturalStep()}

        <div className="enrollment-actions">
          {currentStep > 1 && (
            <button onClick={prevStep} className="btn-secondary">
              Previous
            </button>
          )}
          {currentStep < 2 ? (
            <button onClick={nextStep} className="btn-primary">
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn-primary">
              Submit Enrollment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerEnrollment; 