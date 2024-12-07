type PlaylistProps = {
    title: string;
    description: string;
    image: string;
  };
  
export const Playlist: React.FC<PlaylistProps> = ({ title, description, image }) => {
    return (
      <div
        className="flex flex-col items-center bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer"
      >
        <img
          src={image}
          alt={`Cover of playlist ${title}`}
          className="w-32 h-32 rounded-lg object-cover mb-4"
        />
        <h3 className="text-white font-bold text-lg text-center">{title}</h3>
        <p className="text-gray-400 text-sm text-center mt-1">{description}</p>
      </div>
    );
  };
  
  export default Playlist;