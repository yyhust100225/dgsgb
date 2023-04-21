import FrameworkView from '@/views/FrameworkView.vue';
import SinglePageFrameworkView from '@/views/SinglePageFrameworkView.vue';
import Route from '@/type/Route';
import RoleList from '@/views/permission-management/role/ListView.vue';
import PrivilegeList from '@/views/permission-management/privilege/ListView.vue';
import AdministratorList from '@/views/permission-management/administrator/ListView.vue';
import ErrorNotFound from '@/views/error/404ErrorView.vue';
import Login from '@/views/page/loginView.vue';
import HomePage from '@/views/home/HomePageView.vue';
import CommunityList from '@/views/content/community/ListView.vue';
import CategoryList from '@/views/content/category/ListView.vue';
import BlogZoneList from '@/views/content/blog-zone/ListView.vue';

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
      path: '/permission_management',
      name: '权限管理',
      icon: 'CiCircleOutlined',
      component: FrameworkView,
      menuShow: true,
      children: [
        {
          path: 'administrator',
          name: '账户管理',
          icon: undefined,
          component: AdministratorList,
          children: undefined,
          menuShow: true
        },
        {
          path: 'role',
          name: '角色管理',
          icon: undefined,
          component: RoleList,
          children: undefined,
          menuShow: true
        },
        {
          path: 'privilege',
          name: '权限管理',
          icon: undefined,
          component: PrivilegeList,
          children: undefined,
          menuShow: true
        }
      ]
    },
    {
      path: '/content',
      name: '内容管理',
      icon: 'CiCircleOutlined',
      component: FrameworkView,
      menuShow: true,
      children: [
        {
          path: 'community',
          name: '社区管理',
          icon: undefined,
          component: CommunityList,
          children: undefined,
          menuShow: true
        },{
          path: 'category',
          name: '内容分类管理',
          icon: undefined,
          component: CategoryList,
          children: undefined,
          menuShow: true
        },{
          path: 'blog_zone',
          name: '博客空间管理',
          icon: undefined,
          component: BlogZoneList,
          children: undefined,
          menuShow: true
        }
      ]
    },
    {
      path: '/error',
      name: '错误页',
      icon: undefined,
      component: SinglePageFrameworkView,
      children: [
        {
          path: '404',
          name: '资源未找到',
          icon: undefined,
          component: ErrorNotFound,
          children: undefined,
          menuShow: false
        }
      ],
      menuShow: false
    },
    {
      path: '/auth',
      name: '权限认证',
      icon: undefined,
      component: SinglePageFrameworkView,
      children: [
        {
          path: 'login',
          name: '用户登陆',
          icon: undefined,
          component: Login,
          children: undefined,
          menuShow: false
        }
      ],
      menuShow: false
    }
  ]
}

export default staticRouters;