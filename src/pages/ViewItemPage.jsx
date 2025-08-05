import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Package, 
  Calendar, 
  DollarSign, 
  FileText,
  Loader2,
  AlertCircle,
  Eye,
  Share2
} from 'lucide-react';

const ViewItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch item data on mount
  useEffect(() => {
    const fetchItem = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5000/api/items/${id}`);
        setItem(response.data);
        setError('');
      } catch (err) {
        console.error('Fetch error:', err);
        setError(
          err.response?.status === 404 
            ? 'Item not found' 
            : 'Failed to load item. Please try again.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchItem();
    }
  }, [id]);

  // Handle item deletion
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${item.title}"? This action cannot be undone.`
    );
    
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      navigate('/', { 
        state: { 
          message: `"${item.title}" has been deleted successfully.`,
          type: 'success'
        }
      });
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete item. Please try again.');
      setIsDeleting(false);
    }
  };

  // Share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.description || 'Check out this item',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 mb-4">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            <span className="text-xl font-semibold text-gray-700">Loading item...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Items</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Items</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-all duration-300"
              title="Share"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-white/20 rounded-2xl">
                    <Eye className="h-8 w-8" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold mb-2">{item.title}</h1>
                    <p className="text-blue-100 text-lg">Item Details</p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  <Link
                    to={`/edit-item/${item._id}`}
                    className="flex items-center space-x-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg transition-all duration-300 shadow-lg transform hover:scale-105"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-300 shadow-lg disabled:opacity-50 transform hover:scale-105"
                  >
                    {isDeleting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Price Badge */}
              <div className="inline-block">
                <div className="px-6 py-3 bg-white/20 backdrop-blur-xl rounded-full">
                  <span className="text-2xl font-bold">
                    Rs. {item.price?.toLocaleString() || '0'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            
            {/* Description Section */}
            {item.description ? (
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-800">Description</h3>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {item.description}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mb-8">
                <div className="bg-gray-50 rounded-2xl p-6 text-center">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No description provided</p>
                </div>
              </div>
            )}

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              
              {/* Title Stats */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center border border-blue-100">
                <Package className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {item.title?.length || 0}
                </div>
                <div className="text-gray-600 font-medium">Title Characters</div>
              </div>
              
              {/* Description Stats */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center border border-purple-100">
                <FileText className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {item.description?.split(' ').filter(word => word.length > 0).length || 0}
                </div>
                <div className="text-gray-600 font-medium">Description Words</div>
              </div>
              
              {/* Price Stats */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center border border-green-100">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-green-600 mb-2">
                  Rs. {item.price?.toLocaleString() || '0'}
                </div>
                <div className="text-gray-600 font-medium">Item Price</div>
              </div>
            </div>

            {/* Created At */}
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>
                Created on{' '}
                {new Date(item.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewItemPage;