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

    const handleRemoveArtist = async (id: string) => {
        const confirmDelete = window.confirm('Tem certeza que deseja remover este artista?');
        if (confirmDelete) {
            await removeAsset('artist', id);
        }
    };

    return (
        <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide">
            {assets.artist.length === 0 ? (
                <p>Nenhum artista encontrado.</p>
            ) : (
                assets.artist.map((artist: Artist) => (
                    <div key={artist.id} className="flex-shrink-0">
                        <ArtistCard
                            name={artist.name}
                            image='https://placehold.co/160x160/white/darkgray'
                        />
                    </div>
                ))
            )}
        </div>
    );
};
