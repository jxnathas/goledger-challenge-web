# GoMusic

GoMusic is a web application for music streaming that allows adding, editing, removing, and viewing artists, albums, songs, and playlists.

## Server

The data is obtained using a REST server

## Running the Project

```bash
git clone
```

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```
Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Project Structure
```markdown
frontend/
    ├── .next/
    ├── services/
    │   └── api.ts
    ├── src/
    │   ├── app/
    │   │   ├── context/
    │   │   │   └── MusicContext.tsx
    │   │   │   └── SidebarContext.tsx
    │   │   ├── fonts/
    │   │   ├── page.tsx
    │   │   ├── layout.css
    │   ├── components/
    │   │   ├── Album/
    │   │   │   └── AlbumList.tsx
    │   │   ├── Artist/
    │   │   │   └── ArtistList.tsx
    │   │   ├── Playlist/
    │   │   │   └── PlaylistList.tsx
    │   │   ├── Sidebar/
    │   │   │   └── ActionBar.tsx
    │   │   ├── Song/
    │   │   │   └── SongList.tsx
    │   └── types/
    │       └── types.ts
```
