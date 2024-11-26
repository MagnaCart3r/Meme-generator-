import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MemeGrid } from './components/MemeGrid';
import { fetchMemes, generateMeme, shareToTwitter } from './services/api';
import type { Meme } from './types/meme';

export default function App() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshingMemes, setRefreshingMemes] = useState<Set<string>>(new Set());
  const [sharing, setSharing] = useState<Set<string>>(new Set());

  const loadMemes = async () => {
    try {
      setLoading(true);
      setError(null);
      const newMemes = await fetchMemes();
      setMemes(newMemes);
    } catch (err) {
      setError('Failed to load memes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const refreshSingleMeme = async (template: string) => {
    try {
      setRefreshingMemes(prev => new Set([...prev, template]));
      const index = memes.findIndex(meme => meme.template === template);
      if (index === -1) return;

      const newMeme = await generateMeme(index);
      setMemes(prev => [
        ...prev.slice(0, index),
        newMeme,
        ...prev.slice(index + 1)
      ]);
    } catch (err) {
      setError('Failed to refresh meme. Please try again.');
    } finally {
      setRefreshingMemes(prev => {
        const next = new Set(prev);
        next.delete(template);
        return next;
      });
    }
  };

  useEffect(() => {
    loadMemes();
  }, []);

  const shareMeme = async (url: string, platform: 'twitter' | 'whatsapp', template: string) => {
    if (platform === 'twitter') {
      try {
        setSharing(prev => new Set([...prev, template]));
        await shareToTwitter(url);
      } catch (err) {
        setError('Failed to share meme. Please try again.');
      } finally {
        setSharing(prev => {
          const next = new Set(prev);
          next.delete(template);
          return next;
        });
      }
    } else {
      // WhatsApp sharing remains the same
      const text = encodeURIComponent("Check out these carter meme today!");
      const shareUrl = encodeURIComponent(url);
      window.open(`https://api.whatsapp.com/send?text=${text}%20${shareUrl}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-6">
      <div className="max-w-6xl mx-auto">
        <Header onRefresh={loadMemes} loading={loading} />
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <MemeGrid
          memes={memes}
          loading={loading}
          onShare={shareMeme}
          onRefreshMeme={refreshSingleMeme}
          refreshingMemes={refreshingMemes}
          sharingMemes={sharing}
        />
      </div>
    </div>
  );
}