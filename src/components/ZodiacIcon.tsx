interface ZodiacIconProps {
  sign: string;
  className?: string;
}

export default function ZodiacIcon({ sign, className = "w-24 h-24" }: ZodiacIconProps) {
  const getZodiacSymbol = (zodiacSign: string) => {
    const symbols: { [key: string]: string } = {
      'Aries': '♈',
      'Taurus': '♉',
      'Gemini': '♊',
      'Cancer': '♋',
      'Leo': '♌',
      'Virgo': '♍',
      'Libra': '♎',
      'Scorpio': '♏',
      'Sagittarius': '♐',
      'Capricorn': '♑',
      'Aquarius': '♒',
      'Pisces': '♓'
    };
    return symbols[zodiacSign] || '✦';
  };

  const getZodiacGradient = (zodiacSign: string) => {
    const gradients: { [key: string]: string } = {
      'Aries': 'from-red-500 to-orange-500',
      'Taurus': 'from-green-500 to-emerald-500',
      'Gemini': 'from-yellow-500 to-amber-500',
      'Cancer': 'from-blue-500 to-cyan-500',
      'Leo': 'from-orange-500 to-yellow-500',
      'Virgo': 'from-green-600 to-teal-500',
      'Libra': 'from-pink-500 to-rose-500',
      'Scorpio': 'from-red-600 to-purple-600',
      'Sagittarius': 'from-purple-500 to-indigo-500',
      'Capricorn': 'from-gray-600 to-slate-600',
      'Aquarius': 'from-blue-400 to-cyan-400',
      'Pisces': 'from-teal-500 to-cyan-500'
    };
    return gradients[zodiacSign] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className={`${className} flex items-center justify-center`}>
      <div className={`w-full h-full rounded-full bg-gradient-to-br ${getZodiacGradient(sign)} flex items-center justify-center shadow-lg`}>
        <span className="text-white font-bold" style={{ fontSize: '60%' }}>
          {getZodiacSymbol(sign)}
        </span>
      </div>
    </div>
  );
}
