import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';// 自动导入vue中hook reactive ref等
import vuesetupExtend from 'vite-plugin-vue-setup-extend';

export default defineConfig({
    plugins: [
        vue(),
        vuesetupExtend(),
        /** 自动引入插件 */
        AutoImport({
            //安装两行后你会发现在组件中不用再导入ref，reactive等
            imports: ['vue'],
            //存放的位置
            dts: 'typings/auto-imports.d.ts',
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    }
});
