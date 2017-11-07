import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import About from '@/pages/About';
import ArticleList from '@/pages/ArticleList';
import ArticleInfo from '@/pages/ArticleInfo';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
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
  ],
});
