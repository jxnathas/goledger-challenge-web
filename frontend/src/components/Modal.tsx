import React, { useState, useEffect } from 'react';
import { Asset, Artist, Album, Song, Playlist } from '@/types/types';
import { useMusic } from '@/app/context/MusicContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newItem: Asset) => void;
  assetType: 'artist' | 'album' | 'song' | 'playlist';
  item?: Asset;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, item, assetType }) => {
  const [newItem, setNewItem] = useState<Partial<Asset>>({});
  const { assets, loadAssets } = useMusic();

  useEffect(() => {
    if (item) {
      setNewItem(item);
    } else {
      setNewItem({});
    }
  }, [item, assetType, isOpen]);

  useEffect(() => {
    if (assetType === 'album' || assetType === 'song') {
      loadAssets('artist');
    }
    if (assetType === 'song' || assetType === 'playlist') {
      loadAssets('album');
    }
    if (assetType === 'playlist') {
      loadAssets('song');
    }
  }, [assetType, loadAssets]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(newItem as Asset);
    onClose();
  };

  if (!isOpen) return null;

  const renderFields = () => {
    switch (assetType) {
      case 'artist':
        return (
          <>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={(newItem as Artist).name || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={(newItem as Artist).country || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
          </>
        );
      case 'album':
        return (
          <>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={(newItem as Album).name || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="number"
              name="year"
              value={(newItem as Album).year || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <label className="block text-sm font-medium text-gray-700">Artist</label>
            <select
              name="artist"
              value={(newItem as Album).artist?.["@key"] || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            >
              <option value="">Select an artist</option>
              {assets.artist.map((artist) => (
                <option key={artist["@key"]} value={artist["@key"]}>
                  {artist.name}
                </option>
              ))}
            </select>
          </>
        );
      case 'song':
        return (
          <>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={(newItem as Song).name || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <label className="block text-sm font-medium text-gray-700">Album</label>
            <select
              name="album"
              value={(newItem as Song).album?.["@key"] || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            >
              <option value="">Select an album</option>
              {assets.album.map((album) => (
                <option key={album["@key"]} value={album["@key"]}>
                  {album.name}
                </option>
              ))}
            </select>
          </>
        );
      case 'playlist':
        return (
          <>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={(newItem as Playlist).name || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <label className="block text-sm font-medium text-gray-700">Songs</label>
            <select
              name="songs"
              multiple
              value={(newItem as Playlist).songs?.map(song => song["@key"]) || []}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            >
              {assets.song.map((song) => (
                <option key={song["@key"]} value={song["@key"]}>
                  {song.name}
                </option>
              ))}
            </select>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Add {assetType}</h2>
        {renderFields()}
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-teal-700 text-white rounded hover:bg-teal-800">Save</button>
        </div>
      </div>
    </div>
  );
};