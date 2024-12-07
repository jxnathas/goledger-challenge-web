import { MusicProvider } from "@/app/context/MusicContext";
import { AlbumList } from "@/components/AlbumList";
import { ArtistList } from "@/components/ArtistList";
import { Header } from "@/components/Header";
import { Section } from "@/components/Section";

export default function Home() {
  return (
      <MusicProvider>
          <div>
            <Header/>
          </div>
      </MusicProvider>
  );
}
