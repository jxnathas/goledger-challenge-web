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
        <div>
            <h1 className="text-2xl font-bold mb-4">Artists</h1>
            {assets.artist.length === 0 ? (
                <p>Nenhum artista encontrado.</p>
            ) : (
                <div className="grid grid-cols-10 gap-4">
                    {assets.artist.map((artist: Artist) => (
                        <ArtistCard
                            key={artist.id}
                            name={artist.name}
                            image='https://placehold.co/160x160/white/darkgray'
                        />
                    ))}
                </div>
            )}
        </div>
    );
};