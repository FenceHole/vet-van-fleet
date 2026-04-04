/**
 * Standalone script to create the "Fence Hole Hub" GitHub repository.
 *
 * Usage:
 *   GITHUB_TOKEN=<your-token> tsx script/create-fence-hole-hub.ts
 *
 * The GITHUB_TOKEN must belong to the account (or org) where the repository
 * should be created, and must have the `repo` scope.
 */
import { createGitHubRepo } from "../server/github";

async function main() {
  console.log("Creating GitHub repository: Fence Hole Hub…");

  const repo = await createGitHubRepo({
    name: "fence-hole-hub",
    description: "Fence Hole Hub",
    isPrivate: false,
    autoInit: true,
  });

  console.log(`✅ Repository created successfully!`);
  console.log(`   Name : ${repo.fullName}`);
  console.log(`   URL  : ${repo.url}`);
  console.log(`   ID   : ${repo.id}`);
}

main().catch((err) => {
  console.error("❌ Failed to create repository:", err.message);
  process.exit(1);
});
