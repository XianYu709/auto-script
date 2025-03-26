import { execaCommand } from "execa";
import { findUpSync } from "find-up";
import { cancel, isCancel, select } from "@clack/prompts";
import { dirname } from "node:path";
import {
  getPackages as getPackagesFunc,
  getPackagesSync as getPackagesSyncFunc,
} from "@manypkg/get-packages";

interface RunOptions {
  command?: string;
}

function findMonorepoRoot(cwd: string = process.cwd()) {
  const lockFile = findUpSync("pnpm-lock.yaml", {
    cwd,
    type: "file",
  });
  return dirname(lockFile || "");
}

function getRootScript() {
  const root = findMonorepoRoot();
  const { rootPackage } = getPackagesSyncFunc(root);
  let scripts = rootPackage?.packageJson.scripts;
  scripts = Object.entries(scripts).filter(([_, value]) => {
    return !value.includes("auto-script");
  });
  return scripts;
}

const keyLabelMap = {
  build: "打包",
  dev: "启动",
  release: "版本号提升",
};

function getLabel(rowkey: string) {
  for (const key in keyLabelMap) {
    if (rowkey.toLowerCase().includes(key)) {
      return rowkey.toLowerCase().replace(key, keyLabelMap[key]);
    }
  }
}

export async function run(options: RunOptions) {
  const { command } = options;
  // if (!command) {
  //   console.error("Please enter the command to run");
  //   process.exit(1);
  // }
  // console.log("command", command);

  const scripts = await getRootScript();

  let selectScript: string;
  if (scripts.length > 1) {
    selectScript = await select<any, string>({
      message: `Select the app you need to run script:`,
      options: scripts.map(([key, value]: any) => ({
        label: getLabel(key),
        value: value,
      })),
    });

    if (isCancel(selectScript) || !selectScript) {
      cancel("👋 Has cancelled");
      process.exit(0);
    }
  } else {
    selectScript = scripts[0][1];
  }

  execaCommand(`pnpm ${selectScript}`, {
    stdio: "inherit",
  });
}
