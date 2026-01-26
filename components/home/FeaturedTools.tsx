import ToolCard from "@/components/tools/ToolCard";

export default function FeaturedTools({ tools }: { tools: any[] }) {
    return (
        <section className="py-12 bg-muted/40">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6">Featured Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool) => (
                        <ToolCard key={tool.id} tool={tool} />
                    ))}
                </div>
            </div>
        </section>
    );
}
