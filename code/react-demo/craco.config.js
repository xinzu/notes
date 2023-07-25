/*
 * @Description  : 打包配置
 * @Author       : yanhuan
 * @Date         : 2023-07-24 17:15:37
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-07-24 17:15:37
 */
const path = require('path')

module.exports = {
    // webpack 配置
    webpack: {
        // 配置别名
        alias: {
            // 约定：使用 @ 表示 src 文件所在路径
            '@': path.resolve(__dirname, 'src')
        },
        entry: {
            main: 'src/myIndex.tsx'
        }
    }
}