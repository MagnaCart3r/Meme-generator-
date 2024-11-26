import React from 'react';
import { MemeCard } from './MemeCard';
import type { Meme } from '../types/meme';

interface MemeGridProps {
  memes: Meme[];
  loading: boolean;
  onShare: (url: string, platform: 'twitter' | 'whatsapp', template: string) => void;
  onRefreshMeme: (template: string) => void;
  refreshingMemes: Set<string>;
  sharingMemes: Set<string>;
}

export const MemeGrid: React.FC<MemeGridProps> = ({ 
  memes, 
  loading, 
  onShare, 
  onRefreshMeme,
  refreshingMemes,
  sharingMemes
}) => {
  if (loading && memes.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="animate-pulse bg-white/20 rounded-xl aspect-square" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {memes.map((meme, index) => (
        <MemeCard 
          key={`${meme.template}-${index}`} 
          meme={meme} 
          onShare={onShare}
          onRefresh={onRefreshMeme}
          loading={refreshingMemes.has(meme.template)}
          sharing={sharingMemes.has(meme.template)}
        />
      ))}
    </div>
  );
};