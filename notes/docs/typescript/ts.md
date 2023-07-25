

# 简介

1. TypeScript是JavaScript的超集。
2. 它对JS进行了扩展，向JS中引入了类型的概念，并添加了许多新的特性。
3. TS代码需要通过编译器编译为JS，然后再交由JS解析器执行。

相较于JS而言，TS拥有了静态类型，更加严格的语法，更强大的功能；TS可以在代码执行前就完成代码的检查，减小了运行时异常的出现的几率；TS代码可以编译为任意版本的JS代码，可有效解决不同JS运行环境的兼容问题；同样的功能，TS的代码量要大于JS，但由于TS的代码结构更加清晰，变量类型更加明确，在后期代码的维护中TS却远远胜于JS。

## 开发环境搭建

1. 安装Node.js：https://nodejs.org/dist/v14.15.1/node-v14.15.1-x64.msi

2. npm全局安装typescript

      `npm i -g typescript`

3. 创建一个ts文件

4. 使用tsc对ts文件进行编译

   `tsc xxx.ts`

   

## 基本类型

- 类型声明

  - 类型声明是TS非常重要的一个特点

  - 通过类型声明可以指定TS中变量（参数、形参）的类型

  - 指定类型后，当为变量赋值时，TS编译器会自动检查值是否符合类型声明，符合则赋值，否则报错

  - 简而言之，类型声明给变量设置了类型，使得变量只能存储某种类型的值

  - 语法：

    - ```typescript
      let 变量: 类型;
      
      let 变量: 类型 = 值;
      
      function fn(参数: 类型, 参数: 类型): 类型{
          ...
      }
      ```

- 类型：

  |   类型   |               例子               |              描述              |
  | :------: | :------------------------------: | :----------------------------: |
  |  number  |           1, -33, 2.5            |            任意数字            |
  |  string  |         'hi', "hi", `hi`         |           任意字符串           |
  | boolean  |           true、false            |       布尔值true或false        |
  |  字面量  |              其本身              |  限制变量的值就是该字面量的值  |
  |   any    |                *                 |            任意类型            |
  | unknown  |                *                 |         类型安全的any          |
  |   void   |        空值（undefined）         |     没有值（或undefined）      |
  |  never   |              没有值              |          不能是任何值          |
  |  object  |           {name:'HH'}            |          任意的JS对象          |
  | Function | (a: number, b: number) => number |              函数              |
  |  array   |             [1,2,3]              |           任意JS数组           |
  |  tuple   |              [4,5]               | 元素，TS新增类型，固定长度数组 |
  |   enum   |            enum{A, B}            |       枚举，TS中新增类型       |

### number

```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;
```

### boolean

```typescript
let isDone: boolean = false;
```

### string

```typescript
let color: string = "blue";
color = 'red';

let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}.

I'll be ${age + 1} years old next month.`;
```

### 字面量

- 也可以使用字面量去指定变量的类型，通过字面量可以确定变量的取值范围

- ```typescript
  let color: 'red' | 'blue' | 'black';
  let num: 1 | 2 | 3 | 4 | 5;
  ```

### object

```typescript
// obj 只要是个对象就行
// 直接定义object类型实际上没啥用
let obj: object = {};

// obj2 需要满足定义的内部属性及其类型
let obj2 = {
    name: string,
    age: number,
}
(// 也可以使用接口定义类型
    interface Person{
        name: string;
        age: number,
    }
	let obj2: Person = {
        name: 'HH',
        age: 18
    }
)
// 此时如果给obj赋值不满足以上属性及类型(必须一模一样)，会有报错
obj2 = {}
// 正确赋值
obj2 = {
    name: 'HH',
    age: 18
}

// 如果age属性是可选的
let obj3 = {
    name: string,
    age?: number,
}

