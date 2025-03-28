import { execaCommand } from "execa";
import { cancel, isCancel, select } from "@clack/prompts";
import { findRoot, getRootScript, getTransLabel } from "../utils/index";

export default async function (ai: boolean) {
  const root = findRoot();
  const scripts = await getRootScript(root);

  let selectScript: string | symbol;

  if (scripts.length > 1) {
    selectScript = await select<string>({
      message: `Select the app you need to run script:`,
      options: scripts.map(([key, value]: any) => ({
        label: getTransLabel(key),
        value: value,
      })),
    });

    if (isCancel(selectScript) || !selectScript) {
      cancel("👋 Has cancelled");
      process.exit(0);
    }
  } else {
    console.warn("No script available");
    process.exit(1);
  }

  if (!ai) {
    execaCommand(`pnpm ${String(selectScript)}`, {
      stdio: "inherit",
    });
  } else {
    try {
      const res = await execaCommand(`pnpm ${String(selectScript)}`);
      console.log("执行结果:", res);
    } finally {
      console.error("sssssss:", res);
    }
  }
}
