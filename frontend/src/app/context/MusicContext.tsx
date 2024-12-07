"use client";
import { createContext, useContext, useState } from 'react';
import { Artist, Album, Song, Playlist } from '@/types/types';
import { api } from "../../../services/api";

type AssetType = 'artist' | 'album' | 'song' | 'playlist';

type MusicContextType = {
    assets: Record<AssetType, any[]>;
    loadAssets: (assetType: AssetType) => Promise<void>;
    addAsset: (assetType: AssetType, asset: any) => Promise<void>;
    removeAsset: (assetType: AssetType, id: string) => Promise<void>;
    editAsset: (assetType: AssetType, id: string, updatedAsset: any) => Promise<void>;
};

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [assets, setAssets] = useState<Record<AssetType, any[]>>({
        artist: [],
        album: [],
        song: [],
        playlist: [],
    });

    const loadAssets = async (assetType: AssetType) => {
        try {
            const response = await api.post('query/search', {
                query: { selector: { "@assetType": assetType } },
            });
            console.log(response.data.result);
            const transformedData = (response.data.result || []).map((item: any) => ({
                ...item,
                id: item['@key'].replace('album:', ''),
            }));
            setAssets((prev) => ({ ...prev, [assetType]: transformedData }));
        } catch (error) {
            console.error(`Erro ao carregar ${assetType}s:`, error);
        }
    };

    const addAsset = async (assetType: AssetType, asset: any) => {
        try {
            const response = await api.post('invoke/createAsset', asset);
            setAssets((prev) => ({
                ...prev,
                [assetType]: [...prev[assetType], response.data],
            }));
        } catch (err) {
            console.error(`Erro ao adicionar ${assetType}`, err);
        }
    };

    const removeAsset = async (assetType: AssetType, id: string) => {
        try {
            await api.post('invoke/deleteAsset', { id });
            setAssets((prev) => ({
                ...prev,
                [assetType]: prev[assetType].filter((item) => item.id !== id),
            }));
        } catch (err) {
            console.error(`Erro ao remover ${assetType}`, err);
        }
    };

    const editAsset = async (assetType: AssetType, id: string, updatedAsset: any) => {
        try {
            const response = await api.put(`/invoke/updateAsset/${id}`, updatedAsset);
            setAssets((prev) => ({
                ...prev,
                [assetType]: prev[assetType].map((item) =>
                    item.id === id ? { ...item, ...response.data } : item
                ),
            }));
        } catch (error) {
            console.error(`Erro ao editar ${assetType}:`, error);
        }
    };

    return (
        <MusicContext.Provider value={{ assets, loadAssets, addAsset, removeAsset, editAsset }}>
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (!context) {
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
};
