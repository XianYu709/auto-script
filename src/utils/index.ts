import { getPackagesSync as getPackagesSyncFunc } from "@manypkg/get-packages";
import { findUpSync } from "find-up";
import { dirname } from "node:path";

export function getTransLabel(rowkey: string) {
  
  const keyLabelMap = {
    build: "打包",
    dev: "启动",
    release: "版本号提升",
    test: "测试",
    "type-check": "类型检查",
    "lint:fix": "代码格式化",
    "lint:style": "样式检查",
    "lint:script": "脚本检查",
    "lint:commit": "提交检查",
  };

  for (const key in keyLabelMap) {
    if (rowkey.toLowerCase().includes(key)) {
      return rowkey.toLowerCase().replace(key, keyLabelMap[key]);
    } else {
      return rowkey;
    }
  }
}

export function findRoot(cwd: string = process.cwd()) {
  const lockFile = findUpSync("pnpm-lock.yaml", {
    cwd,
    type: "file",
  });
  return dirname(lockFile || "");
}

export function getRootScript(root: string) {
  const { rootPackage } = getPackagesSyncFunc(root);
  // @ts-ignore
  let scripts = rootPackage?.packageJson.scripts;
  scripts = Object.entries(scripts).filter(([_, value]: [string, string]) => {
    return !value.includes("auto-script");
  });
  return scripts;
}
