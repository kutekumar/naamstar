import { useState } from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

interface BirthDetails {
  birthName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

interface BirthDetailsFormProps {
  onSubmit: (details: BirthDetails) => void;
}

export default function BirthDetailsForm({ onSubmit }: BirthDetailsFormProps) {
  const [formData, setFormData] = useState<BirthDetails>({
    birthName: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof BirthDetails, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 bg-clip-text text-transparent mb-2">
          Naamstar
        </h1>
        <p className="text-gray-300 text-sm">Discover your cosmic blueprint</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label htmlFor="birthName" className="block text-sm font-medium text-gray-300 mb-2">
            Birth Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="birthName"
              type="text"
              required
              value={formData.birthName}
              onChange={(e) => handleChange('birthName', e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
              placeholder="Enter your birth name"
            />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-300 mb-2">
            Date of Birth
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="dateOfBirth"
              type="date"
              required
              value={formData.dateOfBirth}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
            />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="timeOfBirth" className="block text-sm font-medium text-gray-300 mb-2">
            Time of Birth
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="timeOfBirth"
              type="time"
              required
              value={formData.timeOfBirth}
              onChange={(e) => handleChange('timeOfBirth', e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
            />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="placeOfBirth" className="block text-sm font-medium text-gray-300 mb-2">
            Place of Birth
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="placeOfBirth"
              type="text"
              required
              value={formData.placeOfBirth}
              onChange={(e) => handleChange('placeOfBirth', e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
              placeholder="City, Country"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-[1.02]"
        >
          Generate Birth Chart
        </button>
      </form>

      <div className="mt-8 text-center text-xs text-gray-400">
        <p>Your cosmic journey awaits</p>
      </div>
    </div>
  );
}
