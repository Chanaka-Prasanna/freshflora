import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, Plus, X, MessageSquare, Sparkles } from 'lucide-react';
import { Review } from '../types';

interface ReviewSectionProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews, onAddReview }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [flowerTitle, setFlowerTitle] = useState('Velvet Blush Ecuadorian Roses');
  const [comment, setComment] = useState('');
  const [helpfulCounts, setHelpfulCounts] = useState<{ [key: string]: number }>({});

  const handleHelpfulClick = (reviewId: string) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1,
    }));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !comment) return;

    const newReview: Review = {
      id: 'rev_' + Date.now(),
      authorName,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating,
      date: 'Just now',
      comment,
      flowerTitle,
      verifiedBuyer: true,
      helpfulCount: 0,
    };

    onAddReview(newReview);
    setShowAddModal(false);
    setAuthorName('');
    setComment('');
  };

  // Average calculation
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)).toFixed(1);

  return (
    <section id="reviews" className="py-12 bg-white border-y border-[#FDE2E4] my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E86F80] bg-[#FDE2E4] px-3.5 py-1 rounded-full border border-[#FAD2D4] inline-block mb-2">
            Loved By Flower Enthusiasts
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A3B3B] mb-2">
            Recent Reviews
          </h2>
          <p className="text-xs text-[#4A3B3B]/70">
            Read verified reviews from clients who trusted us with their bouquets and floral gestures.
          </p>
        </div>

        {/* Rating Summary Bar & Write Review CTA */}
        <div className="bg-[#FFF9F9] p-5 sm:p-6 rounded-2xl border border-[#FDE2E4] mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="text-center border-r border-[#FDE2E4] pr-6">
              <span className="font-serif text-4xl font-bold text-[#E86F80] block">
                {avgRating}
              </span>
              <div className="flex text-yellow-400 justify-center my-1 text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-[10px] text-gray-400">{reviews.length} Verified Reviews</span>
            </div>

            <div className="hidden sm:block text-xs space-y-1 text-[#4A3B3B]">
              <div className="flex items-center gap-2">
                <span>5 Stars</span>
                <div className="w-32 h-2 bg-[#FDE2E4] rounded-full overflow-hidden">
                  <div className="h-full bg-[#E86F80] w-[90%]" />
                </div>
                <span>90%</span>
              </div>
              <div className="flex items-center gap-2">
                <span>4 Stars</span>
                <div className="w-32 h-2 bg-[#FDE2E4] rounded-full overflow-hidden">
                  <div className="h-full bg-[#E86F80] w-[10%]" />
                </div>
                <span>10%</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="py-2.5 px-5 rounded-full bg-[#E86F80] hover:bg-[#d65f70] text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Write a Review
          </button>
        </div>

        {/* Reviews Grid matching Geometric Balance left border style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((rev) => {
            const addedHelpful = helpfulCounts[rev.id] || 0;
            return (
              <div
                key={rev.id}
                className="bg-white p-4 rounded-xl border border-[#FDE2E4] border-l-4 border-l-[#E86F80] shadow-none flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Author Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={rev.avatarUrl}
                        alt={rev.authorName}
                        className="w-8 h-8 rounded-full object-cover border border-[#FDE2E4]"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-serif font-bold text-xs text-[#4A3B3B]">
                            {rev.authorName}
                          </h4>
                          {rev.verifiedBuyer && (
                            <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-[#2E7D32] bg-[#E8F5E9] px-1.5 py-0.5 rounded-full">
                              <CheckCircle className="w-3 h-3" /> Verified
                            </span>
                          )}
                        </div>
                        <span className="text-[9px] text-gray-400">{rev.date}</span>
                      </div>
                    </div>

                    {/* Star Score */}
                    <div className="flex text-yellow-400 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-amber-400' : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Purchased Item Tag */}
                  <div className="mb-1.5">
                    <span className="text-[10px] font-semibold text-[#E86F80] bg-[#FFF0F1] px-2 py-0.5 rounded border border-[#FDE2E4]">
                      {rev.flowerTitle}
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-xs text-[#4A3B3B]/80 leading-relaxed italic mt-1">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Helpful Vote Button */}
                <div className="mt-3 pt-2 border-t border-[#FDE2E4] flex items-center justify-end">
                  <button
                    onClick={() => handleHelpfulClick(rev.id)}
                    className="text-[10px] text-[#4A3B3B]/60 hover:text-[#E86F80] flex items-center gap-1 transition-colors font-medium"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>Helpful ({rev.helpfulCount + addedHelpful})</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Add Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-[#FFF9F9] rounded-3xl max-w-md w-full p-6 border border-[#F8D7E3] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:text-black hover:bg-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-[#3D1E28] mb-1">
              Share Your FloraCharm Experience
            </h3>
            <p className="text-xs text-[#735A63] mb-4">
              Your review helps other flower lovers select the best fresh blooms.
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#3D1E28] block mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clara Oswald"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#F8D7E3] bg-white text-[#2D232E]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#3D1E28] block mb-1">
                  Select Rating Score
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className={`p-2 rounded-lg border transition-colors ${
                        rating >= star ? 'bg-[#FCE8EF] border-[#E07A98] text-amber-500' : 'bg-white border-gray-200 text-gray-300'
                      }`}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#3D1E28] block mb-1">
                  Bouquet / Flower Title
                </label>
                <select
                  value={flowerTitle}
                  onChange={(e) => setFlowerTitle(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#F8D7E3] bg-white text-[#2D232E]"
                >
                  <option value="Velvet Blush Ecuadorian Roses">Velvet Blush Ecuadorian Roses</option>
                  <option value="Pastel Peony Dream Bouquet">Pastel Peony Dream Bouquet</option>
                  <option value="Dutch Soft Pink Tulips">Dutch Soft Pink Tulips</option>
                  <option value="Golden Sunset Sunflowers">Golden Sunset Sunflowers</option>
                  <option value="Charming Cottage Garden Mix">Charming Cottage Garden Mix</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#3D1E28] block mb-1">
                  Your Review Comment *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about the freshness, fragrance, and delivery..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#F8D7E3] bg-white text-[#2D232E]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#C83863] hover:bg-[#B02852] text-white font-bold text-xs shadow-md transition-all"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
