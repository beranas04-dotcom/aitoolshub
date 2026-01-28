import { MetadataRoute } from 'next';
import { siteMetadata } from '@/lib/siteMetadata';
import toolsData from '@/data/tools.json';
import { getAllTopics } from '@/lib/topics';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "https://aitoolshub-gules.vercel.app";

    // Static Routes
    const staticRoutes = [
        '',
        '/tools',
        '/blog',
        '/best',
        '/disclosure',
    ].map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // Tool Routes
    const toolRoutes = toolsData.map((tool) => ({
        url: `${siteUrl}/tools/${tool.id}`,
        lastModified: new Date(), // In a real app, track update time
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Category Routes (extract unique valid categories)
    const categories = Array.from(new Set(toolsData.map((t) => t.category).filter(Boolean)));
    const categoryRoutes = categories.map((category) => ({
        url: `${siteUrl}/categories/${category?.toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    // Blog Post Routes
    const posts = getAllPosts();
    const blogRoutes = posts.map((post) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Best Topic Routes
    const allTopics = getAllTopics();
    const bestRoutes = allTopics.map((topic) => ({
        url: `${siteUrl}/best/${topic.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Pagination Routes
    const totalTopics = allTopics.length;
    const limit = 20;
    const totalPages = Math.ceil(totalTopics / limit);
    const pageRoutes = [];

    for (let i = 2; i <= totalPages; i++) { // Start from 2 as 1 is /best
        pageRoutes.push({
            url: `${siteUrl}/best/page/${i}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        });
    }

    return [
        ...staticRoutes,
        ...toolRoutes,
        ...categoryRoutes,
        ...blogRoutes,
        ...bestRoutes,
        ...pageRoutes,
    ];
}
