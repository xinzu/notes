# 编译器

> 编译器负责将输入的代码，转换为某种目标的输出格式

以下是关于 JS 和 TS 的编译器，它可以将现代的 JS 和 TS 转换成特定版本的 ECMAscript，并兼容浏览器和最新版本的 Node.js。

编译器从 `tsc` 和 `babel` 到 `swc` 和 `esbuild`，遗憾的是 swc 和 esbuild 都**不能类型检查**，它们只会尽可能的提速。如果项目正在使用 TS，最好还是在工具链中使用 tsc 来进行类型检查。

![编译器](/notes/imgs/JS生态工具/js&ts编译器.png)

## swc

[swc 官方文档](#https://swc.rs/docs/getting-started)

> swc 是用 rust 编写的 super-fasttypescript/javascript 编译器。

### 上层工具

- Vercel 和 Next.js
- Deno 的 linter，formatter 和 docs
- Parcel
- nx

### 安装

- @swc/cli 类似于 @babel/cli;
- @swc/core 类似于 @babel/core;

```
npm i -D @swc/core @swc/cli
```

或者

```
yarn add --dev @swc/core @swc/cli
```

### 基本使用

```bash
# 文件
npx swc ./file.js -o output.js
# 文件夹
npx swc ./my-dir -d output
```

![image-20220507111345794](/notes/imgs/JS生态工具/swc.png)

index.js 代码中使用了 ES6 的两个特性，const 声明 和 箭头函数。经过 swc 转化后，这两个特性分别被转化成了 var 声明 和 function 匿名函数

![image-20220507111401505](/notes/imgs/JS生态工具/swc-dist.png)

### 配置文件

`.swcrc`，类似于`.babelrc`

```json
{
	"jsc": {
		// 编译规则
		"target": "es5", // 输出js的规范
		"parser": {
			// 除了 ecmascript，还支持 typescript
			"syntax": "ecmascript", // 是否解析jsx，对应插件 @babel/plugin-transform-react-jsx
			"jsx": false, // 是否支持装饰器，对应插件 @babel/plugin-syntax-decorators
			"decorators": false, // 是否支持动态导入，对应插件 @babel/plugin-syntax-dynamic-import
			"dynamicImport": false // …… // babel 的大部分插件都能在这里找到对应配置
		},
		"minify": {} // 压缩相关配置，需要先开启压缩
	},
	"env": {
		// 编译结果相关配置
		"targets": {
			// 编译结果需要适配的浏览器
			"ie": "11" // 只兼容到 ie 11
		},
		"corejs": "3" // corejs 的版本
	},
	"minify": true // 是否开启压缩
}
```

### Node APIS

通过在 node.js 代码中，导入 @swc/core 模块，可以在 node.js 中调用 api 直接进行代码的编译，这对 CLI 工具的开发来说是常规操作。

```
// swc.mjs 
import { readFileSync } from 'fs' 
import { transform } from '@swc/core' 
 
const run = async () => { 
  const code = readFileSync('./source.js', 'utf-8') 
 const result = await transform(code, { 
    filename: "source.js", 
  }) 
  // 输出编译后代码 
  console.log(result.code) 
} 
 
run() 
```

![image-20220507111713986](/notes/imgs/JS生态工具/swc-node.png)

### 打包代码

除了将代码转义，swc 还提供了一个简易的打包能力。

```
npx spack
```

`spack.config.js`，swc 打包的配置文件

```js
// spack.config.js
module.exports = {
	entry: {
		// 打包的入口
		web: __dirname + "/src/index.js",
	},
	output: {
		// 打包后输出的文件夹
		path: __dirname + "/dist",
	},
};
```

![image-20220507112518488](/notes/imgs/JS生态工具/spack.png)

```js
// src/index.js
import { log } from "./utils.js";
const start = () => log("app started");
start();
// src/utils.js
export const log = function () {
	console.log(...arguments);
};
export const errorLog = function () {
	console.error(...arguments);
};
```

打包成功后，会在 dist 目录输出一个 web.js 文件。打包后的代码还进行了 tree shaking，将 utils.js 中没有使用的 errorLog 方法删掉了。

![image-20220507112649555](/notes/imgs/JS生态工具/spack-result.png) <img src="/notes/imgs/JS生态工具/spack-web.png" alt="image-20220507112744029" style="zoom: 67%;" />

## esbuild

> 它是一个「JavaScript」Bundler 打包和压缩工具，它可以将 JavaScript 和 TypeScript 代码打包分发在网页上运行。

### 上层工具

- Vite
- Nuxt.js
- Remix
- SvelteKit
- tsup

![esbuild压缩速度大幅提升](/notes/imgs/JS生态工具/esbuild.png)

### 对比现有打包工具

> esbuild」的作者对比目前现阶段类似的工具做了**基准测试**。最后的结果是：
>
> ​ 对于这些基准测试，esbuild 比其他 JavaScript 打包程序 快至少 100 倍。

#### 官方解释

- 它是用「Go」语言编写的，该语言可以编译为本地代码。
- 解析，生成最终文件和生成 source maps 全部完全并行化。
- 无需昂贵的数据转换，只需很少的几步即可完成所有操作。
- 该库以提高编译速度为编写代码时的第一原则，并尽量避免不必要的内存分配。

### 安装

```bash
npm install esbuild
```

### esbuild API

#### transform

transform 可以用于转化 .js、.tsx、ts 等文件，然后输出为旧的语法的 .js 文件，它提供了两个参数：

第一个参数（必填，字符串），指需要转化的代码（模块内容）。
第二个参数（可选），指转化需要的选项，如源文件路径 sourcefile、需要加载的 loader，其中 loader 的定义：

```ts
type Loader =
	| "js"
	| "jsx"
	| "ts"
	| "tsx"
	| "css"
	| "json"
	| "text"
	| "base64"
	| "file"
	| "dataurl"
	| "binary";
```

#### transfromSync

transform 的同步方法

#### build

`build` 实现了 `transform` 的能力，即代码转化，并且它还会将转换后的代码压缩并生成 `.js` 文件到指定 `output` 目录。`build` 只提供了一个参数（对象），来指定需要转化的入口文件、输出文件、`loader` 等选项：

```ts
interface BuildOptions extends CommonOptions {
	bundle?: boolean;
	splitting?: boolean;
	outfile?: string; // 输出文件路径
	metafile?: string;
	outdir?: string; // 输出地址
	platform?: Platform;
	color?: boolean;
	external?: string[];
	loader?: { [ext: string]: Loader };
	resolveExtensions?: string[];
	mainFields?: string[];
	write?: boolean;
	tsconfig?: string;
	outExtension?: { [ext: string]: string };

	entryPoints?: string[]; // 入口文件路径
	stdin?: StdinOptions;
}
```

#### buildSync

build 的同步方法

#### Service

> `Service` 的出现是为了解决调用上述 API 时都会创建一个子进程来完成的问题，如果存在多次调用 API 的情况出现，那么就会出现性能上的浪费。
>
> 所以，使用了 `Service` 来实现代码的转化或打包，则会创建一个长期的用于共享的子进程，避免了性能上的浪费。而在「Vite」中也正是使用 `Service` 的方式来进行 `.ts`、`.js`、`.jsx` 代码的转化工作。

```ts
// Service定义
interface Service {
	build(options: BuildOptions): Promise<BuildResult>;
	transform(
		input: string,
		options?: TransformOptions
	): Promise<TransformResult>;
	stop(): void;
}
```

实例

```js
// 使用时startService报错，可能是版本问题，待验证
const { startService, build } = require("esbuild");
const service = await startService();

try {
	const res = await service.build({
		entryPoints: ["./src/main.js"],
		write: false,
	});
	console.log(res);
} finally {
	service.stop();
}
```

**在使用 `stop` 的时候需要注意，它会结束这个子进程，这也意味着任何在此时处于 `pending` 的 `Promise` 也会被终止。**

### 使用

[esbuild 使用介绍](#https://juejin.cn/post/6918927987056312327)

#### writeFileSync/writeFile

```js
// file.js
// 生成in.ts文件
require("fs").writeFileSync("in.ts", "let x: number =   1");
// 编译in.ts 生成 out.js
require("esbuild").buildSync({
	entryPoints: ["in.ts"],
	outfile: "out.js",
});
```

​ 执行`node file.js` 生成 `in.ts` 和 `out.js` 两个文件

![writeFileSync/writeFile 结果](/notes/imgs/JS生态工具/esbuild-file.png)

#### 处理 jsx 代码

```js
require("esbuild").transformSync("<div/>", {
	jsxFactory: "h",
	loader: "jsx", // 将 loader 设置为 jsx 可以编译 jsx 代码
});
```

![jsx处理结果](/notes/imgs/JS生态工具/esbuild-jsx.png)

#### 代码压缩

```
var js = 'fn = obj => { return obj.x }'
const res = require('esbuild').transformSync(js, {
  minify: true,
})
```

![代码压缩结果](/notes/imgs/JS生态工具/esbuild-minify.png)

### 代码打包

`/src/index.js` 和 `/src/util.js` 和[swc](#打包代码)中的一样

![image-20220507145918226](/notes/imgs/JS生态工具/esbuild-result.png)

### 在 webpack 中使用 esbuild

在 plugins 中引用` esbuild-plugin`

```js
// webpack.config.js
const { ESBuildPlugin, ESBuildMinifyPlugin } = require('esbuild-plugin');
module.exports = {
    ...,
    rules: [
    // 用 esbuild 代替 babel-loader（ts-loader同理） 做代码降级
    {
    	test: /\.js$/,
        loader: 'esbuild-loader',
    	options: {
    		loader: 'jsx',
            target: 'es2015'
        }
	},
    // 用 esbuild 代替 ts-loader 处理 ts 代码
    {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
            loader: 'jsx',
            target: 'es2015'
        }
    }
	// 用于minify代码

    ],
    plugins: [
        new ESBuildPlugin()
    ],
    optimization: {
        minimize: true,
        minizer: [
            new ESBuildMinifyPlugin({
                target: 'es2015'
            })
        ]
    }
}
```

## babel vs tsc

- babel 无法做到类型检查，三克油使用`tsc --noEmit`单独检查类型

- ts 无法自动 polyfill

  Babel 的`@babel/polyfill`模块包含了`core-js`

  TS 只能通过`tsconfig`的`target`控制编译为对应 ECMAScript 版本的语法。比如 const/let 变 var，箭头函数变 function，async+await 变 Promise.then 这些，**不会引入内置对象的扩展**，比如你要运行的浏览器不支持 Promise，编译后也不会带一个完整的 Promise polyfill，想 polyfill 还是得配合 `core-js`

- babel 扩展性更强，有更丰富的社区生态（各种各样的插件）
- babel 支持更多语言特性
- babel 产物体积更小

如果项目中，已有 Babel 和 TypeScript，最好使用 Babel 编译代码，使用 TS 进行类型检查和生成`.d.ts`文件

## 打包器

## browserify

**浏览器端**的前端打包工具

## webpack

## rollup

## parcel

## 其他

`swc`和`esbuild`都具备打包功能，但功能还不够全面

# 包管理器

# 第三方库开发

# Web 应用开发
