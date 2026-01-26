export interface Topic {
    slug: string;
    title: string;
    description: string;
    match: {
        categories?: string[];
        tags?: string[];
    };
}

export const topics: Topic[] = [
    {
        slug: 'students',
        title: 'Best AI Tools for Students',
        description: 'Boost your academic performance with these top-rated AI tools for students. From writing assistance to study planners, find the perfect software to help you succeed.',
        match: {
            categories: ['Writing', 'Research', 'Productivity'],
            tags: ['education', 'study', 'students', 'learning']
        }
    },
    {
        slug: 'marketers',
        title: 'Best AI Tools for Marketers',
        description: 'Supercharge your marketing campaigns with AI. Discover tools for copywriting, analytics, and social media automation designed to maximize your ROI.',
        match: {
            categories: ['Marketing', 'Writing', 'Social Media'],
            tags: ['marketing', 'ads', 'seo', 'analytics']
        }
    },
    {
        slug: 'content-creators',
        title: 'Best AI Tools for Content Creators',
        description: 'Streamline your creative workflow. Whether you blog, vlog, or post on social media, these AI tools help you create high-quality content faster.',
        match: {
            categories: ['Writing', 'Video', 'Images', 'Audio'],
            tags: ['content', 'creation', 'social', 'blogging']
        }
    },
    {
        slug: 'designers',
        title: 'Best AI Tools for Designers',
        description: 'Unlock new creative possibilities. Explore AI-powered design tools for image generation, editing, and layout that complement your artistic skills.',
        match: {
            categories: ['Images', 'Design'],
            tags: ['design', 'art', 'graphics', 'ui']
        }
    },
    {
        slug: 'developers',
        title: 'Best AI Tools for Developers',
        description: 'Code faster and cleaner. Find the best AI coding assistants, code generators, and debugging tools to enhance your development workflow.',
        match: {
            categories: ['Code', 'Developer Tools'],
            tags: ['coding', 'programming', 'development', 'dev']
        }
    },
    {
        slug: 'video-editing',
        title: 'Best AI Tools for Video Editing',
        description: 'Create professional videos in minutes. These AI video editors and generators automate tedious tasks like trimming, captioning, and transitions.',
        match: {
            categories: ['Video'],
            tags: ['video', 'editing', 'production']
        }
    },
    {
        slug: 'podcasters',
        title: 'Best AI Tools for Podcasters',
        description: 'Elevate your audio production. Discover AI tools for audio editing, voice enhancement, transcription, and sound engineering.',
        match: {
            categories: ['Audio'],
            tags: ['podcast', 'voice', 'speech', 'audio']
        }
    },
    {
        slug: 'ecommerce',
        title: 'Best AI Tools for Ecommerce',
        description: 'Drive sales and optimize your store. These AI tools help with product descriptions, customer support, and inventory management.',
        match: {
            categories: ['Business', 'Marketing'],
            tags: ['ecommerce', 'sales', 'retail', 'product']
        }
    },
    {
        slug: 'startups',
        title: 'Best AI Tools for Startups',
        description: 'Scale your business efficiently. Essential AI tools for productivity, management, and growth hacking specifically curated for startups.',
        match: {
            categories: ['Business', 'Productivity', 'Marketing'],
            tags: ['startup', 'business', 'growth', 'management']
        }
    },
    {
        slug: 'productivity',
        title: 'Best AI Tools for Productivity',
        description: 'Get more done in less time. Explore the ultimate collection of AI productivity tools for task management, scheduling, and workflow automation.',
        match: {
            categories: ['Productivity', 'Utilities'],
            tags: ['productivity', 'organization', 'time', 'workflow']
        }
    }
];
