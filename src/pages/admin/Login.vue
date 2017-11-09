<template>
  <div class="wrapper page-admin-login">
    <Card class="login-container" :bordered="false">
      <p slot="title">
        <Icon type="log-in"></Icon>
        欢迎登录
      </p>
      <div class="form-con">
        <Form ref="formData" :model="formData" :rules="ruleInline">
          <input style="display:none" type="text" name="chrome-autofill-user" />
          <FormItem prop="user">
            <Input v-model="formData.user" placeholder="请输入用户名">
            <span slot="prepend">
              <Icon :size="16" type="person"></Icon>
            </span>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formData.password" placeholder="请输入密码">
            <span slot="prepend">
              <Icon :size="14" type="locked"></Icon>
            </span>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" long @click="handleSubmit('formData')">登录</Button>
          </FormItem>
        </Form>
        <p class="login-tip">
          <Checkbox v-model="remember">记住我</Checkbox>
        </p>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import md5 from 'md5';
import systemApi from '@/api/system';

export default {
  name: 'page-admin-login',
  data() {
    return {
      remember: '',
      formData: {
        user: '',
        password: '',
      },
      ruleInline: {
        user: [
          { required: true, message: '请填写用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    ...mapState([
      'isLogin',
    ]),
  },
  methods: {
    ...mapMutations([
      'setLogin',
    ]),
    handleSubmit(name) {
      this.$refs.formData.validate(async (valid) => {
        if (valid) {
          const res = await systemApi.doLogin({
            username: this.formData.user,
            password: md5(this.formData.password),
          });

          if (res) {
            this.setLogin(true);
            sessionStorage.setItem('isLogin', true);
            // 记住用户名，密码
            if (this.remember) {
              localStorage.setItem('cc_remember', JSON.stringify(this.formData));
            } else {
              localStorage.removeItem('cc_remember');
            }
            this.$router.push(this.$route.query.redirect || '/admin/post/list');
          }
        }
      });
    },
  },
  beforeMount() {
  },
  mounted() {
    if (this.isLogin) {
      this.$router.push('/admin/post/list');
      return;
    }
    // 回填信息
    if (localStorage.getItem('cc_remember')) {
      this.remember = true;
      const remember = JSON.parse(localStorage.getItem('cc_remember'));
      this.formData.user = remember.user;
      this.formData.password = remember.password;
    }
  },
};
</script>
