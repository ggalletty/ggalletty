/**
 * Reduced model for GitHub issue items.
 * @see {@link https://docs.github.com/en/rest/reference/issues#get-an-issue Get an issue - GitHub Docs}
 */
export type GitHubIssueItem = {
  html_url: string;
  title: string;
  labels: string[];
  state: "open" | "closed";
};
