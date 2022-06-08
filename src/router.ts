import Home from './views/Home.vue'
import Article from './views/Article.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Hitter from './views/Hitter.vue'
import Lost from './views/Lost.vue'
import About from './views/About.vue'
import FilterList from './views/FilterList.vue'
import axios from 'axios'

const checkFilterType = (to: any, from: any, next: any) => {
  if(to.params.type === 'sport' || to.params.type === 'author') {
    next()
  }else{
    next('/')
  }
}

const getPost = (postType:string, to:any, from:any, next:any) => {
  let querystring = ''
  if(postType === 'articles'){
    querystring = '?populate=author,sport'
  }else{
    querystring = '?populate=author'
  }
  axios.get(`${import.meta.env.VITE_API_URL}/api/${postType}/${to.params.id}${querystring}`)
  .then(res => {
    to.params.post = res.data.data
    document.title = `${res.data.data.attributes.title} | Texas Woodshed`
    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el!.parentNode!.removeChild(el))
    next()
  }).catch(err => {
    console.log(err)
  });
}


const routes = [
  { 
    path: '/', 
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/signup',
    component: Signup
  },
  {
    path: '/filter/:type/:name',
    component: FilterList,
    beforeEnter: (to: any, from: any, next: any) => {
      checkFilterType(to, from, next)
    }
  },
  {
    path: '/article/:id/:title',
    component: Article,
    beforeEnter: (to: any, from: any, next: any) => {
      getPost('articles', to, from, next)
    }
  },
  {
    path: '/quick-hitter/:id/:title',
    component: Hitter,
    beforeEnter: (to: any, from: any, next: any) => {
      getPost('quick-hitters', to, from, next)
    }
  },
  { 
    path: '/:pathMatch(.*)*',
    component: Lost, 
  },
]

export default routes