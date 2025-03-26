import { consola } from "consola";
import colors from "chalk";

import { cac } from "cac";

import { run } from "./run";

try {
  const turboAuto = cac("auto-script");

  turboAuto
    .command("[script]")
    .usage(`Run turbo interactively.`)
    .action(async (command: string) => {
      run({ command });
    });

  // Invalid command
  turboAuto.on("command:*", () => {
    consola.error(colors.red("Invalid command!"));
    process.exit(1);
  });

  turboAuto.usage("auto-script");
  turboAuto.help();
  turboAuto.parse();
} catch (error) {
  consola.error(error);
  process.exit(1);
}
