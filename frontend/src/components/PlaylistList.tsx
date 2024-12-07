"use client";
import React, { useEffect } from "react";
import { Playlist } from "@/types/types";
import { useMusic } from "@/app/context/MusicContext";
import { PlaylistCard } from "./Playlist";

export const PlaylistList: React.FC = () => {
    const { assets, loadAssets, removeAsset } = useMusic();

    useEffect(() => {
        loadAssets("playlist");
    }, [loadAssets]);

    const handleRemovePlaylist = async (id: string) => {
        const confirmDelete = window.confirm(
            "Tem certeza que deseja remover esta playlist?"
        );
        if (confirmDelete) {
            await removeAsset("playlist", id);
        }
    };

    return (
        <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide">
            {assets.playlist.length === 0 ? (
                <p>Nenhuma playlist encontrada.</p>
            ) : (
                assets.playlist.map((playlist: Playlist) => (
                    <div key={playlist['@key']} className="flex-shrink-0">
                        <PlaylistCard
                            name={playlist.name}
                            image={`https://picsum.photos/seed/${playlist['@key']}/200`}
                        />
                    </div>
                ))
            )}
        </div>
    );
};
