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
            10
            <p>POSTS</p>
          </div>
          <div class="col">
            0
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
          <ul class="tag-list">
            <li>
              <a href="javascript:;">
                <i class="icon-caret-right"></i>Javascript
                <span>(10)</span>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <i class="icon-caret-right"></i>Css
                <span>(10)</span>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <i class="icon-caret-right"></i>Html
                <span>(10)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'page-index',
  data() {
    return {
    };
  },
};
</script>
