import React, { useState } from 'react';
import { X, Star } from 'lucide-react';

const FeedbackModal = ({ isOpen, onClose, productName }) => {
  if (!isOpen) return null;

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [confidence, setConfidence] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback Submitted");
    onClose();
    alert("Thank you for your feedback!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl transform transition-all animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-2">Your Feedback</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Helping us improve the visualization for <span className="font-semibold text-gray-900">{productName}</span>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Did the images help you understand the product?
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star 
                    className={`w-8 h-8 ${
                      star <= (hoverRating || rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`} 
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              How confident would you feel buying this?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['Not Sure', 'Somewhat', 'Very Confident'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setConfidence(level)}
                  className={`py-2 px-3 text-sm rounded-lg border transition-all ${
                    confidence === level 
                      ? 'bg-black text-white border-black' 
                      : 'border-gray-200 hover:border-black text-gray-600'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Any specific details you missed? (Optional)
            </label>
            <textarea 
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none"
              rows="3"
              placeholder="e.g., I couldn't see the charging port..."
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-medium shadow-lg hover:bg-gray-200 transition-all hover:shadow-xl active:scale-[0.98] hover:text-black cursor-pointer ease-in-out"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
