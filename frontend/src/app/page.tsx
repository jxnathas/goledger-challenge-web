"use client";
import { useState } from "react";
import { MusicProvider } from "@/app/context/MusicContext";
import { AlbumList } from "@/components/Album/AlbumList";
import { ArtistList } from "@/components/Artist/ArtistList";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { PlaylistList } from "@/components/Playlist/PlaylistList";
import { Section } from "@/components/Section";
import { SongList } from "@/components/Song/SongList";
import { SidebarProvider } from "./context/SidebarContext";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { ActionBar } from "@/components/Sidebar/ActionBar";

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);

  const filterResultsByType = (type) => {
    return searchResults.filter((result) => result["@assetType"] === type);
  };

  return (
    <MusicProvider>
      <SidebarProvider>
        <Header setSearchResults={setSearchResults} />
        <Container
          leftSidebar={<Sidebar />}
          rightSidebar={<ActionBar />}
        >
          <Section title="Artists">
            <ArtistList searchResults={filterResultsByType("artist")} />
          </Section>
          <Section title="Albums">
            <AlbumList searchResults={filterResultsByType("album")} />
          </Section>
          <Section title="Songs">
            <SongList searchResults={filterResultsByType("song")} />
          </Section>
          <Section title="Playlists">
            <PlaylistList searchResults={filterResultsByType("playlist")} />
          </Section>
        </Container>
      </SidebarProvider>
    </MusicProvider>
  );
}