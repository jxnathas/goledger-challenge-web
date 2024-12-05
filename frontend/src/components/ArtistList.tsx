"use client";
import React, { useEffect } from 'react';
import { Artist } from '@/types/types';
import { useMusic } from '@/app/context/MusicContext';

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
            <h1>Lista de Artistas</h1>
            {assets.artist.length === 0 ? (
                <p>Nenhum artista encontrado.</p>
            ) : (
                <ul>
                    {assets.artist.map((artist: Artist) => (
                        <li key={artist.id}>
                            <div>
                                <strong>{artist.name} </strong>
                                <button onClick={() => handleRemoveArtist(artist.id)}>Remover</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};