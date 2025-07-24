import { BuildComponent } from '@/types/buildPlanner';

export const availableComponents: BuildComponent[] = [
  // Grow Tents
  {
    id: 'tent-ac-infinity-4x4',
    name: '4x4x80" Grow Tent',
    brand: 'AC Infinity',
    category: 'grow-tent',
    price: 149,
    powerConsumption: 0,
    description: 'Professional-grade grow tent with thick canvas, reflective interior, and multiple ports for ventilation.',
    affiliateUrl: 'https://example.com/affiliate/ac-infinity-4x4',
    specifications: {
      'Dimensions': '48" x 48" x 80"',
      'Material': '600D Canvas',
      'Reflectivity': '95%'
    },
    compatibility: ['led-light', 'ventilation'],
    dimensions: { length: 122, width: 122, height: 203 },
    weight: 15,
    rating: 4.8,
    reviewCount: 1250
  },
  {
    id: 'tent-vivosun-2x2',
    name: '2x2x4" Grow Tent',
    brand: 'VIVOSUN',
    category: 'grow-tent',
    price: 69,
    powerConsumption: 0,
    description: 'Compact grow tent perfect for small spaces or starting plants.',
    affiliateUrl: 'https://example.com/affiliate/vivosun-2x2',
    specifications: {
      'Dimensions': '24" x 24" x 48"',
      'Material': '600D Canvas',
      'Reflectivity': '95%'
    },
    compatibility: ['led-light', 'ventilation'],
    dimensions: { length: 61, width: 61, height: 122 },
    weight: 8,
    rating: 4.5,
    reviewCount: 890
  },

  // LED Lights
  {
    id: 'light-mars-hydro-tsw2000',
    name: 'TSW-2000 LED Grow Light',
    brand: 'Mars Hydro',
    category: 'led-light',
    price: 299,
    powerConsumption: 300,
    description: 'Full spectrum LED grow light with Samsung LM301B diodes. Perfect for 4x4 grow tents.',
    affiliateUrl: 'https://example.com/affiliate/mars-hydro-tsw2000',
    specifications: {
      'Coverage': '4x4 ft',
      'PPF': '834 μmol/s',
      'Efficacy': '2.15 μmol/J'
    },
    compatibility: ['grow-tent'],
    dimensions: { length: 68, width: 31, height: 8 },
    weight: 6.8,
    rating: 4.7,
    reviewCount: 2100
  },
  {
    id: 'light-spider-farmer-sf2000',
    name: 'SF-2000 LED Grow Light',
    brand: 'Spider Farmer',
    category: 'led-light',
    price: 259,
    powerConsumption: 200,
    description: 'Samsung LM301B diodes with meanwell driver. Energy efficient and powerful.',
    affiliateUrl: 'https://example.com/affiliate/spider-farmer-sf2000',
    specifications: {
      'Coverage': '3x3 ft',
      'PPF': '524 μmol/s',
      'Efficacy': '2.7 μmol/J'
    },
    compatibility: ['grow-tent'],
    dimensions: { length: 61, width: 35, height: 8 },
    weight: 4.2,
    rating: 4.9,
    reviewCount: 1800
  },

  // Ventilation
  {
    id: 'fan-ac-infinity-cloudline-t6',
    name: 'CLOUDLINE T6 Inline Fan',
    brand: 'AC Infinity',
    category: 'ventilation',
    price: 149,
    powerConsumption: 45,
    description: 'Quiet inline duct fan with speed controller and temperature/humidity controls.',
    affiliateUrl: 'https://example.com/affiliate/ac-infinity-t6',
    specifications: {
      'Airflow': '402 CFM',
      'Size': '6 inch',
      'Noise Level': '28 dBA'
    },
    compatibility: ['carbon-filter', 'ducting'],
    dimensions: { length: 25, width: 25, height: 25 },
    weight: 3.2,
    rating: 4.8,
    reviewCount: 3500
  },
  {
    id: 'fan-vivosun-4inch',
    name: '4" Inline Duct Fan',
    brand: 'VIVOSUN',
    category: 'ventilation',
    price: 39,
    powerConsumption: 25,
    description: 'Budget-friendly inline fan perfect for smaller setups.',
    affiliateUrl: 'https://example.com/affiliate/vivosun-4inch',
    specifications: {
      'Airflow': '190 CFM',
      'Size': '4 inch',
      'Noise Level': '35 dBA'
    },
    compatibility: ['carbon-filter', 'ducting'],
    dimensions: { length: 20, width: 20, height: 20 },
    weight: 2.1,
    rating: 4.3,
    reviewCount: 1200
  },

  // Carbon Filters
  {
    id: 'filter-phresh-6x24',
    name: '6" x 24" Carbon Filter',
    brand: 'Phresh',
    category: 'carbon-filter',
    price: 89,
    powerConsumption: 0,
    description: 'Premium carbon filter with virgin activated carbon for maximum odor control.',
    affiliateUrl: 'https://example.com/affiliate/phresh-6x24',
    specifications: {
      'Diameter': '6 inch',
      'Length': '24 inch',
      'CFM Rating': '550'
    },
    compatibility: ['ventilation'],
    dimensions: { length: 61, width: 15, height: 15 },
    weight: 9.5,
    rating: 4.6,
    reviewCount: 850
  },

  // pH Meters
  {
    id: 'ph-meter-apera-ph20',
    name: 'PH20 pH Meter',
    brand: 'Apera Instruments',
    category: 'ph-meter',
    price: 49,
    powerConsumption: 0,
    description: 'Professional pH meter with automatic temperature compensation and calibration.',
    affiliateUrl: 'https://example.com/affiliate/apera-ph20',
    specifications: {
      'Accuracy': '±0.1 pH',
      'Range': '0-14 pH',
      'Calibration': 'Automatic'
    },
    compatibility: ['nutrients'],
    dimensions: { length: 18, width: 4, height: 2 },
    weight: 0.2,
    rating: 4.7,
    reviewCount: 650
  },

  // Nutrients
  {
    id: 'nutrients-general-hydroponics-trio',
    name: 'General Hydroponics Flora Trio',
    brand: 'General Hydroponics',
    category: 'nutrients',
    price: 39,
    powerConsumption: 0,
    description: 'Complete 3-part nutrient system for all stages of plant growth.',
    affiliateUrl: 'https://example.com/affiliate/gh-flora-trio',
    specifications: {
      'Type': '3-Part System',
      'Volume': '3 x 32oz bottles',
      'NPK': 'Variable ratios'
    },
    compatibility: ['ph-meter'],
    dimensions: { length: 30, width: 10, height: 25 },
    weight: 3.0,
    rating: 4.5,
    reviewCount: 2200
  },

  // Accessories
  {
    id: 'timer-bn-link-dual',
    name: 'BN-LINK Dual Outlet Timer',
    brand: 'BN-LINK',
    category: 'accessories',
    price: 19,
    powerConsumption: 0,
    description: 'Programmable timer with dual outlets for lights and other equipment.',
    affiliateUrl: 'https://example.com/affiliate/bn-link-timer',
    specifications: {
      'Outlets': '2',
      'Programs': '8 on/off per day',
      'Battery Backup': 'Yes'
    },
    compatibility: ['led-light', 'ventilation'],
    dimensions: { length: 10, width: 6, height: 4 },
    weight: 0.3,
    rating: 4.4,
    reviewCount: 890
  },

  // Additional components for variety
  {
    id: 'light-hlg-260w',
    name: 'HLG 260W Quantum Board',
    brand: 'Horticulture Lighting Group',
    category: 'led-light',
    price: 349,
    powerConsumption: 260,
    description: 'High-end quantum board with Samsung LM301H diodes and efficient design.',
    affiliateUrl: 'https://example.com/affiliate/hlg-260w',
    specifications: {
      'Coverage': '3x3 ft',
      'PPF': '630 μmol/s',
      'Efficacy': '2.42 μmol/J'
    },
    compatibility: ['grow-tent'],
    dimensions: { length: 55, width: 28, height: 8 },
    weight: 4.5,
    rating: 4.9,
    reviewCount: 750
  },

  {
    id: 'tent-gorilla-4x4',
    name: '4x4x7" Gorilla Grow Tent',
    brand: 'Gorilla Grow Tent',
    category: 'grow-tent',
    price: 399,
    powerConsumption: 0,
    description: 'Premium grow tent with height extension capability and superior build quality.',
    affiliateUrl: 'https://example.com/affiliate/gorilla-4x4',
    specifications: {
      'Dimensions': '48" x 48" x 84"',
      'Material': '1680D Canvas',
      'Height Extension': 'Available'
    },
    compatibility: ['led-light', 'ventilation'],
    dimensions: { length: 122, width: 122, height: 213 },
    weight: 25,
    rating: 4.9,
    reviewCount: 500
  }
];