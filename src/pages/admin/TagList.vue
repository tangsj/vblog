<template>
  <div class="admin-content page-tag-list">
    <div class="btns" style="margin-bottom: 20px;">
      <Button type="primary" @click="add_tag">添加</Button>
      <Button type="error" @click="remove_tag">删除</Button>
    </div>

    <Table @on-selection-change="selectionChange" :loading="dataLoading" border :columns="columns" :data="data"></Table>

    <Page :current="current" :total="total" :page-size="pageSize" @on-change="pageChange"></Page>

    <Modal
      :loading="modal_loading" v-model="add_modal"
      :title="activeRow.id ? '编辑标签': '添加标签'" @on-ok="add_ok"
    >
      <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="80">
        <FormItem label="名称：" prop="name">
          <Input v-model="formData.name" placeholder="输入标签名称"></Input>
        </FormItem>
        <FormItem label="状态：" prop="status">
          <Select v-model="formData.status" placeholder="请选择...">
            <Option value="1">正常</Option>
            <Option value="0">禁用</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import tagsApi from '@/api/tags';

  export default {
    name: 'page-tag-list',
    data() {
      return {
        current: 1,
        total: 0,
        pageSize: 10,
        dataLoading: false,
        add_modal: false,
        modal_loading: true,
        activeRow: {},
        tableSelection: [],
        formData: {
          name: '',
          status: '1',
        },
        ruleValidate: {
          name: [
            { required: true, message: '标签名称不能为空', trigger: 'blur' },
          ],
        },
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: '名称',
            key: 'name',
          },
          {
            title: '状态',
            render: (h, params) => (params.row.status === 1 ? '正常' : '禁用'),
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
                    this.formData.name = params.row.name;
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
    },
    methods: {
      add_tag() {
        this.activeRow = {};
        this.formData = {
          name: '',
          status: '1',
        };
        this.add_modal = true;
      },
      add_ok() {
        this.$refs.formData.validate(async (valid) => {
          if (valid) {
            if (this.activeRow.id) {
              const res = await tagsApi.update(Object.assign(this.activeRow, this.formData));
              if (res) {
                this.add_modal = false;
              } else {
                this.modal_loading = false;
                this.$nextTick(() => {
                  this.modal_loading = true;
                });
              }
            } else {
              const res = await tagsApi.add(this.formData);
              if (res) {
                this.add_modal = false;
                this.current = 1;
                this.loadTagList();
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
      async remove_tag() {
        if (this.selecttionIds.length === 0) {
          this.$Notice.warning({
            title: '警告',
            desc: '请选择至少一行',
          });
          return;
        }
        const res = await tagsApi.del(this.selecttionIds.join(','));

        if (res) {
          this.loadTagList();
        }
      },
      selectionChange(selection) {
        this.tableSelection = selection;
      },
      pageChange(p) {
        this.current = p;
        this.loadTagList();
      },
      async loadTagList() {
        this.dataLoading = true;
        const res = await tagsApi.list({
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
      this.loadTagList();
    },
  };
</script>
