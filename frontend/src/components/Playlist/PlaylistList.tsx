"use client";
import React, { useEffect } from 'react';
import { Playlist } from '@/types/types';
import { useMusic } from '@/app/context/MusicContext';
import { PlaylistCard } from './Playlist';
import { useSidebar } from '@/app/context/SidebarContext';

export const PlaylistList: React.FC<{ searchResults: Playlist[] }> = ({ searchResults }) => {
  const { assets, loadAssets } = useMusic();

  useEffect(() => {
    loadAssets('playlist');
  }, [loadAssets]);

  const { setRightSidebarVisible, setSidebarContent } = useSidebar();

  const handlePlaylistClick = (playlist: Playlist) => {
    setSidebarContent({ playlist });
    setRightSidebarVisible(true);
  };

  const playlistsToDisplay = searchResults.length > 0 ? searchResults : assets.playlist;

  return (
    <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide">
      {playlistsToDisplay.length === 0 ? (
        <p>No data found.</p>
      ) : (
        (playlistsToDisplay as Playlist[]).map((playlist: Playlist) => (
          <div key={playlist['@key']} className="flex-shrink-0" onClick={() => handlePlaylistClick(playlist)}>
            <PlaylistCard
              name={playlist.name}
              image={`https://picsum.photos/seed/${playlist['@key']}/200`}
            />
          </div>
        ))
      )}
    </div>
  );
};