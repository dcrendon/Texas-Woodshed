import { useDateFormat } from '@vueuse/core'
import jwtDecode, { JwtPayload } from "jwt-decode";

const titleFixer = (title: string) => {
  let fixedTitle = title.replace(/\s+/g, '-').toLowerCase();
  fixedTitle = fixedTitle.replace(/[^a-zA-Z0-9-]/g, '');
  fixedTitle = fixedTitle.replace(/-$/, '');
  return fixedTitle
}

const formatDate = (date:number) => {
  const datef = useDateFormat(date, "MM-DD-YYYY")
  return  datef.value
}

const emailReplace = (message:string) => {
  const newMessage = message.replace('identifier', 'email')
  return newMessage
}

const logout = (store:any, router:any) => {
  // const store = useStore()
  store.user = null
  store.jwt = null
  router.push('/login')
}

const checkJWT = (jwt:string) => {
  const exp:any = jwtDecode<JwtPayload>(jwt).exp
  const expDate = new Date(exp * 1000)
  const now = new Date()
  if(now > expDate){
    return false
  }else{
    return true
  }
}

const setTweetTheme = (newTheme:string, prevTheme:string='light') => {
  const tweets = document.querySelectorAll('[data-tweet-id]');
  tweets.forEach(tweet => {
      let src = tweet.getAttribute("src");
      tweet.setAttribute("src", src!.replace(`theme=${prevTheme}`, `theme=${newTheme}`));
  });
}

const createTwitterElement = () => {
  const twitterScript = document.createElement('script');
  twitterScript.id = 'twitter-wjs';
  twitterScript.type = 'text/javascript';
  twitterScript.src = 'https://platform.twitter.com/widgets.js';
  document.body.appendChild(twitterScript);
}

const deleteTwitterElement = () => {
  const twitterElement = document.getElementById('twitter-wjs')
  if(twitterElement){
    twitterElement.remove()
  }
}

export { titleFixer, formatDate, emailReplace, logout, checkJWT, setTweetTheme, createTwitterElement, deleteTwitterElement }