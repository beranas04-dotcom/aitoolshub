import Link from 'next/link';
import { slugifyCategory } from '@/lib/utils';
import toolsData from '@/data/tools.json';
import { Tool } from '@/types';

// Category metadata with icons and descriptions
const categoryMetadata: Record<string, { icon: string; description: string }> = {
    Writing: { icon: '✍️', description: 'AI copywriting & content tools' },
    Images: { icon: '🎨', description: 'Image generation & editing' },
    Video: { icon: '🎬', description: 'Video creation & editing' },
    Audio: { icon: '🎵', description: 'Text-to-speech & voice tools' },
    Productivity: { icon: '⚡', description: 'Notes, meetings & automation' },
    Code: { icon: '💻', description: 'Coding assistants & IDEs' },
    Research: { icon: '🔬', description: 'Research & answer engines' },
    Marketing: { icon: '📈', description: 'SEO, email & campaigns' },
    Utilities: { icon: '🔧', description: 'Prompts, templates & helpers' },
    'Developer Tools': { icon: '🛠️', description: 'Docs, APIs & dev utilities' },
};


export default function CategoryGrid() {
    // Extract unique categories from tools.json
    const tools = toolsData as Tool[];
    const uniqueCategories = [...new Set(tools.map(tool => tool.category).filter(Boolean))];

    // Build category list with metadata
    const categories = uniqueCategories
        .map(categoryName => {
            const metadata = categoryMetadata[categoryName!] || {
                icon: '🔹',
                description: 'AI tools and utilities'
            };
            return {
                name: categoryName!,
                icon: metadata.icon,
                description: metadata.description
            };
        })
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-3">Browse by Category</h2>
                    <p className="text-muted-foreground text-lg">
                        Find the perfect AI tool for your needs
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={`/categories/${slugifyCategory(category.name)}`}
                            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/50 transition-all group"
                        >
                            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                                {category.icon}
                            </div>
                            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                                {category.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {category.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

