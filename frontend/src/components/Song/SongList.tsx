"use client";
import React, { useEffect } from 'react';
import { Song, Album } from '@/types/types';
import { useMusic } from '@/app/context/MusicContext';
import { SongCard } from './Song';
import { useSidebar } from '@/app/context/SidebarContext';

export const SongList: React.FC<{ searchResults: Song[] }> = ({ searchResults }) => {
  const { assets, loadAssets } = useMusic();

  useEffect(() => {
    loadAssets('song');
  }, [loadAssets]);

  const { setRightSidebarVisible, setSidebarContent } = useSidebar();

  const handleSongClick = (song: Song) => {
    setSidebarContent({ song, album: song.album });
    setRightSidebarVisible(true);
  };

  const songsToDisplay = searchResults.length > 0 ? searchResults : assets.song;

  return (
    <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide">
      {songsToDisplay.length === 0 ? (
        <p>No data found.</p>
      ) : (
        (songsToDisplay as Song[]).map((song: Song) => (
          <div key={song['@key']} className="flex-shrink-0" onClick={() => handleSongClick(song)}>
            <SongCard
              name={song.name}
              image={`https://picsum.photos/seed/${song['@key']}/200`}
            />
          </div>
        ))
      )}
    </div>
  );
};