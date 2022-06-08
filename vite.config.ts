import vue from '@vitejs/plugin-vue'

const config: any = {
  plugins: [vue({})],
  ssgOptions: {
    script: 'async',
    formatting: 'prettify',
    // includedRoutes(paths, routes) {
    //   return paths.filter(i => !i.includes('/:pathMatch(.*)*'))
    // },
  },
}

export default config