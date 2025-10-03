import { useState, useCallback } from 'react';
import ContentGenerator from './ContentGenerator';

// Custom hook for managing Content Generator operations
export const useContentGenerator = () => {
  const [generatedContent, setGeneratedContent] = useState(null);
  const [designSuggestion, setDesignSuggestion] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [agent] = useState(() => new ContentGenerator());

  const generateContent = useCallback(async (employeeData) => {
    setIsGenerating(true);
    
    try {
      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate content and design suggestions
      const content = agent.generateCelebratoryText(employeeData);
      const design = agent.generateDesignSuggestion(employeeData);
      
      setGeneratedContent(content);
      setDesignSuggestion(design);
      
      return { content, design };
    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  }, [agent]);

  const clearContent = useCallback(() => {
    setGeneratedContent(null);
    setDesignSuggestion(null);
  }, []);

  const regenerateContent = useCallback(async (employeeData) => {
    return generateContent(employeeData);
  }, [generateContent]);

  return {
    generatedContent,
    designSuggestion,
    isGenerating,
    generateContent,
    clearContent,
    regenerateContent
  };
};

export default useContentGenerator;