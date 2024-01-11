# 跨平台桌面程序开放

- Visual Studio + .net + C# 开发 Windows Form 程序
- [ELECTRON](https://electronjs.org/)

# 功能列表

- 提取词条
- 替换词条
- 检查翻译
- Excel to Json
- Json to Excel
- Json 合并
- 原厂代码添加翻译
  ![功能说明](/notes/imgs/node/功能说明.png)
  ![类结构](/notes/imgs/node/类结构.png)
  ![词条提取流程](/notes/imgs/node/词条提取流程.png)

#### 相关连接

- #### [AST](http://forivall.com/astexplorer/)

- #### [NPMJS](https://www.npmjs.com/)

- #### [XLSX](https://www.npmjs.com/package/xlsx)

- #### [Babylon](https://www.npmjs.com/package/babylon)

- #### [HtmlParser2](https://www.npmjs.com/package/htmlparser2)

- #### [JSDOM](https://www.npmjs.com/package/jsdom)

## NPM 发包

1. 注册账号
2. 创建项目

```
npm init myProject
```

3. 在生成的`package.json`中生成对应的信息，[参考链接](http://javascript.ruanyifeng.com/nodejs/packagejson.html)

**必须带有的字段**

- `name` ：包名(全部小写，没有空格，可以使用下划线或者横线)
- `version`：版本

> 比如`1.2.2`，遵循“大版本.次要版本.小版本”的格式规定。

**其他内容**

- `author`：作者信息

- `description`：描述信息，有助于搜索

- `keywords`：[] 关键字，有助于在人们使用 `npm search` 搜索时发现你的项目

- `scripts`：运行脚本命令的 npm 命令行缩写，通过`npm run 命令名`运行指定的命令

```json
"scripts": {
    "preinstall": "echo here it comes!",
    "postinstall": "echo there it goes!",
    "start": "node index.js",
    "test": "tap test/*.js"
}
```

运行`npm run test`执行对应的`tap test/*.js`指令，运行`start`指令可以省略`run`指令，即`npm start`即可

- `license`：默认是 MIT

- `bugs`：当前项目的一些错误信息，如果有的话

- `dependencies`：项目运行所依赖的模块 `npm i xxx -S` / `npm i xxx --save`

- `devDependencies`：项目开发阶段所需要的模块 `npm i xxx -D` / `npm i xxx --save-dev`

```json
{
	"devDependencies": {
		"browserify": "~13.0.0",
		"karma-browserify": "~5.0.1"
	}
}
```

> - **指定版本**：比如`1.2.2`，遵循“大版本.次要版本.小版本”的格式规定，安装时只安装指定版本。
> - **波浪号（tilde）+指定版本**：比如`~1.2.2`，表示安装 1.2.x 的最新版本（不低于 1.2.2），但是不安装 1.3.x，也就是说安装时不改变大版本号和次要版本号。
> - **插入号（caret）+指定版本**：比如 ˆ1.2.2，表示安装 1.x.x 的最新版本（不低于 1.2.2），但是不安装 2.x.x，也就是说安装时不改变大版本号。需要注意的是，如果大版本号为 0，则插入号的行为与波浪号相同，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容。
> - **latest**：安装最新版本。

- `repository`：代码仓库

- `bin`：指定各个内部命令对应的可执行文件的位置。

  ```json
  "bin": {
          "b28-cli": "./index.js"
  }
  ```

  全局即可运行`b28-cli`指令

- `main`：指定了加载的入口文件，`require('moduleName')`就会加载这个文件。这个字段的默认值是模块根目录下面的`index.js`。

4. 编写项目代码，调试等
5. 发布程序到 npm
6. 在终端登录 npm 账号 运行`npm login`
7. 在 package.json 的根目录下运行 `npm publish`
8. 等待上传信息，即可发包完成

#### 更新包

```
npm login
npm publish
```

### 注意事项

- 更新包，需求更新版本号信息即`version`，如果不修改版本号信息无法更新包，且版本信息必须往上加不能后退
- npm login 有时无法成功或者包发布不成功，此时运行`npm get registry`查看 npm 包源地址是否是`https://registry.npmjs.org/`，如果不是，则运行指令`npm config set registry https://registry.npmjs.org/`将院切换回去

- 如果当前的包名称已被别人占用，则包也无法发布，修改名称即可，查看包名称是否重复，直接上[npm](https://www.npmjs.com/)官网搜索即可，如果搜索出来带有`exact match`标识的包说明名称已存在，需要更换包名称
