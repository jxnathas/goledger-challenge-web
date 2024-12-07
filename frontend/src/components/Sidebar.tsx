import { IoMdDisc } from "react-icons/io";
import { MdAddBox, MdFavorite, MdHome, MdLibraryMusic, MdOutlineSurfing } from "react-icons/md";

export const Sidebar = () => (
    <aside className="w-64 h-screen bg-gradient-to-r from-gray-400 to-gray-300 rounded-lg text-white flex flex-col p-4 mb-8 md:w-20 lg:w-64">
        <nav>
            <ul className="space-y-6">
                <li>
                    <a href="/" className="flex items-center space-x-4 hover:text-gray-700" title="Home">
                        <MdHome className="text-5xl" />
                    </a>
                </li>
                <li>
                    <a href="/artists" className="flex items-center space-x-4 hover:text-gray-700" title="Artists">
                        <MdOutlineSurfing className="text-5xl" />
                    </a>
                </li>
                <li>
                    <a href="/albums" className="flex items-center space-x-4 hover:text-gray-700" title="Albums">
                        <IoMdDisc className="text-5xl" />
                    </a>
                </li>
                <li>
                    <a href="/songs" className="flex items-center space-x-4 hover:text-gray-700" title="Songs">
                        <MdLibraryMusic className="text-5xl" />
                    </a>
                </li>
                <li>
                    <a href="/playlists" className="flex items-center space-x-4 hover:text-gray-700" title="Playlists">
                        <MdFavorite className="text-5xl" />
                    </a>
                </li>
                <li>
                    <a href="/add" className="flex items-center space-x-4 hover:text-gray-700" title="Add">
                        <MdAddBox className="text-5xl" />
                    </a>
                </li>
            </ul>
        </nav>
    </aside>
);
