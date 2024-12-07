"use client";
import React, { useEffect, useState } from 'react';
import { Album } from '@/types/types';
import { useMusic } from '@/app/context/MusicContext';
import { AlbumCard } from './Album';

export const AlbumList: React.FC = () => {
    const { assets, loadAssets, removeAsset, readAsset } = useMusic();
    const [albumsWithArtists, setAlbumsWithArtists] = useState<Album[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await loadAssets('album');

                const updatedAlbums = await Promise.all(
                    assets.album.map(async (album: Album) => {
                        const artistResponse = await readAsset('artist', album.artist['@key'], album.artist.name);
                        return {
                            ...album,
                            artist: {
                                ...artistResponse,
                            },
                        };
                    })
                );
                setAlbumsWithArtists(updatedAlbums);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };

        fetchData();
    }, [loadAssets, readAsset, assets.album]);

    return (
        <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide">
            {albumsWithArtists.length === 0 ? (
                <p>Nenhum álbum encontrado.</p>
            ) : (
                albumsWithArtists.map((album: Album) => (
                    <div key={album['@key']} className="flex-shrink-0">
                        <AlbumCard
                            name={album.name}
                            artist={album.artist?.name || 'Unknown Artist'}
                            image={`https://picsum.photos/seed/${album['@key']}/200`}
                        />
                    </div>
                ))
            )}
        </div>
    );
};