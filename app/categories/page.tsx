import Link from "next/link";
import tools from "@/data/tools.json";

export default function CategoriesPage() {
    const categories = [...new Set(tools.map((t) => t.category))];

    return (
        <div className="max-w-6xl mx-auto px-6 py-16">
            <h1 className="text-3xl font-bold mb-8">Browse by Category</h1>

            <div className="grid md:grid-cols-3 gap-6">
                {categories.map((cat) => (
                    <Link
                        key={cat}
                        href={`/categories/${cat}`}
                        className="p-6 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition"
                    >
                        <h2 className="text-xl font-semibold capitalize">{cat}</h2>
                        <p className="text-muted-foreground mt-2">
                            View the best AI tools in {cat}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
