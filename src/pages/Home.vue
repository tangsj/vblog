<template>
  <div class="wrapper page-index">
    <aside class="profile">
      <div class="inner">
        <div class="base-info">
          <img src="/static/uploads/avatar.jpg" class="avatar" alt="">
          <h2 class="name">CodeCook</h2>
          <h3 class="title">Web Developer</h3>
          <div class="location">
            <i class="icon-map-marker"></i>Chongqing, China
          </div>
          <a href="http://github.com/tangsj" target="_blank" class="follow">FOLLOW</a>
        </div>

        <div class="article-info">
          <div class="col">
            {{postTotal}}
            <p>POSTS</p>
          </div>
          <div class="col">
            {{tags.length}}
            <p>TAGS</p>
          </div>
        </div>

        <div class="contact-info">
          <a href="http://github.com/tangsj" target="_blank" class="github" title="github">
            <i class="icon-github"></i>
          </a>
          <a href="http://weibo.com/u/2337863121" target="_blank" class="weibo" title="weibo">
            <i class="icon-weibo"></i>
          </a>
          <a href="https://plus.google.com/103636345185627159316" target="_blank" class="google" title="google+">
            <i class="icon-google-plus"></i>
          </a>
        </div>
      </div>
    </aside>
    <section class="post-list ">
      <router-view></router-view>
    </section>
    <aside class="slidebar">
      <div class="widget-wrap">
        <div class="widget-title">Tags</div>
        <div class="widget">
          <Tag
            :color="['blue', 'green', 'red', 'yellow', 'default'][(Math.random() * 5) | 0]"
            :type="['border', 'dot', ''][(Math.random() * 3) | 0]"
            :key="`tag_${tag.id}`"
            v-for="tag in tags"
          >
            {{tag.name}}
          </Tag>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'page-index',
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      tags: state => state.tags.list,
      postTotal: state => state.posts.total,
    }),
  },
  methods: {
    ...mapActions([
      'loadTagsList',
    ]),
    receiveData(data) {
      this.postTotal = data.postTotal;
    },
  },
  beforeMount() {
    this.loadTagsList({ page: -1 });
  },
  mounted() {
  },
};
</script>
