import React, { useState, useEffect } from 'react';

const PreviewPanel = ({
  generatedContent,
  designSuggestion,
  selectedPlatform,
  onPlatformChange,
  captionPlatform,
  onCaptionPlatformChange,
  employeePhoto
}) => {
  const [currentPlatform, setCurrentPlatform] = useState(selectedPlatform || 'linkedin');
  const [photoUrl, setPhotoUrl] = useState(null);

  // Create object URL for employee photo
  useEffect(() => {
    if (employeePhoto) {
      const url = URL.createObjectURL(employeePhoto);
      setPhotoUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPhotoUrl(null);
    }
  }, [employeePhoto]);

  useEffect(() => {
    if (selectedPlatform && selectedPlatform !== currentPlatform) {
      setCurrentPlatform(selectedPlatform);
    }
  }, [selectedPlatform, currentPlatform]);

  const availableCaptionPlatforms = Object.keys(generatedContent?.platforms || {});
  const fallbackCaptionPlatform = availableCaptionPlatforms.includes('instagram')
    ? 'instagram'
    : availableCaptionPlatforms[0] || currentPlatform;
  const resolvedCaptionPlatform = captionPlatform || fallbackCaptionPlatform;
  const currentCaptionPlatform = availableCaptionPlatforms.includes(resolvedCaptionPlatform)
    ? resolvedCaptionPlatform
    : fallbackCaptionPlatform;

  const platforms = [
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
    { id: 'instagram', name: 'Instagram', icon: '📸' },
    { id: 'twitter', name: 'Twitter', icon: '🐦' },
    { id: 'photo', name: 'Photo Caption', icon: '�️' }
  ];

  useEffect(() => {
    if (onCaptionPlatformChange && currentCaptionPlatform !== captionPlatform) {
      onCaptionPlatformChange(currentCaptionPlatform);
    }
  }, [currentCaptionPlatform, captionPlatform, onCaptionPlatformChange]);

  if (!generatedContent) {
    return (
      <div className="bg-gray-50 rounded-lg shadow-lg p-6 max-w-2xl w-full">
        <div className="text-center text-gray-500 py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <p className="text-lg">Fill out the form to generate your Employee of the Month content</p>
        </div>
      </div>
    );
  }

  const getStyleClasses = () => {
    if (!designSuggestion) return '';
    
    const themeName = designSuggestion.theme || designSuggestion.name;
    
    if (themeName === 'modern-gradient') {
      return 'bg-gradient-to-br from-purple-500 to-blue-600 text-white';
    } else if (themeName === 'corporate') {
      return 'bg-gray-800 text-white';
    } else if (themeName === 'celebration') {
      return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
    }
    
    return 'bg-blue-600 text-white';
  };

  const monthLabel = generatedContent.month || 'Employee Spotlight';
  const roleLabel = generatedContent.role || 'Outstanding Contributor';
  const achievementsHighlight = generatedContent.achievements || generatedContent.highlights || generatedContent.summary || 'Recognized for exceptional dedication and impact across the team.';
  const captionText = generatedContent.platforms?.[currentCaptionPlatform] || generatedContent.platforms?.default || '';

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Content Preview</h2>
        
        <div className="flex space-x-2">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => {
                setCurrentPlatform(platform.id);
                onPlatformChange && onPlatformChange(platform.id);
              }}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPlatform === platform.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {platform.icon} {platform.name}
            </button>
          ))}
        </div>
      </div>

      {/* Design Suggestion */}
      {designSuggestion && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Design Suggestion</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span><strong>Theme:</strong> {designSuggestion.displayName || designSuggestion.theme || designSuggestion.name}</span>
            <span><strong>Colors:</strong> {designSuggestion.colors}</span>
            <span><strong>Font:</strong> {designSuggestion.font}</span>
          </div>
        </div>
      )}

      {/* Content Preview */}
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-800 mb-3">
            {platforms.find(p => p.id === currentPlatform)?.name} Version
          </h4>
          
          {/* Visual Card Preview */}
          {photoUrl && availableCaptionPlatforms.length > 0 && (
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest text-gray-400">Caption Source</span>
              <div className="flex flex-wrap gap-2">
                {availableCaptionPlatforms.map((platformId) => (
                  <button
                    key={platformId}
                    onClick={() => onCaptionPlatformChange && onCaptionPlatformChange(platformId)}
                    className={`px-2 py-1 rounded-full text-xs font-medium transition-colors border ${
                      currentCaptionPlatform === platformId
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-primary-400'
                    }`}
                  >
                    {platforms.find((p) => p.id === platformId)?.name || platformId}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={`rounded-2xl shadow-xl mb-4 overflow-hidden ${photoUrl ? '' : getStyleClasses()}`} style={{
            fontFamily: designSuggestion?.font === 'Poppins' ? 'Poppins, sans-serif' : 'inherit',
            minHeight: photoUrl ? '260px' : undefined
          }}>
            {photoUrl ? (
              <div className="flex h-full">
                <div className={`relative flex flex-col justify-between flex-1 p-6 overflow-hidden ${getStyleClasses()}`}>
                  <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-28 -right-10 w-56 h-56 bg-white/5 rounded-full blur-3xl"></div>
                  <div className="relative space-y-4">
                    <div className="flex items-center gap-3 text-sm uppercase tracking-[0.4em] text-white/60">
                      <span>✨</span>
                      <span>{monthLabel}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold leading-tight">{generatedContent.employeeName}</h3>
                      <p className="text-sm text-white/80 mt-1 font-medium">{roleLabel}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                      <p className="text-xs text-white/90 leading-relaxed">
                        {achievementsHighlight}
                      </p>
                    </div>
                  </div>
                  <div className="relative bg-slate-900/60 border border-white/10 rounded-2xl p-4 mt-6">
                    <p className="text-2xl leading-none mb-2">“</p>
                    <p className="text-xs text-white/85 leading-relaxed whitespace-pre-wrap">
                      {captionText}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-white/60 font-semibold">
                      <span>#Shoutout</span>
                      <span>#TeamWins</span>
                      <span>#EmployeeOfTheMonth</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 relative min-h-full">
                  <img
                    src={photoUrl}
                    alt="Employee"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/40"></div>
                  <div className="absolute bottom-6 right-6 bg-white text-slate-900 text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <span>📸</span>
                    <span>Team Spotlight</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-6">
                <div className="text-3xl mb-2">🌟</div>
                <h3 className="text-2xl font-bold mb-3">Employee of the Month</h3>
                <p className="text-lg opacity-90">{generatedContent.employeeName}</p>
                <p className="text-sm opacity-75">{generatedContent.role}</p>
              </div>
            )}
          </div>
          
          {/* Text Content */}
          <div className="bg-gray-50 rounded-lg p-4">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
              {generatedContent.platforms[currentPlatform] || generatedContent.platforms.default}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;