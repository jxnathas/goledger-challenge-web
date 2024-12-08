"use client";
import React, { useEffect } from 'react';
import { Artist } from '@/types/types';
import { useMusic } from '@/app/context/MusicContext';
import { ArtistCard } from './Artist';

export const ArtistList: React.FC = () => {
    const { assets, loadAssets, removeAsset } = useMusic();

    useEffect(() => {
        loadAssets('artist');
    }, [loadAssets]);

    return (
        <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide">
            {assets.artist.length === 0 ? (
                <p>No data found.</p>
            ) : (
                assets.artist.map((artist: Artist) => (
                    <div key={artist['@key']} className="flex-shrink-0">
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
