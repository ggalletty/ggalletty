#!/usr/bin/env node

import fs from "fs/promises";
import { CONTRIBUTIONS_PLACEHOLDER } from "../constants/template.js";
import { FetchHttpClient } from "../infra/fetch-http-client.js";
import { GitHubContentService } from "../services/github-content-service.js";

(async function main() {
  const client = new FetchHttpClient();
  const githubContent = new GitHubContentService(client, "ggalletty");
  try {
    const template = await fs
      .readFile("./src/TEMPLATE.md", { encoding: "utf-8" })
      .catch(() => {
        throw new Error("Error while reading template");
      });

    const contributions = await githubContent.getContributions();

    console.log("Attempting to update contributions...");
    const result = template.replace(
      CONTRIBUTIONS_PLACEHOLDER,
      contributions.join(" • ")
    );

    await fs.writeFile("./README.md", result, { encoding: "utf-8" });
    console.log("Successfully updated contributions.");
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Process completed!");
  }
})().catch(console.error);
