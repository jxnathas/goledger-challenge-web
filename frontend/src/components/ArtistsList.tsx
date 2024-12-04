"use client";

import { useEffect, useState } from "react";
import { api } from "../../services/api";

type Artist = {
    id: string;
    name: string;
};

const Artists: React.FC = () => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const fetchArtists = async () => {
        try {
            const response = await api.post("/api/query/search", {
                query:{
                    selector: {
                        "@assetType": "artist",
                    },
                },
            });
            
            const artistsData = response.data.result.map((artist: any) => ({
                id: artist["@key"].replace("artist:", ""),
                name: artist.name,
            }));

            setArtists(artistsData);

        } catch (err) {
            setError(err+" Erro ao buscar artista");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArtists();
    }, []);

    if (loading) return <div>Carregando artistas...</div>;
    if (error) return <div>{error}</div>;

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