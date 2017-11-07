<template>
  <div class="admin-content page-tag-list">
    <ButtonGroup>
      <Button type="primary" @click="add_tag">添加</Button>
      <Button type="error">下架</Button>
    </ButtonGroup>

    <Table border :columns="columns" :data="data"></Table>

    <Page :total="100"></Page>

    <Modal v-model="add_modal" title="添加标签" @on-ok="add_ok">
      <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="100">
        <FormItem label="名称：" prop="name">
          <Input v-model="formData.name" placeholder="输入标签名称"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'page-tag-list',
    data() {
      return {
        add_modal: false,
        activeRow: {},
        formData: {
          name: '',
        },
        ruleValidate: {
          title: [
            { required: true, message: '标签名称不能为空', trigger: 'blur' },
          ],
        },
        columns: [
          {
            type: 'selection',
            width: 50,
            align: 'center',
          },
          {
            title: '名称',
            key: 'name',
          },
          {
            title: '状态',
            key: 'name',
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
                  },
                },
              }, '编辑'),
            ]),
          },
        ],
        data: [
          {
            name: 'John Brown',
          },
        ],
      };
    },
    methods: {
      add_tag() {
        this.activeRow = {};
        this.add_modal = true;
      },
      add_ok() {

      },
    },
    beforeMount() {

    },
  };
</script>
