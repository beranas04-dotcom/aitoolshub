import { NextResponse } from "next/server";
import { getAllTools } from "@/lib/toolsRepo";

export async function GET() {
    try {
        const tools = await getAllTools();
        const payload = tools.map((t) => ({
            id: t.id,
            name: t.name,
            slug: t.slug || t.id,
            tagline: t.tagline || "",
            description: t.description || t.tagline || "",
            category: t.category || "",
            tags: t.tags || [],
            pricing: t.pricing || "",
            logo: t.logo || "",
        }));

        return NextResponse.json({ tools: payload });
    } catch (e: any) {
        return NextResponse.json(
            { error: e?.message || "Failed" },
            { status: 500 }
        );
    }
}
