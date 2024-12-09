import { IoMdDisc, IoMdMicrophone } from "react-icons/io";
import { MdAddBox, MdFavorite, MdHome, MdLibraryMusic } from "react-icons/md";
import { useState } from "react";
import { Modal } from "../Modal";
import { Asset } from "@/types/types";

export const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assetType, setAssetType] = useState<'artist' | 'album' | 'song' | 'playlist'>('artist');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAddClick = (type: 'artist' | 'album' | 'song' | 'playlist') => {
    setAssetType(type);
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleSave = (newItem: Asset) => {
    console.log("Saving new item:", newItem);
    setIsModalOpen(false);
  };

  return (
    <aside className="w-40 h-screen bg-gradient-to-bl from-gray-100 to-gray-300 text-teal-700 flex flex-col items-center py-4 space-y-6 rounded-md shadow-lg">
      <nav>
        <ul className="space-y-4">
          <li className="p-2 w-full">
            <a href="/" className="flex items-center hover:text-teal-500" title="Home">
              <MdHome className="text-3xl mr-2" />
              <span className="font-bold text-lg">Home</span>
            </a>
          </li>
          <li className="p-2">
            <a href="/artists" className="flex items-center hover:text-teal-500" title="Artists">
              <IoMdMicrophone className="text-3xl mr-2" />
              <span className="font-bold text-lg">Artists</span>
            </a>
          </li>
          <li className="p-2">
            <a href="/albums" className="flex items-center hover:text-teal-500" title="Albums">
              <IoMdDisc className="text-3xl mr-2" />
              <span className="font-bold text-lg">Albums</span>
            </a>
          </li>
          <li className="p-2">
            <a href="/songs" className="flex items-center hover:text-teal-500" title="Songs">
              <MdLibraryMusic className="text-3xl mr-2" />
              <span className="font-bold text-lg">Songs</span>
            </a>
          </li>
          <li className="p-2">
            <a href="/playlists" className="flex items-center hover:text-teal-500" title="Playlists">
              <MdFavorite className="text-3xl mr-2" />
              <span className="font-bold text-lg">Playlists</span>
            </a>
          </li>
          <li className="p-2 relative">
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center hover:text-teal-500 cursor-pointer"
              title="Add"
            >
              <MdAddBox className="text-3xl mr-2" />
              <span className="font-bold text-lg">Add</span>
              {isDropdownOpen && (
                <ul className="absolute left-full ml-2 mt-2 w-40 bg-gradient-to-bl from-gray-100 to-gray-300 border border-gray-300 rounded-lg shadow-lg">
                  <li className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg" onClick={() => handleAddClick('artist')}>Artist</li>
                  <li className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg" onClick={() => handleAddClick('album')}>Album</li>
                  <li className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg" onClick={() => handleAddClick('song')}>Song</li>
                  <li className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg" onClick={() => handleAddClick('playlist')}>Playlist</li>
                </ul>
              )}
            </div>
          </li>
        </ul>
      </nav>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        assetType={assetType}
      />
    </aside>
  );
};