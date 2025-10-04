export const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export const NAKSHATRAS = [
  { name: 'Ashwini', syllables: ['Chu', 'Che', 'Cho', 'La'], lord: 'Ketu' },
  { name: 'Bharani', syllables: ['Li', 'Lu', 'Le', 'Lo'], lord: 'Venus' },
  { name: 'Krittika', syllables: ['A', 'I', 'U', 'E'], lord: 'Sun' },
  { name: 'Rohini', syllables: ['O', 'Va', 'Vi', 'Vu'], lord: 'Moon' },
  { name: 'Mrigashira', syllables: ['Ve', 'Vo', 'Ka', 'Ki'], lord: 'Mars' },
  { name: 'Ardra', syllables: ['Ku', 'Gha', 'Nga', 'Chha'], lord: 'Rahu' },
  { name: 'Punarvasu', syllables: ['Ke', 'Ko', 'Ha', 'Hi'], lord: 'Jupiter' },
  { name: 'Pushya', syllables: ['Hu', 'He', 'Ho', 'Da'], lord: 'Saturn' },
  { name: 'Ashlesha', syllables: ['Di', 'Du', 'De', 'Do'], lord: 'Mercury' },
  { name: 'Magha', syllables: ['Ma', 'Mi', 'Mu', 'Me'], lord: 'Ketu' },
  { name: 'Purva Phalguni', syllables: ['Mo', 'Ta', 'Ti', 'Tu'], lord: 'Venus' },
  { name: 'Uttara Phalguni', syllables: ['Te', 'To', 'Pa', 'Pi'], lord: 'Sun' },
  { name: 'Hasta', syllables: ['Pu', 'Sha', 'Na', 'Tha'], lord: 'Moon' },
  { name: 'Chitra', syllables: ['Pe', 'Po', 'Ra', 'Ri'], lord: 'Mars' },
  { name: 'Swati', syllables: ['Ru', 'Re', 'Ro', 'Ta'], lord: 'Rahu' },
  { name: 'Vishakha', syllables: ['Ti', 'Tu', 'Te', 'To'], lord: 'Jupiter' },
  { name: 'Anuradha', syllables: ['Na', 'Ni', 'Nu', 'Ne'], lord: 'Saturn' },
  { name: 'Jyeshtha', syllables: ['No', 'Ya', 'Yi', 'Yu'], lord: 'Mercury' },
  { name: 'Mula', syllables: ['Ye', 'Yo', 'Bha', 'Bhi'], lord: 'Ketu' },
  { name: 'Purva Ashadha', syllables: ['Bhu', 'Dha', 'Pha', 'Dha'], lord: 'Venus' },
  { name: 'Uttara Ashadha', syllables: ['Bhe', 'Bho', 'Ja', 'Ji'], lord: 'Sun' },
  { name: 'Shravana', syllables: ['Ju', 'Je', 'Jo', 'Gha'], lord: 'Moon' },
  { name: 'Dhanishta', syllables: ['Ga', 'Gi', 'Gu', 'Ge'], lord: 'Mars' },
  { name: 'Shatabhisha', syllables: ['Go', 'Sa', 'Si', 'Su'], lord: 'Rahu' },
  { name: 'Purva Bhadrapada', syllables: ['Se', 'So', 'Da', 'Di'], lord: 'Jupiter' },
  { name: 'Uttara Bhadrapada', syllables: ['Du', 'Tha', 'Jha', 'Na'], lord: 'Saturn' },
  { name: 'Revati', syllables: ['De', 'Do', 'Cha', 'Chi'], lord: 'Mercury' }
];

export const PLANETS = [
  { name: 'Sun', symbol: '☉', color: '#FFA500' },
  { name: 'Moon', symbol: '☽', color: '#C0C0C0' },
  { name: 'Mercury', symbol: '☿', color: '#90EE90' },
  { name: 'Venus', symbol: '♀', color: '#FFB6C1' },
  { name: 'Mars', symbol: '♂', color: '#FF4500' },
  { name: 'Jupiter', symbol: '♃', color: '#DAA520' },
  { name: 'Saturn', symbol: '♄', color: '#4169E1' },
  { name: 'Rahu', symbol: '☊', color: '#800080' },
  { name: 'Ketu', symbol: '☋', color: '#8B4513' }
];

export function calculateSunSign(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
}

export function calculateNumerology(name: string): number {
  const letterValues: { [key: string]: number } = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
  };

  let sum = 0;
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');

  for (const char of cleanName) {
    sum += letterValues[char] || 0;
  }

  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }

  return sum;
}

