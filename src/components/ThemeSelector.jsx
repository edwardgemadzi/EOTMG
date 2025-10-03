import React from 'react';

const ThemeSelector = ({ selectedTheme, onThemeChange, availableThemes }) => {
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Choose Design Theme</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {availableThemes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => onThemeChange(theme.name)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedTheme === theme.name
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            {/* Visual Preview */}
            <div
              className="h-16 rounded-md mb-3 flex items-center justify-center text-white font-bold"
              style={{ background: getThemeGradient(theme.name) }}
            >
              <span className="text-sm">{theme.displayName}</span>
            </div>

            {/* Theme Details */}
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-700">{theme.colors}</p>
              <p className="text-xs text-gray-500">{theme.font}</p>
              <p className="text-xs text-gray-600 mt-2">{theme.description}</p>
            </div>

            {/* Selected Indicator */}
            {selectedTheme === theme.name && (
              <div className="mt-3 flex items-center text-blue-600">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs font-medium">Selected</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Helper function to get theme gradient
const getThemeGradient = (themeName) => {
  const gradients = {
    'modern-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
    'corporate': 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
    'celebration': 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)'
  };
  return gradients[themeName] || gradients['modern-gradient'];
};

export default ThemeSelector;
