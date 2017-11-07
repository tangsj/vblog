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
  methods: {
    handleSubmit(name) {
      this.$router.push('/admin/post/list');
    },
  },
  beforeMount() {
  },
};
</script>
