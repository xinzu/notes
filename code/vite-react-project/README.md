# React + TypeScript + Vite

## 创建项目

```shell
npm create vite vite-react-project
```

## 初始化配置

### 路径别名

```ts
// 修改`vite.config.ts`
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
})
```

- Q：__dirname 标红

  A： 需要安装支持@types/node到本地 ` npm i @types/node -D`

- Q: 配置别名后引入文件没有智能提示/有标红报错

  A：配置`tsconfig.json`

  ```json
  // 在compilerOptions中添加
  "baseUrl": "./",
  "paths": {
      "@": ["src"],
      "@/*": ["src/*"]
  }
  ```

### lint校验

#### prettier

```bash
yarn add prettier eslint-config-prettier eslint-plugin-prettier --save-dev
```

新增命令：表示扫描文件格式，并将文件中的代码修改为正确的格式

```json
"lint": "prettier --write \"src/**/*.+(js|ts|jsx|tsx)\"",
```

#### husky

```bash
yarn add husky -D
```

新增命令

```json
"prepare": "husky install"
```

**增加钩子函数**

```shell
# 表示 git commit 之前执行 npm run lint 
npx husky add .husky/pre-commit "npm run lint"
```



## 路由配置

```
/* @vite-ignore */
```
