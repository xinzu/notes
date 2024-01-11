## ES7(ES2016)

### Array.prototype.includes()

`includes()` 方法用来判断一个数组是否包含一个指定的值，如果包含则返回 `true`，否则返回 `false`。

**语法**

```js
arr.includes(valueToFind[, fromIndex])
```

- `valueToFind`，需要查找的元素值。

- `fromIndex` 可选 从`fromIndex` 索引处开始查找 `valueToFind`。如果为负值（即从倒数第`fromIndex`个索引往后搜寻）。默认为 0。

**示例**

```js
const arr = ["es6", "es7", "es8"];
console.log(arr.includes("es7")); // true
console.log(arr.includes("es7", 1)); // true
console.log(arr.includes("es7", 2)); // false
console.log(arr.includes("es7", -1)); // fsle
console.log(arr.includes("es7", -2)); // true
```

**注意点**

- 使用 `includes()`查找字符串是区分大小写的

  ```js
  const arr = ["es6", "es7", "es8", "a"];
  console.log(arr.includes("A")); // false
  ```

- 使用 `includes()`只能判断简单类型的数据，对于复杂类型的数据，比如对象类型的数组，二维数组，这些是无法判断的

  ```js
  const arr = ["es6", ["es7", "es8"], "es9", { name: "jimmy" }];
  console.log(arr.includes(["es7", "es8"])); // false
  console.log(arr.includes({ name: "jimmy" })); // false
  ```

- 能识别 NaN，indexOf 是不能识别 NaN 的

  ```js
  const arr = ["es6", "es7", NaN, "es8"];
  console.log(arr.includes(NaN)); // true
  console.log(arr.indexOf(NaN)); // -1
  ```

**如果只想知道某个值是否在数组中存在，而并不关心它的索引位置，建议使用 includes(),如果想获取一个值在数组中的位置，那么使用 indexOf 方法**

### 幂运算符 \*\*

_幂运算符的两个\*号之间不能出现空格，否则语法会报错_

比如我们想求 2 的 10 次方。

- 自己写函数实现

```js
function pow(x, y) {
	let result = 1;
	for (let i = 0; i < y; i++) {
		result *= x;
	}
	return result;
}
console.log(pow(2, 10)); // 1024
```

- Math.pow

```js
console.log(Math.pow(2, 10)); // 1024
```

- 幂运算符

```js
console.log(2 ** 10); // 1024

2 ** 3; // 8
3 ** 2; // 9
3 ** 2.5; // 15.588457268119896
10 ** -1; // 0.1
NaN ** 2; // NaN
```

## ES8(ES2017)

### Object.values()

`Object.values` 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。

```js
const obj = {
	name: "jimmy",
	age: 18,
	height: 188,
};
console.log(Object.values(obj)); // [ 'jimmy', 18, 188 ]
```

### Object.entries()

`Object.entries() `方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历属性的键值对数组。

```js
const obj = {
	name: "jimmy",
	age: 18,
	height: 188,
};
console.log(Object.entries(obj)); // [ [ 'name', 'jimmy' ], [ 'age', 18 ], [ 'height', 188 ] ]
console.log(Object.entries([1, 2, 3])); // [ [ '0', 1 ], [ '1', 2 ], [ '2', 3 ] ]
```

### Object.getOwnPropertyDescriptors()

`Object.getOwnPropertyDescriptors()` 方法用来获取一个对象的所有自身属性的描述符。

```js
const obj = {
  name: "jimmy",
  age: 18,
};
const desc = Object.getOwnPropertyDescriptors(obj);
console.log(desc);

// 结果
{
  name: {
    value: 'jimmy',
    writable: true,
    enumerable: true,
    configurable: true
  },
  age: {
   value: 18,
   writable: true,
   enumerable: true,
   configurable: true
  }
}
```

### String.prototype.padStart

把指定字符串填充到字符串头部，返回新字符串。

**语法**

```js
str.padStart(targetLength [, padString])
```

- `targetLength`

当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。

- `padString` 可选

填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的默认值为 " "

**示例**

