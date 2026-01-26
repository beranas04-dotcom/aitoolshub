import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Affiliate Disclosure - AIToolsHub',
    description: 'Transparency about our funding and affiliate relationships.',
};

export default function DisclosurePage() {
    return (
        <main className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-3xl font-bold mb-6">Affiliate Disclosure</h1>

            <div className="prose prose-slate dark:prose-invert">
                <p className="mb-4">
                    Transparancy is important to us. Access to AIToolsHub is free, and we strive to provide unbiased and useful information about AI tools.
                </p>

                <p className="mb-4">
                    To support the operation of this site, AIToolsHub participates in various affiliate marketing programs. This means that:
                </p>

                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>We may earn a commission if you click on a link to a tool and make a purchase or subscribe.</li>
                    <li>This comes at no additional cost to you.</li>
                    <li>Our editorial content, reviews, and rankings are not influenced by these partnerships. We feature tools based on their merit and utility.</li>
                </ul>

                <p className="mb-4">
                    We only recommend products and services that we believe will add value to our readers. The inclusion of affiliate links does not compromise our commitment to providing honest and independent reviews.
                </p>

                <p>
                    If you have any questions about our affiliate relationships, please feel free to contact us.
                </p>
            </div>
        </main>
    );
}
