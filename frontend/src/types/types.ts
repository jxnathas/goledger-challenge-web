export type Artist = {
    '@assetType': 'artist';
    '@key': string;
    name: string;
    country: string;
};

export type Album = {
    '@assetType': 'album';
    '@key': string;
    name: string;
    year: number;
    artist: Artist;
};

export type Song = {
    '@assetType': 'song';
    '@key': string;
    name: string;
    album: Album;
};

export type Playlist = {
    '@assetType': 'playlist';
    '@key': string;
    name: string;
    songs: Song[];
};