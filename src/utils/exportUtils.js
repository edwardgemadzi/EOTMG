import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Simple toast notification function
const showToast = (message, type = 'info') => {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 24px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    ${type === 'success' ? 'background: #10B981;' : 
      type === 'error' ? 'background: #EF4444;' : 
      'background: #3B82F6;'}
  `;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 3000);
};

// Create export element for image generation
const createExportElement = async (
  generatedContent,
  designSuggestion,
  employeePhoto = null,
  captionPlatform = 'instagram'
) => {
  const element = document.createElement('div');
  
  // Get design theme styles
  const getThemeStyles = () => {
    if (!designSuggestion) {
      return 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)';
    }
    
    const themeName = designSuggestion.theme || designSuggestion.name;
    
    if (themeName === 'modern-gradient') {
      return 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)';
    } else if (themeName === 'corporate') {
      return 'linear-gradient(135deg, #1F2937 0%, #374151 100%)';
    } else if (themeName === 'celebration') {
      return 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)';
    }
    
    return 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)';
  };

  // Convert employee photo to data URL if provided
  let photoDataUrl = null;
  if (employeePhoto) {
    photoDataUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(employeePhoto);
    });
  }

  const hasPhoto = !!photoDataUrl;
  const themeGradient = getThemeStyles();
  
  element.style.cssText = `
    width: 672px;
    min-height: 336px;
    height: auto;
    ${hasPhoto ? 'padding: 0;' : 'padding: 40px;'}
    background: ${hasPhoto ? '#0F172A' : themeGradient};
    color: ${hasPhoto ? 'white' : 'white'};
    font-family: 'Poppins', sans-serif;
    display: flex;
    ${hasPhoto ? 'flex-direction: row;' : 'flex-direction: column;'}
    align-items: ${hasPhoto ? 'stretch' : 'center'};
    justify-content: ${hasPhoto ? 'stretch' : 'center'};
    text-align: ${hasPhoto ? 'left' : 'center'};
    border-radius: 20px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    position: absolute;
    top: -10000px;
    left: -10000px;
    overflow: hidden;
  `;

  if (hasPhoto) {
    // Get current platform caption text (matching preview panel behavior)
    const captionText = generatedContent.platforms?.[captionPlatform] || generatedContent.platforms?.default || '';
    
    const monthLabel = generatedContent.month || 'Employee Spotlight';
    const roleLabel = generatedContent.role || 'Outstanding Contributor';
    const achievementsHighlight = generatedContent.achievements || generatedContent.highlights || generatedContent.summary || 'Recognized for exceptional dedication and impact across the team.';

    // Two-section layout matching PreviewPanel.jsx exactly
    element.innerHTML = `
      <div style="
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 24px;
        position: relative;
        overflow: hidden;
        background: ${themeGradient};
      ">
        <div style="position: absolute; top: -96px; left: -96px; width: 256px; height: 256px; background: rgba(255, 255, 255, 0.1); border-radius: 9999px; filter: blur(48px);"></div>
        <div style="position: absolute; bottom: -112px; right: -40px; width: 224px; height: 224px; background: rgba(255, 255, 255, 0.05); border-radius: 9999px; filter: blur(48px);"></div>
        
        <div style="position: relative; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 12px; text-transform: uppercase; letter-spacing: 0.4em; font-size: 14px; color: rgba(255, 255, 255, 0.6); margin-bottom: 16px;">
            <span>✨</span>
            <span>${monthLabel}</span>
          </div>
          
          <div style="margin-bottom: 16px;">
            <h3 style="font-size: 24px; font-weight: 600; line-height: 1.25; margin: 0 0 4px 0; text-align: left;">${generatedContent.employeeName}</h3>
            <p style="font-size: 14px; color: rgba(255, 255, 255, 0.8); font-weight: 500; margin: 0; text-align: left;">${roleLabel}</p>
          </div>
          
          <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(4px); border-radius: 16px; padding: 16px;">
            <p style="font-size: 12px; color: rgba(255, 255, 255, 0.9); line-height: 1.6; margin: 0; text-align: left;">
              ${achievementsHighlight}
            </p>
          </div>
        </div>
                
        <div style="position: relative; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 16px;">
          <p style="font-size: 24px; line-height: 1; margin: 0 0 8px 0; text-align: left;">"</p>
          <p style="font-size: 12px; color: rgba(255, 255, 255, 0.85); line-height: 1.5; margin: 0 0 12px 0; white-space: pre-wrap; text-align: left;">
            ${captionText}
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; font-size: 10px; color: rgba(255, 255, 255, 0.6); font-weight: 600; margin-top: 12px;">
            <span>#Shoutout</span>
            <span>#TeamWins</span>
            <span>#EmployeeOfTheMonth</span>
          </div>
        </div>
      </div>

      <div style="flex: 1; position: relative; min-height: 100%;">
        <img src="${photoDataUrl}" style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        " alt="Employee" />
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to left, transparent 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%);
        "></div>
        <div style="position: absolute; bottom: 24px; right: 24px; background: white; color: #0F172A; font-size: 12px; font-weight: 600; padding: 8px 16px; border-radius: 9999px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); display: flex; align-items: center; gap: 8px;">
          <span>📸</span>
          <span>Team Spotlight</span>
        </div>
      </div>
    `;
  } else {
    // Original layout without photo
    element.innerHTML = `
      <div style="font-size: 72px; margin-bottom: 30px;">🏆</div>
      <h1 style="font-size: 48px; font-weight: bold; margin: 0 0 15px 0;">Employee of the Month</h1>
      <h2 style="font-size: 36px; margin: 0 0 15px 0;">${generatedContent.employeeName}</h2>
      <p style="font-size: 24px; margin: 0 0 30px 0; opacity: 0.9;">${generatedContent.role}</p>
      <p style="font-size: 18px; margin: 0 0 40px 0; opacity: 0.8; max-width: 800px; line-height: 1.5;">${generatedContent.achievements}</p>
      <p style="font-size: 24px; margin: 0; font-weight: bold;">${generatedContent.month}</p>
    `;
  }

  return element;
};

// Copy text to clipboard
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      showToast('Text copied to clipboard!', 'success');
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      showToast('Text copied to clipboard!', 'success');
    }
  } catch (error) {
    console.error('Failed to copy text:', error);
    showToast('Failed to copy text. Please try again.', 'error');
  }
};

// Generate and download image (PNG/JPG)
export const exportToImage = async (
  generatedContent,
  designSuggestion,
  format = 'png',
  employeePhoto = null,
  captionPlatform = 'instagram'
) => {
  try {
    const element = await createExportElement(
      generatedContent,
      designSuggestion,
      employeePhoto,
      captionPlatform
    );
    document.body.appendChild(element);

    const rect = element.getBoundingClientRect();
    const exportWidth = Math.ceil(rect.width);
    const exportHeight = Math.ceil(rect.height);
    const scaleFactor = Math.max(2, Math.min(3, window.devicePixelRatio || 2));

    const canvas = await html2canvas(element, {
      width: exportWidth,
      height: exportHeight,
      scale: scaleFactor,
      backgroundColor: null,
      logging: false,
      useCORS: true,
      allowTaint: true
    });

    document.body.removeChild(element);

    // Convert canvas to blob and download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `${generatedContent.employeeName.replace(/\s+/g, '_')}_Employee_of_the_Month.${format}`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      
      showToast(`${format.toUpperCase()} exported successfully!`, 'success');
    }, `image/${format}`, 0.95);

  } catch (error) {
    console.error('Failed to export image:', error);
    showToast('Failed to export image. Please try again.', 'error');
  }
};

// Export content to PDF format
export const exportToPDF = async (
  generatedContent,
  designSuggestion,
  employeePhoto = null,
  captionPlatform = 'instagram'
) => {
  try {
    // If photo is provided, render the styled visual and embed it
    if (employeePhoto) {
      const exportElement = await createExportElement(
        generatedContent,
        designSuggestion,
        employeePhoto,
        captionPlatform
      );
      document.body.appendChild(exportElement);
      
      const canvas = await html2canvas(exportElement, {
        scale: 2,
        backgroundColor: null,
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      
      document.body.removeChild(exportElement);
      
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      // Calculate dimensions to fit the image properly
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 20; // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const xOffset = 10;
      const yOffset = (pdfHeight - imgHeight) / 2;
      
      pdf.addImage(imgData, 'JPEG', xOffset, yOffset, imgWidth, imgHeight);
      pdf.save(`${generatedContent.employeeName.replace(/\s+/g, '_')}_Employee_of_the_Month.pdf`);
      
      showToast('PDF exported successfully!', 'success');
      return;
    }

    // Fallback text-only PDF when no photo is provided
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Add title
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('🏆 Employee of the Month Certificate', 148, 30, { align: 'center' });

    // Add employee name
    pdf.setFontSize(20);
    pdf.text(generatedContent.employeeName, 148, 50, { align: 'center' });

    // Add role
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Role: ${generatedContent.role}`, 148, 65, { align: 'center' });

    // Add achievements
    pdf.setFontSize(12);
    const achievements = pdf.splitTextToSize(`Achievements: ${generatedContent.achievements}`, 250);
    pdf.text(achievements, 148, 85, { align: 'center' });

    // Add month
    pdf.setFontSize(14);
    pdf.text(`Month: ${generatedContent.month}`, 148, 130, { align: 'center' });

    let nextY = 145;

    // Add caption selection if available
    const captionText = generatedContent.platforms?.[captionPlatform] || generatedContent.platforms?.default;
    if (captionText) {
      pdf.setFontSize(10);
      const captionLines = pdf.splitTextToSize(`Caption (${captionPlatform}): ${captionText}`, 250);
      pdf.text(captionLines, 148, nextY, { align: 'center' });
      nextY += captionLines.length * 5 + 8;
    }

    // Add design theme info
    if (designSuggestion) {
      pdf.setFontSize(10);
      pdf.text(`Design Theme: ${designSuggestion.displayName}`, 148, nextY, { align: 'center' });
      nextY += 15;
    }

    // Add footer
    pdf.setFontSize(8);
    pdf.text('Generated by Employee of the Month Generator', 148, Math.max(nextY, 190), { align: 'center' });

    // Download the PDF
    pdf.save(`${generatedContent.employeeName.replace(/\s+/g, '_')}_Employee_of_the_Month.pdf`);
    
    showToast('PDF exported successfully!', 'success');
  } catch (error) {
    console.error('Error exporting PDF:', error);
    showToast('Error exporting PDF. Please try again.', 'error');
  }
};

export default {
  exportToPDF,
  exportToImage,
  copyToClipboard
};