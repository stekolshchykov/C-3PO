import type {ForgeConfig} from '@electron-forge/shared-types';
import {MakerSquirrel} from '@electron-forge/maker-squirrel';
import {MakerZIP} from '@electron-forge/maker-zip';
import {MakerDeb} from '@electron-forge/maker-deb';
import {MakerRpm} from '@electron-forge/maker-rpm';
import {AutoUnpackNativesPlugin} from '@electron-forge/plugin-auto-unpack-natives';
import {WebpackPlugin} from '@electron-forge/plugin-webpack';

import {mainConfig} from './webpack.main.config';
import {rendererConfig} from './webpack.renderer.config';

const config: ForgeConfig = {

    packagerConfig: {
        asar: true,
        icon: './src/assets/icon',
    },
    rebuildConfig: {},
    makers: [
        new MakerSquirrel({}),
        {
            "name": "@electron-forge/maker-zip",
            "platforms": ["darwin", "universal", "mas"], // optional
            "config": {
                // Config here
            }
        }
        // new MakerZIP({}, ['darwin', 'x64', 'universal', 'x86']),
        // {
        //     name: '@electron-forge/maker-zip',
        //     platforms: ['darwin', ','],
        //     config: {
        //         // target: "universal",
        //         // arch: ["arm64", "x86_64"],
        //         // arch: ["x64"],
        //         archs: ["x64"],
        //         // arch: ["universal"],
        //         // target: ["arm64", "x86_64"]
        //     }
        // },
        // new MakerRpm({}),
        // new MakerDeb({},),
    ],
    plugins: [
        new AutoUnpackNativesPlugin({}),
        new WebpackPlugin({
            mainConfig,
            devContentSecurityPolicy: "connect-src 'self' * 'unsafe-eval'",
            renderer: {
                config: rendererConfig,
                entryPoints: [
                    {
                        html: './src/index.html',
                        js: './src/renderer.ts',
                        name: 'main_window',
                        preload: {
                            js: './src/preload.ts',
                        },
                    },
                ],
            },
        }),
    ],
};

export default config;
