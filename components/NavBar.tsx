import React from 'react';
import { PageView } from '../types';
import { Menu, MessageSquare, ShieldCheck } from 'lucide-react';

interface NavBarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate(PageView.HOME)}>
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-brand-600 p-1.5 rounded-lg">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">ReviewSystems<span className="text-brand-600">.biz</span></span>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <button
              onClick={() => onNavigate(PageView.HOME)}
              className={`${
                currentPage === PageView.HOME
                  ? 'border-brand-500 text-slate-900'
                  : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
              } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full transition-colors`}
            >
              Discussion Feed
            </button>
            <button
              onClick={() => onNavigate(PageView.CONTACT)}
              className={`${
                currentPage === PageView.CONTACT
                  ? 'border-brand-500 text-slate-900'
                  : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
              } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full transition-colors`}
            >
              Contact Us
            </button>
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200">
          <div className="pt-2 pb-3 space-y-1">
            <button
              onClick={() => {
                onNavigate(PageView.HOME);
                setIsMenuOpen(false);
              }}
              className={`${
                currentPage === PageView.HOME
                  ? 'bg-brand-50 border-brand-500 text-brand-700'
                  : 'border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left`}
            >
              Discussion Feed
            </button>
            <button
              onClick={() => {
                onNavigate(PageView.CONTACT);
                setIsMenuOpen(false);
              }}
              className={`${
                currentPage === PageView.CONTACT
                  ? 'bg-brand-50 border-brand-500 text-brand-700'
                  : 'border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left`}
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};