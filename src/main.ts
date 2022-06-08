import App from './App.vue'
import './index.css'
import routes from './router'
import { createPinia } from 'pinia'
import useStore from './store'
import { ViteSSG } from 'vite-ssg'
import VueGtag from "vue-gtag";
import { checkJWT, logout } from './helpers'

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, initialState }) => {
    const pinia = createPinia()
    app.use(pinia)

    const store = useStore()
    
    if(import.meta.env.PROD){
      app.use(VueGtag, {
        config: {
          id: `${import.meta.env.GOOGLE_ANALYTICS_ID}`
        },
      }, router);
    }

    router.beforeEach((to, from, next) => {
      if(store.jwt != null){
        const jwtStatus = checkJWT(store.jwt)
        if(jwtStatus){
          next()
        }else{
          logout(store, router)
          next()
        }
      }else{
        next()
      }
    })
  },
)