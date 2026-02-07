import { NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebaseAdmin";

const raw = process.env.ADMIN_EMAILS || "";
const ADMIN_EMAILS = raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get("authorization") || "";
        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

        if (!token) {
            return NextResponse.json({ error: "Missing token" }, { status: 401 });
        }

        const auth = getAdminAuth();

        const decoded = await auth.verifyIdToken(token);
        const email = (decoded.email || "").toLowerCase();

        if (!email || !ADMIN_EMAILS.includes(email)) {
            return NextResponse.json({ error: "Not allowed" }, { status: 403 });
        }

        // ✅ merge with existing claims (don’t overwrite)
        const userRecord = await auth.getUser(decoded.uid);
        const existingClaims = (userRecord.customClaims || {}) as Record<string, any>;

        if (existingClaims.admin === true) {
            return NextResponse.json({ ok: true, already: true });
        }

        await auth.setCustomUserClaims(decoded.uid, {
            ...existingClaims,
            admin: true,
        });

        return NextResponse.json({ ok: true });
    } catch (e: any) {
        return NextResponse.json({ error: e?.message || "Error" }, { status: 500 });
    }
}
