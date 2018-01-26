<template>
  <div class="wrapper page-admin">
    <Menu
      @on-select="menuSelect"
      mode="horizontal" theme="light" :active-name="activeMenuName"
    >
      <template v-if="user.type === 0">
        <MenuItem name="/admin/post/list">
          <Icon type="ios-paper"></Icon>
          文章管理
        </MenuItem>
        <MenuItem name="/admin/tag/list">
          <Icon type="settings"></Icon>
          标签管理
        </MenuItem>
        <MenuItem name="/admin/banner/list">
          <Icon type="images"></Icon>
          Banner图管理
        </MenuItem>
      </template>

      <MenuItem name="/admin/cloud">
        <Icon type="images"></Icon>
        图片云
      </MenuItem>
      <!-- <MenuItem name="/admin/user/list">
        <Icon type="ios-people"></Icon>
        用户管理
      </MenuItem> -->
    </Menu>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'page-admin',
  data() {
    return {
      activeMenuName: '',
    };
  },
  computed: {
    ...mapState([
      'user',
    ]),
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
