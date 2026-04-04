import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  Cat,
  Camera,
  AlertCircle,
  Shield,
  Fingerprint,
  Send,
  CheckCircle2,
  Moon,
  Sun,
  ArrowLeft,
} from "lucide-react";
import { Link } from "wouter";

function useInView(ref: React.RefObject<HTMLElement>, threshold = 0.1) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return inView;
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(saved === "dark" || (!saved && prefersDark));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsDark(!isDark)}
      data-testid="button-theme-toggle-mugshots"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 h-16">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"
              }`}
              data-testid="link-back-to-vet"
            >
              <ArrowLeft className="h-4 w-4" />
              Vet Van Fleet
            </Link>
            <span className={isScrolled ? "text-border" : "text-white/30"}>|</span>
            <a
              href="#"
              className="flex items-center gap-2 font-serif font-bold text-xl"
              data-testid="link-logo-mugshots"
            >
              <Cat className="h-6 w-6 text-yellow-400" />
              <span className={isScrolled ? "text-foreground" : "text-white"}>
                CatMugshots.com
              </span>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => scrollTo("#gallery")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isScrolled
                  ? "text-foreground hover:text-primary"
                  : "text-white/90 hover:text-white"
              }`}
              data-testid="link-nav-gallery"
            >
              The Gallery
            </button>
            <button
              onClick={() => scrollTo("#submit")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isScrolled
                  ? "text-foreground hover:text-primary"
                  : "text-white/90 hover:text-white"
              }`}
              data-testid="link-nav-submit"
            >
              Submit a Cat
            </button>
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-zinc-900"
    >
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.15) 39px, rgba(255,255,255,0.15) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.15) 39px, rgba(255,255,255,0.15) 40px)`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        <Badge
          variant="outline"
          className="mb-6 border-yellow-400/50 text-yellow-400 bg-yellow-400/10 backdrop-blur-sm px-4 py-1.5 text-sm uppercase tracking-wider"
        >
          <Shield className="h-3.5 w-3.5 mr-2" />
          Public Record
        </Badge>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
          Their Crimes.
          <br />
          <span className="text-yellow-400">Our Records.</span>
        </h1>

        <p className="text-xl sm:text-2xl text-white/80 font-medium mb-4 max-w-3xl mx-auto">
          The internet's most wanted feline fugitives.
        </p>

        <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto">
          Knocked your water glass off the counter? Sat on your laptop at the worst moment?
          Justice demands a record. Submit your cat's mugshot and let the world know.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="min-w-[180px] text-lg bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-bold"
            onClick={() => document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" })}
            data-testid="button-view-gallery"
          >
            <Camera className="mr-2 h-5 w-5" />
            View Gallery
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-w-[180px] text-lg border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white/20"
            onClick={() => document.querySelector("#submit")?.scrollIntoView({ behavior: "smooth" })}
            data-testid="button-submit-cat"
          >
            <Fingerprint className="mr-2 h-5 w-5" />
            Report a Cat
          </Button>
        </div>
      </div>
    </section>
  );
}

const SAMPLE_MUGSHOTS = [
  {
    catName: "Mr. Whiskers",
    crime: "Knocked 3 full glasses of water off the counter in a single evening",
    sentence: "Community service (ignored)",
    emoji: "😼",
  },
  {
    catName: "Princess Fluffington",
    crime: "Sat directly on laptop keyboard during critical Zoom presentation",
    sentence: "Time-out (escaped immediately)",
    emoji: "😾",
  },
  {
    catName: "Sir Biscuit",
    crime: "Stole an entire rotisserie chicken from the kitchen counter",
    sentence: "Grounded (still plotting)",
    emoji: "🐱",
  },
  {
    catName: "Duchess Meowsworth",
    crime: "Bit owner's toes through the blanket at 3am for no reason",
    sentence: "Restricted blanket access (overturned on appeal)",
    emoji: "😺",
  },
  {
    catName: "Lord Floppington",
    crime: "Unrolled an entire toilet paper roll and shredded it across the bathroom",
    sentence: "No unsupervised bathroom access (unenforced)",
    emoji: "🙀",
  },
  {
    catName: "Agent Mittens",
    crime: "Systematically pushed every item off every shelf in the living room",
    sentence: "Mandatory shelving review (pending)",
    emoji: "😈",
  },
];