// 要求一定要有string类型的name，其他任意类型的属性都可以
let obj4 = {
    name: string,
    [propName: string]: any，
}
```

### array

- 类型 + 方括号

  ```typescript
  let list: number[] = [1, 2, 3];
  // 数组的项中不允许出现其他的类型
  let errList: number[] = [1, '1', 2, 3, 5];
  // 数组的一些方法的参数也会根据数组在定义时约定的类型进行限制
  list.push('4');
  ```

- 数组[泛型](##5、泛型（Generic）)

  ```typescript
  let list: Array<number> = [1, 2, 3]
  ```

- 用[接口](#4、接口（Interface）)表示数组

  ```typescript
  // NumberArray表示：只要索引的类型是数字时，那么值的类型必须是数字。
  interface NumberArray {
      [index: number]: number;
  }
  let d: NumberArray = [1, 2, 3];
  ```

  虽然接口也可以用来描述数组，但是我们一般不会这么做，因为这种方式比前两种方式复杂多了。不过有一种情况例外，那就是它常用来表示类数组。


### function

和object一样，单独使用没有任何意义

```typescript
// (形参: 类型, 形参: 类型) => 返回值类型 {}
function sum(x: number, y: number): number {
    return x + y;
    // 返回错误的类型
    // return x + '';
}
sum(1, 2);
// 输入多余的（或者少于要求的）参数，是不被允许的
sum(1, 2, 3);
// 输入错误的类型
sum('1', 2);

// 函数表达式
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
// 使用接口的方式来定义一个函数需要符合的形状
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```

### 重载

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理

TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

```typescript
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

### any

**ts中不建议使用any类型**

> any 既是 top type, 又是 bottom type (它是任何类型的 subtype ) , 这导致 any 基本上就是放弃了任何类型检查.

```typescript
let d: any = 4;
d = 'hello';
d = true;
```

- 如果声明变量不指定类型，ts解析器会自动判断变量的类型为any（隐式的any）

  ```typescript
  let d;
  ```

- 影响其他变量，any类型的变量可以赋值给任意变量

  ```typescript
  // 以下代码不会报错
  let d: any = 4;
  let s: string = d;
  ```

### unknown

**实际上就是一个类型安全的any，不能直接赋值给其他变量**

当遇到一个类型不确定的变量时，能用unknown尽量用unknown

```typescript
let notSure: unknown = 4;
notSure = 'hello';
```

- 和any的区别：不能赋值给别的类型

  *unknow只能霍霍自己，any可以霍霍别人*

  ```typescript
  // 以下代码会报错
  let notSure: unknown = 4;
  let s: string = notSure;
  ```

### void

```typescript
let unusable: void = undefined;
```

### never

不能是任何值，可用于以下场景

```typescript
function error(message: string): never {
  throw new Error(message);
}
// 函数即使没有return语句也会返回undefined，遇到throw时立即抛出错误，不会有return
```

### tuple

固定长度的数组

```typescript
let x: [string, number];
x = ["hello", 10]; 
```

### enum

类似于js中定义类型的对象

```javascript
const colors = {
  Red: 1,
  Green: 2,
  Blue: 4,
};
const color = colors['Red'];
```

```typescript
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;

enum Color {
  Red = 1,
  Green,
  Blue,
}
let c: Color = Color.Green;

enum Color {
  Red = 1,
  Green = 2,
  Blue = 4,
}
let c: Color = Color.Green;
```

### 类型断言

有些情况下，变量的类型对于我们来说是很明确，但是TS编译器却并不清楚，此时，可以通过类型断言来告诉编译器变量的类型（临时将变量改为其他类型）

断言有两种形式：

- 第一种：变量 as 类型

  ```typescript
  let someValue: unknown = "this is a string";
  let strLength: number = (someValue as string).length;
  ```

- 第二种：<类型>变量

  ```typescript
  let someValue: unknown = "this is a string";
  let strLength: number = (<string>someValue).length;
  ```

需要注意的是，类型断言只能够欺骗TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误

```typescript
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}
// 强行让ts编辑器相信animal是Fish类型，但如果传入的是实际是Cat类型，运行时会报错
function swim(animal: Cat | Fish) {
    (animal as Fish).swim();
}
```



### 类型推论

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

