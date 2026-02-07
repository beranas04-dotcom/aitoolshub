import { db } from "@/lib/firebase";
import {
    collection,
    getDocs,
    orderBy,
    query,
    updateDoc,
    doc,
} from "firebase/firestore";

export type Submission = {
    id: string;
    toolName: string;
    websiteUrl: string;
    description?: string;
    category?: string;
    submitterEmail?: string;
    status: "pending" | "approved" | "rejected";
    createdAt: string;
};

export async function listSubmissions(): Promise<Submission[]> {
    const q = query(collection(db, "submissions"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);

    return snap.docs.map((d) => {
        const data = d.data() as any;
        return {
            id: d.id,
            toolName: data.toolName || "",
            websiteUrl: data.websiteUrl || "",
            description: data.description || "",
            category: data.category || "",
            submitterEmail: data.submitterEmail || "",
            status: data.status || "pending",
            createdAt: data.createdAt || new Date().toISOString(),
        };
    });
}

export async function updateSubmissionStatus(
    id: string,
    status: "approved" | "rejected"
) {
    await updateDoc(doc(db, "submissions", id), {
        status,
    });
}
