"use client";
import React, { useEffect } from 'react';
import { Album } from '@/types/types';
import { useMusic } from '@/app/context/MusicContext';

export const AlbumList: React.FC = () => {
    const { assets, loadAssets, removeAsset } = useMusic();

    useEffect(() => {
        loadAssets('album');
    }, [loadAssets]);

    const handleRemoveAlbum = async (id: string) => {
        const confirmDelete = window.confirm('Tem certeza que deseja remover este album?');
        if (confirmDelete) {
            await removeAsset('album', id);
        }
    };

    return (
        <div>
            <h1>Lista de Albums</h1>
            {assets.album.length === 0 ? (
                <p>Nenhum album encontrado.</p>
            ) : (
                <ul>
                    {assets.album.map((album: Album) => (
                        <li key={album.id}>
                            <div>
                                <strong>{album.name} </strong>
                                <button onClick={() => handleRemoveAlbum(album.id)}>Remover</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};