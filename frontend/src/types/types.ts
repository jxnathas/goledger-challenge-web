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
    artist: {
        '@assetType': 'artist';
        '@key': string;
    };
};

export type Song = {
    '@assetType': 'song';
    '@key': string;
    name: string;
    album: {
        '@assetType': 'album';
        '@key': string;
    };
};

export type Playlist = {
    '@assetType': 'playlist';
    '@key': string;
    name: string;
    songs: {
        '@assetType': 'song';
        '@key': string;
    }[];
};
