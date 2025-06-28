export const modules = [
  {
    name: 'dayjs',
    var: 'dayjs',
    path: 'https://unpkg.com/dayjs@1.11.13/dayjs.min.js'
  },
  {
    name: 'axios',
    var: 'axios',
    path: 'https://unpkg.com/axios@1.9.0/dist/axios.min.js'
  },
  {
    name: 'lodash',
    var: '_',
    path: 'https://unpkg.com/lodash@4.17.21/lodash.min.js'
  },
  {
    name: 'react',
    var: 'React',
    path: 'https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js'
  },
  {
    name: 'react-dom',
    var: 'ReactDOM',
    path: 'https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js'
  }
]

export const globals = modules.reduce<Record<string, string>>(
  (acc, module) => ({
    ...acc,
    [module.name]: module.var
  }),
  {}
)

export const external = Object.keys(globals)
