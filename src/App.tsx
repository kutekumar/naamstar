import { useState } from 'react';
import { supabase, BirthChart as BirthChartType, NameSuggestion, DailyInsight } from './lib/supabase';
import {
  calculateSunSign,
  getMoonSign,
  getNakshatra,
  getDominantPlanet,
  calculateNumerology,
  generateNameSuggestions,
  getLuckyNumbers,
  getLuckyColor,
  getRemedies,
  getAffirmation
} from './lib/astrology';
import LandingPage from './components/LandingPage';
import MultiStepForm from './components/MultiStepForm';
import BirthChart from './components/BirthChart';
import NameSuggestions from './components/NameSuggestions';
import DailyInsights from './components/DailyInsights';
import CosmicBackground from './components/CosmicBackground';
import { ArrowLeft } from 'lucide-react';

type AppScreen = 'landing' | 'form' | 'results';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
  const [currentChart, setCurrentChart] = useState<BirthChartType | null>(null);
  const [nameSuggestions, setNameSuggestions] = useState<NameSuggestion[]>([]);
  const [dailyInsight, setDailyInsight] = useState<DailyInsight | null>(null);
  const [luckyNumbers, setLuckyNumbers] = useState<number[]>([]);
  const [luckyColor, setLuckyColor] = useState<string>('');
  const [affirmation, setAffirmation] = useState<string>('');
  const [remedies, setRemedies] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGetStarted = () => {
    setCurrentScreen('form');
  };

  const handleBackToLanding = () => {
    setCurrentScreen('landing');
  };

  const handleBirthDetailsSubmit = async (details: {
    birthName: string;
    dateOfBirth: string;
    timeOfBirth: string;
    placeOfBirth: string;
  }) => {
    setLoading(true);
    setCurrentScreen('results');

    try {
      const birthDate = new Date(details.dateOfBirth);
      const sunSign = calculateSunSign(birthDate);
      const moonSign = getMoonSign(birthDate);
      const nakshatra = getNakshatra(birthDate);
      const dominantPlanet = getDominantPlanet(sunSign);
      const ascendant = sunSign;

      const { data: chartData, error: chartError } = await supabase
        .from('birth_charts')
        .insert({
          birth_name: details.birthName,
          date_of_birth: details.dateOfBirth,
          time_of_birth: details.timeOfBirth,
          place_of_birth: details.placeOfBirth,
          sun_sign: sunSign,
          moon_sign: moonSign,
          ascendant: ascendant,
          nakshatra: nakshatra.name,
          nakshatra_pada: nakshatra.pada,
          dominant_planet: dominantPlanet,
          chart_data: {
            planets: [],
            houses: []
          }
        })
        .select()
        .single();

      if (chartError) throw chartError;

      setCurrentChart(chartData);

      const suggestions = generateNameSuggestions(nakshatra, details.birthName);
      const nameNumerology = calculateNumerology(details.birthName);

      const nameSuggestionsData: NameSuggestion[] = [];
      for (let i = 0; i < suggestions.length; i++) {
        const suggestionNumerology = calculateNumerology(suggestions[i]);
        const { data: nameData, error: nameError } = await supabase
          .from('name_suggestions')
          .insert({
            birth_chart_id: chartData.id,
            suggested_name: suggestions[i],
            numerology_number: suggestionNumerology,
            favorable_syllables: nakshatra.syllables,
            reasoning: `This name resonates with your ${nakshatra.name} Nakshatra (Pada ${nakshatra.pada}) and carries the numerology number ${suggestionNumerology}, which harmonizes with cosmic energies.`
          })
          .select()
          .single();

        if (!nameError && nameData) {
          nameSuggestionsData.push(nameData);
        }
      }

      setNameSuggestions(nameSuggestionsData);

      const luckyNums = getLuckyNumbers(nameNumerology, birthDate);
      setLuckyNumbers(luckyNums);

      const color = getLuckyColor(dominantPlanet);
      setLuckyColor(color);

      const dailyAffirmation = getAffirmation(sunSign);
      setAffirmation(dailyAffirmation);

      const planetRemedies = getRemedies(dominantPlanet);
      setRemedies(planetRemedies);

      const today = new Date().toISOString().split('T')[0];
      const { data: insightData } = await supabase
        .from('daily_insights')
        .select()
        .eq('zodiac_sign', sunSign)
        .eq('date', today)
        .maybeSingle();

      if (insightData) {
        setDailyInsight(insightData);
      } else {
        const { data: newInsight } = await supabase
          .from('daily_insights')
          .insert({
            zodiac_sign: sunSign,
            date: today,
            horoscope_text: `Today brings positive energy for ${sunSign}. The cosmic alignment favors personal growth and new opportunities. Trust your intuition and embrace the day with confidence.`,
            lucky_numbers: luckyNums,
            lucky_color: color,
            affirmation: dailyAffirmation,
            dos: ['Stay focused on your goals', 'Express gratitude', 'Connect with loved ones'],
            donts: ['Avoid impulsive decisions', 'Don\'t dwell on the past', 'Avoid negative energy'],
            remedies: planetRemedies
          })
          .select()
          .single();

        if (newInsight) {
          setDailyInsight(newInsight);
        }
      }
    } catch (error) {
      console.error('Error generating chart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentChart(null);
    setNameSuggestions([]);
    setDailyInsight(null);
    setLuckyNumbers([]);
    setLuckyColor('');
    setAffirmation('');
    setRemedies([]);
    setCurrentScreen('landing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <CosmicBackground />

      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {currentScreen === 'landing' && (
            <LandingPage onGetStarted={handleGetStarted} />
          )}

          {currentScreen === 'form' && (
            <div className="flex items-center justify-center min-h-screen">
              <MultiStepForm onSubmit={handleBirthDetailsSubmit} onBack={handleBackToLanding} />
            </div>
          )}

          {currentScreen === 'results' && (
            <>
              {loading ? (
                <div className="flex items-center justify-center min-h-screen">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-lg">Calculating your cosmic blueprint...</p>
                  </div>
                </div>
              ) : currentChart ? (
                <div className="space-y-8 pb-12">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>New Reading</span>
                  </button>

                  <BirthChart chart={currentChart} />

                  {nameSuggestions.length > 0 && (
                    <div className="pt-8">
                      <NameSuggestions suggestions={nameSuggestions} />
                    </div>
                  )}

                  <div className="pt-8">
                    <DailyInsights
                      insight={dailyInsight}
                      luckyNumbers={luckyNumbers}
                      luckyColor={luckyColor}
                      affirmation={affirmation}
                      remedies={remedies}
                    />
                  </div>

                  <div className="text-center pt-8">
                    <button
                      onClick={handleReset}
                      className="px-8 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
                    >
                      Generate New Chart
                    </button>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
