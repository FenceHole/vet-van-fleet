import { useState } from "react";
import { Octokit } from "@octokit/rest";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  Cat,
  Github,
  CheckCircle2,
  ExternalLink,
  ArrowLeft,
  BookMarked,
  Key,
  Rocket,
} from "lucide-react";
import { Link } from "wouter";

const createRepoSchema = z.object({
  token: z
    .string()
    .min(1, "Personal access token is required")
    .regex(/^(gh[ps]_|github_pat_)/, {
      message:
        "Token must be a valid GitHub personal access token (starts with ghp_, ghs_, or github_pat_)",
    }),
  description: z.string().optional(),
  isPrivate: z.boolean().default(false),
});

type CreateRepoValues = z.infer<typeof createRepoSchema>;

interface CreatedRepo {
  html_url: string;
  full_name: string;
}

const REPO_NAME = "the-hub";

function StepCard({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
        {step}
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}

export default function TheHub() {
  const { toast } = useToast();
  const [createdRepo, setCreatedRepo] = useState<CreatedRepo | null>(null);

  const form = useForm<CreateRepoValues>({
    resolver: zodResolver(createRepoSchema),
    defaultValues: {
      token: "",
      description: "The Hub — a central place for collaboration",
      isPrivate: false,
    },
  });

  const onSubmit = async (data: CreateRepoValues) => {
    try {
      const octokit = new Octokit({ auth: data.token });

      const response = await octokit.rest.repos.createForAuthenticatedUser({
        name: REPO_NAME,
        description: data.description || "",
        private: data.isPrivate,
        auto_init: true,
      });

      setCreatedRepo({
        html_url: response.data.html_url,
        full_name: response.data.full_name,
      });

      toast({
        title: "Repository created!",
        description: `"${response.data.full_name}" is ready on GitHub.`,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      const isConflict = message.includes("422") || message.includes("name already exists");
      toast({
        title: isConflict ? "Repository already exists" : "Failed to create repository",
        description: isConflict
          ? `You already have a repository named "${REPO_NAME}". Visit github.com to view it.`
          : message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-serif font-bold text-xl">
            <Cat className="h-6 w-6 text-primary" />
            <span>Vet Van Fleet</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-back-home"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Github className="h-3 w-3 mr-1" />
            GitHub Repository Creator
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Create <span className="text-primary">The Hub</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A step-by-step guide to creating your own GitHub repository named{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
              the-hub
            </code>
            — your central place for collaboration.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Instructions */}
          <div>
            <h2 className="font-serif text-2xl font-bold mb-6 flex items-center gap-2">
              <BookMarked className="h-5 w-5 text-primary" />
              How It Works
            </h2>

            <div className="space-y-6 mb-8">
              <StepCard step={1} title="Sign in to GitHub">
                Go to{" "}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2"
                >
                  github.com
                </a>{" "}
                and sign in (or create a free account if you don't have one).
              </StepCard>

              <StepCard step={2} title="Generate a Personal Access Token">
                <p className="mb-2">
                  Go to{" "}
                  <a
                    href="https://github.com/settings/tokens/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 inline-flex items-center gap-0.5"
                  >
                    GitHub → Settings → Developer Settings → Personal Access Tokens
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  .
                </p>
                <p>
                  Create a <strong>Classic token</strong> and check the{" "}
                  <code className="bg-muted px-1 rounded text-xs font-mono">repo</code>{" "}
                  scope. Copy the token — you'll need it below.
                </p>
              </StepCard>

              <StepCard step={3} title="Fill in the form and click Create">
                Paste your token into the form, optionally add a description, and
                hit <strong>Create the-hub</strong>. The repository will appear in
                your GitHub account instantly.
              </StepCard>
            </div>

            <Card className="bg-muted/40 border-border">
              <CardContent className="p-4">
                <div className="flex gap-2">
                  <Key className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    Your token is used only to call the GitHub API directly from
                    your browser. It is never sent to our servers.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form / Success */}
          <div>
            {createdRepo ? (
              <Card data-testid="card-success">
                <CardContent className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    The Hub is live!
                  </h2>
                  <p className="text-muted-foreground">
                    Your repository{" "}
                    <strong className="text-foreground">{createdRepo.full_name}</strong>{" "}
                    was created successfully.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <a
                      href={createdRepo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="link-view-repo"
                    >
                      <Button className="w-full sm:w-auto">
                        <Github className="mr-2 h-4 w-4" />
                        View on GitHub
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </a>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCreatedRepo(null);
                        form.reset();
                      }}
                      data-testid="button-create-another"
                    >
                      Create Another
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-xl flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    Create the-hub
                  </CardTitle>
                  <CardDescription>
                    Enter your GitHub personal access token to create the repository.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-5"
                    >
                      {/* Repository name — read-only display */}
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">
                          Repository Name
                        </label>
                        <div
                          className="flex h-10 w-full items-center rounded-md border border-input bg-muted px-3 py-2 text-sm font-mono text-muted-foreground select-none"
                          data-testid="display-repo-name"
                        >
                          {REPO_NAME}
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="token"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Personal Access Token *</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                                {...field}
                                data-testid="input-token"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description (optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="What will you use this repo for?"
                                {...field}
                                data-testid="input-description"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={form.formState.isSubmitting}
                        data-testid="button-create-repo"
                      >
                        {form.formState.isSubmitting ? (
                          "Creating..."
                        ) : (
                          <>
                            <Github className="mr-2 h-5 w-5" />
                            Create the-hub
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
      </main>
    </div>
  );
}
