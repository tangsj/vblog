<template>
  <div class="page-article-list">
    <article class="posts" v-for="(post, index) in postList">
      <img v-if="post.figure" :src="`/static/uploads/${post.figure}`" alt="">

      <div class="header">
        <h1>
          <router-link :to="`/post/${post.id}`">{{post.title}}</router-link>
        </h1>
        <div class="date">
          <i class="icon-calendar"></i>
          <span>{{post.date | time}}</span>
          <span class="year">{{post.date | year}}</span>
        </div>
        <div class="meta">
          <span class="category">
            <i class="icon-folder-close"></i>
            <a href="javascript:;" class="category-link">{{post.tag}}</a>
          </span>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import postsApi from '@/api/posts';

export default {
  name: 'page-article-list',
  data() {
    return {
      postList: [],
    };
  },
  filters: {
    time(val) {
      if (!val) {
        return '';
      }
      const d = val.split(' ')[0].split('-');
      return `${d[1]}-${d[2]}`;
    },
    year(val) {
      if (!val) {
        return '';
      }
      const d = val.split(' ')[0].split('-');
      return d[0];
    },
  },
  async beforeMount() {
    const res = await postsApi.list();
    if (res) {
      this.postList = res.data.reverse();
    }
  },
};
</script>
