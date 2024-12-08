type SectionProps = {
    title: string; 
    children: React.ReactNode;
  };
  
export const Section: React.FC<SectionProps> = ({ title, children }) => {
    return (
      <section className="mb-8 rounded-lg bg-gradient-to-bl from-gray-100 to-gray-300 p-4">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="flex flex-wrap gap-4">{children}</div>
      </section>
    );
};