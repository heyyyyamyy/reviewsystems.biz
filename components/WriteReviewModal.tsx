import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { Review } from '../types';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: Omit<Review, 'id' | 'date' | 'verified'>) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    author: '',
    role: '',
    companyName: 'Zenthera Groups',
    title: '',
    content: '',
    rating: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    setFormData({
      author: '',
      role: '',
      companyName: 'Zenthera Groups',
      title: '',
      content: '',
      rating: 5
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity backdrop-blur-sm" onClick={onClose} aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-xl leading-6 font-bold text-slate-900" id="modal-title">Write a Review</h3>
                  <button onClick={onClose} className="bg-slate-100 rounded-full p-1 hover:bg-slate-200 transition-colors">
                    <X className="h-5 w-5 text-slate-500" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                    <select 
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      className="w-full rounded-lg border-slate-300 border p-2.5 text-slate-900 focus:ring-brand-500 focus:border-brand-500"
                    >
                      <option value="Zenthera Groups">Zenthera Groups</option>
                      <option value="TechFlow Solutions">TechFlow Solutions</option>
                      <option value="Acme Corp">Acme Corp</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.author}
                        onChange={(e) => setFormData({...formData, author: e.target.value})}
                        className="w-full rounded-lg border-slate-300 border p-2.5 text-slate-900 focus:ring-brand-500 focus:border-brand-500"
                        placeholder="Amit Patel"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Role / Job Title</label>
                      <input 
                        type="text" 
                        required
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="w-full rounded-lg border-slate-300 border p-2.5 text-slate-900 focus:ring-brand-500 focus:border-brand-500"
                        placeholder="Site Engineer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setFormData({...formData, rating: star})}
                          className="focus:outline-none"
                        >
                          <Star 
                            className={`h-8 w-8 ${star <= formData.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Review Title</label>
                    <input 
                      type="text" 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full rounded-lg border-slate-300 border p-2.5 text-slate-900 focus:ring-brand-500 focus:border-brand-500"
                      placeholder="Summarize your experience"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Review Content</label>
                    <textarea 
                      required
                      rows={4}
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      className="w-full rounded-lg border-slate-300 border p-2.5 text-slate-900 focus:ring-brand-500 focus:border-brand-500"
                      placeholder="Tell us about the interview process, certification requirements, work culture, etc."
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit" 
                      className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-sm"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};