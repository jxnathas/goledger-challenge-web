"use client";
import React, { useEffect } from 'react';
import { Song } from '@/types/types';
import { useMusic } from '@/app/context/MusicContext';

export const SongList: React.FC = () => {
    const { assets, loadAssets, removeAsset } = useMusic();

    useEffect(() => {
        loadAssets('song');
    }, [loadAssets]);

    const handleRemoveSong = async (id: string) => {
        const confirmDelete = window.confirm('Tem certeza que deseja remover esta música?');
        if (confirmDelete) {
            await removeAsset('song', id);
        }
    };

    return (
        <div>
            <h1>Lista de Músicas</h1>
            {assets.song.length === 0 ? (
                <p>Nenhuma música encontrada.</p>
            ) : (
                <ul>
                    {assets.song.map((song: Song) => (
                        <li key={song.id}>
                            <div>
                                <strong>{song.name} </strong>
                                <button onClick={() => handleRemoveSong(song.id)}>Remover</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}