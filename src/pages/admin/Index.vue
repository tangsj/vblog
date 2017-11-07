<template>
  <div class="wrapper page-admin">
    <Menu
      @on-select="menuSelect"
      mode="horizontal" theme="light" :active-name="activeMenuName"
    >
      <MenuItem name="/admin/post/list">
        <Icon type="ios-paper"></Icon>
        文章管理
      </MenuItem>
      <MenuItem name="/admin/tag/list">
        <Icon type="settings"></Icon>
        标签管理
      </MenuItem>
      <!-- <MenuItem name="user">
        <Icon type="ios-people"></Icon>
        用户管理
      </MenuItem> -->
    </Menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'page-admin',
  data() {
    return {
      activeMenuName: '',
    };
  },
  methods: {
    menuSelect(name) {
      if (!name) {
        return;
      }
      this.$router.push(name);
    },
  },
  beforeMount() {
  },
  mounted() {
    this.activeMenuName = this.$route.path;
  },
};
</script>