```js
"abc".padStart(10); // "       abc"
"abc".padStart(10, "foo"); // "foofoofabc"
"abc".padStart(6, "123456"); // "123abc"
"abc".padStart(8, "0"); // "00000abc"
"abc".padStart(1); // "abc"
```

**应用场景**

- 日期格式化：yyyy-mm-dd 的格式

  ```js
  const now = new Date();
  const year = now.getFullYear();
  // 月份和日期 如果是一位前面给它填充一个0
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  console.log(year, month, day);
  console.log(`${year}-${month}-${day}`); //输入今天的日期 2021-12-31
  ```

- 数字替换(手机号，银行卡号等）

  ```js
  const tel = "18781268679";
  const newTel = tel.slice(-4).padStart(tel.length, "*");
  console.log(newTel); // *******5678
  ```

### String.prototype.padEnd

把指定字符串填充到字符串尾部，返回新字符串。

**语法同上**

```js
"abc".padEnd(10); // "abc       "
"abc".padEnd(10, "foo"); // "abcfoofoof"
"abc".padEnd(6, "123456"); // "abc123"
"abc".padEnd(1); // "abc"
```

### 尾逗号 Trailing commas

ES8 允许函数的最后一个参数有尾逗号（Trailing comma）。此前，函数定义和调用时，都不允许最后一个参数后面出现逗号。

```js
function test(param1, param2) {}
```

### async/await

**待补充**

## ES9(ES2018)

### Object Rest & Spread

在 ES9 新增 Object 的 Rest & Spread 方法

**spread 示例**

- 把 input 对象的数据都拓展到 output 对象

- 如果存在相同的属性名，只有最后一个会生效

  ```js
  const input = {
  	a: 1,
  	b: 2,
  	c: 3,
  };
  const output = {
  	...input,
  	c: 4,
  };
  console.log(output); // {a: 1, b: 2, c: 4}
  ```

- 如果属性的值是一个对象的话，该对象的引用会被拷贝，而不是生成一个新的对象。

  ```js
  const obj = { x: { y: 10 } };
  const copy1 = { ...obj };
  const copy2 = { ...obj };
  obj.x.y = "jimmy";
  console.log(copy1, copy2); // x: {y: "jimmy"} x: {y: "jimmy"}
  console.log(copy1.x === copy2.x); // → true
  ```

**rest**示例

当对象 key-value 不确定的时候，把必选的 key 赋值给变量，用一个变量收敛其他可选的 key 数据。**rest 属性必须始终出现在对象的末尾**，否则将抛出错误。

```js
const input = {
	a: 1,
	b: 2,
	c: 3,
};
const { a, ...rest } = input;
console.log(a, rest); // 1 {b: 2, c: 3}
```

### for...await...of

`for...of`是同步运行的，不能遍历异步迭代器。

异步迭代器(for-await-of)：循环等待每个 Promise 对象变为 resolved 状态才进入下一步。

```js
function TimeOut(time) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(time);
		}, time);
	});
}
async function test() {
	let arr = [TimeOut(2000), TimeOut(1000), TimeOut(3000)];
	for await (let item of arr) {
		console.log(Date.now(), item);
	}
}
test();
// 1560092345730 2000
// 1560092345730 1000
// 1560092346336 3000
```

### Promise.prototype.finally()

> Promise.prototype.finally() 方法返回一个 Promise，在 promise 执行结束时，无论结果是 fulfilled 或者是 rejected，在执行 then()和 catch()后，都会执行 finally 指定的回调函数。
>
> 这为指定执行完 promise 后，无论结果是 fulfilled 还是 rejected 都需要执行的代码提供了一种方式，避免同样的语句需要在 then()和 catch()中各写一次的情况。

```js
new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("success");
		// reject('fail')
	}, 1000);
})
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log(err);
	})
	.finally(() => {
		console.log("finally");
	});
```

### String 扩展

#### 模板标签

ES6 用法

```js
const foo = (a, b, c) => {
	console.log(a);
	console.log(b);
	console.log(c);
};
const name = "jimmy";
const age = 18;
foo`这是${name},他的年龄是${age}岁`;
```

![模板标签运行结果](/notes/imgs/ES/模板标签运行结果.png)

ES9，放松对标签模板里字符串转义的限制, 遇到不合法的字符串转义会返回 undefined，并且从 raw 上可获取原字符串。

```js
function foo(a, b, c) {
	console.log(a, b, c);
}
foo`\u{61} and \u{62}`;
foo`\u{61} and \unicode`;
```

![图片](/notes/imgs/ES/模板标签运行结果es9.png)

**注意：**在**模板字符串**中，如果输入无效的 unicode 字符，还是会报错。只有在便签模板中 从 es9 开始才不会报错。

```js
let string = `\u{61} and \unicode`;
console.log(string); // Uncaught SyntaxError: Invalid Unicode escape sequence
```

## ES10(ES2019)

### Object.fromEntries()

`Object.fromEntries() `把键值对列表转换为一个对象，这个方法是和 `Object.entries() `相对的。

```js
Object.fromEntries([
	["foo", 1],
	["bar", 2],
]);
// {foo: 1, bar: 2}
```

- 和`Object.entries`互转

  ```js
  const obj = {
  	name: "jimmy",
  	age: 18,
  };
  const entries = Object.entries(obj);
  console.log(entries); // [['name', 'jimmy'], [age, 18]]

  const fromEntries = Object.fromEntries(entries);
  console.log(fromEntries); // {name: "jimmy", age: 18}
  ```

- Map 转 Object

  ```js
  const map = new Map();
  map.set("name", "jimmy");
  map.set("age", 18);
  console.log(map); // {'name' => 'jimmy', 'age' => 18}

  const obj = Object.fromEntries(map);
  console.log(obj); // {name: "jimmy", age: 18}
  ```

- 对象过滤

  ```js
  const course = {
  	math: 80,
  	english: 85,
  	chinese: 90,
  };
  const res = Object.entries(course).filter(([key, val]) => val > 80);
  console.log(res); // [ [ 'english', 85 ], [ 'chinese', 90 ] ]
  console.log(Object.fromEntries(res)); // { english: 85, chinese: 90 }
  ```

- URL 的 search 参数转换

  ```js
  // 之前都是通过split来进行转换
  const queryString = "?name=jimmy&age=18&height=1.88";
  const queryParams = new URLSearchParams(queryString);
  const paramObj = Object.fromEntries(queryParams);
  console.log(paramObj); // { name: 'jimmy', age: '18', height: '1.88' }
  ```

### Array.prototype.flat()

`flat()` 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

**语法**

```js
let newArray = arr.flat([depth]);
```

- `depth` 可选

指定要提取嵌套数组的结构深度，默认值为 1。

### Array.prototype.flatMap()

**语法**

> `flatMap` 方法与 `map` 方法和深度 depth 为 1 的 `flat` 几乎相同

```
var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
    // 返回新数组的元素
}[, thisArg])
```

- `callback` 可以生成一个新数组中的元素的函数，可以传入三个参数
  - `currentValue` 当前数组中正在处理的元素
  - `index[可选]` 当前数组中正在处理的元素索引
  - `array[可选]` 被调用的`map`数组
- `thisArg` 执行 `callback` 函数时 使用的`this` 值。

**示例**

```js
let arr = ["今天天气不错", "", "早上好"];
arr.map((s) => s.split(""));
// [["今", "天", "天", "气", "不", "错"],[""],["早", "上", "好"]]
arr.flatMap((s) => s.split(""));
// ["今", "天", "天", "气", "不", "错", "", "早", "上", "好"]
```

### String.prototype.trimStart()

> trimStart() 方法从字符串的开头删除空格，trimLeft()是此方法的别名。

### String.prototype.trimEnd()

> trimEnd() 方法从一个字符串的右端移除空白字符，trimRight 是 trimEnd 的别名。

### 可选的 Catch Binding

捕获异常`try...catch...`，在 ES10 可以省略 catch 的传参

```js
// 之前
try {
} catch (error) {}

// ES10
try {
} catch {}
```

### Symbol.prototype.description

> `description` 是一个只读属性，它会返回 [`Symbol`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 对象的可选描述的字符串。

```js
Symbol("desc").toString(); // "Symbol(desc)"
Symbol("desc").description; // "desc"
Symbol("").description; // ""
Symbol().description; // undefined
Symbol.iterator.description; // Symbol.iterator
Symbol.for("foo").description; // foo
`${Symbol("foo").description}bar`; // foobar
```

### JSON.stringify() 增强能力

> JSON.stringify 在 ES10 修复了对于一些超出范围的 Unicode 展示错误的问题。

```js
// \uD83D\uDE0E  emoji 多字节的一个字符
console.log(JSON.stringify("\uD83D\uDE0E")); // 打印出笑脸
```

### 修订 Function.prototype.toString()

> 以前函数的 toString 方法来自 Object.prototype.toString(),现在的 Function.prototype.toString() 方法返回一个表示当前函数源代码的字符串。以前只会返回这个函数，不包含注释、空格等。

```js
function sum(a, b) {
  // es10新特性
  return a + b;
}
console.log(sum.toString());
// 输出结果：
"function sum(a, b) {
  // es10新特性
  return a + b;
}"
```

## ES11(ES2020)

### 空值合并运算符（??）

> 是一个逻辑操作符，当左侧的操作数为 `null`或者`undefined`时，返回其右侧操作数，否则返回左侧操作数。

```js
const foo = undefined ?? "foo";
const bar = null ?? "bar";
console.log(foo); // foo
console.log(bar); // bar
```

与逻辑或操作符（`||`）不同，逻辑或操作符会在左侧操作数为假值时返回右侧操作数。也就是说，如果使用 `||` 来为某些变量设置默认值，可能会遇到意料之外的行为。比如为假值（例如`''`,`0`,`NaN`,`false`）时。

```js
const foo = "" ?? "default string";
const foo2 = "" || "default string";
console.log(foo); // ""
console.log(foo2); // "default string"

const baz = 0 ?? 42;
const baz2 = 0 || 42;
console.log(baz); // 0
console.log(baz2); // 42
```

_好东西好东西，后面如果值可能是 undefined 或者 false 时进行判断，就不需要单独用 typeof xxx === 'undefined'_

**将 `??` 直接与 `&&`和 `||`操作符组合使用是不可取的。**

## 可选链操作符（?.）

> 表示如果问号左边表达式有值, 就会继续查询问号后面的字段。

**可选链不能用于赋值**

### globalThis 全局对象

在 Web 中，可以通过 `window`、`self` 取到全局对象，在 Node.js 中，它们都无法获取，必须使用 `global`。

以前想要获取全局对象，可通过一个全局函数

```js
const getGlobal = () => {
	if (typeof self !== "undefined") {
		return self;
	}
	if (typeof window !== "undefined") {
		return window;
	}
	if (typeof global !== "undefined") {
		return global;
	}
	throw new Error("无法找到全局对象");
};

const globals = getGlobal();
```

现在`globalThis` 提供了一个标准的方式来获取不同环境下的全局对象，不管在什么环境，放心使用就行了。

### BigInt

> **`BigInt`** 是一种内置对象，它提供了一种方法来表示大于 `2的53次方 \- 1` 的整数。

**使用**

- 数字后面加 n： `const num = 2n;`

- 使用 BigInt 函数：`const num = BigInt(2); const num2 = BigInt(2n);`

  ```js
  BigInt(2n) === BigInt(2); // true
  ```

**与 Number 比较**

```js
1n == 1; // true
1n === 1; // false
1n < 2; // true
2n > 1; // true
```

**与 Number 转换**

在两种类型来回转换时要小心，因为 `BigInt` 变量在转换成 [`Number`] 变量时可能会丢失精度。

**运算**

```js
let number = BigInt(2);
// BigInt和其他类型不能混合运算
number / 2; // Cannot mix BigInt and other types, use explicit conversions
// 基本运算
let a = number + 2n; // 4n
let b = number * 10n; // 20n
let c = number - 10n; // -8n
let d = number / 2n; // 1
```

### String.prototype.matchAll()

> **`matchAll()`** 方法返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。

```js
const str = "name: 'jack'";
const reg = /name: '(.*)?'/;

str.match(reg); // ["name: 'hello'"]
[...str.matchAll(reg)]; // ["name: 'jack'", "hello"], index: 0, input,length

const regexp = new RegExp("foo[a-z]*", "g");
const str1 = "table football, foosball";
let match;
while ((match = regexp.exec(str1)) !== null) {
	console.log(
		`Found ${match[0]} start=${match.index} end=${regexp.lastIndex}.`
	);
	// Found football start=6 end=14.
	// Found foosball start=16 end=24.
}
```

### Promise.allSettled()

`Promise.all()` 具有并发执行异步任务的能力。但它的最大问题就是如果其中某个任务出现异常(reject)，所有任务都会挂掉，Promise 直接进入 reject 状态。

`Promise.allSettled`: 并发任务中，无论一个任务正常或者异常，都会返回对应的的状态，

```js
// promise1、promise2正常. promise3异常
const promises = [promise1(), promise2(), promise3(), ...]
//  Promise.all 会走到catch里面
Promise.all(promises)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log("error", error); // error promise3
  });

// Promise.allSettled 不管有没有错误，三个的状态都会返回
Promise.allSettled(promises)
  .then((res) => {
    console.log(res);
    // 打印结果
    // [
    //    {status: 'fulfilled', value: 'promise1'},
    //    {status: 'fulfilled',value: 'promise2'},
    //    {status: 'rejected', reason: 'error promise3 '}
    // ]
  })
  .catch((error) => {
    console.log("error", error);
  });
```

### Dynamic Import（按需 import）

> `import()`可以在需要的时候，再加载某个模块。

```js
// 只有点击了按钮，才会加载这个模块。
button.addEventListener("click", (event) => {
	import("./dialogBox.js")
		.then((dialogBox) => {
			dialogBox.open();
		})
		.catch((error) => {
			/* Error handling */
		});
});
```

## ES12(ES2021)

### 逻辑运算符和赋值表达式（&&=，||=，??=）

- `x &&= y` 等同于 `x && (x = y)` 当 x 为 true 时给 x 赋值
- `x ||= y` 等同于`x || (x = y)` 当 x 为 false 时给 x 赋值
- `x ?? = y`等同于`x ?? (x = y)` 当 x 为 null 或 undefined 时给 x 赋值

### String.prototype.replaceAll()

> 所有满足 `pattern` 的部分都会被`replacement` 替换

### 数字分隔符

> `ES2021`中允许 JavaScript 的数值使用下划线（`_`）作为分隔符。这个数值分隔符没有指定间隔的位数，也就是说，可以每三位添加一个分隔符，也可以每一位、每两位、每四位添加一个。

```js
1_000_000_000_000 === 10 ** 12; // true
123_00 === 12_300; // true
12345_00 === 123_4500; // true
12345_00 === 1_234_500; // true
```

小数和科学计数法也可以使用数值分隔符。

```js
// 小数
0.000_001;
// 科学计数法
1e10_000;
```

**注意点**

- 不能放在数值的最前面（leading）或最后面（trailing）。
- 不能两个或两个以上的分隔符连在一起。
- 小数点的前后不能有分隔符。
- 科学计数法里面，表示指数的`e`或`E`前后不能有分隔符。

### Promise.any

> 方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。
>
> `Promise.any()`跟`Promise.race()`方法很像，只有一点不同，就是`Promise.any()`不会因为某个 Promise 变成`rejected`状态而结束，必须等到所有参数 Promise 变成`rejected`状态才会结束。

```js
// promise1、promise2正常. promise3异常
const promises = [promise1(), promise2(), promise3(), ...]
Promise.any(promises)
  .then((first) => {
    // 只要有一个请求成功 就会返回第一个请求成功的
    console.log(first); // 会返回promise1
  })
  .catch((error) => {
    // 所有三个全部请求失败 才会来到这里
    console.log("error", error);
  });
```
