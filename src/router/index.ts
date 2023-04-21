import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { goLoginPage, goHomePage, go404 } from '@/common/functions';

// import HomeView from '../views/HomeView.vue'
import staticRouters from '@/store/static-routers';

const localRoutes: Array<RouteRecordRaw> = [];

staticRouters.routes.forEach(v => {

  localRoutes.push({
    path: v.path,
    name: v.name,
    component: v.component,
    children: v.children
  })
});

const routes: Array<RouteRecordRaw> = localRoutes

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  console.log('to', to.path);
  if (localStorage.getItem('accessToken') == '' && to.path != '/auth/login') {
    goLoginPage();
    return false;
  }
  if (to.path == '/') {
    goHomePage();
    return false;
  }
  if (typeof to.name == 'undefined' || (to.matched.length < 2)) {
    go404();
    return false;
  }
  localStorage.setItem("currRoute", to.path);
});

export default router
