import { NameSuggestion } from '../lib/supabase';
import { Wand2, Hash, Languages } from 'lucide-react';

interface NameSuggestionsProps {
  suggestions: NameSuggestion[];
}

export default function NameSuggestions({ suggestions }: NameSuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Cosmically Aligned Names</h2>
        <p className="text-gray-400 text-sm">Names that resonate with your birth chart</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suggestions.map((suggestion, index) => (
          <div
            key={suggestion.id}
            className="bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-xl p-5 backdrop-blur-sm hover:border-violet-500/40 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center">
                <Wand2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-gray-400">Option {index + 1}</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-3">{suggestion.suggested_name}</h3>

            {suggestion.numerology_number && (
              <div className="flex items-center gap-2 mb-2">
                <Hash className="w-4 h-4 text-violet-400" />
                <span className="text-sm text-gray-300">
                  Numerology: <span className="font-semibold text-violet-400">{suggestion.numerology_number}</span>
                </span>
              </div>
            )}

            {suggestion.favorable_syllables && suggestion.favorable_syllables.length > 0 && (
              <div className="flex items-start gap-2 mb-3">
                <Languages className="w-4 h-4 text-violet-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 mb-1">Favorable Syllables</p>
                  <div className="flex flex-wrap gap-1">
                    {suggestion.favorable_syllables.map((syllable, i) => (
                      <span key={i} className="px-2 py-0.5 bg-violet-500/20 text-violet-300 text-xs rounded">
                        {syllable}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {suggestion.reasoning && (
              <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                {suggestion.reasoning}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
