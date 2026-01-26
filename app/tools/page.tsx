import { Metadata } from 'next';
import Link from 'next/link';
import toolsData from '@/data/tools.json';
import ToolsExplorer from '@/components/tools/ToolsExplorer';
import { Tool } from '@/types';
import { slugifyCategory } from '@/lib/utils';

export const metadata: Metadata = {
    title: 'All AI Tools - AIToolsHub',
    description: 'Browse our comprehensive directory of AI tools, filtered by category and use case.',
};

export default function ToolsPage() {
    const tools = toolsData as Tool[];

    // Get unique categories with counts
    const categoryStats = tools.reduce((acc, tool) => {
        if (tool.category) {
            acc[tool.category] = (acc[tool.category] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);

    const categories = Object.entries(categoryStats).sort((a, b) => a[0].localeCompare(b[0]));

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Explore AI Tools</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Discover the best AI tools to supercharge your workflow.
                </p>
            </div>

            {/* Category Quick Links */}
            <div className="mb-12 bg-muted/30 rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">Browse by Category</h2>
                <div className="flex flex-wrap gap-3">
                    {categories.map(([category, count]) => (
                        <Link
                            key={category}
                            href={`/categories/${slugifyCategory(category)}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-primary hover:shadow-md transition-all group"
                        >
                            <span className="font-medium group-hover:text-primary transition-colors">
                                {category}
                            </span>
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                {count}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            <ToolsExplorer tools={tools} />
        </div>
    );
}
