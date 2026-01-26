import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    content: string;
}

export function getAllPosts(): BlogPost[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const slug = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const { data, content } = matter(fileContents);

        // Flatten date to string if it is a Date object
        let dateStr = '';
        if (data.date instanceof Date) {
            dateStr = data.date.toISOString();
        } else if (typeof data.date === 'string') {
            dateStr = data.date;
        }

        return {
            slug,
            title: data.title || 'No Title',
            description: data.description || '',
            date: dateStr,
            content,
        } as BlogPost;
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getPostBySlug(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        let dateStr = '';
        if (data.date instanceof Date) {
            dateStr = data.date.toISOString();
        } else if (typeof data.date === 'string') {
            dateStr = data.date;
        }

        return {
            slug,
            title: data.title || 'No Title',
            description: data.description || '',
            date: dateStr,
            content,
        } as BlogPost;
    } catch (error) {
        return null;
    }
}
