import { consola } from "consola";
import colors from "chalk";
import { cac } from "cac";
import outScript from "./run/out-script";

try {
  const autoScript = cac("auto-script");

  autoScript
    .command("run-out")
    .option("--ai", "ai处理异常")
    .action(async (_: string, options: any) => {
      outScript(options?.ai);
    });

  autoScript
    .command("run-monorepo")
    .option("--ai", "ai处理异常")
    .action(async (command: string, options: any) => {
       
    });

  autoScript.command("create").action(async () => {
    consola.info("Create command executed");
  });

  autoScript.command("update").action(async () => {
    consola.info("Update command executed");
  });

  // 处理未知命令
  autoScript.command("*", "未知命令处理").action(() => {
    consola.error(colors.red("Invalid command!"));
    process.exit(1);
  });
  autoScript.on("command:*", () => {
    consola.error(colors.red("Invalid command!"));
    process.exit(1);
  });

  autoScript.usage("auto-script");
  autoScript.help();
  autoScript.parse();
} catch (error) {
  consola.error(error);
  process.exit(1);
}
