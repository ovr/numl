import minify from 'rollup-plugin-babel-minify';
import postcss from 'rollup-plugin-postcss'
import replace from 'rollup-plugin-replace';
import pkg from './package.json';
import cssnano from 'cssnano';

const ENV = process.env.ROLLUP_WATCH ? 'development' : 'production';

export default [
  {
    input: 'src/pack.js',
    external: ['ms'],
    output: [
      { name: 'NudeFramework Pack', file: pkg.module, format: 'es' }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': '"production"',
      }),
      minify({
        comments: false,
      }),
      postcss({
        plugins: [cssnano()],
        extensions: [ '.css' ],
      })
    ]
  },
  {
    input: 'src/pack.js',
    external: ['ms'],
    output: [
      { name: 'NudeFramework Pack Dev', file: pkg.module.replace('.js', '.dev.js'), format: 'es' }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': '"development"',
      }),
      postcss({
        extensions: [ '.css' ],
      })
    ]
  },
  {
    input: 'src/index.js',
    external: ['ms'],
    output: [
      { name: 'NudeFramework Module', file: pkg.module.replace('.js', '.treeshaking.js'), format: 'es' }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': '"production"',
      }),
      minify({
        comments: false,
      }),
      postcss({
        plugins: [cssnano()],
        extensions: [ '.css' ],
      })
    ]
  },
  {
    input: 'src/index.js',
    external: ['ms'],
    output: [
      { name: 'NudeFramework Module Dev', file: pkg.module.replace('.js', '.treeshaking.dev.js'), format: 'es' }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': '"development"',
      }),
      postcss({
        extensions: [ '.css' ],
      })
    ]
  },
  {
    input: 'src/colors.js',
    external: ['ms'],
    output: [
      { name: 'HTML Colors Module', file: pkg.module.replace('.js', '.colors.js'), format: 'es' }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': '"production"',
      }),
    ]
  },
];
