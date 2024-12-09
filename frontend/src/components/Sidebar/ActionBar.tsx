"use client";
import { useSidebar } from "@/app/context/SidebarContext";
import { useMusic } from "@/app/context/MusicContext";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { ArtistCard } from "../Artist/Artist";
import { AlbumCard } from "../Album/Album";
import { PlaylistCard } from "../Playlist/Playlist";
import { SongCard } from "../Song/Song";

type ActionBarProps = {
  children: React.ReactNode;
};

export const ActionBar: React.FC<ActionBarProps> = ({ children }) => {
  const { sidebarContent } = useSidebar();
  const { removeAsset } = useMusic();

  const handleRemove = async () => {
    if (sidebarContent) {
      if (sidebarContent.album) {
        await removeAsset('album', sidebarContent.album['@key']);
      }
      if (sidebarContent.artist) {
        await removeAsset('artist', sidebarContent.artist['@key']);
      }
      if (sidebarContent.track) {
        await removeAsset('song', sidebarContent.song['@key']);
      }
      if (sidebarContent.playlist) {
        await removeAsset('playlist', sidebarContent.playlist['@key']);
      }
    }
  };

  const renderCard = () => {
    if (sidebarContent) {
      if (sidebarContent.album) {
        return <AlbumCard name={sidebarContent.album.name} artist={sidebarContent.album.artist} image={`https://picsum.photos/seed/${sidebarContent.album['@key']}/200`} />;
      }
      if (sidebarContent.artist) {
        return <ArtistCard name={sidebarContent.artist.name} image={`https://picsum.photos/seed/${sidebarContent.artist['@key']}/200`} />;
      }
      if (sidebarContent.song) {
        return <SongCard name={sidebarContent.song.name} image={`https://picsum.photos/seed/${sidebarContent.song['@key']}/200`} />;
      }
      if (sidebarContent.playlist) {
        return <PlaylistCard name={sidebarContent.playlist.name} image={`https://picsum.photos/seed/${sidebarContent.playlist['@key']}/200`} />;
      }
    }
    return null;
  };
  
  const handleEdit = (): void => {
    console.log('Edit');
  }

  return (
    <div className="bg-gray-100 shadow-lg w-64 h-screen p-4 flex flex-col justify-between">
      {sidebarContent && (
      <div className="flex flex-col items-center rounded-lg bg-gradient-to-bl from-gray-100 to-gray-300 relative">
        <button className="absolute top-2 right-2" onClick={handleEdit}><IoMdCreate /></button>
        {renderCard()}
        <button className="absolute bottom-2 right-2" onClick={handleRemove}><IoMdTrash /></button>
      </div>
      )}
      {children}
    </div>
  );
}
