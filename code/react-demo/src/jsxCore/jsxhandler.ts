/*
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2023-07-25 10:36:24
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-07-25 10:36:24
 */

import createElement from '@/jsxCore/createElement'
import render from '@/jsxCore/render'

import Test from '@/components/JsxTest'
import ClassTest from '@/components/ClassTest'

const jsxObj = createElement(
    'div',
    {style: {color: 'blue', fontSize: '16px'}},
    createElement(
        'div',
        null,
        'HHTEST1',
        createElement(
            Test,
            {
                title: '123123'
            },
            'HHTEST2'
        )
    ),
)

export default function jsxhandler() {
    render(jsxObj, document.getElementById('root'));
}