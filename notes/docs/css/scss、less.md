## 变量

```
@width: 10px;
@height: @width;

#header {
  width: @width;
  height: @height;
}

// 编译为：
#header {
	width: 10px;
	height: 10px;
}
```

## 混合

```
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

#menu a {
  color: #111;
  .bordered();
}

.post a {
  color: red;
  .bordered();
}

// 编译为
#menu a {
  color: #111;
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

.post a {
  color: red;
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
```

## 嵌套

```
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}

// 编译为
#header {
  color: black;
}
#header .navigation {
  font-size: 12px;
}
#header .logo {
  width: 300px;
}

// 伪类/伪元素
#header {
  color: black;
  &:after {
    content: ''
  }
}
```

## 运算

> 算术运算符 `+`、`-`、`*`、`/` 可以对任何数字、颜色或变量进行运算。如果可能的话，算术运算符在加、减或比较之前会进行单位换算。计算的结果以最左侧操作数的单位类型为准。如果单位换算无效或失去意义，则忽略单位。无效的单位换算例如：px 到 cm 或 rad 到 % 的转换。

```
@conversion-1: 5cm + 10mm; // 结果是 6cm
@conversion-2: 2 - 3cm - 5mm; // 结果是 -1.5cm

@incompatible-units: 2 + 5px - 3cm; // 结果是 4px

@base: 5%;
@filler: @base * 2; // 结果是 10%
@other: @base + @filler; // 结果是 15%

@base: 2cm * 3mm; // 结果是 6cm

@color: #224488 / 2; //结果是 #112244
background-color: #112244 + #111; // 结果是 #223355
```

## 转义

```
@min768: (min-width: 768px);
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}

// 编译为
@media (min-width: 768px) {
  .element {
    font-size: 1.2rem;
  }
}
```

## 函数

### 逻辑函数

#### if

```
@some: foo;

div {
  margin: if((2 > 1), 0, 3px);
  color:  if((iscolor(@some)), @some, black);
}

// 编译为
div {
  margin: 0;
  color:  black;
}
```

#### boolean

```
@bg: black;
@bg-light: boolean(luma(@bg) > 50%);

div {
  background: @bg; 
  color: if(@bg-light, black, white);
}

// 编译为
div {
  background: black;
  color: white;
}
```

### 字符串相关函数

#### escape

#### URL-encoding

```
escape('a=1')

// 编译为
a%3D1
```

#### %--format

```
format-a-d: %("repetitions: %a file: %d", 1 + 2, "directory/file.less");
format-a-d-upper: %('repetitions: %A file: %D', 1 + 2, "directory/file.less");
format-s: %("repetitions: %s file: %s", 1 + 2, "directory/file.less");
format-s-upper: %('repetitions: %S file: %S', 1 + 2, "directory/file.less");

// 编译为
format-a-d: "repetitions: 3 file: "directory/file.less"";
format-a-d-upper: "repetitions: 3 file: %22directory%2Ffile.less%22";
format-s: "repetitions: 3 file: directory/file.less";
format-s-upper: "repetitions: 3 file: directory%2Ffile.less";

// a/d:引号也会直接包括进去替换
// s:会去掉引号
//A/D/S:大写时会将'/'符号进行转换
```

#### replace

**类似于JS中的replace，**

**第一个值是原数据**；

**第二个值是需要替换数据/正则；**

**第三个值是替换的结果，可以是$1这种格式；**

**第四个值是标记（gi）**

```
replace("Hello, Mars?", "Mars\?", "Earth!");

//编译为
"Hello, Earth!";
```

### List相关函数

#### length

```
@list: "banana", "tomato", "potato", "peach";
n: length(@list);

// result
n: 4
```

#### extract

**取list的第几位，从1开始**

```
@list: apple, pear, coconut, orange;
value: extract(@list, 3);

// result
value: coconut;
```

#### range

- `start` - (optional) 初始值
- `end` - 结束值
- `step` - (optional) 

**生成一个包含一系列值的列表**

```
value: range(4);
border: range(10px, 30px, 10);

//result
value: 1 2 3 4
border: 10px, 20px, 30px
```

#### each

- `list` 
- `rules`

```
@selectors: blue, green, red;
each(@selectors, {
  .sel-@{value} {
    a: b;
  }
});

@set: {
  one: blue;
  two: green;
  three: red;
}
.set {
  each(@set, {
    @{key}-@{index}: @value;
  });
}

.set-2() {
  one: blue;
  two: green;
  three: red;
}
.set-2 {
  // Call mixin and iterate each rule
  each(.set-2(), .(@v, @k, @i) {
    @{k}-@{i}: @v;
  });
}

// result
.sel-blue {
  a: b;
}
.sel-green {
  a: b;
}
.sel-red {
  a: b;
}

.set {
  one-1: blue;
  two-2: green;
  three-3: red;
}

.set-2 {
  one-1: blue;
  two-2: green;
  three-3: red;
}

```

### Math -- JS Math.xxx

### Type

- isnumber

  ```
  isnumber(1234);     // true
  isnumber(56px);     // true
  isnumber(7.8%);     // true
  ```

- isstring

- iscolor

  ```
  iscolor(#ff0);     // true
  iscolor(blue);     // true
  ```

- iskeyword

- isurl

- ispixel/isem

  ```
  ispixel(56px);     // true
  ```

- ispercentage

- isunit

  ```
  isunit(11px, px);  // true
  isunit(2.2%, px);  // false
  isunit(33px, rem); // false
  ```

- isruleset

### Other

#### color

#### image-size/image-width/image-height

```
image-size("file.png");

// result
10px 10px
```

### convert

```
convert(9s, "ms")
convert(14cm, mm)
convert(8, mm)

// result
9000ms
140mm
8
```

### Color Definition Functions

- rgb
- rgba
- argb

## 命名空间和访问符

```
#bundle() {
  .button {
    display: block;
    border: 1px solid black;
    background-color: grey;
    &:hover {
      background-color: white;
    }
  }
  .tab { ... }
  .citation { ... }
}
#header a {
  color: orange;
  #bundle.button();  // 还可以书写为 #bundle > .button 形式
}
```

## 映射

```
#colors() {
  primary: blue;
  secondary: green;
}

.button {
  color: #colors[primary];
  border: 1px solid #colors[secondary];
}
```

## 作用域

**混合（mixin）和变量的定义不必在引用之前事先定义**

## 注释

**块注释和行注释都可以使用**

## 导入

`@import "typo.css";`



