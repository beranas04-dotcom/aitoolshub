import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import toolsData from '@/data/tools.json';
import { Tool } from '@/types';

interface Props {
    params: {
        id: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const tool = (toolsData as Tool[]).find((t) => t.id === params.id);

    if (!tool) {
        return {
            title: 'Tool Not Found',
        };
    }

    // Generate optimized description (150-160 characters)
    const generateDescription = () => {
        if (tool.description && tool.description.length >= 150) {
            // Truncate to 160 chars and add ellipsis
            return tool.description.length > 160
                ? tool.description.substring(0, 157) + '...'
                : tool.description;
        }

        // Fallback: combine tagline with pricing info
        const baseDesc = tool.tagline || `${tool.name} is an AI-powered tool`;
        const pricingInfo = tool.pricing ? ` Pricing: ${tool.pricing}.` : '';
        const categoryInfo = tool.category ? ` Category: ${tool.category}.` : '';

        const combined = baseDesc + pricingInfo + categoryInfo;
        return combined.length > 160
            ? combined.substring(0, 157) + '...'
            : combined;
    };

    const description = generateDescription();
    const ogTitle = `${tool.name} Review, Features & Pricing | AI Tools Hub`;
    const ogImage = tool.logo ? `https://aitoolshub.com${tool.logo}` : 'https://aitoolshub.com/og-image.png';

    return {
        title: `${tool.name} Review, Features & Pricing | AI Tools Hub`,
        description,
        keywords: [
            tool.name,
            ...(tool.category ? [tool.category, `${tool.category} tools`] : []),
            ...(tool.tags || []),
            'AI tools',
            'artificial intelligence',
            'productivity'
        ],
        openGraph: {
            title: ogTitle,
            description,
            type: 'website',
            url: `https://aitoolshub.com/tools/${tool.id}`,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: `${tool.name} - AI Tool`,
                }
            ],
            siteName: 'AI Tools Hub',
        },
        twitter: {
            card: 'summary_large_image',
            title: ogTitle,
            description,
            images: [ogImage],
            creator: '@aitoolshub',
        },
        alternates: {
            canonical: `https://aitoolshub.com/tools/${tool.id}`,
        },
    };
}

export function generateStaticParams() {
    return (toolsData as Tool[]).map((tool) => ({
        id: tool.id,
    }));
}

