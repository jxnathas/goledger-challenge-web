"use client";
import { createContext, useContext, useState } from 'react';
import { Artist, Album, Song, Playlist } from '@/types/types';
import { api } from "../../../services/api";

type MusicContextType = {
    artists: Artist[];
    loadArtists: () => Promise<void>;
    addArtist: (artist: Artist) => Promise<void>;
    removeArtist: (id: string) => Promise<void>;
    
    albums: Album[];
    loadAlbums: () => Promise<void>;
    addAlbum: (album: Album) => Promise<void>;
    removeAlbum: (id: string) => Promise<void>;
    
    songs: Song[];
    loadSongs: () => Promise<void>;
    addSong: (song: Song) => Promise<void>;
    removeSong: (id: string) => Promise<void>;
    
    playlists: Playlist[];
    loadPlaylists: () => Promise<void>;
    addPlaylist: (playlist: Playlist) => Promise<void>;
    removePlaylist: (id: string) => Promise<void>;
};

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [songs, setSongs] = useState<Song[]>([]);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    const loadArtists = async () => {
        try {
          const response = await api.get('/query/getSchema');
          setArtists(response.data.artists || []);
        } catch (error) {
          console.error('Erro ao carregar artistas:', error);
        }
      };
    
      const loadAlbums = async () => {
        try {
          const response = await api.get('/query/getSchema');
          setAlbums(response.data.albums || []);
        } catch (error) {
          console.error('Erro ao carregar álbuns:', error);
        }
      };
    
      const loadSongs = async () => {
        try {
          const response = await api.get('/query/getSchema');
          setSongs(response.data.songs || []);
        } catch (error) {
          console.error('Erro ao carregar músicas:', error);
        }
      };
    
      const loadPlaylists = async () => {
        try {
          const response = await api.get('/query/getSchema');
          setPlaylists(response.data.playlists || []);
        } catch (error) {
          console.error('Erro ao carregar playlists:', error);
        }
      };

    const addArtist = async (artist: Artist) => {
        try {
            const response = await api.post('invoke/createAsset', artist);
            setArtists((prev) => [...prev, response.data]);
        } catch (err) {
            console.error('Erro ao adicionar artista',err);
        }
    };

    const removeArtist = async (id: string) => {
        try {
            await api.post('invoke/deleteAsset', { id });
            setArtists((prev) => prev.filter((artist) => artist.id !== id));
        } catch (err) {
            console.error('Erro ao remover artista',err);
        }
    };

    const addAlbum = async (album: Album) => {
        try {
            const response = await api.post('invoke/createAsset', album);
            setAlbums((prev) => [...prev, response.data]);
        } catch (err) {
            console.error('Erro ao adicionar album',err);
        }
    };

    const removeAlbum = async (id: string) => {
        try {
            await api.post('invoke/deleteAsset', { id });
            setAlbums((prev) => prev.filter((album) => album.id !== id));
        } catch (err) {
            console.error('Erro ao remover album',err);
        }
    };

    const addSong = async (song: Song) => {
        try {
            const response = await api.post('invoke/createAsset', song);
            setSongs((prev) => [...prev, response.data]);
        } catch (err) {
            console.error('Erro ao adicionar musica',err);
        }
    };

    const removeSong = async (id: string) => {
        try {
            await api.post('invoke/deleteAsset', { id });
            setSongs((prev) => prev.filter((song) => song.id !== id));
        } catch (err) {
            console.error('Erro ao remover musica',err);
        }
    };

    const addPlaylist = async (playlist: Playlist) => {
        try {
            const response = await api.post('invoke/createAsset', playlist);
            setPlaylists((prev) => [...prev, response.data]);
        } catch (err) {
            console.error('Erro ao adicionar playlist',err);
        }
    };

    const removePlaylist = async (id: string) => {
        try {
            await api.post('invoke/deleteAsset', { id });
            setPlaylists((prev) => prev.filter((playlist) => playlist.id !== id));
        } catch (err) {
            console.error('Erro ao remover playlist',err);
        }
    };

    return (
        <MusicContext.Provider
            value={{
                artists,
                loadArtists,
                addArtist,
                removeArtist,
                albums,
                loadAlbums,
                addAlbum,
                removeAlbum,
                songs,
                loadSongs,
                addSong,
                removeSong,
                playlists,
                loadPlaylists,
                addPlaylist,
                removePlaylist,
            }}
    >
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