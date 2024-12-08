import { MusicProvider } from "@/app/context/MusicContext";
import { AlbumList } from "@/components/Album/AlbumList";
import { ArtistList } from "@/components/Artist/ArtistList";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { PlaylistList } from "@/components/Playlist/PlaylistList";
import { Section } from "@/components/Section";
import { Sidebar } from "@/components/Sidebar";
import { SongList } from "@/components/Song/SongList";
import { SidebarProvider } from "./context/SidebarContext";

export default function Home() {
  return (
    <MusicProvider>
      <Header />
      <SidebarProvider>
      <Container
        leftSidebar={<Sidebar />}
        rightSidebar={<div>Barra de informações ou ações</div>}
      >  
        <Section title="Artists">
          <ArtistList />
        </Section>
        <Section title="Albums">
          <AlbumList />
        </Section>
        <Section title="Songs">
          <SongList />
        </Section>
        <Section title="Playlists">
          <PlaylistList />
        </Section>
      </Container>
      </SidebarProvider>
    </MusicProvider>
  );
}
