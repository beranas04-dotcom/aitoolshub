const fs = require('fs');
const path = require('path');

// Import seed data
const seedTools = require('../data/tools.json');

// Generate search index for Fuse.js
function generateSearchIndex() {
    const tools = seedTools.map(tool => ({
        id: tool.id,
        name: tool.name,
        slug: tool.id, // Using ID as slug since slug is missing in tools.json
        tagline: tool.tagline || '',
        description: tool.tagline || '', // Fallback description to tagline
        category: tool.category || '',
        tags: tool.tags || [],
        pricing: tool.pricing || '',
    }));

    const searchIndex = {
        tools,
        generatedAt: new Date().toISOString(),
    };

    const outputPath = path.join(__dirname, '../public/search-index.json');
    const outputDir = path.dirname(outputPath);

    // Ensure public directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));
    console.log('✅ Search index generated successfully at:', outputPath);
    console.log(`📊 Indexed ${tools.length} tools`);
}

// Run the script
try {
    generateSearchIndex();
} catch (error) {
    console.error('❌ Error generating search index:', error);
    process.exit(1);
}
