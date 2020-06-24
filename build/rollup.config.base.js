import commonjs from 'rollup-plugin-commonjs' // 将CommonJS模块转换为 ES2015 供 Rollup 处理
import babel from 'rollup-plugin-babel'  // rollup 的 babel 插件，ES6转ES5
import resolve from 'rollup-plugin-node-resolve' // 告诉 Rollup 如何查找外部模块
import { terser } from 'rollup-plugin-terser';

const isDev = process.env.NODE_ENV !== 'production';

export default {
  input: 'src/index.js',  //入口
  plugins: [
    babel({
      exclude: 'node_modules/**', // 防止打包node_modules下的文件
      runtimeHelpers: true,       // 使plugin-transform-runtime生效
    }),
    resolve(),
    commonjs(),
    !isDev && terser()
  ] // 插件
}