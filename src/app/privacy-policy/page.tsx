
import { type Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - RhymeSnap',
  description: 'Privacy Policy for the RhymeSnap application.',
};

export default function PrivacyPolicyPage() {
  // For a server component, this will be the build/render time.
  const lastUpdatedDate = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <main className="container mx-auto px-4 py-8 flex flex-col items-center min-h-screen bg-background text-foreground">
      <div className="w-full max-w-3xl space-y-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2 text-lg">Last Updated: {lastUpdatedDate}</p>
        </header>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Introduction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-base leading-relaxed">
            <p>
              Welcome to RhymeSnap! This Privacy Policy explains how we collect, use, and handle your information when you use our web application ("Service"). By using RhymeSnap, you agree to the collection and use of information in accordance with this policy.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-base leading-relaxed">
            <p>
              When you use RhymeSnap, we collect the following types of information:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <strong>Images:</strong> You can either upload an image from your device's gallery or capture a new image using your device's camera. This image is necessary for our core feature: generating a poem.
              </li>
              <li>
                <strong>Language Selection:</strong> We collect your choice of language for the poem generation.
              </li>
            </ul>
            <p>
              We do not require you to create an account or provide any other personal identification information to use RhymeSnap.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-base leading-relaxed">
            <p>
              The information we collect is used solely for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <strong>Poem Generation:</strong> Your image is sent to a third-party AI service (Google AI) to analyze its content. Based on this analysis and your selected language, a poem is generated.
              </li>
              <li>
                <strong>Service Provision:</strong> To display the uploaded/captured image and the generated poem within the application interface during your session.
              </li>
            </ul>
            <p>
              <strong>Important: RhymeSnap does not store your uploaded images or generated poems on our servers after your request is completed and your session ends.</strong> The image data is processed in real-time. It is held temporarily in your browser's memory for display purposes and on our server's memory only for the duration of the AI processing request to Google AI.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-base leading-relaxed">
            <p>
              RhymeSnap utilizes Google AI (specifically, Google's Gemini models via Genkit) to power its poem generation feature. When you use RhymeSnap to generate a poem:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                Your image data and selected language are transmitted to Google AI for processing.
              </li>
              <li>
                Google's use of your data is governed by their own privacy policies and terms of service. We encourage you to review them to understand how Google handles your data. You can find more information on Google's policies at their website, for example, the{' '}
                <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  Google Privacy Policy
                </Link>.
              </li>
            </ul>
            <p>
              RhymeSnap is not responsible for the data privacy or security practices of third-party services like Google AI.
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-base leading-relaxed">
            <p>
              We take reasonable precautions to protect the information transmitted through our Service, including the use of HTTPS for data in transit. As we do not store your images or poems long-term on our servers, the risk associated with data breaches of stored image data on our specific infrastructure is minimized. However, please be aware that no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-base leading-relaxed">
            <p>
              RhymeSnap is not intended for use by children under the age of 13 (or the equivalent minimum age in the relevant jurisdiction). We do not knowingly collect personal information from children. If you are a parent or guardian and you believe your child has provided us with information without your consent, please contact us.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Changes to This Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-base leading-relaxed">
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-base leading-relaxed">
            <p>
              If you have any questions about this Privacy Policy, please contact us at: <Link href="mailto:privacy@rhymesnap.example.com" className="text-accent hover:underline">privacy@rhymesnap.example.com</Link> (Please note: This is a placeholder email for this example project).
            </p>
          </CardContent>
        </Card>

        <div className="text-center py-6">
            <Link href="/" className="text-accent hover:underline font-medium">
                &larr; Back to RhymeSnap
            </Link>
        </div>
      </div>
    </main>
  );
}
