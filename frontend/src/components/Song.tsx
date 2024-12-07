type SongProps = {
    title: string;
    artist: string;
    image: string; 
  };
  
export const Song: React.FC<SongProps> = ({ title, artist, image }) => {
    return (
      <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
        <img
          src={image}
          alt={`Cover of ${title}`}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex flex-col">
          <span className="text-white font-semibold">{title}</span>
          <span className="text-gray-400 text-sm">{artist}</span>
        </div>
      </div>
    );
  };