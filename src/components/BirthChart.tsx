import { BirthChart as BirthChartType } from '../lib/supabase';
import { PLANETS } from '../lib/astrology';
import { Sparkles, Star } from 'lucide-react';
import ZodiacIcon from './ZodiacIcon';

interface BirthChartProps {
  chart: BirthChartType;
}

export default function BirthChart({ chart }: BirthChartProps) {
  const dominantPlanet = PLANETS.find(p => p.name === chart.dominant_planet);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          Welcome, {chart.birth_name}
        </h2>
        <p className="text-gray-400">Your Celestial Blueprint</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4">
            {chart.sun_sign && <ZodiacIcon sign={chart.sun_sign} className="w-16 h-16" />}
            <div>
              <h3 className="text-lg font-semibold text-white">Sun Sign</h3>
              <p className="text-sm text-gray-400">Western Zodiac</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-amber-400">{chart.sun_sign}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4">
            {chart.moon_sign && <ZodiacIcon sign={chart.moon_sign} className="w-16 h-16" />}
            <div>
              <h3 className="text-lg font-semibold text-white">Moon Sign</h3>
              <p className="text-sm text-gray-400">Vedic Rashi</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-blue-400">{chart.moon_sign}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-xl">
              {dominantPlanet?.symbol}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Dominant Planet</h3>
              <p className="text-sm text-gray-400">Chart Ruler</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-purple-400">{chart.dominant_planet}</p>
        </div>

        <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
              <Star className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Nakshatra</h3>
              <p className="text-sm text-gray-400">Birth Star</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-pink-400">
            {chart.nakshatra}
            {chart.nakshatra_pada && <span className="text-sm ml-2">Pada {chart.nakshatra_pada}</span>}
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 rounded-2xl p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-white mb-3">Ascendant (Rising Sign)</h3>
        <p className="text-xl text-indigo-400 font-semibold">{chart.ascendant}</p>
        <p className="text-sm text-gray-400 mt-2">
          Your rising sign influences how others perceive you and your approach to life
        </p>
      </div>

      <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-white mb-3">Birth Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Date</p>
            <p className="text-white font-medium">{new Date(chart.date_of_birth).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          </div>
          <div>
            <p className="text-gray-400">Time</p>
            <p className="text-white font-medium">{chart.time_of_birth}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-400">Place</p>
            <p className="text-white font-medium">{chart.place_of_birth}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
