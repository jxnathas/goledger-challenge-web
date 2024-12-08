type SongCardProps = {
  name: string;
  album: string;
  image: string; 
};

export const SongCard: React.FC<SongCardProps> = ({ name, album, image }) => {
  return (
    <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform rounded-sm p-2 w-48">
      <img
        src={image}
        alt={`Cover of ${name}`}
        className="w-40 h-40 mb-2 rounded-md object-cover"
      />
      <p className="text-sm font-bold text-center">{name}</p>
      <p className="text-xs text-gray-600 text-center">{album}</p>
    </div>
  );
};
