<template>
  <div id="app">
    <header>
      <div class="wrapper">
        <a href="javascript:;" class="logo">CodeCook</a>
        <nav>
          <router-link to="/" exact>主页</router-link>
          <router-link to="/demo" exact>示例</router-link>
          <router-link to="/about" exact>关于我</router-link>
        </nav>
        <nav class="nav-admin" v-if="false">
          <router-link to="/admin/login">管理</router-link>
          <a href="javascript:;" class="logout">退出</a>
        </nav>
        <!-- <div class="search-form">
          <input type="text" name="keys" placeholder="Search">
          <a href="javascript:;" class="icon-search"></a>
        </div> -->
      </div>
    </header>
    <section id="main">
      <router-view></router-view>
    </section>
    <footer class="">
      <div class="wrapper">
        <p>© 2017 CodeCook</p>
        <p>Chrome <a href="javascript:;">渝ICP备14005794号-1</a></p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    const isWebkit = navigator.userAgent.indexOf('AppleWebKit') > -1;

    if (!isWebkit) {
      const tipTxt = document.querySelector('.tipTxt');
      tipTxt.style.display = 'block';
      return;
    }
    window.addEventListener('load', () => {
      const loadDom = document.querySelector('.enter-loader');
      const body = document.querySelector('body');

      loadDom.addEventListener('webkitTransitionEnd', () => {
        body.removeChild(loadDom);
      }, true);

      loadDom.classList.add('fadeOut');
      body.classList.remove('loading');
    }, true);
  },
};
</script>

<style src="@/css/main.css"></style>
