import React from 'react';
import { RefreshCw } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  loading: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onRefresh, loading }) => (
  <div className="flex justify-between items-center mb-8">
    <h1 className="text-4xl font-bold text-white">Carter Meme App</h1>
    <button
      onClick={onRefresh}
      disabled={loading}
      className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
      <span>{loading ? 'Loading...' : 'New Memes'}</span>
    </button>
  </div>
);