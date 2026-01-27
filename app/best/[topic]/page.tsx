import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllTopics } from '@/lib/topics';
import toolsData from '@/data/tools.json';
import { Tool } from '@/types';
import ToolCard from '@/components/tools/ToolCard';
import NewsletterForm from '@/components/newsletter/NewsletterForm';

interface Props {
    params: {
        topic: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const topic = getAllTopics().find((t) => t.slug === params.topic);

    if (!topic) {
        return {
            title: 'Topic Not Found'
        };
    }

    return {
        title: `${topic.title} — AIToolsHub`,
        description: topic.description,
        openGraph: {
            title: `${topic.title} — AIToolsHub`,
            description: topic.description,
            images: [`/api/og?title=${encodeURIComponent(topic.title)}`],
        },
        twitter: {
            card: 'summary_large_image',
            title: topic.title,
            description: topic.description,
            images: [`/api/og?title=${encodeURIComponent(topic.title)}`],
        }
    };
}

export async function generateStaticParams() {
    return getAllTopics().map((topic) => ({
        topic: topic.slug,
    }));
}

export default function BestTopicPage({ params }: Props) {
    const topic = getAllTopics().find((t) => t.slug === params.topic);

    if (!topic) {
        notFound();
    }

    // Filter tools
    const matchingTools = (toolsData as Tool[]).filter((tool) => {
        // Check categories
        if (topic.match.categories && tool.category) {
            if (topic.match.categories.some(c => c.toLowerCase() === tool.category!.toLowerCase())) {
                return true;
            }
        }

        // Check tags
        if (topic.match.tags && tool.tags) {
            if (topic.match.tags.some(tag =>
                tool.tags!.some(t => t.toLowerCase().includes(tag.toLowerCase()))
            )) {
                return true;
            }
        }

        return false;
    });

    // Limit to 12
    const displayedTools = matchingTools.slice(0, 12);

    // Auto-generate FAQs based on topic
    const faqs = [
        {
            question: `Why should I use AI tools for ${topic.title.replace('Best AI Tools for ', '')}?`,
            answer: `Using AI tools in this field can drastically reduce manual work, uncover new insights, and enhance creativity. They allow professionals to focus on strategy and high-level decision making rather than repetitive tasks.`
        },
        {
            question: `Are these tools free?`,
            answer: `Most of the tools listed here offer a free tier or a free trial. However, for advanced features and commercial use, paid subscriptions are common.`
        },
        {
            question: `How were these tools selected?`,
            answer: `We selected these tools based on their popularity, user ratings, and specific features that cater to the needs of ${topic.title.replace('Best AI Tools for ', '').toLowerCase()}.`
        }
    ];

    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: topic.title,
        description: topic.description,
        itemListElement: displayedTools.map((tool, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Product',
                name: tool.name,
                url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aitoolshub.com'}/tools/${tool.id}`,
                description: tool.tagline,
                image: tool.logo ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aitoolshub.com'}${tool.logo}` : undefined,
                offers: {
                    '@type': 'Offer',
                    price: tool.pricing === 'free' ? '0' : undefined,
                    priceCurrency: 'USD'
                }
            }
        }))
    };

    return (
        <main className="container mx-auto px-4 py-12 max-w-7xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />
            <div className="mb-12">
                <div className="flex flex-wrap gap-4 mb-6 text-sm font-medium">
                    <Link href="/best" className="text-muted-foreground hover:text-primary">
                        ← Back to Collections
                    </Link>
                    <span className="text-muted-foreground/30">|</span>
                    <Link href="/categories" className="text-muted-foreground hover:text-primary">
                        Browse by Category
                    </Link>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{topic.title}</h1>
                <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                    {topic.description} In this curated list, we explore the top-rated software solutions designed to help you succeed in {topic.title.replace('Best AI Tools for ', '')}.
                </p>
            </div>

            {/* Comparison Table */}
            {displayedTools.length > 0 && (
                <div className="mb-16 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted/50 text-muted-foreground font-medium">
                                <tr>
                                    <th className="px-6 py-4">Tool</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Pricing</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {displayedTools.slice(0, 5).map((tool) => (
                                    <tr key={tool.id} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-6 py-4 font-medium text-foreground">
                                            <div className="flex items-center gap-3">
                                                {tool.logo && (
                                                    <img src={tool.logo} alt={tool.name} className="w-8 h-8 rounded-lg object-contain bg-white p-1 border border-border" />
                                                )}
                                                {tool.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">{tool.category}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${tool.pricing === 'free' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                tool.pricing === 'freemium' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                                    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                                                }`}>
                                                {tool.pricing}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/api/out?toolId=${tool.id}&url=${encodeURIComponent(tool.affiliateUrl || tool.website || '')}`}
                                                target="_blank"
                                                rel="sponsored noopener noreferrer"
                                                className="text-primary hover:text-primary/80 font-semibold hover:underline"
                                            >
                                                Visit →
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {displayedTools.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                    {displayedTools.map((tool) => (
                        <ToolCard key={tool.id} tool={tool} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-muted/30 rounded-xl mb-16">
                    <h3 className="text-2xl font-semibold mb-2">No tools found</h3>
                    <p className="text-muted-foreground">We are constantly updating our directory. Check back soon for tools in this category.</p>
                </div>
            )}

            {/* Newsletter */}
            <div className="mb-16">
                <NewsletterForm />
            </div>

            {/* FAQ Section */}
            <section className="bg-muted/30 rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
                <div className="space-y-8 max-w-3xl">
                    {faqs.map((faq, i) => (
                        <div key={i}>
                            <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
