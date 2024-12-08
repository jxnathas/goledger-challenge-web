type ArtistCardProps = {
    name: string;
    image: string;
};

export const ArtistCard: React.FC<ArtistCardProps> = ({ name, image }) => (
    <div
        className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform rounded-sm p-2 w-48"
    >
        <img
            src={image}
            alt={`Artist ${name}`}
            className="rounded-full w-40 h-40 mb-2 object-cover"
        />
        <p className="text-sm font-bold text-center">{name}</p>
    </div>
);