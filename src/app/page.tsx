
'use client';

import { useState, useRef, type ChangeEvent, useEffect } from 'react';
import NextImage from 'next/image';
import Link from 'next/link'; // Added for Privacy Policy link
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, UploadCloud, Camera, Languages, Wand2, ImageOff, FileImage } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

import { generatePoem } from '@/ai/flows/generate-poem';

const LANGUAGES = [
  { value: "English", label: "English" },
  { value: "Hindi", label: "हिन्दी" },
  { value: "Bengali", label: "বাংলা" },
  { value: "Marathi", label: "मराठी" },
  { value: "Telugu", label: "తెలుగు" },
  { value: "Tamil", label: "தமிழ்" },
];

export default function RhymeSnapPage() {
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>(LANGUAGES[0].value);
  const [poem, setPoem] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  // State for current year to avoid hydration mismatch for the footer
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);


  const handleImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file.');
        setSelectedImageBase64(null);
        setImageFileName(null);
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Please select an image file (e.g., JPG, PNG, GIF).",
        });
        return;
      }
      setError(null);
      setPoem(null); 
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    if (event.target) {
      event.target.value = '';
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();
  
  const triggerCameraInput = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        cameraInputRef.current?.click();
      } catch (err) {
        console.error("Camera access denied:", err);
        setError("Camera access was denied. Please enable camera permissions in your browser settings.");
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description: "Please enable camera permissions in your browser settings to use this feature.",
        });
      }
    } else {
       setError("Camera not available on this device or browser.");
       toast({
          variant: "destructive",
          title: "Camera Not Available",
          description: "Your browser or device does not support camera access.",
        });
    }
  };


  const handleSubmit = async () => {
    if (!selectedImageBase64) {
      setError('Please select an image first.');
      toast({
          variant: "destructive",
          title: "No Image Selected",
          description: "Please select or capture an image before generating a poem.",
        });
      return;
    }

    setIsLoading(true);
    setError(null);
    setPoem(null);

    try {
      const result = await generatePoem({
        imageUri: selectedImageBase64,
        language: language,
      });
      if (result.poem) {
        setPoem(result.poem);
      } else {
        const defaultError = 'The AI could not generate a poem. Please try again.';
        setError(defaultError);
        toast({
          variant: "destructive",
          title: "Poem Generation Failed",
          description: "The AI could not generate a poem for this image. Please try a different image or try again later.",
        });
      }
    } catch (e: any) {
      console.error(e);
      const errorMessage = e.message || 'An unexpected error occurred while generating the poem.';
      setError(errorMessage);
      toast({
          variant: "destructive",
          title: "Error Generating Poem",
          description: errorMessage,
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 flex flex-col items-center min-h-screen bg-background text-foreground">
      <div className="w-full max-w-2xl space-y-8">
        <header className="text-center">
          <h1 className="text-5xl font-bold text-primary">RhymeSnap</h1>
          <p className="text-muted-foreground mt-2 text-lg">Turn your photos into poetry!</p>
        </header>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <FileImage className="h-7 w-7 text-primary" /> Image Selection
            </CardTitle>
            <CardDescription>Select an image from your gallery or take a new photo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageFileChange}
              className="hidden"
              aria-label="Upload image from gallery"
            />
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={cameraInputRef}
              onChange={handleImageFileChange}
              className="hidden"
              aria-label="Capture image with camera"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button variant="outline" onClick={triggerFileInput} className="py-3 text-base">
                <UploadCloud className="mr-2 h-5 w-5" /> Select from Gallery
              </Button>
              <Button variant="outline" onClick={triggerCameraInput} className="py-3 text-base">
                <Camera className="mr-2 h-5 w-5" /> Capture with Camera
              </Button>
            </div>
            {selectedImageBase64 ? (
              <div className="mt-4 border border-dashed border-muted-foreground/50 rounded-lg p-4 text-center">
                <div className="relative w-full max-w-md mx-auto aspect-[4/3] rounded-md overflow-hidden shadow-md">
                  <NextImage src={selectedImageBase64} alt="Selected preview" fill style={{objectFit: 'contain'}} data-ai-hint="user uploaded" />
                </div>
                {imageFileName && <p className="text-sm text-muted-foreground mt-2">Selected: {imageFileName}</p>}
              </div>
            ) : (
              <div className="mt-4 h-48 flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg bg-muted/20">
                <ImageOff className="h-12 w-12 text-muted-foreground/50" />
                <p className="mt-2 text-sm text-muted-foreground">Your image will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Languages className="h-7 w-7 text-primary" /> Select Language
            </CardTitle>
            <CardDescription>Choose the language for your poem.</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full py-3 text-base" aria-label="Select language">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Languages</SelectLabel>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value} className="text-base">
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Button 
          onClick={handleSubmit} 
          disabled={isLoading || !selectedImageBase64} 
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-6 text-lg font-semibold shadow-md disabled:opacity-70"
          aria-live="polite"
        >
          {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Wand2 className="mr-2 h-6 w-6" />}
          {isLoading ? 'Generating Your Masterpiece...' : 'Generate Poem'}
        </Button>

        {error && !isLoading && (
          <Alert variant="destructive" className="shadow-md">
            <AlertTitle className="font-semibold">Oops! Something went wrong.</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {poem && selectedImageBase64 && (
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Your RhymeSnap!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border-2 border-primary/50 shadow-inner">
                <NextImage 
                  src={selectedImageBase64} 
                  alt="Content for poem" 
                  fill 
                  style={{objectFit: 'contain'}}
                  data-ai-hint="poetry inspiration" 
                />
              </div>
              <div className="p-6 bg-secondary/20 rounded-lg border border-primary/30 shadow-sm">
                <h3 className="font-semibold text-xl text-primary mb-3 text-center">Generated Poem in {language}:</h3>
                <pre className="whitespace-pre-wrap font-sans text-foreground text-base leading-relaxed text-center sm:text-left p-2 bg-background/50 rounded-md">
                  {poem}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
         <footer className="text-center text-sm text-muted-foreground py-8 space-y-2">
            {currentYear !== null ? (
              <p>&copy; {currentYear} RhymeSnap. Create poetry from pixels.</p>
            ) : (
              <p>&copy; RhymeSnap. Create poetry from pixels.</p> 
            )}
            <Link href="/privacy-policy" className="hover:text-accent hover:underline">
              Privacy Policy
            </Link>
        </footer>
      </div>
    </main>
  );
}
