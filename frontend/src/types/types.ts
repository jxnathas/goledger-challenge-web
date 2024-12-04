export type Artist = {
    id: string;
    name: string;
    country: string;
};

export type Album = {
    id: string;
    name: string;
    artist: Artist;
};
  
export type Song = {
    id: string;
    name: string;
    album: Album;
};
  
export type Playlist = {
    id: string;
    name: string;
    songs: Song[];
};