<template>
  <div class="page-article-info">
    <div v-if="loading" class="article-loading">
      <Spin size="large"></Spin>
    </div>

    <article class="posts" v-if="!loading">
      <img v-if="post.figure" :src="`/static/uploads/${post.figure}`" alt="" />
      <div class="header">
        <h1>
          <a href="javascript:;">{{post.title}}</a>
        </h1>
        <div class="meta">
          <span class="date">
            <i class="icon-calendar"></i>{{post.date}}
          </span>
          <span class="category">
            <i class="icon-folder-close"></i>
            <a href="javascript:;" class="category-link">{{tagsName}}</a>
          </span>
        </div>
      </div>

      <div class="article-entry" v-html="markHtml"></div>
    </article>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
import marked from 'marked';
import moment from 'moment';
import highlightjs from 'highlight.js';
import 'highlight.js/styles/xcode.css';
import postsApi from '@/api/posts';

marked.setOptions({
  highlight: code => highlightjs.highlightAuto(code).value,
});

export default {
  name: 'page-article-info',
  data() {
    return {
      loading: false,
      post: {},
      content: '',
    };
  },
  computed: {
    ...mapState({
      tags: state => state.tags.list,
    }),
    tagsName() {
      if (this.post.tag) {
        const tagsName = [];
        this.tags.forEach((item) => {
          if (this.post.tag.indexOf(item.id) !== -1) {
            tagsName.push(item.name);
          }
        });
        return tagsName.join(',');
      }
      return '';
    },
    markHtml() {
      return marked(this.content);
    },
  },
  methods: {
    ...mapActions([
      'loadPostList',
    ]),
  },
  async mounted() {
    this.loading = true;
    const res = await postsApi.getById(this.$route.params.id);
    if (res) {
      res.data.date = moment(res.data.date).format('YYYY-MM-DD HH:mm:ss');
      this.post = res.data;
      const content = await axios.get(`/static/posts/${this.post.source}`);
      if (content) {
        this.content = content;
        this.loading = false;
      }
    }
    // 加载第1页文章，主要获取总条数
    this.loadPostList({ page: 0 });
  },
};
</script>
