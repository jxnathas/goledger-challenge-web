"use client";
import { useEffect, useState } from "react";
import { useMusic } from "../app/context/MusicContext";
import { api } from "../../services/api";

const Artists: React.FC = () => {
    const { artists, loadArtists, addArtist, removeArtist } = useMusic();
    const [newArtistName, setNewArtistName] = useState('');
    const [newArtistCountry, setNewArtistCountry] = useState('');

    useEffect(() => {
        loadArtists();
    }, []);

    const handleAddArtist = async () => {
        await addArtist({ 
            id: '',
            name: newArtistName,
            country: newArtistCountry
        });
        setNewArtistName('');
        setNewArtistCountry('');
    }
    
    return (
        <div>
            <h1>Artistas</h1>
            <ul>
                {artists.map((artist) => (
                    <li key={artist.id}>{artist.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Artists;