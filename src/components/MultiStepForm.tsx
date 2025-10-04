import { useState } from 'react';
import { User, Calendar, Clock, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';

interface FormData {
  birthName: string;
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
  period: string;
  placeOfBirth: string;
}

interface MultiStepFormProps {
  onSubmit: (data: {
    birthName: string;
    dateOfBirth: string;
    timeOfBirth: string;
    placeOfBirth: string;
  }) => void;
  onBack: () => void;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const YEARS = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

export default function MultiStepForm({ onSubmit, onBack }: MultiStepFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    birthName: '',
    day: '',
    month: '',
    year: '',
    hour: '',
    minute: '',
    period: 'AM',
    placeOfBirth: ''
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      const monthIndex = MONTHS.indexOf(formData.month) + 1;
      const dateOfBirth = `${formData.year}-${monthIndex.toString().padStart(2, '0')}-${formData.day.padStart(2, '0')}`;

      let hour24 = parseInt(formData.hour);
      if (formData.period === 'PM' && hour24 !== 12) {
        hour24 += 12;
      } else if (formData.period === 'AM' && hour24 === 12) {
        hour24 = 0;
      }
      const timeOfBirth = `${hour24.toString().padStart(2, '0')}:${formData.minute.padStart(2, '0')}`;

      onSubmit({
        birthName: formData.birthName,
        dateOfBirth,
        timeOfBirth,
        placeOfBirth: formData.placeOfBirth
      });
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.birthName.trim().length > 0;
      case 2:
        return formData.day && formData.month && formData.year;
      case 3:
        return formData.hour && formData.minute;
      case 4:
        return formData.placeOfBirth.trim().length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevious}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="text-sm text-gray-400">Step {step} of 4</div>
        </div>

        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-all ${
                i <= step
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">What's your name?</h2>
              <p className="text-gray-400">Enter your birth name as it appears on official documents</p>
            </div>

            <div>
              <input
                type="text"
                value={formData.birthName}
                onChange={(e) => setFormData({ ...formData, birthName: e.target.value })}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-center text-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                placeholder="Enter your full name"
                autoFocus
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">When were you born?</h2>
              <p className="text-gray-400">Select your date of birth</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Day</label>
                <select
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                >
                  <option value="" className="bg-slate-800">Day</option>
                  {DAYS.map((day) => (
                    <option key={day} value={day} className="bg-slate-800">
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Month</label>
                <select
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                >
                  <option value="" className="bg-slate-800">Month</option>
                  {MONTHS.map((month) => (
                    <option key={month} value={month} className="bg-slate-800">
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                >
                  <option value="" className="bg-slate-800">Year</option>
                  {YEARS.map((year) => (
                    <option key={year} value={year} className="bg-slate-800">
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">What time were you born?</h2>
              <p className="text-gray-400">Select your birth time (as accurate as possible)</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Hour</label>
                <select
                  value={formData.hour}
                  onChange={(e) => setFormData({ ...formData, hour: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                >
                  <option value="" className="bg-slate-800">Hour</option>
                  {HOURS.map((hour) => (
                    <option key={hour} value={hour} className="bg-slate-800">
                      {hour}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Minute</label>
                <select
                  value={formData.minute}
                  onChange={(e) => setFormData({ ...formData, minute: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                >
                  <option value="" className="bg-slate-800">Min</option>
                  {MINUTES.map((minute) => (
                    <option key={minute} value={minute} className="bg-slate-800">
                      {minute.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Period</label>
                <select
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                >
                  <option value="AM" className="bg-slate-800">AM</option>
                  <option value="PM" className="bg-slate-800">PM</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Where were you born?</h2>
              <p className="text-gray-400">Enter your place of birth (city and country)</p>
            </div>

            <div>
              <input
                type="text"
                value={formData.placeOfBirth}
                onChange={(e) => setFormData({ ...formData, placeOfBirth: e.target.value })}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-center text-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                placeholder="e.g., New York, USA"
                autoFocus
              />
            </div>
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-white text-lg font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {step === 4 ? 'Generate My Chart' : 'Continue'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
