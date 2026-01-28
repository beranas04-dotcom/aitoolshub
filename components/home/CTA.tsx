import Link from "next/link";
export default function CTA() {

    return (
        <section className="py-16 text-center bg-primary text-white">
            <h2 className="text-2xl font-bold mb-4">Submit Your AI Tool</h2>
            <p className="mb-6">Have an AI tool? Add it to our directory.</p>

            <Link href="/submit" className="btn btn-primary">
                Submit Tool
            </Link>

        </section>
    );
}
