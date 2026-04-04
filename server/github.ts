import { Octokit } from "@octokit/rest";

/**
 * Creates a GitHub repository using the provided token.
 * Requires the GITHUB_TOKEN environment variable to be set,
 * or an explicit token can be passed as the second argument.
 */
export async function createGitHubRepo(
  options: {
    name: string;
    description?: string;
    isPrivate?: boolean;
    autoInit?: boolean;
  },
  token?: string,
): Promise<{ url: string; fullName: string; id: number }> {
  const authToken = token ?? process.env.GITHUB_TOKEN;
  if (!authToken) {
    throw new Error(
      "A GitHub token is required. Set the GITHUB_TOKEN environment variable.",
    );
  }

  const octokit = new Octokit({ auth: authToken });

  const { data } = await octokit.repos.createForAuthenticatedUser({
    name: options.name,
    description: options.description,
    private: options.isPrivate ?? false,
    auto_init: options.autoInit ?? true,
  });

  return {
    url: data.html_url,
    fullName: data.full_name,
    id: data.id,
  };
}
