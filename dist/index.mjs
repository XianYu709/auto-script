import { createJiti } from "../node_modules/.pnpm/jiti@2.4.2/node_modules/jiti/lib/jiti.mjs";

const jiti = createJiti(import.meta.url, {
  "interopDefault": true,
  "alias": {
    "@xianyu709/auto-script": "E:/FrontendEngine/auto-scirpt"
  },
  "transformOptions": {
    "babel": {
      "plugins": []
    }
  }
})

/** @type {import("E:/FrontendEngine/auto-scirpt/src/index")} */
const _module = await jiti.import("E:/FrontendEngine/auto-scirpt/src/index.ts");

export default _module?.default ?? _module;