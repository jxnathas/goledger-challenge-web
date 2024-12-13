"use client";
import React, { useEffect } from 'react';
import { Artist } from '@/types/types';
import { useMusic } from '@/app/context/MusicContext';
import { ArtistCard } from './Artist';
import { useSidebar } from '@/app/context/SidebarContext';

export const ArtistList: React.FC<{ searchResults: Artist[] }> = ({ searchResults }) => {
  const { assets, loadAssets } = useMusic();

  useEffect(() => {
    loadAssets('artist');
  }, [loadAssets]);

  const { setRightSidebarVisible, setSidebarContent } = useSidebar();

  const handleArtistClick = (artist: Artist) => {
    setSidebarContent({ artist });
    setRightSidebarVisible(true);
  };

  const artistsToDisplay = searchResults.length > 0 ? searchResults : assets.artist;

  return (
    <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide">
      {artistsToDisplay.length === 0 ? (
        <p>No data found.</p>
      ) : (
        (artistsToDisplay as Artist[]).map((artist: Artist) => (
          <div key={artist['@key']} className="flex-shrink-0" onClick={() => handleArtistClick(artist)}>
            <ArtistCard
              name={artist.name}
              image={`https://picsum.photos/seed/${artist['@key']}/200`}
            />
          </div>
        ))
      )}
    </div>
  );
};