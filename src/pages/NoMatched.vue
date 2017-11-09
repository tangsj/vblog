<template>
  <div class="page-nomatched">
    <Icon type="sad-outline"></Icon>
    <p>哦豁,404了</p>
    <p>
      <Button size="large" type="error" @click="back">返回</Button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'nomatched',
  data() {
    return {
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>
<style>
  .page-nomatched{
    padding-top: 100px;
    font-size: 50px;
    text-align: center;
    color: #adadad;
  }
  .page-nomatched .ivu-icon{
    font-size: 200px;
    color: #e7e7e7;
  }
</style>

