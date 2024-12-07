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
        <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide">
            {assets.album.length === 0 ? (
            <p>Nenhum álbum encontrado.</p>
            ) : (
            assets.album.map((album: Album) => (
            <div key={album.id} className="flex-shrink-0">
                <AlbumCard
                name={album.name}
                artist={album.artist?.name || 'Unknown Artist'}
                image='https://placehold.co/160x160/white/darkgray'
                />
            </div>
            ))
            )}
        </div>
    );
};