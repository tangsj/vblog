import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import About from '@/pages/About';
import ArticleList from '@/pages/ArticleList';
import ArticleInfo from '@/pages/ArticleInfo';

import AdminLogin from '@/pages/admin/Login';
import Admin from '@/pages/admin/Index';
import PostList from '@/pages/admin/PostList';
import TagList from '@/pages/admin/TagList';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          component: ArticleList,
        },
        {
          path: '/post/list',
          component: ArticleList,
        },
        {
          path: '/post/:id',
          component: ArticleInfo,
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminLogin,
    },
    {
      path: '/admin',
      redirect: '/admin/post/list',
      component: Admin,
      children: [
        {
          path: 'post/list',
          component: PostList,
        },
        {
          path: 'tag/list',
          component: TagList,
        },
      ],
    },
  ],
});
