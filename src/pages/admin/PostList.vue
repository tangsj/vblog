<template>
  <div class="admin-content page-post-list">
    <ButtonGroup>
      <Button type="primary" @click="add_post">添加</Button>
    </ButtonGroup>

    <Table @on-selection-change="selectionChange" :loading="dataLoading" border :columns="columns" :data="data"></Table>

    <Page :current="current" :total="total" :page-size="pageSize" @on-change="pageChange"></Page>

    <Modal :loading="modal_loading" v-model="add_modal" :title="activeRow.id ? '编辑文章': '添加文章'" @on-ok="add_ok">
      <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="100">
        <FormItem label="关联文件：" prop="source" class="post-add-file-input">
          <AutoComplete v-model="formData.source" :data="sourceArr" :filter-method="filterMethod" placeholder="请选择..."></AutoComplete>
          <Upload
            name="mdfile"
            class="post-upload-btn"
            action="/blog/posts/upload"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
          >
            <Button :loading="uploading" type="info" icon="ios-cloud-upload-outline">上传</Button>
          </Upload>
        </FormItem>
        <FormItem label="标题：" prop="title">
          <Input v-model="formData.title" placeholder="输入文章标题"></Input>
        </FormItem>
        <FormItem label="作者：" prop="author">
          <Input v-model="formData.author" placeholder="输入创建人姓名"></Input>
        </FormItem>
        <FormItem label="标签：" prop="tags">
          <Select multiple v-model="formData.tags" placeholder="请选择...">
            <Option v-if="tag.status === 1" :key="`tag_${tag.id}`" :value="tag.id" v-for="tag in tagArr">{{tag.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="头图名称：" prop="figure">
          <Select v-model="formData.figure" placeholder="请选择...">
            <Option :key="`banner_${banner.id}`" :value="banner.id" v-for="banner in bannerArr">{{banner.originalname}}</Option>
          </Select>
        </FormItem>
        <FormItem label="头图预览：" prop="figure" v-if="figurePath">
          <img :src="`/static/${figurePath}`" alt="" width="100%">
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import moment from 'moment';
import postsApi from '@/api/posts';
import tagsApi from '@/api/tags';
import filesApi from '@/api/files';

export default {
  name: 'page-post-list',
  data() {
    return {
      uploading: false,
      current: 1,
      total: 0,
      pageSize: 10,
      dataLoading: false,
      add_modal: false,
      modal_loading: true,
      activeRow: {},
      tableSelection: [],
      sourceArr: [],
      bannerArr: [],
      tagArr: [],
      formData: {
        title: '',
        author: 'tangsj',
        source: '',
        figure: '',
        date: new Date(),
        tags: [],
      },
      ruleValidate: {
        title: [
          { required: true, message: '文章名称不能为空', trigger: 'blur' },
        ],
        source: [
          { required: true, message: '关联文件不能为空', trigger: 'change' },
        ],
      },
      columns: [
        // {
        //   type: 'selection',
        //   width: 50,
        //   align: 'center',
        // },
        {
          title: '标题',
          key: 'title',
        },
        {
          title: '标签',
          key: 'tag',
          render: (h, params) => {
            const tags = params.row.tag.split(',').map(a => parseInt(a, 10));
            const tagsName = [];
            this.tagArr.forEach((item) => {
              if (tags.indexOf(item.id) !== -1) {
                tagsName.push(item.name);
              }
            });

            return tagsName.join(',');
          },
        },
        {
          title: '作者',
          key: 'author',
        },
        {
          title: '文件名',
          key: 'source',
        },
        {
          title: '头图',
          key: 'figure',
          render: (h, params) => {
            const banner = this.bannerArr.filter(item => item.id === params.row.figure)[0];
            if (banner) {
              return banner.originalname;
            }
            return '';
          },
        },
        {
          title: '创建日期',
          render: (h, params) => moment(params.row.date).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
          title: '操作',
          key: 'action',
          width: 80,
          align: 'center',
          render: (h, params) => h('div', [
            h('Button', {
              props: {
                type: 'info',
                size: 'small',
              },
              on: {
                click: () => {
                  this.activeRow = params.row;
                  let tagArr = params.row.tag.split(',');
                  tagArr = tagArr.map(t => parseInt(t, 10));
                  this.formData.title = params.row.title;
                  this.formData.author = params.row.author;
                  this.formData.source = params.row.source;
                  this.formData.figure = params.row.figure;
                  this.formData.tags = tagArr;
                  this.formData.status = `${params.row.status}`;
                  this.add_modal = true;
                },
              },
            }, '编辑'),
          ]),
        },
      ],
      data: [],
    };
  },
  computed: {
    selecttionIds() {
      return this.tableSelection.map(item => item.id);
    },
    figurePath() {
      if (this.formData.figure) {
        const banner = this.bannerArr.filter(item => item.id === this.formData.figure)[0];

        if (banner) {
          return banner.path;
        }
      }
      return '';
    },
  },
  methods: {
    add_post() {
      this.activeRow = {};
      this.$refs.formData.resetFields();
      this.formData.figure = '';
      this.formData.date = new Date();
      this.add_modal = true;
    },
    add_ok() {
      this.$refs.formData.validate(async (valid) => {
        if (valid) {
          if (this.activeRow.id) {
            const postData = Object.assign({
              title: '',
              author: 'tangsj',
              source: '',
              figure: '',
              tags: [],
            }, this.formData);
            postData.tags = postData.tags.join(',');
            postData.figure_path = this.figurePath;

            postData.id = this.activeRow.id;

            const res = await postsApi.update(postData);
            if (res) {
              this.add_modal = false;
              this.formData = {
                title: '',
                author: 'tangsj',
                source: '',
                figure: '',
                date: '',
                tags: [],
              };
              this.activeRow = {};
              this.loadPostsList();
            } else {
              this.modal_loading = false;
              this.$nextTick(() => {
                this.modal_loading = true;
              });
            }
          } else {
            const postData = Object.assign({
              title: '',
              author: 'tangsj',
              source: '',
              figure: '',
              date: '',
              tags: [],
            }, this.formData);
            postData.tags = postData.tags.join(',');
            postData.figure_path = this.figurePath;

            const res = await postsApi.add(postData);
            if (res) {
              this.add_modal = false;
              this.current = 1;
              this.loadPostsList();
            } else {
              this.modal_loading = false;
              this.$nextTick(() => {
                this.modal_loading = true;
              });
            }
          }
        } else {
          this.modal_loading = false;
          this.$Message.error('信息填写不完整!');
          this.$nextTick(() => {
            this.modal_loading = true;
          });
        }
      });
    },
    beforeUpload() {
      this.uploading = true;
    },
    uploadSuccess(response) {
      this.uploading = false;
      if (response.code !== 0) {
        this.$Notice.error({
          title: '错误',
          desc: response.message,
        });
      } else {
        this.formData.source = response.data.originalname;
        this.sourceArr.unshift(response.data.originalname);
      }
    },
    selectionChange(selection) {
      this.tableSelection = selection;
    },
    pageChange(p) {
      this.current = p;
      this.loadPostsList();
    },
    filterMethod(value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    },
    async loadFileList() {
      const res = await postsApi.fileList();
      if (res) {
        this.sourceArr = res.data;
      }
    },
    loadBannerList() {
      return new Promise(async (reslove, reject) => {
        const res = await filesApi.list({ type: 'banner' });
        if (res) {
          this.bannerArr = res.data;
          reslove();
        }
      });
    },

    loadTagsList() {
      return new Promise(async (reslove, reject) => {
        const res = await tagsApi.list({ page: -1 });
        if (res) {
          this.tagArr = res.data;
          reslove();
        }
      });
    },
    async loadPostsList() {
      this.dataLoading = true;
      const res = await postsApi.list({
        page: this.current - 1,
        pageSize: this.pageSize,
      });

      if (res) {
        this.dataLoading = false;
        this.data = res.data.list;
        this.total = res.data.total;
      }
    },
  },
  beforeMount() {
    this.loadFileList();
    Promise.all([
      this.loadBannerList(),
      this.loadTagsList(),
    ]).then(() => {
      this.loadPostsList();
    });
  },
};
</script>
