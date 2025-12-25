import fs from "node:fs";
import path from "node:path";
import { Command } from "commander";

const defaultAssets = ["images"];

const log = (message) => {
  console.log("[assets]", message);
};

const copy = (from, to) => {
  fs.mkdirSync(to, { recursive: true });
  fs.cpSync(from, to, { recursive: true });
  log(`copied: ${from} -> ${to}`);
};

const copyAssets = (assets) => {
  for (const asset of assets) {
    const from = path.resolve("src", asset);
    const to = path.resolve("out", asset);

    if (!fs.existsSync(from)) {
      log(`skip: not found: ${from}`);
      continue;
    }

    copy(from, to);
  }
};

const program = new Command();
program
  .description("Copy static assets from src/ to out/")
  .argument("[assets...]", "Asset directories under src/", defaultAssets)
  .action((assets) => {
    copyAssets(assets);
  });

program.parse(process.argv);
