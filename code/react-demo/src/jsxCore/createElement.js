/*
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2023-07-24 18:32:42
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-07-24 18:32:42
 */

const createElement = (component, props, ...children) => {
    const virtualDOM = {
        $$typeof: Symbol('react.element'),
        key: null,
        ref: null,
        type: null,
        props: {}
    };

    virtualDOM.type = component;
    props && (virtualDOM.props = {
        ...props,
    });
    virtualDOM.props.children = children;
    return virtualDOM;
}
export default createElement;