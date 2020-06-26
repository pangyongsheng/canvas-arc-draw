import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    name: 'DragArc',
    file: 'dist/drag-arc.min.js',
    format: 'iife'
  },
})

export default config