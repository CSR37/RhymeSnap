
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service or console
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <Alert variant="destructive" className="max-w-lg shadow-lg">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription>
          <p className="mb-2">
            We encountered an unexpected issue. Please try again.
          </p>
          {error?.message && (
            <details className="mb-3 rounded-md bg-destructive-foreground/10 p-2 text-xs">
              <summary className="cursor-pointer font-medium">Error details</summary>
              <pre className="mt-1 whitespace-pre-wrap break-all">
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
              </pre>
            </details>
          )}
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            variant="outline"
            className="border-destructive-foreground/50 text-destructive-foreground hover:bg-destructive-foreground/10 hover:text-destructive-foreground"
          >
            Try again
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
