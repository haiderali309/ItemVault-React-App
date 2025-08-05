import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Plus, Save, ArrowLeft, AlertCircle, CheckCircle, Package } from 'lucide-react';

const AddItemPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters long';
    }
    
    if (formData.price && isNaN(formData.price)) {
      newErrors.price = 'Price must be a valid number';
    } else if (formData.price && parseFloat(formData.price) < 0) {
      newErrors.price = 'Price cannot be negative';
    }
    
    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }
    
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await axios.post('http://localhost:5000/api/items', {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: formData.price ? parseFloat(formData.price) : 0
      });
      
      setShowSuccess(true);
      
      // Reset form
      setFormData({ title: '', description: '', price: '' });
      
      // Navigate after showing success message
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (err) {
      console.error('Submit error:', err);
      setErrors({ 
        submit: err.response?.data?.message || 'Failed to add item. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Items</span>
          </Link>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Add New Item
            </h2>
            <p className="text-gray-600">Fill in the details below to add a new item to your collection</p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3 animate-fade-in">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-green-700 font-medium">Item added successfully! Redirecting...</span>
            </div>
          )}

          {/* Error Message */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="text-red-700">{errors.submit}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Item Title <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 bg-white/50 border rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 text-black ${
                    errors.title 
                      ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                      : 'border-gray-200 focus:ring-purple-200 focus:border-purple-400'
                  }`}
                  placeholder="Enter item title (e.g., MacBook Pro, iPhone 15)"
                  disabled={isSubmitting}
                  maxLength={100}
                />
              </div>
              {errors.title && (
                <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.title}</span>
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                {formData.title.length}/100 characters
              </p>
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={4}
                className={`w-full px-4 py-3 bg-white/50 border rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 resize-none text-black ${
                  errors.description 
                    ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                    : 'border-gray-200 focus:ring-purple-200 focus:border-purple-400'
                }`}
                placeholder="Enter item description (optional)"
                disabled={isSubmitting}
                maxLength={500}
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.description}</span>
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                {formData.description.length}/500 characters
              </p>
            </div>

            {/* Price Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (Rs.)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                  Rs.
                </span>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 bg-white/50 border rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 text-black ${
                    errors.price 
                      ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                      : 'border-gray-200 focus:ring-purple-200 focus:border-purple-400'
                  }`}
                  placeholder="Enter price (optional)"
                  disabled={isSubmitting}
                  min="0"
                  step="0.01"
                />
              </div>
              {errors.price && (
                <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.price}</span>
                </p>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting || showSuccess}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Adding Item...</span>
                  </>
                ) : showSuccess ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>Added Successfully!</span>
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    <span>Add Item</span>
                  </>
                )}
              </button>
              
              <Link
                to="/"
                className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center"
              >
                Cancel
              </Link>
            </div>
          </form>

          {/* Form Tips */}
          <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
            <h4 className="font-semibold text-purple-800 mb-2">💡 Tips for adding items:</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Use descriptive titles to easily identify your items</li>
              <li>• Add detailed descriptions for better organization</li>
              <li>• Include accurate pricing for inventory tracking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemPage;