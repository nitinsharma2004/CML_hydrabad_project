import React from 'react';
import { Link } from 'react-router-dom';
import './Crops.css';

interface Crop {
  name: string;
  image: string;
  tag: string;
  description: string;
  cropId: string;
}

const crops: Crop[] = [
  {
    name: 'Rice',
    image: 'https://media.istockphoto.com/id/1151784210/photo/ripe-rice-field-and-sky-background-at-sunset.jpg?s=612x612&w=0&k=20&c=DZz4wxIbPXnMhmoTsEV06uYKup9MEZTtRFe2XkDb0mY=',
    tag: 'Staple Food',
    description: 'Essential cereal crop and primary food source for millions. Requires warm climate and plenty of water for optimal growth.',
    cropId: 'rice'
  },
  {
    name: 'Mustard',
    image: 'https://media.istockphoto.com/id/1149840299/photo/wild-mustard-plant-in-flower.jpg?s=612x612&w=0&k=20&c=fv2AP-tpq8j8ohdfb9OAHFHOUbz_-6MtbJ43bHWB6mY=',
    tag: 'Oilseed',
    description: 'Important oilseed crop used for cooking oil and spices. Grows well in cool weather and requires moderate rainfall.',
    cropId: 'mustard'
  },
  {
    name: 'Pulses',
    image: 'https://media.istockphoto.com/id/964325260/photo/various-of-legumes-in-sack-bag.jpg?s=612x612&w=0&k=20&c=CNM8WqPgGwlR7UUMoZejem2EfsQp5wFBk5skVk14FnE=',
    tag: 'Legumes',
    description: 'Protein-rich legumes including lentils, chickpeas, and beans. Essential for soil health and crop rotation.',
    cropId: 'pulses'
  },
  {
    name: 'Jute',
    image: 'https://media.istockphoto.com/id/1416047417/photo/jute-plants-in-the-field-jute-cultivation-in-assam-in-india.jpg?s=612x612&w=0&k=20&c=TV_wV6PNlRLK1DiN4hb_380mwrnG8MELBeef2xcwBb8=',
    tag: 'Fiber Crop',
    description: 'Natural fiber crop used for making ropes, bags, and textiles. Requires high humidity and warm temperatures.',
    cropId: 'jute'
  },
  {
    name: 'Banana',
    image: 'https://media.istockphoto.com/id/1094246926/photo/banana-bunch-at-the-banana-plantation.jpg?s=612x612&w=0&k=20&c=Jk2jkGBrLE6pSSo_i_00PpOU_nF43tmS20eRgl55gKU=',
    tag: 'Fruit',
    description: 'Tropical fruit crop with high nutritional value. Requires warm climate and regular irrigation for best yield.',
    cropId: 'banana'
  },
  {
    name: 'Maize',
    image: 'https://www.ugaoo.com/cdn/shop/articles/9f9b3771a2.jpg?v=1727692315',
    tag: 'Cereal',
    description: 'Versatile cereal crop used for food, feed, and industrial purposes. Adapts well to various climatic conditions.',
    cropId: 'maize'
  }
];

const Crops: React.FC = () => {
  return (
    <div className="crops-container">
      <header className="crops-header">
        <h1>Crop Information</h1>
        <p>Comprehensive guide to various crops and their cultivation</p>
      </header>

      <div className="crops-grid">
        {crops.map((crop, index) => (
          <div className="crop-card" key={index}>
            <img src={crop.image} alt={crop.name} className="crop-image" />
            <div className="crop-tag">{crop.tag}</div>
            <h2>{crop.name}</h2>
            <p>{crop.description}</p>
            <div className="know-more-button-container">
              <Link to={`/crop-detail/${crop.cropId}`} className="know-more-button">
                Know More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Crops;
