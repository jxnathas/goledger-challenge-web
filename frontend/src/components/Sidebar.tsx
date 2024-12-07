import { IoMdDisc } from "react-icons/io";
import { MdAddBox, MdFavorite, MdHome, MdLibraryMusic } from "react-icons/md";

export const Sidebar = () => (

    <aside className="w-64 h-full bg-darkcyan rounded-lg text-white flex flex-col p-4">
        <nav>
            <ul className="space-y-4">
                <li>
                    <a href="/" className="flex items-center space-x-2 hover:text-gray-400">
                        <MdHome />
                        <span>Home</span>
                    </a>
                </li>
                <li>
                    <a href="/artists" className="flex items-center space-x-2 hover:text-gray-400">
                        <span>Artists</span>
                    </a>
                </li>
                <li>
                    <a href="/albums" className="flex items-center space-x-2 hover:text-gray-400">
                        <IoMdDisc />
                        <span>Albums</span>
                    </a>
                </li>
                <li>
                    <a href="/songs" className="flex items-center space-x-2 hover:text-gray-400">
                        <MdLibraryMusic />
                        <span>Songs</span>
                    </a>
                </li>
                <li>
                    <a href="/playlists" className="flex items-center space-x-2 hover:text-gray-400">
                        <MdFavorite />
                        <span>Playlists</span>
                    </a>
                </li>
                <li>
                    <a href="/add" className="flex items-center space-x-2 hover:text-gray-400">
                        <MdAddBox />
                        <span>Add</span>
                    </a>
                </li>
            </ul>
        </nav>
    </aside>
);