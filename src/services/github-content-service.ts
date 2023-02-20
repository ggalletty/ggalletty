import { IHttpClient } from "../interface/http-client";
import { GithubSearchIssuesResult } from "../model/github-search-issues-result";

enum GITHUB_API_ENDPOINT {
  SEARCH_ISSUES = "https://api.github.com/search/issues",
}

export class GitHubContentService {
  constructor(private http: IHttpClient, private username: string) {}

  /**
   * Returns a list with the most recent public contributions URLs.
   *
   * URL references are automatically shortened by GitHub.
   * @see {@link https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/autolinked-references-and-urls Autolinked references and URLs - GitHub Docs}
   * @returns Array of contribution URLs.
   */
  public async getContributions(): Promise<string[]> {
    const res = await this.http
      .get<GithubSearchIssuesResult>(this.composeContributionsUrl())
      .catch(() => {
        throw new Error("Error while fetching contributions");
      });

    return (res?.body?.items || []).map((item) => item.html_url);
  }

  /**
   * Compose endpoint URL to fetch user contributions, ignores contributions to own repos.
   * @param limit Maximum number of contributions to return.
   * @returns Composed URL string.
   */
  private composeContributionsUrl(limit = 10) {
    return `${GITHUB_API_ENDPOINT.SEARCH_ISSUES}?q=author:${this.username}+-user:${this.username}+is:pr&sort=updated&per_page=${limit}`;
  }
}