- TS拥有自动的类型判断机制
- 当对变量的声明和赋值是同时进行的，TS编译器会自动判断变量的类型。所以如果你的变量的声明和赋值时同时进行的，可以省略掉类型声明
- 如果变量声明时没有赋值，会被推断为`any`类型

### 联合类型

取值可以为多种类型中的一种。

```typescript
let d: string | number;
d = 'seven';
d = 7;
// 字符串或数组之外的类型会报错
d = true;
```

### 类型别名-type

类型别名常用于[联合类型](#联合类型)

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```

#### 与interface的区别

[interface](#接口-Interface)

##### 相同点

- 都可以描述一个对象或者函数

  ```typescript
  // interface
  interface User {
    name: string
    age: number
  }
  interface SetUser {
    (name: string, age: number): void;
  }
  
  // type
  type User = {
    name: string
    age: number
  };
  type SetUser = (name: string, age: number): void;
  ```

- 都允许拓展，可以相互继承

  - interface 继承 ，通过extends

  ```typescript
  // interface extends interface
  interface Name { 
    name: string; 
  }
  interface User extends Name { 
    age: number; 
  }
  
  // interface extends type
  type Name = { 
    name: string; 
  }
  interface User extends Name { 
    age: number; 
  }
  ```

  - type继承，通过&符号

  ```typescript
  // type extends type
  type Name = { 
    name: string; 
  }
  type User = Name & { age: number  
  
  // type extends interface
  interface Name { 
    name: string; 
  }
  type User = Name & { 
    age: number; 
  }
  ```

##### 不同点

- type可以而interface不行

  - type 可以声明基本[类型别名](#类型别名-type)，[联合类型](#联合类型)，[元组](#tuple)等类型

  ```typescript
  // 基本类型别名
  type Name = string
   
  // 联合类型
  interface Dog {
      wong();
  }
  interface Cat {
      miao();
  }
  type Pet = Dog | Cat
   
  // 元祖
  type PetList = [Dog, Pet]
  ```
  - type 语句中还可以使用 typeof 获取实例的 类型进行赋值

  ```typescript
  // 当你想获取一个变量的类型时，使用 typeof
  let div = document.createElement('div');
  type B = typeof div
  ```

- interface可以而type不行

  - interface 能够声明合并，type会被后面的声明覆盖

  ```typescript
  interface Person { 
   	name: string,
  }
  interface Person {
  	age: number
  }
  // 等同于
  interface Person {
      name: string,
      age: number
  }
  
  // 注意，合并的属性的类型必须是唯一的
  interface Alarm {
      price: number;
  }
  interface Alarm {
      price: string;  // 类型不一致，会报错
      weight: number;
  }
  ```

  - interface能够[继承类](#接口继承类)

### 声明合并

如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型

#### 函数的合并

[重载](#重载)

#### 接口的合并

[interface](#与interface的区别)

## 类-class

###  ES6 中新增了class

- 类（Class）：定义了一件事物的抽象特点，包含它的属性和方法
- 对象（Object）：类的实例，通过 `new` 生成
- 面向对象（OOP）的三大特性：封装、继承、多态
- 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
- 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 `Cat` 和 `Dog` 都继承自 `Animal`，但是分别实现了自己的 `eat` 方法。此时针对某一个实例，我们无需了解它是 `Cat` 还是 `Dog`，就可以直接调用 `eat` 方法，程序会自动判断出来应该如何执行 `eat`
- 存取器（getter & setter）：用以改变属性的读取和赋值行为
- 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 `public` 表示公有属性或方法
- 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

```javascript
// 创建类
class Animal {
    public name;
    // 构造函数
    constructor(name) {
        this.name = name;
    }
    // 方法
    sayHi() {
        return `My name is ${this.name}`;
    }
    // 静态方法，无需创建实例，通过类即可直接使用
    static isAnimal(a) {
    	return a instanceof Animal;
  	}
    // 存储器
    get name() {
        return 'Jack';
    }
    set name(value) {
      	console.log('setter: ' + value);
    }
}
// 创建对象
let a = new Animal('Jack');
// 存储器
a.name = 'Tom'; // setter: Tom
console.log(a.name); // getter: Jack
// 静态方法
Animal.isAnimal(a);
// 继承
class Cat extends Animal {
  constructor(name) {
    super(name); // 调用父类的 constructor(name)
    console.log(this.name);
  }
  sayHi() {
    return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
  }
}
```

### ES7 中有一些关于类的提案

ES6 中实例的属性只能通过构造函数中的 `this.xxx` 来定义，ES7 提案中可以直接在类里面定义

```javascript
class Animal {
  name = 'Jack';
  constructor() {
    // ...
  }
}

let a = new Animal();
console.log(a.name); // Jack
```

静态属性

```javascript
class Animal {
  static num = 42;

  constructor() {
    // ...
  }
}
```

### TypeScript中类的用法

TypeScript 除了实现了所有 ES6 中的类的功能以外，还添加了一些新的用法。

#### 三种修饰符

- `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 `public` 的

```typescript
class Person {
    public name: string; // 写或什么都不写都是public
    public age: number;
    constructor(name: string, age: number) {
        this.name = name; // 可以在类中修改
        this.age = age;
    }
    sayHello() {
        console.log(`大家好，我是${this.name}`);
    }
}
class Employee extends Person {
    constructor(name: string, age: number) {
        super(name, age);
        this.name = name; //子类中可以修改
    }
}
const p = new Person('孙悟空', 18);
p.name = '猪八戒';// 可以通过对象修改
```

- `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问

```typescript
class Person {
    private name: string;
    private age: number;
    constructor(name: string, age: number) {
        this.name = name; // 可以修改
        this.age = age;
    }
    sayHello() {
        console.log(`大家好，我是${this.name}`);
    }
}
class Employee extends Person {
    constructor(name: string, age: number) {
        super(name, age);
        this.name = name; //子类中不能修改
    }
}
const p = new Person('孙悟空', 18);
p.name = '猪八戒';// 不能修改
```

- `protected` 修饰的属性或方法是受保护的，它和 `private` 类似，区别是它在子类中也是允许被访问的

```typescript
class Person {
    protected name: string;
    protected age: number;
    constructor(name: string, age: number) {
        this.name = name; // 可以修改
        this.age = age;
    }
    sayHello(){
        console.log(`大家好，我是${this.name}`);
    }
}
class Employee extends Person{
    constructor(name: string, age: number){
        super(name, age);
        this.name = name; //子类中可以修改
    }
}
const p = new Person('孙悟空', 18);
p.name = '猪八戒';// 不能修改
```

#### 静态属性

与静态方法一样，可以直接通过类直接使用

```typescript
class Person {
    static name = '孙悟空';
}
console.log(Person.name); // 孙悟空
```

#### readonly

只读属性关键字，只允许出现在属性声明或索引签名或构造函数中

*索引签名（数字索引）*：` [index: number]: number;`

```typescript
class Animal {
  readonly name;
  public constructor(name) {
    this.name = name;
  }
}
```

#### 抽象类

抽象类是专门用来被其他类所继承的类，它只能被其他类所继承不能用来创建实例。

使用abstract开头的方法叫做抽象方法，抽象方法没有方法体只能定义在抽象类中，继承抽象类时抽象方法必须要实现

*需要注意的是，即使是抽象方法，TypeScript 的编译结果中，仍然会存在这个类*

```typescript
abstract class Animal{
    abstract run(): void;
    bark(){
        console.log('动物在叫~');
    }
}

class Dog extends Animals{
    run(){
        console.log('狗在跑~');
    }
}
```

#### 类实现接口

用 `implements` 关键字来实现

```typescript
/*
*举例来说，门是一个类，防盗门是门的子类。
*如果防盗门有一个报警器的功能，我们可以简单的给防盗门添加一个报警方法。
*这时候如果有另一个类，车，也有报警器的功能，就可以考虑把报警器提取出来，作为一个接口，防盗门和车都去实现它：
*/
interface Alarm {
    alert(): void;
}

class Door {
}

class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('SecurityDoor alert');
    }
}

