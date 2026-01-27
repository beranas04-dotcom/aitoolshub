import Link from "next/link";
import { Tool } from "@/types";

export default function ToolCard({ tool }: { tool: Tool }) {
    return (
        <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition flex flex-col h-full group">
            <Link href={`/tools/${tool.id}`} className="flex-1 block">
                <div className="flex items-center gap-3 mb-3">
                    {tool.logo && (
                        <img
                            src={tool.logo}
                            alt={tool.name}
                            className="w-10 h-10 rounded group-hover:scale-105 transition-transform"
                        />
                    )}
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{tool.name}</h3>
                </div>

                {tool.tagline && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {tool.tagline}
                    </p>
                )}

                {tool.features && tool.features.length > 0 && (
                    <ul className="text-xs text-muted-foreground mb-3 list-disc pl-4 space-y-1">
                        {tool.features.slice(0, 3).map((f: string) => (
                            <li key={f} className="line-clamp-1">{f}</li>
                        ))}
                    </ul>
                )}
            </Link>

            <div className="flex items-center justify-between mt-4">
                {tool.pricing && (
                    <span className="text-xs font-medium bg-muted px-2 py-1 rounded">
                        {tool.pricing}
                    </span>
                )}

                {(tool.affiliateUrl || tool.website) && (
                    <Link
                        href={`/api/out?toolId=${tool.id}&url=${encodeURIComponent(tool.affiliateUrl || tool.website || '')}`}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        className="text-primary text-sm font-medium hover:underline ml-auto"
                    >
                        Visit →
                    </Link>
                )}
            </div>
        </div>
    );
}
