<template>
  <div class="admin-content page-banner-list">
    <div class="btns" style="margin-bottom: 20px;">
      <Upload
        style="display: inline-block;"
        name="file"
        action="/file/single"
        :data="uploadData"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
      >
        <Button :loading="uploading" type="primary">上传</Button>
      </Upload>
      <Button type="error" @click="remove_banner">删除</Button>
    </div>
    <Table @on-selection-change="selectionChange" :loading="dataLoading" border :columns="columns" :data="data"></Table>

    <Page :current="current" :total="total" :page-size="pageSize" @on-change="pageChange"></Page>

    <Modal v-model="view_model" title="图片预览">
      <img v-if="activeRow.path" width="100%;" :src="`/static/${activeRow.path}`" alt="">
    </Modal>
  </div>
</template>

<script>
  import moment from 'moment';
  import filesApi from '@/api/files';

  export default {
    name: 'page-banner-list',
    data() {
      return {
        uploading: false,
        uploadData: {
          type: 'banner',
        },
        current: 1,
        total: 0,
        pageSize: 10,
        view_model: false,
        dataLoading: false,
        activeRow: {},
        tableSelection: [],
        columns: [
          {
            type: 'selection',
            width: 50,
            align: 'center',
          },
          {
            title: '文件名',
            key: 'originalname',
          },
          {
            title: '大小',
            render: (h, params) => `${parseInt(params.row.size / 1000, 10)}KB`,
          },
          {
            title: '路径',
            key: 'path',
          },
          {
            title: '上传时间',
            render: (h, params) => moment(params.row.created).format('YYYY-MM-DD HH:mm:ss'),
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
                    this.view_model = true;
                  },
                },
              }, '预览'),
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
    },
    methods: {
      beforeUpload() {
        this.uploading = true;
      },
      uploadSuccess() {
        this.uploading = false;
        this.loadBannerList();
      },
      async remove_banner() {
        if (this.selecttionIds.length === 0) {
          this.$Notice.warning({
            title: '警告',
            desc: '请选择至少一行',
          });
          return;
        }
        const res = await filesApi.del(this.selecttionIds.join(','));

        if (res) {
          this.loadBannerList();
        }
      },
      selectionChange(selection) {
        this.tableSelection = selection;
      },
      pageChange(p) {
        this.current = p;
        this.loadBannerList();
      },
      async loadBannerList() {
        this.dataLoading = true;
        const res = await filesApi.list({
          page: this.current - 1,
          pageSize: this.pageSize,
          type: 'all',
        });

        if (res) {
          this.dataLoading = false;
          this.data = res.data.list;
          this.total = res.data.total;
        }
      },
    },
    beforeMount() {
      this.loadBannerList();
    },
  };
</script>
