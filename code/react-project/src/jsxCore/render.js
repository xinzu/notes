/*
 * @Description  : render
 * @Author       : yanhuan
 * @Date         : 2023-07-24 19:07:03
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-07-24 19:07:04
 */
const each = (obj, cb) => {
    Reflect.ownKeys(obj).forEach(key => cb(obj[key], key));
}

const toLow = (str) => {
    return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

// 简单模拟一个render
const render = (virtualDOM, container) => {
    const { type, props } = virtualDOM;
    if (typeof type === 'string') {  // 如果是标签名
        // 创建标签
        const dom = document.createElement(type);
        // 给dom元素加属性
        each(props, (value, key) => {
            if (key === 'className') {
                dom.className = value;
            } else if (key === 'style') {
                each(value, (styleValue, styleKey) => {
                    dom.style[toLow(styleKey)] = styleValue;
                });
            } else if (key === 'children') {
                // 子节点处理
                const children = typeof value === 'string' ? [value] : value;
                children.forEach(child => {
                    if (typeof child === 'string') {
                        dom.appendChild(document.createTextNode(child))
                    } else {
                        render(child, dom);
                    }
                });
            } else {
                dom.setAttribute(key, value);
            }
        });
        container.appendChild(dom);
    } else if (/^class\s/.test(Function.prototype.toString.call(type))) {
        // 类组件
        render(new type(props).render(), container);
    } else {
        render(type(props), container);
    }
}

export default render