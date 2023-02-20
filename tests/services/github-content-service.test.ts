import { test } from "node:test";
import assert from "node:assert";
import { GitHubContentService } from "../../src/services/github-content-service";
import * as mockedContributions from "../fixtures/contributions.json";
import * as mockedNoContributions from "../fixtures/no-contributions.json";

const client: any = {
  get: () => Promise.resolve([]),
};

test("github content service parses contributions correctly", async (t: any) => {
  t.mock.method(client, "get", () =>
    Promise.resolve({ body: mockedContributions })
  );

  const service = new GitHubContentService(client, "user");
  const contributions = await service.getContributions();

  assert.equal(contributions.length, 2);

  assert.deepEqual(contributions, [
    "https://github.com/ggalletty/ggalletty/pull/1",
    "https://github.com/ggalletty/ggalletty/pull/0",
  ]);
});

test("github content service handles empty item response", async (t: any) => {
  t.mock.method(client, "get", () =>
    Promise.resolve({ body: mockedNoContributions })
  );

  const service = new GitHubContentService(client, "user");
  const contributions = await service.getContributions();

  assert.equal(contributions.length, 0);

  assert.deepEqual(contributions, []);
});
