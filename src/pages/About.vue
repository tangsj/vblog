<template>
  <div class="wrapper page-about">
    <div class="info">
      <div class="left">
        <div class="w100">
          <h2 class="name">汤世俊</h2>
          <h3 class="title">Web Developer</h3>
        </div>
      </div>
      <div class="center">
        <img src="/static/uploads/photo.jpg" class="avatar" alt="">
      </div>
      <div class="right">
        <div class="w100">
          <p>1990-03-11
            <i class="icon-user"></i>
          </p>
          <p>18580173605
            <i class="icon-phone"></i>
          </p>
          <p>t_fate@163.com
            <i class="icon-envelope"></i>
          </p>
          <p>重庆 沙坪坝
            <i class="icon-home"></i>
          </p>
        </div>
      </div>
    </div>
    <div class="work">
      <h2>
        <i class="icon-link"></i>待过地方
      </h2>
      <div class="items">
        <div class="item" v-for="(w, i) in work" :key="`work_${i}`">
          <div class="time">{{w.time}}</div>
          <div class="company" :class="w.class">{{w.company}}</div>
        </div>
      </div>
    </div>
    <div class="project">
      <h2>
        <i class="icon-bookmark"></i>干过的事儿
      </h2>
      <div class="items">
        <div class="item" v-for="(pro, j) in project" :key="`pro_${j}`">
          <div class="container">
            <div class="time">
              <p>{{pro.time}}</p>
              <p class="year">{{pro.year}}</p>
            </div>
            <div class="content">
              <div class="title">{{pro.title}}</div>
              <div class="link">
                <a target="_blank" :href="pro.link">{{pro.link}}</a>
              </div>
              <div class="desc">{{pro.desc}}</div>
              <div class="points">
                <span v-for="(tag, t) in pro.tags" :key="`tag_${t}`">{{tag}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import projectApi from '@/api/project';

export default {
  name: 'page-about',
  data() {
    return {
      work: [
        {
          time: '2011/2 - 2013/2',
          company: '重庆中天国际信息技术有限公司',
        },
        {
          time: '2013/3 - 2014/5',
          company: '重庆曻通科技有限公司',
        },
        {
          time: '2014/5 - 2015/2',
          company: '重庆海外旅业（旅行社）集团有限公司',
        },
        {
          time: '2015/2 - 2017/8',
          company: '重庆火码互动科技有限公司',
        },
        {
          time: '2017/8 - 至今',
          class: '',
          company: '重庆沃伟思科技有限公司',
        },
      ],
      project: [],
    };
  },
  async beforeMount() {
    const res = await projectApi.list();
    if (res) {
      this.project = res.data.reverse();
    }
  },
};
</script>
