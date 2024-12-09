"use client";
import { useSidebar } from "@/app/context/SidebarContext";
import { useMusic } from "@/app/context/MusicContext";
import { useEffect, useState } from "react";
import { AlbumCard } from "../Album/Album";
import { ArtistCard } from "../Artist/Artist";
import { PlaylistCard } from "../Playlist/Playlist";
import { SongCard } from "../Song/Song";
import { ActionButtons } from "./ActionButtons";
import { Modal } from "../Modal";
import { Asset, Artist } from "@/types/types";

export const ActionBar: React.FC = () => {
  const { sidebarContent, setRightSidebarVisible, setSidebarContent } = useSidebar();
  const { removeAsset, readAsset, editAsset } = useMusic();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (sidebarContent?.album?.artist?.["@key"]) {
      (async () => {
        try {
          const artistData = await readAsset("artist", sidebarContent.album.artist["@key"]);
          setArtist(artistData as Artist);
        } catch (err) {
          console.error("Erro ao carregar artista", err);
        }
      })();
    } else {
      setArtist(null);
    }
  }, [sidebarContent, readAsset]);

  const handleRemove = async () => {
    if (sidebarContent) {
      try {
        if (sidebarContent.album) {
          await removeAsset("album", sidebarContent.album["@key"]);
        } else if (sidebarContent.artist) {
          await removeAsset("artist", sidebarContent.artist["@key"]);
        } else if (sidebarContent.song) {
          await removeAsset("song", sidebarContent.song["@key"]);
        } else if (sidebarContent.playlist) {
          await removeAsset("playlist", sidebarContent.playlist["@key"]);
        }
        setSidebarContent(null);
        setRightSidebarVisible(false);
      } catch (err) {
        setErrorMessage(err.message);
      }
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSave = async (updatedItem: Asset) => {
    if (sidebarContent) {
      try {
        if (sidebarContent.album) {
          await editAsset("album", sidebarContent.album["@key"], updatedItem);
        } else if (sidebarContent.artist) {
          await editAsset("artist", sidebarContent.artist["@key"], updatedItem);
        } else if (sidebarContent.song) {
          await editAsset("song", sidebarContent.song["@key"], updatedItem);
        } else if (sidebarContent.playlist) {
          await editAsset("playlist", sidebarContent.playlist["@key"], updatedItem);
        }
        setSidebarContent(null);
        setRightSidebarVisible(false);
      } catch (err) {
        console.error("Erro ao editar item", err);
      }
    }
  };

  const renderCard = () => {
    if (sidebarContent) {
      if (sidebarContent.album) {
        return (
          <>
            <AlbumCard
              name={sidebarContent.album.name}
              artist={artist?.name || "Unknown Artist"}
              image={`https://picsum.photos/seed/${sidebarContent.album["@key"]}/200`}
            />
            <ActionButtons onEdit={handleEdit} onRemove={handleRemove} />
            {artist && (
              <ArtistCard
                name={artist.name}
                image={`https://picsum.photos/seed/${artist["@key"]}/200`}
              />
            )}
          </>
        );
      }
      if (sidebarContent.artist) {
        return (
          <>
            <ArtistCard
              name={sidebarContent.artist.name}
              image={`https://picsum.photos/seed/${sidebarContent.artist["@key"]}/200`}
            />
            <ActionButtons onEdit={handleEdit} onRemove={handleRemove} />
          </>
        );
      }
      if (sidebarContent.song) {
        return (
          <>
            <SongCard
              name={sidebarContent.song.name}
              image={`https://picsum.photos/seed/${sidebarContent.song["@key"]}/200`}
            />
            <ActionButtons onEdit={handleEdit} onRemove={handleRemove} />
          </>
        );
      }
      if (sidebarContent.playlist) {
        return (
          <>
            <PlaylistCard
              name={sidebarContent.playlist.name}
              image={`https://picsum.photos/seed/${sidebarContent.playlist["@key"]}/200`}
            />
            <ActionButtons onEdit={handleEdit} onRemove={handleRemove} />
          </>
        );
      }
    }
    return null;
  };

  return (
    <div className="bg-gray-100 shadow-lg w-64 h-screen p-6 flex flex-col justify-between">
      <button className="absolute top-1 right-2" onClick={() => setRightSidebarVisible(false)}>
        X
      </button>
      {sidebarContent && (
        <div className="flex flex-col items-center p-2 rounded-lg bg-gradient-to-bl from-gray-100 to-gray-300 relative">
          {renderCard()}
        </div>
      )}
      {errorMessage && (
        <div className="text-red-500 text-center mt-4">
          {errorMessage}
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        item={sidebarContent}
      />
    </div>
  );
};