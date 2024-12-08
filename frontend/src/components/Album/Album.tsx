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
    <p className="text-sm font-bold text-center break-words">{name}</p>
    <p className="text-xs font-bold text-gray-600 text-center">{artist}</p>
  </div>
);

type PlaylistCardProps = {
    name: string;
    image: string;
  };
  
export const PlaylistCard: React.FC<PlaylistCardProps> = ({ name, image }) => (
  <div
    className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform rounded-sm p-2 w-48"
  >
    <img
      src={image}
      alt={`Cover of playlist ${name}`}
      className="w-40 h-40 mb-2 rounded-md object-cover"
    />
    <p className="text-sm font-bold text-center break-words">{name}</p>
  </div>
);

type ArtistCardProps = {
    name: string;
    image: string;
};

export const ArtistCard: React.FC<ArtistCardProps> = ({ name, image }) => (
    <div
        className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform rounded-sm p-2 w-48"
    >
        <img
            src={image}
            alt={`Artist ${name}`}
            className="rounded-full w-40 h-40 mb-2 object-cover"
        />
        <p className="text-sm font-bold text-center break-words">{name}</p>
    </div>
);

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
      <p className="text-sm font-bold text-center break-words">{name}</p>
      <p className="text-xs text-gray-600 text-center">{album}</p>
    </div>
  );
};