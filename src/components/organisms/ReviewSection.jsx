import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Textarea from '@/components/atoms/Textarea';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';
import { reviewService } from '@/services/api/reviewService';
import { toast } from 'react-toastify';

const StarRating = ({ rating, onRatingChange, readonly = false, size = 20 }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (starValue) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starValue);
    }
  };

  const handleStarHover = (starValue) => {
    if (!readonly) {
      setHoverRating(starValue);
    }
  };

  const handleStarLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const getStarColor = (starValue) => {
    const activeRating = hoverRating || rating;
    if (starValue <= activeRating) {
      return 'text-accent';
    }
    return 'text-gray-300';
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((starValue) => (
        <button
          key={starValue}
          type="button"
          onClick={() => handleStarClick(starValue)}
          onMouseEnter={() => handleStarHover(starValue)}
          onMouseLeave={handleStarLeave}
          className={`transition-colors ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} ${getStarColor(starValue)}`}
          disabled={readonly}
        >
          <ApperIcon name="Star" size={size} className={starValue <= (hoverRating || rating) ? 'fill-current' : ''} />
        </button>
      ))}
    </div>
  );
};

const ReviewCard = ({ review }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card variant="surface" className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
            <ApperIcon name="User" size={16} className="text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{review.reviewerName}</h4>
            <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
          </div>
        </div>
        <StarRating rating={review.rating} readonly size={16} />
      </div>
      
      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
      
      {review.verified && (
        <div className="flex items-center gap-2 text-sm text-success">
          <ApperIcon name="CheckCircle" size={14} />
          <span>Verified Purchase</span>
        </div>
      )}
    </Card>
  );
};

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    if (!comment.trim()) {
      toast.error('Please enter a comment');
      return;
    }
    
    if (!reviewerName.trim()) {
      toast.error('Please enter your name');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const newReview = {
        productId: parseInt(productId),
        rating,
        comment: comment.trim(),
        reviewerName: reviewerName.trim(),
        date: new Date().toISOString(),
        verified: false
      };

      await reviewService.create(newReview);
      
      // Reset form
      setRating(0);
      setComment('');
      setReviewerName('');
      
      toast.success('Review submitted successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card variant="surface" className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Rating
          </label>
          <StarRating rating={rating} onRatingChange={setRating} size={24} />
        </div>
        
        <Input
          label="Your Name"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          placeholder="Enter your name"
          required
        />
        
        <Textarea
          label="Your Review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this product..."
          rows={4}
          required
        />
        
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
          icon={isSubmitting ? "Loader2" : "Send"}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </Card>
  );
};

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const loadReviews = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await reviewService.getByProductId(parseInt(productId));
      setReviews(data);
    } catch (err) {
      setError('Failed to load reviews. Please try again.');
      console.error('Error loading reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const handleReviewSubmitted = () => {
    loadReviews();
    setShowForm(false);
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  if (loading) {
    return (
      <div className="mt-12">
        <div className="flex items-center justify-center py-8">
          <ApperIcon name="Loader2" size={24} className="animate-spin text-primary" />
          <span className="ml-2 text-gray-600">Loading reviews...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-12">
        <Card variant="surface" className="p-6 text-center">
          <p className="text-error mb-4">{error}</p>
          <Button variant="secondary" onClick={loadReviews} icon="RefreshCw">
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  const averageRating = calculateAverageRating();
  const distribution = getRatingDistribution();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-12"
    >
      <div className="border-t pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-display gradient-text mb-2">Customer Reviews</h2>
            <div className="flex items-center gap-4">
              {reviews.length > 0 ? (
                <>
                  <div className="flex items-center gap-2">
                    <StarRating rating={Math.round(parseFloat(averageRating))} readonly size={18} />
                    <span className="text-lg font-medium">{averageRating}</span>
                    <span className="text-gray-500">({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
                  </div>
                </>
              ) : (
                <p className="text-gray-500">No reviews yet</p>
              )}
            </div>
          </div>
          
          <Button
            variant={showForm ? "secondary" : "primary"}
            onClick={() => setShowForm(!showForm)}
            icon={showForm ? "X" : "Plus"}
            className="mt-4 sm:mt-0"
          >
            {showForm ? 'Cancel' : 'Write Review'}
          </Button>
        </div>

        {reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card variant="surface" className="p-4 text-center">
              <div className="text-3xl font-display gradient-text mb-1">{averageRating}</div>
              <StarRating rating={Math.round(parseFloat(averageRating))} readonly size={16} />
              <p className="text-sm text-gray-500 mt-1">Average Rating</p>
            </Card>
            
            <div className="md:col-span-3">
              <Card variant="surface" className="p-4">
                <h4 className="font-medium mb-3">Rating Distribution</h4>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = distribution[stars];
                    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                    
                    return (
                      <div key={stars} className="flex items-center gap-2 text-sm">
                        <span className="w-8">{stars}★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-accent h-2 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-gray-500 w-8">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>
        )}

        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <ReviewForm productId={productId} onReviewSubmitted={handleReviewSubmitted} />
          </motion.div>
        )}

        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <ReviewCard key={review.Id} review={review} />
            ))}
          </div>
        ) : (
          <Card variant="surface" className="p-8 text-center">
            <ApperIcon name="MessageCircle" size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Reviews Yet</h3>
            <p className="text-gray-500 mb-4">Be the first to share your experience with this product!</p>
            <Button
              variant="primary"
              onClick={() => setShowForm(true)}
              icon="Edit3"
            >
              Write First Review
            </Button>
          </Card>
        )}
      </div>
    </motion.div>
  );
};

export default ReviewSection;