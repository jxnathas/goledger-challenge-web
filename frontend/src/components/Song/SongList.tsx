"use client";
import React, { useEffect } from 'react';
import { Song } from '@/types/types';
import { useMusic } from '@/app/context/MusicContext';
import { SongCard } from './Song';
import { useSidebar } from '@/app/context/SidebarContext';

export const SongList: React.FC = () => {
    const { assets, loadAssets } = useMusic();

    useEffect(() => {
        loadAssets('song');
    }, [loadAssets]);

    const { setRightSidebarVisible, setSidebarContent } = useSidebar();

    const handleSongClick = (song: Song) => {
        setSidebarContent({ song });
        setRightSidebarVisible(true);
    };

    return (
        <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide">
            {assets.song.length === 0 ? (
                <p>No data found.</p>
            ) : (
                (assets.song as Song[]).map((song: Song) => (
                    <div key={song['@key']} className="flex-shrink-0" onClick={() => handleSongClick(song)}>
                        <SongCard
                            name={song.name}
                            image={`https://picsum.photos/seed/${song['@key']}/200`}
                        />
                    </div>
                ))
            )}
        </div>
    );
};