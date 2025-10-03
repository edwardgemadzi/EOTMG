import React, { useState } from 'react';
import ImageUpload from './ImageUpload';

const EmployeeForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    role: '',
    achievements: '',
    month: '',
    photo: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageSelect = (file) => {
    setFormData(prev => ({
      ...prev,
      photo: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.employeeName && formData.role && formData.achievements && formData.month) {
      onFormSubmit(formData);
    }
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Employee Details
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div>
          <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700 mb-1">
            Employee Name *
          </label>
          <input
            type="text"
            id="employeeName"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter employee name"
            required
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Role/Position *
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g., Software Engineer"
            required
          />
        </div>

        <div>
          <label htmlFor="achievements" className="block text-sm font-medium text-gray-700 mb-1">
            Achievements/Accomplishments *
          </label>
          <textarea
            id="achievements"
            name="achievements"
            value={formData.achievements}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            placeholder="Describe key achievements this month..."
            required
          />
        </div>

        <div>
          <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">
            Month *
          </label>
          <select
            id="month"
            name="month"
            value={formData.month}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          >
            <option value="">Select month</option>
            {months.map((month) => (
              <option key={month} value={`${month} ${currentYear}`}>
                {month} {currentYear}
              </option>
            ))}
          </select>
        </div>

        <ImageUpload 
          onImageSelect={handleImageSelect}
          selectedImage={formData.photo}
        />

        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition duration-200 font-medium"
        >
          Generate Content
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;