export function getMoonSign(date: Date): string {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const moonCycle = (dayOfYear % 27);
  const signIndex = Math.floor((moonCycle / 27) * 12);
  return ZODIAC_SIGNS[signIndex];
}

export function getNakshatra(date: Date): { name: string; pada: number; syllables: string[] } {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const nakshatraIndex = dayOfYear % 27;
  const pada = (dayOfYear % 4) + 1;

  return {
    name: NAKSHATRAS[nakshatraIndex].name,
    pada,
    syllables: NAKSHATRAS[nakshatraIndex].syllables
  };
}

export function generateNameSuggestions(nakshatra: { name: string; pada: number; syllables: string[] }, currentName: string): string[] {
  const syllable = nakshatra.syllables[nakshatra.pada - 1];
  const suggestions = [
    `${syllable}rya`,
    `${syllable}vi`,
    `${syllable}sha`,
    `${syllable}ma`,
    `${syllable}ra`
  ];

  return suggestions.filter(name => name.toLowerCase() !== currentName.toLowerCase()).slice(0, 3);
}

export function getDominantPlanet(sunSign: string): string {
  const rulers: { [key: string]: string } = {
    'Aries': 'Mars', 'Taurus': 'Venus', 'Gemini': 'Mercury',
    'Cancer': 'Moon', 'Leo': 'Sun', 'Virgo': 'Mercury',
    'Libra': 'Venus', 'Scorpio': 'Mars', 'Sagittarius': 'Jupiter',
    'Capricorn': 'Saturn', 'Aquarius': 'Saturn', 'Pisces': 'Jupiter'
  };
  return rulers[sunSign] || 'Sun';
}

export function getLuckyNumbers(numerology: number, date: Date): number[] {
  const base = [numerology, (numerology + 3) % 9 + 1, (numerology + 6) % 9 + 1];
  const dayNumber = date.getDate() % 9 + 1;
  return [...new Set([...base, dayNumber])].slice(0, 5);
}

export function getLuckyColor(planet: string): string {
  const colors: { [key: string]: string } = {
    'Sun': 'Gold',
    'Moon': 'Silver',
    'Mercury': 'Green',
    'Venus': 'Pink',
    'Mars': 'Red',
    'Jupiter': 'Yellow',
    'Saturn': 'Blue',
    'Rahu': 'Purple',
    'Ketu': 'Brown'
  };
  return colors[planet] || 'White';
}

export function getRemedies(planet: string): string[] {
  const remedies: { [key: string]: string[] } = {
    'Sun': [
      'Offer water to the Sun at sunrise',
      'Wear ruby or garnet gemstone',
      'Chant "Om Suryaya Namaha" 108 times'
    ],
    'Moon': [
      'Meditate during full moon nights',
      'Wear pearl or moonstone',
      'Chant "Om Chandraya Namaha" 108 times'
    ],
    'Mercury': [
      'Practice mindfulness and communication exercises',
      'Wear emerald gemstone',
      'Chant "Om Budhaya Namaha" 108 times'
    ],
    'Venus': [
      'Appreciate beauty and art',
      'Wear diamond or white sapphire',
      'Chant "Om Shukraya Namaha" 108 times'
    ],
    'Mars': [
      'Practice physical exercise regularly',
      'Wear red coral gemstone',
      'Chant "Om Mangalaya Namaha" 108 times'
    ],
    'Jupiter': [
      'Study spiritual texts and practice gratitude',
      'Wear yellow sapphire gemstone',
      'Chant "Om Guruve Namaha" 108 times'
    ],
    'Saturn': [
      'Practice discipline and patience',
      'Wear blue sapphire gemstone',
      'Chant "Om Shanaye Namaha" 108 times'
    ]
  };
  return remedies[planet] || ['Practice meditation and self-reflection'];
}

export function getAffirmation(sunSign: string): string {
  const affirmations: { [key: string]: string } = {
    'Aries': 'I am courageous and embrace new beginnings with confidence',
    'Taurus': 'I am grounded and attract abundance in all forms',
    'Gemini': 'I communicate with clarity and embrace my curiosity',
    'Cancer': 'I honor my emotions and nurture myself with love',
    'Leo': 'I shine brightly and share my gifts with the world',
    'Virgo': 'I am organized and bring order to everything I touch',
    'Libra': 'I create harmony and balance in all my relationships',
    'Scorpio': 'I transform challenges into opportunities for growth',
    'Sagittarius': 'I expand my horizons and embrace adventure',
    'Capricorn': 'I achieve my goals through dedication and perseverance',
    'Aquarius': 'I innovate and contribute to the greater good',
    'Pisces': 'I trust my intuition and flow with universal energy'
  };
  return affirmations[sunSign] || 'I am aligned with cosmic energy';
}
