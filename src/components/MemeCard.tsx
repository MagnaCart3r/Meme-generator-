import React, { useState } from 'react';
import { Twitter, MessageCircle, AlertCircle, RefreshCw, Loader } from 'lucide-react';
import type { Meme } from '../types/meme';

interface MemeCardProps {
  meme: Meme;
  onShare: (url: string, platform: 'twitter' | 'whatsapp', template: string) => void;
  onRefresh: (template: string) => void;
  loading?: boolean;
  sharing?: boolean;
}

export const MemeCard: React.FC<MemeCardProps> = ({ 
  meme, 
  onShare, 
  onRefresh, 
  loading = false,
  sharing = false
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform">
      <div className="aspect-square relative">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <RefreshCw className="w-12 h-12 text-gray-400 animate-spin" />
          </div>
        ) : imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-500">
              <AlertCircle className="w-12 h-12 mx-auto mb-2" />
              <p>Image not available</p>
            </div>
          </div>
        ) : (
          <img
            src={meme.url}
            alt={meme.title}
            className="w-full h-full object-contain bg-gray-50"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex justify-between items-end">
            <div className="flex gap-2 items-center">
              <button
                onClick={() => onRefresh(meme.template)}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                disabled={loading || sharing}
                title="Get new meme"
              >
                <RefreshCw className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onShare(meme.url, 'twitter', meme.template)}
                className="bg-blue-400 p-2 rounded-full hover:bg-blue-500 transition-colors disabled:opacity-50"
                disabled={sharing}
                title="Share on Twitter"
              >
                {sharing ? (
                  <Loader className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <Twitter className="w-5 h-5 text-white" />
                )}
              </button>
              <button
                onClick={() => onShare(meme.url, 'whatsapp', meme.template)}
                className="bg-green-500 p-2 rounded-full hover:bg-green-600 transition-colors"
                disabled={sharing}
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};