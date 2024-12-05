import Image from "next/image";
import { ArtistList } from "@/components/ArtistList";
import { MusicProvider } from "./context/MusicContext";
import { AlbumList } from "@/components/AlbumList";
import { SongList } from "@/components/SongList";
import { PlaylistList } from "@/components/PlaylistList";

export default function Home() {
  return (
      <MusicProvider>
          <div>
              <h1>Music App</h1>
             {/* <ArtistList /> */}
             {/* <AlbumList /> */}
             {/* <SongList /> */}
             {/* <PlaylistList /> */}
          </div>
      </MusicProvider>
  );
}
