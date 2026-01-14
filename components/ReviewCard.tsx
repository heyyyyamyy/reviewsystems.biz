import React from 'react';
import { Review } from '../types';
import { Star, CheckCircle, User, Briefcase } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const isZenthera = review.companyName === 'Zenthera Groups';

  return (
    <div className={`bg-white rounded-xl shadow-sm border ${isZenthera ? 'border-brand-200 shadow-md' : 'border-slate-100'} p-6 transition-all hover:shadow-md mb-4`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${isZenthera ? 'bg-indigo-600' : 'bg-slate-500'}`}>
            {review.companyName.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{review.companyName}</h3>
            <div className="flex items-center text-xs text-slate-500 gap-2">
              <span className="flex items-center gap-1"><User size={12}/> {review.author}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Briefcase size={12}/> {review.role}</span>
            </div>
          </div>
        </div>
        {review.verified && (
          <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full text-xs font-medium">
            <CheckCircle size={12} />
            Verified
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-slate-700">{review.rating.toFixed(1)}</span>
        <span className="ml-auto text-xs text-slate-400">{review.date}</span>
      </div>

      <h4 className="text-md font-bold text-slate-800 mb-2">{review.title}</h4>
      <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
        {review.content}
      </p>
    </div>
  );
};