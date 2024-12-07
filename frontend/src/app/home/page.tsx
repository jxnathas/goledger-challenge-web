import { MusicProvider } from "@/app/context/MusicContext";
import { AlbumList } from "@/components/AlbumList";
import { ArtistList } from "@/components/ArtistList";
import { Header } from "@/components/Header";
import { PlaylistList } from "@/components/PlaylistList";
import { Section } from "@/components/Section";
import { SongList } from "@/components/SongList";

export default function Home() {
  return (
      <MusicProvider>
            <div className="rounded-lg bg-gradient-to-r from-gray-300 to-gray-200 p-4">
            <Header/>
            <Section title="Artists">
              <ArtistList/>
            </Section>
            <Section title="Albums">
              <AlbumList/>
            </Section>
            <Section title="Songs">
              <SongList/>
            </Section>
            <Section title="Playlists">
              <PlaylistList/>
            </Section>
            </div>
      </MusicProvider>
  );
}
