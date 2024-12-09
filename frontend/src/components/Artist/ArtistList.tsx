"use client";
import React, { useEffect } from 'react';
import { Artist } from '@/types/types';
import { useMusic } from '@/app/context/MusicContext';
import { ArtistCard } from './Artist';
import { useSidebar } from '@/app/context/SidebarContext';

export const ArtistList: React.FC = () => {
    const { assets, loadAssets } = useMusic();

    useEffect(() => {
        loadAssets('artist');
    }, [loadAssets]);

    const { setRightSidebarVisible, setSidebarContent } = useSidebar();

    const handleArtistClick = (artist: Artist) => {
        setSidebarContent({ artist });
        setRightSidebarVisible(true);
    };

    return (
        <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide">
            {assets.artist.length === 0 ? (
                <p>No data found.</p>
            ) : (
                (assets.artist as Artist[]).map((artist: Artist) => (
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