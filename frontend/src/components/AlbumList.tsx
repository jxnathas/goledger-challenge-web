"use client";
import React, { useEffect } from 'react';
import { Album } from '@/types/types';
import { useMusic } from '@/app/context/MusicContext';
import { AlbumCard } from './Album';

export const AlbumList: React.FC = () => {
    const { assets, loadAssets, removeAsset } = useMusic();

    useEffect(() => {
        loadAssets('album');
    }, [loadAssets]);

    const handleRemoveAlbum = async (id: string) => {
        const confirmDelete = window.confirm('Tem certeza que deseja remover este álbum?');
        if (confirmDelete) {
            await removeAsset('album', id);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Albums</h1>
            {assets.album.length === 0 ? (
                <p>Nenhum álbum encontrado.</p>
            ) : (
                <div className="grid grid-cols-10 gap-4">
                    {assets.album.map((album: Album) => (
                        <AlbumCard
                            key={album.id}
                            name={album.name}
                            artist={album.artist.name}
                            image='https://placehold.co/160x160/white/darkgray'
                        />
                    ))}
                </div>
            )}
        </div>
    );
};