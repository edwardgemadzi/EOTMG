import React, { useState, useRef, useEffect, useCallback } from 'react';

const ImageUpload = ({ onImageSelect, selectedImage }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedImage]);

  // Handle file selection
  const handleFileSelect = useCallback((file) => {
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    } else {
      // Show toast notification instead of alert
      const showToast = (message) => {
        const toast = document.createElement('div');
        toast.style.cssText = `
          position: fixed; top: 20px; right: 20px; padding: 12px 24px;
          border-radius: 8px; color: white; font-weight: 500; z-index: 10000;
          background: #EF4444; transform: translateX(100%); transition: transform 0.3s ease;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.style.transform = 'translateX(0)', 100);
        setTimeout(() => {
          toast.style.transform = 'translateX(100%)';
          setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
      };
      showToast('Please select a valid image file (PNG, JPG, GIF, etc.)');
    }
  }, [onImageSelect]);

  // Handle file input change
  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set drag over to false if leaving the drop zone entirely
    if (!dropZoneRef.current?.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleFileSelect(imageFile);
    }
  };

  // Handle paste functionality
  const handlePaste = useCallback(async (e) => {
    e.preventDefault();
    
    const items = Array.from(e.clipboardData.items);
    const imageItem = items.find(item => item.type.startsWith('image/'));
    
    if (imageItem) {
      const file = imageItem.getAsFile();
      if (file) {
        handleFileSelect(file);
      }
    }
  }, [handleFileSelect]);

  // Set up paste event listener
  useEffect(() => {
    const handleGlobalPaste = (e) => {
      // Only handle paste if the drop zone is focused or if no other input is focused
      const activeElement = document.activeElement;
      const isInputFocused = activeElement && (
        activeElement.tagName === 'INPUT' || 
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.contentEditable === 'true'
      );
      
      if (!isInputFocused || dropZoneRef.current?.contains(activeElement)) {
        handlePaste(e);
      }
    };

    document.addEventListener('paste', handleGlobalPaste);
    return () => document.removeEventListener('paste', handleGlobalPaste);
  }, [handlePaste]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Employee Photo (Optional)
      </label>
      
      {/* Drop Zone */}
      <div
        ref={dropZoneRef}
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${
          isDragOver
            ? 'border-primary-500 bg-primary-50'
            : selectedImage
            ? 'border-green-300 bg-green-50'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        {previewUrl ? (
          // Image Preview
          <div className="relative">
            <img
              src={previewUrl}
              alt="Employee preview"
              className="mx-auto max-h-32 rounded-lg object-cover"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
              title="Remove image"
            >
              ×
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Click to change or drop a new image
            </p>
          </div>
        ) : (
          // Upload Prompt
          <div>
            {isDragOver ? (
              <div className="text-primary-600">
                <svg className="mx-auto h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-lg font-medium">Drop image here</p>
              </div>
            ) : (
              <div className="text-gray-500">
                <svg className="mx-auto h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-lg font-medium mb-1">Upload Employee Photo</p>
                <p className="text-sm">
                  <span className="font-medium">Click to browse</span> or drag and drop
                </p>
                <p className="text-xs mt-1">
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
                    Ctrl+V
                  </kbd> to paste from clipboard
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {/* File info */}
      {selectedImage && (
        <div className="text-xs text-gray-500 bg-gray-50 rounded p-2">
          <strong>File:</strong> {selectedImage.name} ({(selectedImage.size / 1024 / 1024).toFixed(2)} MB)
        </div>
      )}
      
      {/* Instructions */}
      <div className="text-xs text-gray-500">
        <p>💡 <strong>Pro tips:</strong></p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Drag & drop images directly onto the upload area</li>
          <li>Copy an image and paste with <kbd className="px-1 bg-gray-200 rounded">Ctrl+V</kbd> (or <kbd className="px-1 bg-gray-200 rounded">Cmd+V</kbd> on Mac)</li>
          <li>Supports PNG, JPG, GIF, and WebP formats</li>
          <li>Recommended: Square images work best for social media posts</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUpload;