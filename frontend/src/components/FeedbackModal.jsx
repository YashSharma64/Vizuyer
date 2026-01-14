import React, { useState } from 'react';
import { X, Star } from 'lucide-react';

const FeedbackModal = ({ isOpen, onClose, productName }) => {
  if (!isOpen) return null;

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [confidence, setConfidence] = useState(null);

  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || !confidence) {
      alert("Please provide a rating and your confidence level.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";
      const response = await fetch(`${API}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, confidence, comment, productName })
      });

      if (response.ok) {
        onClose();
        alert("Thank you for your feedback!");
      } else {
        const data = await response.json();
        console.error("Failed to submit feedback:", data);
        alert(data.error || "Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Network error. Please make sure the server is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl w-full max-w-md p-8 transform transition-all animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 cursor-pointer" />
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
            <div className="flex gap-2 cursor-pointer">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110 cursor-pointer"
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
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting || rating === 0 || !confidence}
            className={`w-full py-3 rounded-xl font-medium shadow-lg transition-all transform active:scale-[0.98] ease-in-out ${
              isSubmitting || rating === 0 || !confidence
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                : 'bg-black text-white hover:bg-gray-200 hover:text-black hover:shadow-xl'
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
