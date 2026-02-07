import "server-only";
import admin from "firebase-admin";

function getPrivateKey() {
    const key = process.env.FIREBASE_PRIVATE_KEY;
    if (!key) return undefined;
    return key.replace(/\\n/g, "\n");
}

export function getAdminApp() {
    if (admin.apps.length) return admin.app();

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = getPrivateKey();

    if (!projectId || !clientEmail || !privateKey) {
        throw new Error(
            "Missing Firebase Admin env vars: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY"
        );
    }

    admin.initializeApp({
        credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey,
        }),
    });

    return admin.app();
}

export function getAdminAuth() {
    getAdminApp();
    return admin.auth();
}

export function getAdminDb() {
    getAdminApp();
    return admin.firestore();
}

// ✅ Alias باش مايتعاودش يطيح الكود القديم
export function getDb() {
    return getAdminDb();
}
