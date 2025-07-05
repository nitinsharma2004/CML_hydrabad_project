import React from 'react';
import './Schemes.css';

interface Scheme {
  title: string;
  description: string;
  tag: string;
  icon: string;
  enrollUrl: string;
}

const schemes: Scheme[] = [
  {
    title: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    description: 'Direct income support of ₹6,000 per year to small and marginal farmer families. The amount is transferred in three equal installments of ₹2,000 each directly into farmers\' bank accounts.',
    tag: 'Income Support',
    icon: '💰',
    enrollUrl: 'https://pmkisan.gov.in/homenew.aspx'
  },
  {
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    description: 'Comprehensive crop insurance scheme providing financial support to farmers in case of crop loss due to natural calamities, pests, and diseases with low premium rates.',
    tag: 'Insurance',
    icon: '🛡️',
    enrollUrl: 'https://pmfby.gov.in/'
  },
  {
    title: 'Kisan Credit Card (KCC)',
    description: 'Provides adequate and timely credit support to farmers for cultivation and other needs. Offers flexible repayment options and competitive interest rates for agricultural activities.',
    tag: 'Credit',
    icon: '🌿',
    enrollUrl: 'https://www.jansamarth.in/kisan-credit-card-scheme'
  },
  {
    title: 'PMKSY (Pradhan Mantri Krishi Sinchayee Yojana)',
    description: 'National mission to improve farm productivity and ensure better utilization of water resources. Focuses on end-to-end solutions in irrigation supply chain.',
    tag: 'Irrigation',
    icon: '💧',
    enrollUrl: 'https://pmksy.gov.in/'
  },
  {
    title: 'Soil Health Card Scheme',
    description: 'Provides farmers with soil health cards containing crop-wise recommendations for nutrients and fertilizers. Helps in judicious use of fertilizers and improving soil health.',
    tag: 'Soil Health',
    icon: '🌱',
    enrollUrl: 'https://soilhealth.dac.gov.in/'
  },
  {
    title: 'National Agriculture Market (eNAM)',
    description: 'Online trading platform for agricultural commodities. Enables farmers to get better prices for their produce through transparent price discovery and online trading.',
    tag: 'Market',
    icon: '🏪',
    enrollUrl: 'https://enam.gov.in/web/'
  }
];

const Schemes: React.FC = () => {
  return (
    <div className="schemes-container">
      <div className="schemes-header">
        <h1>Agricultural Schemes</h1>
        <p>Government initiatives to support farmers and agricultural development</p>
      </div>

      <div className="schemes-grid">
        {schemes.map((scheme, index) => (
          <div className="scheme-card" key={index}>
            <div className="scheme-icon">{scheme.icon}</div>
            <div className="scheme-tag">{scheme.tag}</div>
            <h2>{scheme.title}</h2>
            <p>{scheme.description}</p>
            <div className="enroll-button-container">
              <a href={scheme.enrollUrl} className="enroll-button" target="_blank" rel="noopener noreferrer">
                Enroll Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schemes;
