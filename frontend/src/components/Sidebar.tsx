import { IoMdDisc } from "react-icons/io";
import { MdAddBox, MdFavorite, MdHome, MdLibraryMusic, MdOutlineSurfing } from "react-icons/md";

export const Sidebar = () => (
    <aside className="w-20 h-screen bg-gradient-to-bt from-gray-100 to-gray-300 text-darkcyan flex flex-col items-center py-4 space-y-6 rounded-md shadow-lg">
    <nav>
        <ul className="space-y-4">
            <li>
                <a href="/" className="flex flex-col items-center hover:text-gray-700" title="Home">
                    <MdHome className="text-3xl" />
                    <span className="font-bold text-lg">Home</span>
                </a>
            </li>
            <li>
                <a href="/artists" className="flex flex-col items-center hover:text-gray-700" title="Artists">
                    <MdOutlineSurfing className="text-3xl" />
                    <span className="font-bold text-lg">Artists</span>
                </a>
            </li>
            <li>
                <a href="/albums" className="flex flex-col items-center hover:text-gray-700" title="Albums">
                    <IoMdDisc className="text-3xl" />
                    <span className="font-bold text-lg">Albums</span>
                </a>
            </li>
            <li>
                <a href="/songs" className="flex flex-col items-center hover:text-gray-700" title="Songs">
                    <MdLibraryMusic className="text-3xl" />
                    <span className="font-bold text-lg">Songs</span>
                </a>
            </li>
            <li>
                <a href="/playlists" className="flex flex-col items-center hover:text-gray-700" title="Playlists">
                    <MdFavorite className="text-3xl" />
                    <span className="font-bold text-lg">Playlists</span>
                </a>
            </li>
            <li>
                <a href="/add" className="flex flex-col items-center hover:text-gray-700" title="Add">
                    <MdAddBox className="text-3xl" />
                    <span className="font-bold text-lg">Add</span>
                </a>
            </li>
        </ul>
    </nav>
</aside>
);
