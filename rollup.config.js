import { defineConfig } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import externals from 'rollup-plugin-node-externals';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export default defineConfig([
  {
    input: 'src/index.ts', // 打包入口文件
    output: [
      {
        dir: 'dist', // 输出目标文件夹
        format: 'cjs', // 输出 commonjs 格式
      },
      {
        dir: 'dist', // 输出目标文件夹
        format: 'es', // 使用 es 格式，生成 .mjs 文件
      },
    ],
    plugins: [
      nodeResolve(),
      externals({
        devDeps: false, // 不将开发依赖当作外部依赖
      }),
      typescript(),
      json(),
      commonjs(),
      terser(), // 压缩代码
    ],
  },
]);
