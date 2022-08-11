# demkin-vue-ui

## 项目安装依赖

```
npm install

# 建议不要直接使用 cnpm 安装，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org
```

### 开发时运行

```
npm run serve
```

### 发布打包

```
npm run build
```

### 需要安装的 npm

1. 标准化的样式
   npm install normalize.css --save
2. 安装 Element-plus
   npm install element-plus --save
3. 按需自动导入
   npm install -D unplugin-vue-components unplugin-auto-import
4. 安装 sass-loader
   npm install sass-loader sass webpack --save-dev
5. 安装 js-cookie
   npm i js-cookie
6. 安装 axios
   npm i axios
7. 安装 mockjs，模拟数据
   npm i mockjs
8. 安装 path-to-regexp，vue3
   npm i path-to-regexp
   使用的时候需要 import \* as pathToRegexp from 'path-to-regexp'
9. path 报错
   npm install path-browserify
   configureWebpack: {
   resolve: {
   fallback: { path: require.resolve("path-browserify") },
   },
   },
10. 安装 fuse.js 使用模糊搜索功能
    npm i fuse.js
11. 安装 nprogress
    npm i nprogress
12. 安装 vue-i18n
    npm i vue-i18n@next
