"use client";
import React, { useEffect, useState } from 'react';
import { Album, Artist } from '@/types/types';
import { useMusic } from '@/app/context/MusicContext';
import { useSidebar } from '@/app/context/SidebarContext';
import { AlbumCard } from './Album';

export const AlbumList: React.FC = () => {
    const { assets, loadAssets, readAsset } = useMusic();
    const { setSidebarContent, toggleRightSidebar, rightSidebarVisible } = useSidebar();
    const [albumsWithArtists, setAlbumsWithArtists] = useState<Album[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await loadAssets('album');

                const updatedAlbums = await Promise.all(
                    (assets.album as Album[]).map(async (album: Album) => {
                        const artistResponse = await readAsset('artist', album.artist['@key']);
                        return {
                            ...album,
                            artist: artistResponse as Artist,
                        };
                    })
                );
                setAlbumsWithArtists(updatedAlbums as Album[]);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };

        fetchData();
    }, [loadAssets, readAsset, assets.album]);

    const handleAlbumClick = (album: Album) => {
        setSidebarContent({ album, artist: album.artist });
        if (!rightSidebarVisible) {
            toggleRightSidebar();
        }
    };

    return (
        <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide">
            {albumsWithArtists.length === 0 ? (
                <p>No data found.</p>
            ) : (
                albumsWithArtists.map((album: Album) => (
                    <div key={album['@key']} className="flex-shrink-0" onClick={() => handleAlbumClick(album)}>
                        <AlbumCard
                            name={album.name}
                            artist={(album.artist as Artist)?.name || 'Unknown Artist'}
                            image={`https://picsum.photos/seed/${album['@key']}/200`}
                        />
                    </div>
                ))
            )}
        </div>
    );
};