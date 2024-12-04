import { MusicProvider } from "./context/MusicContext";
import Image from "next/image";
import ArtistsList from "@/components/ArtistsList";

export default function Home() {
  return (
      <MusicProvider>
          <div>
              <h1>Music App</h1>
              <ArtistsList />
          </div>
      </MusicProvider>
  );
}
