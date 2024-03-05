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

#### commintlint

```shell
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

新增配置文件 `commitlint.config.js`

```js
module.exports = {
    // type 类型（定义之后，可通过上下键选择）
    types: [
        { value: 'feat', name: 'feat:新增功能' },
        { value: 'fix', name: 'fix:修复 bug' },
        { value: 'docs', name: 'docs:文档变更' },
        { value: 'style', name: 'style:代码格式（不影响功能，例如空格、分号等格式修正）' },
        { value: 'refactor', name: 'refactor: 代码重构（不包括 bug 修复、功能新增）' },
        { value: 'perf', name: 'perf:性能优化' },
        { value: 'test', name: 'test:添加、修改测试用例' },
        { value: 'build', name: 'build:构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）' },
        { value: 'ci', name: 'ci:修改 CI 配置、脚本' },
        { value: 'chore', name: 'chore:对构建过程或辅助工具和库的更改（不影响源文件、测试用例）' },
        { value: 'revert', name: 'revert:回滚 commit' }
    ],
}
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
# git commit 限制
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```



## 路由配置

```
/* @vite-ignore */
```
