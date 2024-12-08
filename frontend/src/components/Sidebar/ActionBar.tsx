"use client";
import { useSidebar } from "@/app/context/SidebarContext";
import { useMusic } from "@/app/context/MusicContext";

type ActionBarProps = {
  children: React.ReactNode;
};

export const ActionBar: React.FC<ActionBarProps> = ({ children }) => {
  const { sidebarContent } = useSidebar();
  const { removeAsset } = useMusic();

  const handleRemove = async () => {
    if (sidebarContent) {
      await removeAsset('album', sidebarContent.album['@key']);
      await removeAsset('artist', sidebarContent.artist['@key']);
    }
  };

  return (
    <div className="bg-gray-100 shadow-lg w-64 h-screen p-4 flex flex-col justify-between">
      {sidebarContent && (
        <div>
          <h3>{sidebarContent.album.name}</h3>
          <p>{sidebarContent.artist.name}</p>
          <button onClick={handleRemove}>Remove</button>
        </div>
      )}
      {children}
    </div>
  );
};