export default function ToolPage({ params }: Props) {
    const tool = (toolsData as Tool[]).find((t) => t.id === params.id);

    if (!tool) {
        notFound();
    }

    // Schema Markup
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: tool.name,
        description: tool.tagline,
        image: tool.logo ? `https://aitoolshub.com${tool.logo}` : undefined,
        brand: {
            '@type': 'Brand',
            name: tool.name,
        },
        offers: {
            '@type': 'Offer',
            price: tool.pricing === 'free' ? '0' : undefined,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
        },
    };

    // Get 3 random related posts
    const allPosts = require('@/lib/blog').getAllPosts();
    const relatedPosts = allPosts
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="flex justify-between items-center mb-6">
                <Link href="/tools" className="text-muted-foreground hover:text-primary">
                    ← Back to Tools
                </Link>
                <Link href="/best" className="text-sm font-medium text-primary hover:underline">
                    Explore best picks →
                </Link>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {tool.logo && (
                        <img
                            src={tool.logo}
                            alt={tool.name}
                            className="w-24 h-24 rounded-xl object-contain bg-muted/20 p-2"
                        />
                    )}

                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold">{tool.name}</h1>
                            {tool.verified && (
                                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-100">
                                    Verified
                                </span>
                            )}
                        </div>

                        <p className="text-xl text-muted-foreground mb-4">
                            {tool.tagline}
                        </p>

                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8 mt-2">
                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-lg mb-1">🚀 Try {tool.name} Now</h3>
                                    <p className="text-sm text-muted-foreground">Boost your productivity with AI.</p>
                                </div>
                                <Link
                                    href={`/api/out?toolId=${tool.id}&url=${encodeURIComponent((tool.affiliateUrl && tool.affiliateUrl.trim() !== '') ? tool.affiliateUrl : tool.website || '')}`}
                                    target="_blank"
                                    rel="sponsored nofollow noopener noreferrer"
                                    className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-center py-2.5 px-6 rounded-lg font-semibold transition shadow-md"
                                >
                                    Visit Website
                                </Link>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 text-center sm:text-right">
                            Disclosure: Some links may be affiliate links. We may earn a commission at no extra cost to you.
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {tool.category && (
                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                                    {tool.category}
                                </span>
                            )}
                            {tool.pricing && (
                                <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                                    {tool.pricing}
                                </span>
                            )}
                        </div>

                        <p className="text-foreground/90 leading-relaxed mb-8">
                            {tool.description || "No detailed description available."}
                        </p>

                        {/* Why Choose This Tool? */}
                        <div className="mb-8 bg-primary/5 border border-primary/20 rounded-xl p-6">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <span className="text-primary">⭐</span> Why Choose This Tool?
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="text-primary font-bold mt-0.5">✓</span>
                                    <span className="text-foreground/90">
                                        {tool.pros && tool.pros.length > 0
                                            ? tool.pros[0]
                                            : `${tool.name} offers cutting-edge AI capabilities designed for professional use`}
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary font-bold mt-0.5">✓</span>
                                    <span className="text-foreground/90">
                                        Trusted by thousands of users worldwide for reliable results
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary font-bold mt-0.5">✓</span>
                                    <span className="text-foreground/90">
                                        {tool.freeTrial
                                            ? "Free trial available - test before you commit"
                                            : "Proven track record of delivering value to businesses and creators"}
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Best For */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4">Best For</h3>
                            <p className="text-foreground/90 leading-relaxed bg-muted/30 border border-border rounded-lg p-4">
                                {tool.category && (
                                    <>
                                        <strong>{tool.name}</strong> is ideal for professionals and teams working in{' '}
                                        <span className="text-primary font-medium">{tool.category.toLowerCase()}</span>
                                        {tool.useCases && tool.useCases.length > 0
                                            ? `, particularly those who need to ${tool.useCases[0].toLowerCase()}.`
                                            : `. Whether you're a freelancer, startup, or enterprise, this tool adapts to your workflow.`}
                                        {' '}Perfect for users who value efficiency, quality, and innovation in their daily tasks.
                                    </>
                                )}
                                {!tool.category && (
                                    <>
                                        <strong>{tool.name}</strong> is perfect for professionals and teams looking to leverage
                                        AI technology to streamline their workflow and boost productivity. Whether you're a
                                        freelancer, startup, or enterprise, this tool adapts to your needs.
                                    </>
                                )}
                            </p>
                        </div>

                        {/* Alternatives - Placeholder */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4">Alternatives to {tool.name}</h3>
                            <p className="text-muted-foreground text-sm">
                                Exploring alternatives? Check out our comprehensive guides to find the best tool for your needs.
                            </p>
                        </div>

                        {tool.features && tool.features.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {tool.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {tool.useCases && tool.useCases.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Best use cases</h3>
                                <ul className="space-y-2">
                                    {tool.useCases.map((useCase, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span className="text-foreground/90">{useCase}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {tool.pros && tool.pros.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Pros</h3>
                                <ul className="space-y-2">
                                    {tool.pros.map((pro, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                                            <span className="text-foreground/90">{pro}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {tool.cons && tool.cons.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Cons</h3>
                                <ul className="space-y-2">
                                    {tool.cons.map((con, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-muted-foreground mt-1">−</span>
                                            <span className="text-muted-foreground">{con}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {tool.tags && tool.tags.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {tool.tags.map((tag) => (
                                        <span key={tag} className="px-2 py-1 bg-muted/50 text-muted-foreground rounded text-xs border border-border">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Trust Badges */}
                        <div className="flex flex-wrap gap-4 md:gap-8 py-6 border-y border-border mb-8 text-sm text-muted-foreground justify-center md:justify-start">
                            <div className="flex items-center gap-2">
                                <span className="text-green-500">✓</span> Curated Tool
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-blue-500">🛡️</span> Verified Listing
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-purple-500">👥</span> Trusted by Creators
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Related Collections</h3>
                            <div className="flex flex-wrap gap-2">
                                {tool.category && (
                                    <>
                                        <Link href={`/best/ai-tools-for-${tool.category.toLowerCase().replace(' ', '-')}`} className="text-sm text-primary hover:underline bg-primary/5 px-3 py-1 rounded-full">
                                            Best Tools for {tool.category}
                                        </Link>
                                    </>
                                )}
                                <Link href="/best" className="text-sm text-primary hover:underline bg-primary/5 px-3 py-1 rounded-full">
                                    See all collections
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-border">
                            <Link
                                href={`/api/out?toolId=${tool.id}&url=${encodeURIComponent((tool.affiliateUrl && tool.affiliateUrl.trim() !== '') ? tool.affiliateUrl : tool.website || '')}`}
                                target="_blank"
                                rel="sponsored nofollow noopener noreferrer"
                                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 text-center py-3 px-6 rounded-lg font-semibold transition"
                            >
                                Visit Tool Website
                            </Link>
                            {tool.freeTrial && (
                                <div className="flex items-center justify-center px-6 py-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium dark:bg-green-900/20 dark:text-green-400">
                                    Free Trial Available
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Mobile CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 md:hidden z-50 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-3">
                    {tool.logo && (
                        <img src={tool.logo} alt={tool.name} className="w-10 h-10 rounded-lg object-contain bg-muted/20 p-1" />
                    )}
                    <div>
                        <div className="font-bold text-sm">{tool.name}</div>
                        <div className="text-xs text-muted-foreground">{tool.pricing}</div>
                    </div>
                </div>
                <Link
                    href={`/api/out?toolId=${tool.id}&url=${encodeURIComponent((tool.affiliateUrl && tool.affiliateUrl.trim() !== '') ? tool.affiliateUrl : tool.website || '')}`}
                    target="_blank"
                    rel="sponsored nofollow noopener noreferrer"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary/90 transition"
                >
                    Visit
                </Link>
            </div>

            {/* Second CTA - Bottom */}
            <div className="mt-12 mb-16 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-3">Ready to Get Started?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Join thousands of users who are already using {tool.name} to transform their workflow.
                </p>
                <Link
                    href={`/api/out?toolId=${tool.id}&url=${encodeURIComponent((tool.affiliateUrl && tool.affiliateUrl.trim() !== '') ? tool.affiliateUrl : tool.website || '')}`}
                    target="_blank"
                    rel="sponsored nofollow noopener noreferrer"
                    className="inline-block bg-primary text-primary-foreground hover:bg-primary/90 py-3 px-8 rounded-lg font-bold text-lg transition shadow-lg hover:shadow-xl"
                >
                    Try {tool.name} Now →
                </Link>
                {tool.freeTrial && (
                    <p className="text-sm text-muted-foreground mt-4">
                        ✓ Free trial available • No credit card required
                    </p>
                )}
            </div>

            {relatedPosts.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-6">Related Guides</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedPosts.map((p: any) => (
                            <Link key={p.slug} href={`/blog/${p.slug}`} className="group block bg-card rounded-xl border border-border p-4 hover:shadow-md transition">
                                <h4 className="font-bold text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    {p.title}
                                </h4>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {p.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </div>
    );
}
