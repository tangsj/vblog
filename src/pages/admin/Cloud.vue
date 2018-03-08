<template>
  <div class="admin-content page-cloud-list">
    <div class="btns" style="margin-bottom: 10px;">
      <image-upload-zip action="/file/single" @on-success="uploadSuccess" :data="uploadData"></image-upload-zip>

      <Button type="error" @click="remove_banner">删除</Button>
    </div>

    <div class="tip" style="font-size: 12px;margin-bottom: 10px;">
      图片大小不能超过2M，手机访问地址：http://api.tangsj.com/cloud.html
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

  import ImageUploadZip from '@/components/ImageUploadZip';

  import filesApi from '@/api/files';

  export default {
    name: 'page-cloud-list',
    data() {
      return {
        uploading: false,
        uploadData: {
          type: 'cloud',
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
    components: {
      ImageUploadZip,
    },
    computed: {
      selecttionIds() {
        return this.tableSelection.map(item => item.id);
      },
    },
    methods: {
      uploadSuccess() {
        this.loadCloudList();
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
          this.loadCloudList();
        }
      },
      selectionChange(selection) {
        this.tableSelection = selection;
      },
      pageChange(p) {
        this.current = p;
        this.loadCloudList();
      },
      async loadCloudList() {
        this.dataLoading = true;
        const res = await filesApi.list({
          page: this.current - 1,
          pageSize: this.pageSize,
          type: 'cloud',
        });

        if (res) {
          this.dataLoading = false;
          this.data = res.data.list;
          this.total = res.data.total;
        }
      },
    },
    beforeMount() {
      this.loadCloudList();
    },
  };
</script>
