
type AlbumCardProps = {
    name: string;
    artist: string;
    image: string;
};

export const AlbumCard: React.FC<AlbumCardProps> = ({ name, artist, image }) => (
  <div
    className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform rounded-sm p-2 w-48"
  >
    <img
      src={image}
      alt={`Album ${name}`}
      className="w-40 h-40 mb-2 rounded-md object-cover"
    />
    <p className="text-sm font-bold text-center">{name}</p>
    <p className="text-xs font-bold  text-gray-600 text-center">{artist}</p>
  </div>
);
  