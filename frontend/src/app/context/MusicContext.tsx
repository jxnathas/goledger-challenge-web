"use client";

import React, { createContext, useCallback, useContext, useState, useRef } from "react";
import { Artist, Album, Song, Playlist } from "@/types/types";
import { api } from "../../../services/api";

type AssetType = "artist" | "album" | "song" | "playlist";
type Asset = Artist | Album | Song | Playlist;

interface MusicContextType {
    assets: Record<AssetType, Asset[]>;
    loadAssets: (assetType: AssetType) => Promise<void>;
    addAsset: (assetType: AssetType, asset: Asset) => Promise<void>;
    removeAsset: (assetType: AssetType, key: string) => Promise<void>;
    editAsset: (assetType: AssetType, key: string, updatedAsset: Asset) => Promise<void>;
    readAsset: (assetType: AssetType, key: string) => Promise<Asset | undefined>;
    searchAssets: (query: string) => Promise<Asset[]>;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [assets, setAssets] = useState<Record<AssetType, Asset[]>>({
        artist: [],
        album: [],
        song: [],
        playlist: [],
    });

    const cache = useRef<Record<string, Asset[]>>({});

    const loadAssets = useCallback(async (assetType: AssetType) => {
        if (cache.current[assetType]) {
            setAssets((prev) => ({ ...prev, [assetType]: cache.current[assetType] }));
            return;
        }

        try {
            const response = await api.post("query/search", {
                query: { selector: { "@assetType": assetType } },
            });
            cache.current[assetType] = response.data.result;
            setAssets((prev) => ({ ...prev, [assetType]: response.data.result }));
        } catch (error) {
            console.error(`Error loading ${assetType}s:`, error);
        }
    }, []);

    const readAsset = useCallback(async (assetType: AssetType, key: string) => {
        try {
            const response = await api.post("query/readAsset", {
                key: {
                    "@assetType": assetType,
                    "@key": key,
                },
            });
            return response.data as Asset;
        } catch (error) {
            console.error(`Error loading ${assetType} with key ${key}:`, error);
            return undefined;
        }
    }, []);

    const addAsset = useCallback(async (assetType: AssetType, asset: Asset) => {
        try {
            const response = await api.post("invoke/createAsset", asset);
            setAssets((prev) => ({
                ...prev,
                [assetType]: [...prev[assetType], response.data],
            }));
            cache.current[assetType] = [...(cache.current[assetType] || []), response.data];
        } catch (error) {
            console.error(`Error adding ${assetType}:`, error);
        }
    }, []);

    const removeAsset = useCallback(async (assetType: AssetType, key: string) => {
        try {
            // Verificar referências
            let hasReferences = false;
            if (assetType === "artist") {
                // Verificar referências em álbuns
                const albums = assets.album.filter(album => album.artist["@key"] === key);
                if (albums.length > 0) hasReferences = true;
            } else if (assetType === "album") {
                // Verificar referências em músicas
                const songs = assets.song.filter(song => song.album["@key"] === key);
                if (songs.length > 0) hasReferences = true;
            } else if (assetType === "playlist") {
                // Verificar referências em playlists
                const playlists = assets.playlist.filter(playlist => 
                    playlist.songs.some(song => song["@key"] === key)
                );
                if (playlists.length > 0) hasReferences = true;
            }

            if (hasReferences) {
                throw new Error("Cannot delete asset: another asset holds a reference to this one.");
            }

            // Deletar o asset
            await api.post("invoke/deleteAsset", {
                key: {
                    "@assetType": assetType,
                    "@key": key,
                },
            });
            setAssets((prev) => ({
                ...prev,
                [assetType]: prev[assetType].filter((item) => item["@key"] !== key),
            }));
            cache.current[assetType] = cache.current[assetType].filter((item) => item["@key"] !== key);
        } catch (error) {
            console.error(`Error removing ${assetType}:`, error);
            throw error;
        }
    }, [assets]);

    const editAsset = useCallback(async (assetType: AssetType, key: string, updatedAsset: Asset) => {
        try {
            const response = await api.put(`/invoke/updateAsset/${key}`, updatedAsset);
            setAssets((prev) => ({
                ...prev,
                [assetType]: prev[assetType].map((item) =>
                    item["@key"] === key ? { ...item, ...response.data } : item
                ),
            }));
            cache.current[assetType] = cache.current[assetType].map((item) =>
                item["@key"] === key ? { ...item, ...response.data } : item
            );
        } catch (error) {
            console.error(`Error editing ${assetType}:`, error);
        }
    }, []);

    const searchAssets = useCallback(async (query: string) => {
        try {
            const response = await api.post("query/search", {
                query: { selector: { name: { $regex: query } } },
            });
            return response.data.result as Asset[];
        } catch (error) {
            console.error(`Error searching assets:`, error);
            return [];
        }
    }, []);

    return (
        <MusicContext.Provider
            value={{ assets, loadAssets, addAsset, removeAsset, editAsset, readAsset, searchAssets }}
        >
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = (): MusicContextType => {
    const context = useContext(MusicContext);
    if (!context) {
        throw new Error("useMusic must be used within a MusicProvider");
    }
    return context;
};