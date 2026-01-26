import Link from 'next/link';
import { siteMetadata } from '@/lib/siteMetadata';

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-secondary-50 to-background dark:from-gray-900 dark:via-gray-800 dark:to-background">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
                <div className="text-center">
                    {/* Badge */}
                    <div className="mb-8 inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary ring-1 ring-inset ring-primary/20 animate-fade-in">
                        <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        New tools added weekly
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl font-bold tracking-tight font-display sm:text-6xl lg:text-7xl mb-6 animate-slide-up">
                        <span className="block text-foreground mb-2">
                            Discover the Best
                        </span>
                        <span className="block bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 bg-clip-text text-transparent">
                            AI Tools for Work, Study and Creativity
                        </span>
                    </h1>

                    {/* Tagline */}
                    <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        {siteMetadata.tagline}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <Link
                            href="/tools"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Explore AI Tools
                        </Link>
                        <Link
                            href="/best"
                            className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-base font-medium rounded-lg text-primary bg-background hover:bg-primary/5 transition-all"
                        >
                            Best AI Tools by Use Case
                        </Link>
                        <Link
                            href="/blog"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                        >
                            Read AI Guides
                        </Link>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Curated AI Tools</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                                <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                            </svg>
                            <span>Updated Weekly</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                            <span>Trusted by Creators</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
