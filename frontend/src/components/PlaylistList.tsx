"use client";
import React, { useEffect, useState } from "react";
import { Playlist } from "@/types/types";
import { useMusic } from "@/app/context/MusicContext";

export const PlaylistList: React.FC = () => {
    const { assets, loadAssets, removeAsset } = useMusic();
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        loadAssets("playlist");
    }, [loadAssets]);

    useEffect(() => {
        setPlaylists(assets.playlist);
    }, [assets.playlist]);

    const handleRemovePlaylist = async (id: string) => {
        const confirmDelete = window.confirm(
            "Tem certeza que deseja remover esta playlist?"
        );
        if (confirmDelete) {
            await removeAsset("playlist", id);
        }
    };

    return (
        <div>
            <h1>Lista de Playlists</h1>
            {playlists.length === 0 ? (
                <p>Nenhuma playlist encontrada.</p>
            ) : (
                <ul>
                    {playlists.map((playlist: Playlist) => (
                        <li key={playlist.id}>
                            <div>
                                <strong>{playlist.name} </strong>
                                <button onClick={() => handleRemovePlaylist(playlist.id)}>
                                    Remover
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};