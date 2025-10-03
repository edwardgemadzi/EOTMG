// Copilot Agent - Intelligent Content Generator
// This module handles the generation of celebratory text, design suggestions, and platform-specific formatting

class CopilotAgent {
  constructor() {
    this.celebratoryEmojis = ['🌟', '🎉', '👏', '🏆', '💫', '🎊', '🚀', '💪', '✨', '🙌'];
    this.designThemes = [
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
  }

  // Generate celebratory post text based on employee data
  generateCelebratoryText(employeeData) {
    const { employeeName, role, achievements, month } = employeeData;
    
    // Base celebration templates
    const templates = [
      {
        opening: `🌟 Employee of the Month – ${month} 🌟`,
        body: `Congratulations to ${employeeName}, our brilliant ${role}, for ${this._formatAchievements(achievements)} 🚀.\nYour dedication inspires us all!`,
        closing: this._generateHashtags()
      },
      {
        opening: `🎉 Celebrating Excellence – ${month} 🎉`,
        body: `We're thrilled to recognize ${employeeName} (${role}) for their outstanding work in ${this._formatAchievements(achievements)}.\nThank you for making such a positive impact! 💪`,
        closing: this._generateHashtags()
      },
      {
        opening: `👏 Outstanding Achievement Alert! 👏`,
        body: `This ${month}, we're proud to celebrate ${employeeName}, our exceptional ${role}.\n${this._formatAchievements(achievements, true)}\nKeep up the amazing work! ✨`,
        closing: this._generateHashtags()
      }
    ];

    // Randomly select a template
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    return {
      employeeName,
      role,
      month,
      achievements,
      platforms: this._generatePlatformVariants(template, employeeData)
    };
  }

  // Generate design suggestions based on role and achievements
  generateDesignSuggestion(employeeData) {
    const { achievements } = employeeData;
    
    // Analyze content to suggest appropriate design
    let suggestedTheme;
    
    if (this._containsKeywords(achievements, ['innovation', 'creative', 'design', 'product'])) {
      suggestedTheme = this.designThemes[0]; // Modern Gradient
    } else if (this._containsKeywords(achievements, ['leadership', 'management', 'strategy'])) {
      suggestedTheme = this.designThemes[1]; // Corporate
    } else {
      suggestedTheme = this.designThemes[2]; // Celebration
    }

    return {
      theme: suggestedTheme.name,
      displayName: suggestedTheme.displayName,
      colors: suggestedTheme.colors,
      font: suggestedTheme.font,
      description: suggestedTheme.description,
      reasoning: this._explainDesignChoice(suggestedTheme, employeeData)
    };
  }

  // Generate platform-specific content variations
  _generatePlatformVariants(baseTemplate, employeeData) {
    
    return {
      linkedin: this._createLinkedInVersion(baseTemplate, employeeData),
      instagram: this._createInstagramVersion(baseTemplate, employeeData),
      twitter: this._createTwitterVersion(baseTemplate, employeeData),
      photo: this._createPhotoVersion(baseTemplate, employeeData),
      default: `${baseTemplate.opening}\n\n${baseTemplate.body}\n\n${baseTemplate.closing}`
    };
  }

  _createLinkedInVersion(template, _data) {
    return `${template.opening}\n\n${template.body}\n\n${template.closing}\n\n#Leadership #EmployeeOfTheMonth #Success #TeamWork #Excellence`;
  }

  _createInstagramVersion(template, _data) {
    const emojis = this._getRandomEmojis(3);
    return `${template.opening}\n\n${template.body}\n\n${emojis.join(' ')}\n\n#EmployeeOfTheMonth #Success #TeamWork #Celebration #WorkFamily`;
  }

  _createTwitterVersion(template, data) {
    // Shorter version for Twitter's character limit
    const shortBody = this._shortenForTwitter(template.body, data);
    return `${this._getRandomEmojis(1)[0]} Employee of the Month ${this._getRandomEmojis(1)[0]}\n\n${shortBody}\n\n#EmployeeOfTheMonth #Success #TeamWork`;
  }

  _createPhotoVersion(template, data) {
    // Concise version perfect for photo overlays and printed materials
    return `🌟 ${data.month} 🌟\n\n${data.employeeName}\n${data.role}\n\n${this._formatAchievements(data.achievements)}\n\n"${this._extractKeyQuote(template.body)}"\n\n#Shoutout #TeamWins #EmployeeOfTheMonth`;
  }

  // Helper methods
  _formatAchievements(achievements, detailed = false) {
    if (detailed) {
      return `Their remarkable achievements include: ${achievements.toLowerCase()}`;
    }
    
    // Simple formatting for achievements
    if (achievements.length > 100) {
      return achievements.substring(0, 100) + '...';
    }
    return achievements.toLowerCase();
  }

  _generateHashtags() {
    const commonTags = ['#EmployeeOfTheMonth', '#Success', '#TeamWork', '#Excellence'];
    const variableTags = ['#Leadership', '#Innovation', '#Dedication', '#Achievement', '#Inspiration'];
    
    // Select 2-3 variable tags randomly
    const selectedTags = this._shuffleArray(variableTags).slice(0, 3);
    
    return [...commonTags, ...selectedTags].join(' ');
  }

  _containsKeywords(text, keywords) {
    const lowerText = text.toLowerCase();
    return keywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
  }

  _explainDesignChoice(theme, _employeeData) {
    if (theme.name === 'modern-gradient') {
      return 'Selected for creative and innovative achievements';
    } else if (theme.name === 'corporate') {
      return 'Chosen for leadership and strategic accomplishments';
    } else {
      return 'Perfect for celebrating outstanding performance';
    }
  }

  _getRandomEmojis(count) {
    return this._shuffleArray(this.celebratoryEmojis).slice(0, count);
  }

  _shortenForTwitter(text, data) {
    const maxLength = 180; // Leave room for hashtags
    if (text.length <= maxLength) return text;
    
    // Create a shorter version
    return `Congrats to ${data.employeeName} (${data.role}) for amazing work this month! 🚀`;
  }

  _extractKeyQuote(text) {
    // Extract a meaningful short quote from the body text
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length === 0) return 'Outstanding performance recognized!';
    
    // Find the most impactful sentence (usually contains keywords)
    const impactfulSentence = sentences.find(s => 
      /dedication|inspire|outstanding|excellence|achievement|success/i.test(s)
    ) || sentences[0];
    
    // Trim to reasonable length for photo overlay
    const quote = impactfulSentence.trim();
    if (quote.length > 120) {
      return quote.substring(0, 117) + '...';
    }
    return quote;
  }

  _shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

export default CopilotAgent;