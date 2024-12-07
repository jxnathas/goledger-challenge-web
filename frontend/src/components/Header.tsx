export const Header = () => (
    <header className="flex justify-between items-center mb-8">
        <div className="flex items-center">
            <a href="/" className="flex items-center">
                <span className="text-lg font-bold">GoMusic</span>
            </a>

            
            <input
                type="text"
                placeholder="What do you want to play?"
                className="ml-4 bg-darkcyan  text-white py-2 px-4 rounded-full w-96"
            />
        </div>

        
        <div>
            <button className="bg-white text-darkcyan py-2 px-4 rounded-full mr-4">Sign up</button>
            <button className="bg-white text-darkcyan py-2 px-4 rounded-full">Log in</button>
        </div>
    </header>
);
