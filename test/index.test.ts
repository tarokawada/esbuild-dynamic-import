import { build, PluginBuild } from "esbuild";
import { describe, expect, it, vi } from "vitest";
import { dynamicImportToConsolePlugin, PLUGIN_NAME } from "../src/index";
import fs from "fs/promises";

describe("replaces dynamic imports with console.log()", async () => {
  it("should do something", async () => {
    await build({
      entryPoints: ["test/sample.js"],
      bundle: true,
      outfile: "output.js",
      plugins: [dynamicImportToConsolePlugin],
    });

    const output = await fs.readFile("output.js", "utf8");
    expect(output.includes("import(")).toBe(false); // Ensure no dynamic imports remain
    expect((output.match(/console.log\(\)/g) || []).length).toBe(2); // Ensure two console.log() replacements
  });
});
