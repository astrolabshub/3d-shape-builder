import commonjs from 'rollup-plugin-commonjs' 
import VuePlugin from 'rollup-plugin-vue';
// "rollup-plugin-vue": "5.1.1", works but 5.1.2+ does not as of 11/30/2019

import alias from '@rollup/plugin-alias';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

let threeRoot = 'https://unpkg.com/three@0.111.0';

export default [{
  input: './src/app.js',

  output: [{
      file: 'dist/index.esm.js',
      format: 'esm',
      // sourcemap: 'inline',
    },
  ],

  plugins: [
    commonjs(),
    alias({ 
      entries: [
        {
          find: /^three$/, 
          replacement: threeRoot + '/build/three.module.js'
        },
        { 
          find:/(^three)(\/examples)(.*)/, 
          replacement: threeRoot + '$2$3.js'
        },
        { 
          find: /^dat.gui$/, 
          replacement: 'https://unpkg.com/dat.gui@0.7.6/build/dat.gui.module.js'
        },        
        { 
          find: /^vue$/, 
          replacement: 'https://unpkg.com/vue@2.6.10/dist/vue.esm.browser.js'
        },
        { 
          find: /^vuex$/, 
          replacement: 'https://unpkg.com/vuex@3.1.2/dist/vuex.esm.browser.js'
        },
      ]
    }),    
    VuePlugin(),
    ...process.env.RELOAD ? [
      serve({
        contentBase: [''],
        host: 'localhost',
        port: 8080,
      }),
      livereload(['dist', 'index.html']),
    ] : [],
    
  ],
  external: [
    'https://unpkg.com/three@0.111.0/build/three.module.js',
    'https://unpkg.com/three@0.111.0/examples/jsm/libs/stats.module.js',
    'https://unpkg.com/three@0.111.0/examples/jsm/controls/OrbitControls.js',
    'https://unpkg.com/dat.gui@0.7.6/build/dat.gui.module.js',
    'https://unpkg.com/vue@2.6.10/dist/vue.esm.browser.js',
    'https://unpkg.com/vuex@3.1.2/dist/vuex.esm.browser.js',
  ]
}];