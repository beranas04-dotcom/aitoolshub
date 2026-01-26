import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';

export const metadata = {
    title: 'Blog - AIToolsHub',
    description: 'Latest articles and insights about AI tools.',
};

export default function BlogIndexPage() {
    const posts = getAllPosts();

    return (
        <main className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Latest Articles</h1>

                <div className="grid gap-8">
                    {posts.map((post) => (
                        <article key={post.slug} className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-900">
                            <div className="flex flex-col space-y-3">
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>

                                <Link href={`/blog/${post.slug}`} className="hover:underline">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {post.title}
                                    </h2>
                                </Link>

                                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                                    {post.description}
                                </p>

                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 inline-flex items-center"
                                >
                                    Read more
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}
