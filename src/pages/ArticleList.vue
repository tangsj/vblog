<template>
  <div class="page-article-list">
    <div v-if="loading" class="article-loading">
      <Spin size="large"></Spin>
    </div>

    <article class="posts" :key="`posts_${post.id}`" v-for="post in postList">
      <img v-if="post.figure" :src="`/static/${post.figure_path}`" alt="">

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
            <a href="javascript:;" class="category-link">{{post.tagsName}}</a>
          </span>
          <span class="author">
            <Icon type="person"></Icon>
            <a href="javascript:;">{{post.author}}</a>
          </span>
        </div>
      </div>
    </article>

    <Page v-if="postTotal > 0" :current="current" :total="postTotal" :page-size="pageSize" @on-change="pageChange"></Page>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';
import postsApi from '@/api/posts';
import tagsApi from '@/api/tags';

export default {
  name: 'page-article-list',
  data() {
    return {
      loading: true,
      current: 1,
      pageSize: 8,
      postList: [],
    };
  },
  computed: {
    ...mapState({
      postTotal: state => state.posts.total,
    }),
  },
  filters: {
    time(val) {
      if (!val) {
        return '';
      }
      return moment(val).format('MM-DD');
    },
    year(val) {
      if (!val) {
        return '';
      }
      return moment(val).format('YYYY');
    },
  },
  methods: {
    ...mapActions([
      'loadPostList',
    ]),
    pageChange(p) {
      window.scroll(0, 0);
      this.current = p;
      this.loadFun();
    },
    loadFun() {
      this.loading = true;
      this.loadPostList({
        page: this.current - 1,
        pageSize: this.pageSize,
      }).then((data) => {
        this.postList = data;
        this.loading = false;
      });
    },
  },
  mounted() {
    this.loadFun();
  },
};
</script>
