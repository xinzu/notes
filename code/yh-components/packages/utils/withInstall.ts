import type { App, Plugin } from 'vue';

type SFCWithInstall<T> = T & Plugin;

export const withInstall = <T>(com: T) => {
    (com as SFCWithInstall<T>).install = (app: App) => {
        app.component((com as any).name, (com as any));
    };
    return com as SFCWithInstall<T>;
}