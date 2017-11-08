<template>
  <div id="app">
    <header>
      <div class="wrapper">
        <a href="javascript:;" class="logo">CodeCook</a>
        <nav>
          <router-link to="/" exact>主页</router-link>
          <router-link to="/about" exact>关于我</router-link>
        </nav>
        <nav class="nav-admin">
          <router-link to="/admin/login">管理</router-link>
          <!-- <a href="javascript:;" class="logout">退出</a> -->
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
};
</script>

<style src="@/css/main.css"></style>