class Car implements Alarm {
    alert() {
        console.log('Car alert');
    }
}
```

**一个类可以实现多个接口**

```typescript
interface Alarm {
    alert(): void;
}

interface Light {
    lightOn(): void;
    lightOff(): void;
}

class Car implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}
```

## 接口-Interface

TypeScript 中的接口是一个非常灵活的概念，除了可用于[对类的一部分行为进行抽象](#类实现接)以外，也常用于对「对象的形状（Shape）」进行描述。

```typescript
interface Person{
    name: string;
    sayHello():void;
}

function fn(per: Person){
    per.sayHello();
}

fn({name:'孙悟空', sayHello() {console.log(`Hello, 我是 ${this.name}`)}});
```

### 继承

#### 接口继承接口

```typescript
interface Name { 
  name: string; 
}
interface User extends Name { 
  age: number; 
}
```

#### 接口继承类

```typescript
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
interface Point3d extends Point {
    z: number;
}

// 等价于
interface PointInstanceType {
    x: number;
    y: number;
}
interface Point3d extends PointInstanceType {
    z: number;
}
// 创建Point3d类型的对象
let point3d: Point3d = {x: 1, y: 2, z: 3};
```

## 泛型-Generic

> 指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

定义一个函数或类时，有些情况下无法确定其中要使用的具体类型（返回值、参数、属性的类型不能确定），此时泛型便能够发挥作用。

### 一个简单的栗子

```typescript
// 这里的<T>就是泛型，T是我们给这个类型起的名字（不一定非叫T），设置泛型后即可在函数中使用T来表示该类型。
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
// 在调用的时候，可以指定它具体的类型为 string。
createArray<string>(3, 'x'); // ['x', 'x', 'x']
//也可以不手动指定，而让类型推论自动推算出来
createArray(3, 'x'); // ['x', 'x', 'x']
```

### 多个类型参数

定义泛型的时候，可以一次定义多个类型参数：

```typescript
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}
swap([7, 'seven']); // ['seven', 7]
```

### 泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法。

```typescript
// 泛型T不一定包含属性 length，所以会报错
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```

这时，我们可以对泛型进行约束，只允许这个函数传入那些包含 `length` 属性的变量。这就是泛型约束

```typescript
// 对泛型进行约束
interface Lengthwise {
    length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```

多个类型参数之间也可以互相约束

```typescript
function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id];
    }
    return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };

copyFields(x, { b: 10, d: 20 }); // { a: 1, b: 10, c: 3, d: 20 }
```

### 泛型接口

使用含有泛型的接口来定义函数的形状

```typescript
interface CreateArrayFunc {
    <T>(length: number, value: T): Array<T>;
}
let createArray: CreateArrayFunc;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray<string>(3, 'x'); // ['x', 'x', 'x']

// 另一种写法
interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}
let createArray: CreateArrayFunc<string>;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray(3, 'x'); // ['x', 'x', 'x']
```

### 泛型类

```typescript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

### 泛型参数的默认类型

当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。

*类似于ES中给函数形参设置默认值*

```typescript
function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
```

## 编译选项

### 自动编译文件

- 编译文件时，使用 -w 指令后，TS编译器会自动监视文件的变化，并在文件发生变化时对文件进行重新编译。

- 示例：

  - ```powershell
    tsc xxx.ts -w
    ```

### tsconfig.json配置

**自动编译整个项目**

- 如果直接使用tsc指令，则可以自动将当前项目下的所有ts文件编译为js文件。

- 但是能直接使用tsc命令的前提时，要先在项目根目录下创建一个ts的配置文件 tsconfig.json

- tsconfig.json是一个JSON文件，添加配置文件后，只需只需 tsc 命令即可完成对整个项目的编译

  **配置选项：**

  - include

    - 用来指定哪些ts文件需要被编译
    - 默认值：["\*\*/\*"]
    - 示例：

    ```json
    // src和tests目录下的所有文件都会被编译
    "include":["src/**/*", "tests/**/*"]
    ```

  - exclude

    - 定义需要排除在外的文件
    - 默认值：["node_modules", "bower_components", "jspm_packages"]
    - 示例：

    ```json
    // src/tests目录下的文件都不会被编译
    "exclude": ["./src/tests/**/*"]
    ```

  - extends

    - 定义被继承的配置文件，在原文件里的配置最先被加载，原文件里的配置被继承文件里的同名配置所重写。 如果发现循环引用，则会报错。
    - 示例：

    ```json
    // 当前配置文件中会自动包含config目录下base.json中的所有配置信息
    "extends": "./configs/base"
    ```

  - files

    - 指定被编译文件的列表，只有需要编译的文件少时才会用到

    - 示例：

    ```json
    // 列表中的文件都会被TS编译器所编译
    "files": [
        "index.ts",
        "hello.ts"
     ]
    ```

  - compilerOptions

    - 编译选项是配置文件中非常重要也比较复杂的配置选项

    - 在compilerOptions中包含多个子选项，用来完成对编译的配置

      - 项目选项

        - target

          - 设置ts代码编译的目标版本

          - 可选值：

            - ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext

          - 示例：

          ```json
          // 编译为ES6版本的js代码
          "compilerOptions": {
              "target": "ES6"
          }
          ```

        - lib

          - 指定代码运行时所包含的库（宿主环境）

          - 可选值：

            - ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext、DOM、WebWorker、ScriptHost ......

          - 示例：

          ```json
          "compilerOptions": {
              "target": "ES6",
              "lib": ["ES6", "DOM"],
          }
          ```

        - module

          - 设置编译后代码使用的模块化系统

          - 可选值：

            - CommonJS、UMD、AMD、System、ES2020、ESNext、None

          - 示例：

          ```json
          "compilerOptions": {
              "module": "CommonJS"
          }
          ```

        - outDir

          - 编译后文件的所在目录

          - 默认情况下，编译后的js文件会和ts文件位于相同的目录，设置outDir后可以改变编译后文件的位置

          - 示例：

          ```json
          "compilerOptions": {
              "outDir": "dist" // 编译后的js文件将会生成到dist目录
          }
          ```

        - outFile（一般不用）

          - 将所有的文件编译为一个js文件

          - 默认会将所有的编写在全局作用域中的代码合并为一个js文件，如果module制定了None、System或AMD则会将模块一起合并到文件之中

          - 示例：

          ```json
          "compilerOptions": {
              "outFile": "dist/app.js"
          }
          ```

        - rootDir

          - 指定代码的根目录，默认情况下编译后文件的目录结构会以最长的公共目录为根目录，通过rootDir可以手动指定根目录

          - 示例：

          ```json
          "compilerOptions": {
              "rootDir": "./src"
          }
          ```

        - allowJs

          - 是否对js文件编译，设置为true时，js 文件会被 tsc 编译，否则不会。一般在项目中 js, ts 混合开发时需要设置。
          - 默认值：false

        - checkJs

          - 是否对js文件进行检查
          - 默认值：false

        - removeComments

          - 是否删除注释
          - 默认值：false

        - noEmit

          - 不生成编译后的文件
          - 默认值：false

        - noEmitOnError

          - 当有错误时不生成编译后的文件
          - 默认值：false

        - sourceMap

          - 是否生成sourceMap
          - 默认值：false

      - 严格检查

        - strict
          - 启用所有的严格检查，设置后相当于开启了所有的严格检查
          - 默认值：true
        - alwaysStrict
          - 总是以严格模式对代码进行编译，
          - 默认值：false
        - noImplicitAny
          - 禁止隐式的any类型
          - 默认值：false
        - noImplicitThis
          - 禁止类型不明确的this
          - 默认值：false
        - strictBindCallApply
          - 严格检查bind、call和apply的参数列表
        - strictFunctionTypes
          - 严格检查函数的类型
        - strictNullChecks
          - 严格的空值检查
        - strictPropertyInitialization
          - 严格检查属性是否初始化

      - 额外检查

        - noFallthroughCasesInSwitch
          - 检查switch语句包含正确的break
        - noImplicitReturns
          - 检查函数没有隐式的返回值
        - noUnusedLocals
          - 检查未使用的局部变量
        - noUnusedParameters
          - 检查未使用的参数

      - 高级

        - allowUnreachableCode
          - 是否忽略不可达代码


## 声明文件

## webpack

通常情况下，实际开发中我们都需要使用构建工具对代码进行打包，TS同样也可以结合构建工具一起使用，下边以webpack为例介绍一下如何结合构建工具使用TS。

1. 初始化项目，创建package.json文件

2. 下载构建工具

3. ```npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin```

   共安装了7个包

   webpack：构建工具webpack

   webpack-cli：webpack的命令行工具

   webpack-dev-server：webpack的开发服务器

   html-webpack-plugin：webpack中html插件，用来自动创建html文件

   clean-webpack-plugin：webpack中的清除插件，每次构建都会先清除目录

   **typescript：ts编译器**

   **ts-loader：ts加载器，用于在webpack中编译ts文件**

4. 根目录下创建webpack的配置文件webpack.config.js

   ```json
   const path = require("path");
   const HtmlWebpackPlugin = require("html-webpack-plugin");
   const { CleanWebpackPlugin } = require("clean-webpack-plugin");
   
   module.exports = {
       optimization:{
           minimize: false // 关闭代码压缩，可选
       },
       entry: "./src/index.ts",
       // inline-source-map 就可以显示的为我们指示出代码来自哪个文件
       devtool: "inline-source-map",
       devServer: {
           contentBase: './dist'
       },
       output: {
           path: path.resolve(__dirname, "dist"),
           filename: "bundle.js",
           enviroment: {
               arrowFunction: false, // 禁止编译为箭头函数
           }
       },
       resolve: {
           extensions: [".ts", ".js"]
       },
       module: {
           rules: [
               {
                   test: /\.ts$/,
                   use: {
                      loader: "ts-loader"     
                   },
                   exclude: /node_modules/
               }
           ]
       },
       plugins: [
           new CleanWebpackPlugin(),
           new HtmlWebpackPlugin({
               title:'TS测试'
           }),
       ]
   }
   ```

