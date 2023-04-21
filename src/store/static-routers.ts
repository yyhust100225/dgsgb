import FrameworkView from '@/views/FrameworkView.vue';
import Route from '@/type/Route';
import HomePage from '@/views/home/HomePageView.vue';
import ErrorMessageService from '@/views/cp-middle-control/error-message-service/ListView.vue';

const staticRouters: { routes: Array<Route> } = {
  routes: [
    {
      path: '/app',
      name: 'App概览',
      icon: 'BugOutlined',
      component: FrameworkView,
      children: [
        {
          path: 'homepage',
          name: '主页',
          icon: undefined,
          component: HomePage,
          children: undefined,
          menuShow: true
        }
      ],
      menuShow: true,
    },
    {
      path: '/cp-middle-control',
      name: 'cp中控',
      icon: 'CiCircleOutlined',
      component: FrameworkView,
      menuShow: true,
      children: [
        {
          path: 'error-message-service',
          name: '错误消息服务',
          icon: undefined,
          component: ErrorMessageService,
          children: undefined,
          menuShow: true
        }
      ]
    },
  ]
}

export default staticRouters;