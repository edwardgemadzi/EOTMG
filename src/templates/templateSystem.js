// Design Templates for Employee of the Month Generation
// Each template defines visual styling, layout, and platform-specific configurations

export const designTemplates = {
  'modern-gradient': {
    name: 'Modern Gradient',
    description: 'Contemporary gradient design with clean typography',
    colors: {
      primary: '#8B5CF6', // Purple
      secondary: '#3B82F6', // Blue
      accent: '#F59E0B', // Amber
      text: '#FFFFFF',
      background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)'
    },
    fonts: {
      heading: 'Poppins, sans-serif',
      body: 'Inter, sans-serif'
    },
    layout: {
      padding: '2rem',
      borderRadius: '1rem',
      shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    elements: {
      showBadge: true,
      showBorder: false,
      iconStyle: 'gradient',
      textAlign: 'center'
    }
  },

  'corporate': {
    name: 'Corporate Professional',
    description: 'Clean, professional corporate style',
    colors: {
      primary: '#1F2937', // Gray-800
      secondary: '#F59E0B', // Amber
      accent: '#EF4444', // Red
      text: '#FFFFFF',
      background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)'
    },
    fonts: {
      heading: 'Arial, sans-serif',
      body: 'Arial, sans-serif'
    },
    layout: {
      padding: '2.5rem',
      borderRadius: '0.5rem',
      shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    },
    elements: {
      showBadge: true,
      showBorder: true,
      iconStyle: 'solid',
      textAlign: 'left'
    }
  },

  'celebration': {
    name: 'Festive Celebration',
    description: 'Vibrant, celebratory design with energy',
    colors: {
      primary: '#F59E0B', // Amber
      secondary: '#F97316', // Orange
      accent: '#EF4444', // Red
      text: '#FFFFFF',
      background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)'
    },
    fonts: {
      heading: 'Poppins, sans-serif',
      body: 'Poppins, sans-serif'
    },
    layout: {
      padding: '2rem',
      borderRadius: '1.5rem',
      shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    elements: {
      showBadge: true,
      showBorder: false,
      iconStyle: 'festive',
      textAlign: 'center'
    }
  }
};

export const platformTemplates = {
  linkedin: {
    name: 'LinkedIn',
    dimensions: { width: 1200, height: 630 },
    characterLimit: 3000,
    hashtagStrategy: 'professional',
    contentStyle: 'formal',
    includeCompanyBranding: true,
    preferredEmojis: ['🌟', '🏆', '💼', '🚀', '👏'],
    formatRules: {
      useLineBreaks: true,
      includeCTA: true,
      mentionPolicy: 'encouraged'
    }
  },

  instagram: {
    name: 'Instagram',
    dimensions: { width: 1080, height: 1080 },
    characterLimit: 2200,
    hashtagStrategy: 'trending',
    contentStyle: 'casual',
    includeCompanyBranding: true,
    preferredEmojis: ['🎉', '✨', '💫', '🙌', '🎊', '💪'],
    formatRules: {
      useLineBreaks: true,
      includeCTA: false,
      mentionPolicy: 'hashtags'
    }
  },

  twitter: {
    name: 'Twitter',
    dimensions: { width: 1200, height: 675 },
    characterLimit: 280,
    hashtagStrategy: 'minimal',
    contentStyle: 'concise',
    includeCompanyBranding: false,
    preferredEmojis: ['🌟', '🎉', '👏', '🚀'],
    formatRules: {
      useLineBreaks: false,
      includeCTA: false,
      mentionPolicy: 'mentions'
    }
  },

  photo: {
    name: 'Photo Caption',
    dimensions: { width: 1080, height: 1080 },
    characterLimit: 200,
    hashtagStrategy: 'minimal',
    contentStyle: 'concise',
    includeCompanyBranding: true,
    preferredEmojis: ['🌟', '🏆', '✨', '🎯'],
    formatRules: {
      useLineBreaks: true,
      includeCTA: false,
      mentionPolicy: 'first-names'
    }
  }
};

export const contentStructures = {
  announcement: {
    sections: ['header', 'employee-info', 'achievements', 'call-to-action', 'hashtags'],
    tone: 'celebratory',
    length: 'medium'
  },
  
  certificate: {
    sections: ['title', 'employee-name', 'achievement-details', 'date', 'signature'],
    tone: 'formal',
    length: 'short'
  },
  
  'social-post': {
    sections: ['hook', 'employee-highlight', 'achievements', 'hashtags'],
    tone: 'engaging',
    length: 'short'
  }
};

// Helper function to get template by theme name
export const getTemplateByTheme = (themeName) => {
  return designTemplates[themeName] || designTemplates['modern-gradient'];
};

// Helper function to get platform configuration
export const getPlatformConfig = (platformName) => {
  return platformTemplates[platformName] || platformTemplates['linkedin'];
};

// Helper function to generate CSS styles from template
export const generateCSSFromTemplate = (template) => {
  return {
    background: template.colors.background,
    color: template.colors.text,
    fontFamily: template.fonts.heading,
    padding: template.layout.padding,
    borderRadius: template.layout.borderRadius,
    boxShadow: template.layout.shadow,
    textAlign: template.elements.textAlign
  };
};

export default {
  designTemplates,
  platformTemplates,
  contentStructures,
  getTemplateByTheme,
  getPlatformConfig,
  generateCSSFromTemplate
};