type CatMugshotData = {
  id: string;
  catName: string;
  crime: string;
  sentence: string;
  submitterName: string;
  submitterEmail: string;
  createdAt: string | null;
};

function MugshotCard({
  catName,
  crime,
  sentence,
  emoji,
  index,
  inView,
}: {
  catName: string;
  crime: string;
  sentence: string;
  emoji?: string;
  index: number;
  inView: boolean;
}) {
  return (
    <Card
      className={`group hover-elevate border-2 border-zinc-200 dark:border-zinc-700 transition-all duration-500 overflow-hidden ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      data-testid={`mugshot-card-${index}`}
    >
      <div className="bg-zinc-800 dark:bg-zinc-900 p-4 flex items-center justify-between">
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
          CASE #{String(index + 1001).padStart(4, "0")}
        </span>
        <Badge variant="destructive" className="text-xs font-mono">
          WANTED
        </Badge>
      </div>

      <div className="bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center py-8 text-6xl border-b-2 border-zinc-200 dark:border-zinc-700">
        {emoji ?? "🐱"}
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900 px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
        <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-0.5">
          Subject
        </p>
        <p className="font-bold font-serif text-lg text-foreground">{catName}</p>
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Crime
          </p>
          <p className="text-sm text-foreground">{crime}</p>
        </div>
        <div className="border-t border-border pt-3">
          <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">
            Sentence
          </p>
          <p className="text-sm text-muted-foreground italic">{sentence}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function GallerySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>);

  const { data: submittedMugshots = [] } = useQuery<CatMugshotData[]>({
    queryKey: ["/api/cat-mugshots"],
    queryFn: async () => {
      const res = await fetch("/api/cat-mugshots");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  return (
    <section
      id="gallery"
      ref={ref}
      className="py-24 md:py-32 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 font-mono uppercase tracking-widest"
          >
            <Camera className="h-3 w-3 mr-1" />
            Most Wanted
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            The Hall of Shame
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These notorious felines have been caught red-pawed. Their crimes are
            a matter of public record.
          </p>
        </div>

        {submittedMugshots.length > 0 && (
          <div className="mb-16">
            <h3 className="font-serif text-2xl font-bold mb-8 flex items-center gap-2">
              <Badge variant="destructive" className="font-mono text-sm">NEW</Badge>
              Recently Reported
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {submittedMugshots.map((mugshot, index) => (
                <MugshotCard
                  key={mugshot.id}
                  catName={mugshot.catName}
                  crime={mugshot.crime}
                  sentence={mugshot.sentence}
                  index={index}
                  inView={inView}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          {submittedMugshots.length > 0 && (
            <h3 className="font-serif text-2xl font-bold mb-8 text-muted-foreground">
              Established Criminals
            </h3>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_MUGSHOTS.map((mugshot, index) => (
              <MugshotCard
                key={mugshot.catName}
                catName={mugshot.catName}
                crime={mugshot.crime}
                sentence={mugshot.sentence}
                emoji={mugshot.emoji}
                index={submittedMugshots.length + index}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const mugshotFormSchema = z.object({
  catName: z.string().min(1, "Your cat needs a name for the record"),
  crime: z.string().min(10, "Please describe the crime in at least 10 characters"),
  sentence: z.string().min(5, "What was the sentence?"),
  submitterName: z.string().min(2, "Name must be at least 2 characters"),
  submitterEmail: z.string().email("Please enter a valid email address"),
});

type MugshotFormValues = z.infer<typeof mugshotFormSchema>;

function SubmitSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>);
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<MugshotFormValues>({
    resolver: zodResolver(mugshotFormSchema),
    defaultValues: {
      catName: "",
      crime: "",
      sentence: "",
      submitterName: "",
      submitterEmail: "",
    },
  });

  const mugshotMutation = useMutation({
    mutationFn: async (data: MugshotFormValues) => {
      const response = await apiRequest("POST", "/api/cat-mugshots", data);
      return response;
    },
    onSuccess: () => {
      setSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/cat-mugshots"] });
      toast({
        title: "Mugshot filed!",
        description: "Your cat's crimes are now a matter of public record.",
      });
    },
    onError: (error) => {
      toast({
        title: "Filing failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: MugshotFormValues) => {
    mugshotMutation.mutate(data);
  };

  return (
    <section
      id="submit"
      ref={ref}
      className="py-24 md:py-32 bg-muted/30"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 font-mono uppercase tracking-widest"
          >
            <Fingerprint className="h-3 w-3 mr-1" />
            File a Report
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Report Your Cat
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Does your cat have a criminal record? It does now. Fill out the official
            CatMugshots intake form to document their misdeeds for posterity.
          </p>
        </div>

        <div
          className={`transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {submitted ? (
            <Card className="text-center py-12">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="text-4xl">😼</div>
                <h3 className="font-serif text-2xl font-bold text-foreground">
                  Mugshot Filed Successfully!
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Your cat's criminal record has been officially documented. Their shame is now
                  a matter of public record. Justice has been served.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false);
                    form.reset();
                  }}
                  data-testid="button-file-another"
                >
                  File Another Report
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-2 border-zinc-200 dark:border-zinc-700">
              <div className="bg-zinc-800 dark:bg-zinc-900 px-6 py-3 flex items-center gap-3 rounded-t-lg">
                <Shield className="h-4 w-4 text-yellow-400" />
                <span className="font-mono text-yellow-400 text-sm uppercase tracking-widest">
                  Official Intake Form
                </span>
              </div>
              <CardHeader className="pb-0">
                <CardTitle className="font-serif text-xl">Cat Crime Report</CardTitle>
                <CardDescription>
                  All fields are required unless noted. This record is permanent.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="catName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Subject's Name{" "}
                            <span className="font-mono text-xs text-muted-foreground">
                              (the cat)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Mr. Whiskers, Princess Fluffington..."
                              {...field}
                              data-testid="input-cat-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="crime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Crime Committed{" "}
                            <span className="font-mono text-xs text-muted-foreground">
                              (be specific)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Knocked laptop off desk during important call..."
                              {...field}
                              data-testid="input-crime"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sentence"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Sentence Delivered{" "}
                            <span className="font-mono text-xs text-muted-foreground">
                              (probably ignored)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Timeout in the bathroom (escaped in 30 seconds)..."
                              {...field}
                              data-testid="input-sentence"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid sm:grid-cols-2 gap-4 border-t pt-4">
                      <FormField
                        control={form.control}
                        name="submitterName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reporting Party</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                {...field}
                                data-testid="input-submitter-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="submitterEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@example.com"
                                {...field}
                                data-testid="input-submitter-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-bold"
                      size="lg"
                      disabled={mugshotMutation.isPending}
                      data-testid="button-submit-mugshot"
                    >
                      {mugshotMutation.isPending ? (
                        "Filing Report..."
                      ) : (
                        <>
                          File the Mugshot
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Cat className="h-6 w-6 text-yellow-400" />
            <div>
              <p className="font-serif font-bold text-white text-lg">CatMugshots.com</p>
              <p className="text-zinc-500 text-xs">A proud partner of Vet Van Fleet</p>
            </div>
          </div>

          <p className="text-zinc-500 text-sm text-center">
            No cats were harmed in the making of this website.
            <br />
            They remain entirely unrepentant.
          </p>

          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-yellow-400 transition-colors text-sm font-medium"
            data-testid="link-footer-vet"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Vet Van Fleet
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-800 text-center text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} CatMugshots.com — All criminals reserved.
        </div>
      </div>
    </footer>
  );
}

export default function CatMugshots() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <GallerySection />
        <SubmitSection />
      </main>
      <Footer />
    </div>
  );
}
