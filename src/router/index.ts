import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
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
  if(to.path === '/') {
    router.push('/app').then(r => console.log(r));
  }
});

export default router
