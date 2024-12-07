"use client";
import React, { useEffect } from 'react';
import { Song } from '@/types/types';
import { useMusic } from '@/app/context/MusicContext';
import { SongCard } from './Song';

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
        <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide">
            {assets.song.length === 0 ? (
                <p>No data found.</p>
            ) : (
                assets.song.map((song: Song) => (
                    <div key={song['@key']} className="flex-shrink-0">
                        <SongCard
                            name={song.name}
                            album={song.album.name}
                            image={`https://picsum.photos/seed/${song['@key']}/200`}
                        />
                    </div>
                ))
            )}
        </div>
    );
};
