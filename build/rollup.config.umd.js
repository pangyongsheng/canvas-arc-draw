import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    name: 'DragArc',
    file: 'dist/drag-arc.umd.js',
    format: 'umd'
  },
})

export default config