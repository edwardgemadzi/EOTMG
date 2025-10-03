import React, { useState, useEffect } from 'react';
import EmployeeForm from './components/EmployeeForm';
import PreviewPanel from './components/PreviewPanel';
import ExportButtons from './components/ExportButtons';
import ThemeSelector from './components/ThemeSelector';
import { useContentGenerator } from './generator/useContentGenerator';
import './App.css';

// Available design themes
const AVAILABLE_THEMES = [
  {
    name: 'modern-gradient',
    displayName: 'Modern Gradient',
    colors: 'Purple → Blue',
    font: 'Poppins',
    description: 'Contemporary gradient design with clean typography'
  },
  {
    name: 'corporate',
    displayName: 'Corporate Professional',
    colors: 'Navy & Gold',
    font: 'Arial',
    description: 'Clean, professional corporate style'
  },
  {
    name: 'celebration',
    displayName: 'Festive Celebration',
    colors: 'Yellow → Orange',
    font: 'Poppins',
    description: 'Vibrant, celebratory design with energy'
  }
];

function App() {
  const {
    generatedContent,
    designSuggestion,
    isGenerating,
    generateContent,
    clearContent,
    regenerateContent
  } = useContentGenerator();

  const [selectedPlatform, setSelectedPlatform] = useState('linkedin');
  const [selectedCaptionPlatform, setSelectedCaptionPlatform] = useState('instagram');
  const [employeeData, setEmployeeData] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null); // null means use AI suggestion

  useEffect(() => {
    if (!generatedContent?.platforms) {
      return;
    }

    const availablePlatforms = Object.keys(generatedContent.platforms);
    if (!availablePlatforms.length) {
      return;
    }

    if (!availablePlatforms.includes(selectedCaptionPlatform)) {
      const fallbackPlatform = availablePlatforms.includes('instagram')
        ? 'instagram'
        : availablePlatforms[0];
      setSelectedCaptionPlatform(fallbackPlatform);
    }
  }, [generatedContent, selectedCaptionPlatform]);

  const handleFormSubmit = async (formData) => {
    try {
      setEmployeeData(formData); // Store the form data including photo
      await generateContent(formData);
      // Reset theme selection to use AI suggestion for new content
      setSelectedTheme(null);
    } catch (error) {
      console.error('Failed to generate content:', error);
      // You could add error handling UI here
    }
  };

  const handleRegenerate = async (formData) => {
    if (formData) {
      await regenerateContent(formData);
      // Reset theme selection to use AI suggestion
      setSelectedTheme(null);
    }
  };

  const handleClear = () => {
    clearContent();
    setSelectedTheme(null);
  };

  const handleThemeChange = (themeName) => {
    setSelectedTheme(themeName);
  };

  // Get the active design suggestion (user selection overrides AI suggestion)
  const activeDesignSuggestion = selectedTheme 
    ? AVAILABLE_THEMES.find(t => t.name === selectedTheme)
    : designSuggestion;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🏆 Employee of the Month Generator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Generate professional, ready-to-post Employee of the Month content with intelligent design suggestions and multi-platform export options.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Input Form */}
          <div className="lg:col-span-1">
            <EmployeeForm onFormSubmit={handleFormSubmit} />
            
            {/* Action Buttons */}
            {generatedContent && (
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => handleRegenerate(generatedContent)}
                  disabled={isGenerating}
                  className="w-full bg-secondary-600 text-white py-2 px-4 rounded-md hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 transition duration-200 font-medium disabled:opacity-50"
                >
                  {isGenerating ? 'Regenerating...' : '🔄 Regenerate Content'}
                </button>
                
                <button
                  onClick={handleClear}
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-200 font-medium"
                >
                  🗑️ Clear All
                </button>
              </div>
            )}
          </div>

          {/* Center Column - Preview */}
          <div className="lg:col-span-2">
            {isGenerating ? (
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
                <div className="animate-pulse">
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-primary-700 font-medium">Generating content...</span>
                      </div>
                      <p className="mt-4 text-gray-500">Our AI is crafting the perfect Employee of the Month content</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : generatedContent ? (
              <>
                {/* Theme Selector */}
                <ThemeSelector
                  selectedTheme={selectedTheme || designSuggestion?.theme}
                  onThemeChange={handleThemeChange}
                  availableThemes={AVAILABLE_THEMES}
                />
                
                {/* Preview Panel */}
                <PreviewPanel 
                  generatedContent={generatedContent} 
                  designSuggestion={activeDesignSuggestion}
                  selectedPlatform={selectedPlatform}
                  onPlatformChange={setSelectedPlatform}
                  captionPlatform={selectedCaptionPlatform}
                  onCaptionPlatformChange={setSelectedCaptionPlatform}
                  employeePhoto={employeeData?.photo}
                />
              </>
            ) : (
              <PreviewPanel 
                generatedContent={generatedContent} 
                designSuggestion={designSuggestion}
                selectedPlatform={selectedPlatform}
                onPlatformChange={setSelectedPlatform}
                captionPlatform={selectedCaptionPlatform}
                onCaptionPlatformChange={setSelectedCaptionPlatform}
                employeePhoto={employeeData?.photo}
              />
            )}
          </div>
        </div>

        {/* Bottom Section - Export Options */}
        {generatedContent && !isGenerating && (
          <div className="mt-8 flex justify-center">
            <ExportButtons 
              generatedContent={generatedContent}
              designSuggestion={activeDesignSuggestion}
              selectedPlatform={selectedPlatform}
              captionPlatform={selectedCaptionPlatform}
              employeePhoto={employeeData?.photo}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p className="mb-2">
              Built with ❤️ using React + Vite + Tailwind CSS
            </p>
            <p className="text-sm">
              Generate professional Employee of the Month content in seconds • Multiple export formats • AI-powered design suggestions
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;