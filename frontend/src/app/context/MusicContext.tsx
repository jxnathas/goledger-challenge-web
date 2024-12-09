"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
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
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [assets, setAssets] = useState<Record<AssetType, Asset[]>>({
        artist: [],
        album: [],
        song: [],
        playlist: [],
    });

    const loadAssets = useCallback(async (assetType: AssetType) => {
        try {
            const response = await api.post("query/search", {
                query: { selector: { "@assetType": assetType } },
            });
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
        } catch (error) {
            console.error(`Error adding ${assetType}:`, error);
        }
    }, []);

    const removeAsset = useCallback(async (assetType: AssetType, key: string) => {
        try {
            await api.post("invoke/deleteAsset", { key });
            setAssets((prev) => ({
                ...prev,
                [assetType]: prev[assetType].filter((item) => item["@key"] !== key),
            }));
        } catch (error) {
            console.error(`Error removing ${assetType}:`, error);
        }
    }, []);

    const editAsset = useCallback(async (assetType: AssetType, key: string, updatedAsset: Asset) => {
        try {
            const response = await api.put(`/invoke/updateAsset/${key}`, updatedAsset);
            setAssets((prev) => ({
                ...prev,
                [assetType]: prev[assetType].map((item) =>
                    item["@key"] === key ? { ...item, ...response.data } : item
                ),
            }));
        } catch (error) {
            console.error(`Error editing ${assetType}:`, error);
        }
    }, []);

    return (
        <MusicContext.Provider
            value={{ assets, loadAssets, addAsset, removeAsset, editAsset, readAsset }}
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
