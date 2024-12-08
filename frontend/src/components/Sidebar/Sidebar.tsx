import { IoMdDisc } from "react-icons/io";
import { MdAddBox, MdFavorite, MdHome, MdLibraryMusic, MdOutlineSurfing } from "react-icons/md";

export const Sidebar = () => (
    <aside className="w-40 h-screen bg-gradient-to-bl from-gray-100 to-gray-300 text-teal-700 flex flex-col items-center py-4 space-y-6 rounded-md shadow-lg">
    <nav>
        <ul className="space-y-4">
            <li className="p-2 w-full">
                <a href="/" className="flex items-center hover:text-teal-500" title="Home">
                    <MdHome className="text-3xl mr-2" />
                    <span className="font-bold text-lg">Home</span>
                </a>
            </li>
            <li className="p-2">
                <a href="/artists" className="flex items-center hover:text-teal-500" title="Artists">
                    <MdOutlineSurfing className="text-3xl mr-2" />
                    <span className="font-bold text-lg">Artists</span>
                </a>
            </li>
            <li className="p-2">
                <a href="/albums" className="flex items-center hover:text-teal-500" title="Albums">
                    <IoMdDisc className="text-3xl mr-2" />
                    <span className="font-bold text-lg">Albums</span>
                </a>
            </li>
            <li className="p-2">
                <a href="/songs" className="flex items-center hover:text-teal-500" title="Songs">
                    <MdLibraryMusic className="text-3xl mr-2" />
                    <span className="font-bold text-lg">Songs</span>
                </a>
            </li>
            <li className="p-2">
                <a href="/playlists" className="flex items-center hover:text-teal-500" title="Playlists">
                    <MdFavorite className="text-3xl mr-2" />
                    <span className="font-bold text-lg">Playlists</span>
                </a>
            </li>
            <li className="p-2">
                <a href="/add" className="flex items-center hover:text-teal-500" title="Add">
                    <MdAddBox className="text-3xl mr-2" />
                    <span className="font-bold text-lg">Add</span>
                </a>
            </li>
        </ul>
    </nav>
</aside>
);
