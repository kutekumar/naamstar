import { DailyInsight } from '../lib/supabase';
import { Sun, Heart, CheckCircle2, XCircle, Lightbulb, Sparkles } from 'lucide-react';

interface DailyInsightsProps {
  insight: DailyInsight | null;
  luckyNumbers: number[];
  luckyColor: string;
  affirmation: string;
  remedies: string[];
}

export default function DailyInsights({ insight, luckyNumbers, luckyColor, affirmation, remedies }: DailyInsightsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Today's Cosmic Guidance</h2>
        <p className="text-gray-400 text-sm">{new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</p>
      </div>

      {insight?.horoscope_text && (
        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">Daily Horoscope</h3>
          </div>
          <p className="text-gray-300 leading-relaxed">{insight.horoscope_text}</p>
        </div>
      )}

      <div className="bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/20 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">Affirmation</h3>
        </div>
        <p className="text-lg text-gray-200 leading-relaxed italic">"{affirmation}"</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">Do's</h3>
          </div>
          <ul className="space-y-2">
            {(insight?.dos || ['Stay positive', 'Practice gratitude', 'Trust your intuition']).map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">Don'ts</h3>
          </div>
          <ul className="space-y-2">
            {(insight?.donts || ['Avoid negative thoughts', 'Don\'t rush decisions', 'Avoid conflicts']).map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Lucky Elements</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-400 mb-1">Lucky Numbers</p>
              <div className="flex gap-2 flex-wrap">
                {luckyNumbers.map((num, index) => (
                  <span key={index} className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                    {num}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Lucky Color</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-white/20" style={{ backgroundColor: luckyColor.toLowerCase() }}></div>
                <span className="text-white font-medium">{luckyColor}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-500 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">Remedies</h3>
          </div>
          <ul className="space-y-2">
            {remedies.map((remedy, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                <Lightbulb className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>{remedy}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
