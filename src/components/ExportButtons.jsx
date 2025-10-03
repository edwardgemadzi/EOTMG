  const formatCaptionLabel = (platformId) => {
    if (!platformId) return 'selected';
    const mapping = {
      linkedin: 'LinkedIn',
      instagram: 'Instagram',
      twitter: 'Twitter',
      photo: 'Photo Caption'
    };
    return mapping[platformId] || platformId;
  };

import React from 'react';
import { exportToPDF, exportToImage, copyToClipboard } from '../utils/exportUtils';

const ExportButtons = ({
  generatedContent,
  designSuggestion,
  selectedPlatform = 'linkedin',
  captionPlatform = 'instagram',
  employeePhoto = null
}) => {
  if (!generatedContent) {
    return null;
  }

  const handleExportPDF = () => {
    exportToPDF(generatedContent, designSuggestion, employeePhoto, captionPlatform);
  };

  const handleExportImage = (format = 'png') => {
    exportToImage(generatedContent, designSuggestion, format, employeePhoto, captionPlatform);
  };

  const handleCopyText = () => {
    const text = generatedContent.platforms[selectedPlatform] || generatedContent.platforms.default;
    copyToClipboard(text);
  };

  const exportOptions = [
    {
      label: 'Copy Text',
      icon: '📋',
      action: handleCopyText,
      description: 'Copy post text to clipboard'
    },
    {
      label: 'Download PNG',
      icon: '🖼️',
      action: () => handleExportImage('png'),
  description: employeePhoto ? `Split layout with ${formatCaptionLabel(captionPlatform)} caption` : 'Download as PNG image'
    },
    {
      label: 'Download JPG',
      icon: '📸',
      action: () => handleExportImage('jpg'),
  description: employeePhoto ? `Split layout with ${formatCaptionLabel(captionPlatform)} caption` : 'Download as JPG image'
    },
    {
      label: 'Export PDF',
      icon: '📄',
      action: handleExportPDF,
      description: 'Export as PDF certificate'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Export Options</h3>
      
      <div className="space-y-3">
        {exportOptions.map((option, index) => (
          <button
            key={index}
            onClick={option.action}
            className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{option.icon}</span>
              <div className="text-left">
                <div className="font-medium text-gray-800 group-hover:text-primary-700">
                  {option.label}
                </div>
                <div className="text-sm text-gray-500">
                  {option.description}
                </div>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-2">
          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Quick Tips:</p>
            <ul className="text-xs space-y-1">
              <li>• Copy text for immediate posting</li>
              <li>• Use PNG for web sharing</li>
              <li>• Use JPG for smaller file sizes</li>
              <li>• PDF is perfect for printing</li>
              {employeePhoto && (
                <li>• <strong>Images include Instagram caption + photo layout</strong></li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportButtons;