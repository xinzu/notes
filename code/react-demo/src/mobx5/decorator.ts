/*
 * @Description  : 装饰器demo
 * @Author       : yanhuan
 * @Date         : 2023-08-30 16:12:52
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-08-30 16:12:52
 */
// const target = (target: any) => {
//     target.num = 100;
//     target.getNum = () => {}
// }

// @target
// class Demo {
//     constructor() {
        
//     }
// }

// const sum = (x: number, y: number): (target: any) => void => {
//     return (target) => {
//         target.num = x + y;
//     }
// }

// @sum(10, 20)
// class Demo {
//     constructor() {
        
//     }
// }

const test = (target: any, key: string, desciptor?: PropertyDecorator): any => {
    console.log(target, key, desciptor);
    // 修改的是原型上的值
    target[key] = 100;
}

const funcTest = (target: any, key: string, desciptor: PropertyDescriptor): void => {
    console.log(target, key, desciptor);
    desciptor.value = function (){
        return 0;
    }
}

class Demo {
    x: number = 0;
    y: number = 0;
    @test
    z: number = 0;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    @funcTest
    getSum() {
        return this.x + this.y + this.z;
    }

    noDecoratorSum() {
        return this.x + this.y + this.z;
    }
}

const obj = new Demo(10, 10);

console.log(obj.z); // 0
// console.log(obj.__proto__.z); // 100
console.log(obj.getSum()); // 0
console.log(obj.noDecoratorSum()); // 20

export default Demo;