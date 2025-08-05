import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye, Package } from 'lucide-react';
import { useState } from 'react';

const ItemCard = ({ item, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setIsDeleting(true);
      try {
        await onDelete(item._id);
      } catch (error) {
        setIsDeleting(false);
        console.error('Delete failed:', error);
      }
    }
  };

  return (
    <div className={`group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 border border-white/20 hover:border-purple-200/50 transform hover:-translate-y-2 ${
      isDeleting ? 'opacity-50 pointer-events-none animate-pulse' : ''
    }`}>
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
              <Package className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-700 transition-colors duration-300 line-clamp-1">
              {item.title}
            </h3>
          </div>
          
          {/* Action buttons - appear on hover */}
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
            <Link
              to={`/items/${item._id}`}
              className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </Link>
            <Link
              to={`/edit-item/${item._id}`}
              className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
              title="Edit Item"
            >
              <Edit className="h-4 w-4" />
            </Link>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 transform hover:scale-110"
              title="Delete Item"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2 min-h-[3rem]">
          {item.description || 'No description available'}
        </p>
        
        {/* Footer */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1">Price</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Rs. {item.price?.toLocaleString() || '0'}
            </span>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium mb-2">
              In Stock
            </div>
            <div className="text-xs text-gray-400">
              ID: {item._id?.slice(-6) || 'N/A'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Loading overlay for delete */}
      {isDeleting && (
        <div className="absolute inset-0 bg-white/90 rounded-2xl flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        </div>
      )}
    </div>
  );
};

export default ItemCard;