5. 根目录下创建tsconfig.json，配置可以根据自己需要

   - ```json
     {
         "compilerOptions": {
             "target": "ES2015",
             "module": "ES2015",
             "strict": true
         }
     }
     ```

6. 修改package.json添加如下配置

   - ```json
     {
       ...略...
       "scripts": {
         "test": "echo \"Error: no test specified\" && exit 1",
         "build": "webpack",
         "start": "webpack serve --open chrome.exe"
       },
       ...略...
     }
     ```

7. 在src下创建ts文件，并在并命令行执行```npm run build```对代码进行编译，或者执行```npm start```来启动开发服务器


## Babel

结合babel来对代码进行转换以使其可以兼容到更多的浏览器，在上述步骤的基础上，通过以下步骤再将babel引入到项目中。

1. 安装依赖包：

- ```npm i -D @babel/core @babel/preset-env babel-loader core-js```
- 共安装了4个包，分别是：
  - @babel/core
    - babel的核心工具
  - @babel/preset-env
    - babel的预定义环境
  - @babel-loader
    - babel在webpack中的加载器
  - core-js
    - core-js用来使老版本的浏览器支持新版ES语法

2. 修改webpack.config.js配置文件

   ```json
   module: {
           {
               test: /\.ts$/,
               use: [
                   {
                       loader: "babel-loader",
                       options:{
                           presets: [
                               [
                                   "@babel/preset-env",
                                   {
       								// 指定要兼容的浏览器版本
                                       "targets":{
                                           "chrome": "58",
                                           "ie": "11"
                                       },
                                       "corejs":"3",
                                       "useBuiltIns": "usage"
                                   }
                               ]
                           ]
                       }
                   },
                   {
                       loader: "ts-loader",
   
                   }
               ],
               exclude: /node_modules/
           }
       ]
   }
   ```