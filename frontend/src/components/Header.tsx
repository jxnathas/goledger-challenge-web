import { MdSearch } from "react-icons/md";

export const Header = () => (
    <header className="flex justify-between items-center mb-3">
        <div className="flex items-center flex-1">
            <a href="/" className="flex items-center">
                <span className="text-lg font-bold bg-white rounded-full px-3 py-1">GoMusic</span>
            </a>
        </div>

        <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-2xl hover:scale-105">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-darkcyan text-3xl" />
                <div className="absolute left-12 top-1/2 transform -translate-y-1/2 h-6 w-px bg-gray-300"></div>
                <input
                    type="text"
                    placeholder="What do you want to play?"
                    className="bg-white text-darkcyan py-2 pl-14 pr-4 rounded-full w-full h-12 text-lg"
                />
            </div>
        </div>

        <div className="flex items-center flex-1 justify-end">
            <button className="text-darkcyan py-2 px-4 rounded-full mr-4 font-bold hover:scale-105">Sign up</button>
            <button className="bg-white text-darkcyan py-3 px-6 rounded-full font-bold hover:scale-105">Log in</button>
        </div>
    </header>
);
