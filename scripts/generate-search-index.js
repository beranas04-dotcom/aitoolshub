require("dotenv").config({ path: ".env.local" });

const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

// ---------- Firebase Admin Init ----------
function getPrivateKey() {
    const b64 = process.env.FIREBASE_PRIVATE_KEY_B64;
    if (b64) {
        return Buffer.from(b64, "base64").toString("utf8").replace(/\r/g, "").trim();
    }

    const key = process.env.FIREBASE_PRIVATE_KEY;
    if (!key) return undefined;

    return key.replace(/\\n/g, "\n").replace(/\r/g, "").trim().replace(/^"+|"+$/g, "");
}

function initAdmin() {
    if (admin.apps.length) return admin.app();

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = getPrivateKey();

    if (!projectId || !clientEmail || !privateKey) {
        throw new Error("Missing FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY(_B64)");
    }

    admin.initializeApp({
        credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
    });

    return admin.app();
}

// ---------- Generate Search Index ----------
async function generateSearchIndex() {
    initAdmin();
    const db = admin.firestore();

    const snapshot = await db.collection("tools").get();
    const toolsFromDb = snapshot.docs.map(doc => doc.data());

    const tools = toolsFromDb.map(tool => ({
        id: tool.id,
        name: tool.name,
        slug: tool.slug || tool.id,
        tagline: tool.tagline || "",
        description: tool.description || tool.tagline || "",
        category: tool.category || "",
        tags: tool.tags || [],
        pricing: tool.pricing || "",
    }));

    const searchIndex = {
        tools,
        generatedAt: new Date().toISOString(),
    };

    const outputPath = path.join(__dirname, "../public/search-index.json");
    const outputDir = path.dirname(outputPath);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));

    console.log("✅ Search index generated from Firestore");
    console.log(`📊 Indexed ${tools.length} tools`);
}

generateSearchIndex().catch(error => {
    console.error("❌ Error generating search index:", error);
    process.exit(1);
});
