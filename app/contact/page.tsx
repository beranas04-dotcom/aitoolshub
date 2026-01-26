import { Metadata } from 'next';
import { siteMetadata } from '@/lib/siteMetadata';

export const metadata: Metadata = {
    title: 'Contact Us - AIToolsHub',
    description: 'Get in touch with the AIToolsHub team for inquiries, feedback, or partnerships.',
};

export default function ContactPage() {
    return (
        <main className="container mx-auto px-4 py-16 max-w-2xl">
            <h1 className="text-4xl font-bold mb-4 font-display">Contact Us</h1>
            <p className="text-muted-foreground mb-8">
                Have a question, suggestion, or just want to say hi? We'd love to hear from you.
            </p>

            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                <form
                    action={`mailto:${siteMetadata.author.email}`}
                    method="GET"
                    encType="text/plain"
                    className="space-y-6"
                >
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            id="subject"
                            placeholder="What is this regarding?"
                            className="w-full px-4 py-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="body" className="block text-sm font-medium mb-2">Message</label>
                        <textarea
                            name="body"
                            id="body"
                            rows={6}
                            placeholder="Type your message here..."
                            className="w-full px-4 py-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Send Message
                    </button>

                    <p className="text-xs text-center text-muted-foreground mt-4">
                        This will open your default email client.
                    </p>
                </form>
            </div>

            <div className="mt-12 text-center">
                <p className="text-muted-foreground">
                    Alternatively, you can email us directly at:
                </p>
                <a
                    href={`mailto:${siteMetadata.author.email}`}
                    className="text-primary font-medium hover:underline text-lg"
                >
                    {siteMetadata.author.email}
                </a>
            </div>
        </main>
    );
}
