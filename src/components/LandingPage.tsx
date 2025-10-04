import { Sparkles, Star, Moon, Sun } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Star className="w-8 h-8 text-amber-400 animate-pulse" />
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              Naamstar
            </h1>
            <Moon className="w-8 h-8 text-blue-400 animate-pulse" />
          </div>

          <p className="text-2xl md:text-3xl text-gray-200 font-light">
            Discover Your Cosmic Blueprint
          </p>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Unlock the mysteries of your birth chart, find your cosmically aligned name,
            and receive personalized daily insights guided by ancient Vedic and Western astrology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sun className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Birth Chart</h3>
            <p className="text-gray-400 text-sm">
              Generate your complete astrological blueprint with planetary positions and houses
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-fuchsia-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Cosmic Names</h3>
            <p className="text-gray-400 text-sm">
              Discover names that align with your nakshatra and numerology for harmony
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Moon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Daily Insights</h3>
            <p className="text-gray-400 text-sm">
              Get personalized horoscopes, lucky elements, and remedies every day
            </p>
          </div>
        </div>

        <div className="pt-8">
          <button
            onClick={onGetStarted}
            className="group relative px-12 py-5 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-white text-xl font-bold rounded-full hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center gap-3">
              Check My Fate
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </span>
          </button>
        </div>

        <p className="text-sm text-gray-500 pt-4">
          Your journey through the cosmos begins here
        </p>
      </div>
    </div>
  );
}
