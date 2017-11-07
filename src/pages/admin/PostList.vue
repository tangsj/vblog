<template>
  <div class="admin-content page-post-list">
    <ButtonGroup>
      <Button type="primary" @click="add_post">添加</Button>
      <Button type="error">下架</Button>
    </ButtonGroup>

    <Table border :columns="columns" :data="data"></Table>

    <Page :total="100"></Page>

    <Modal v-model="add_modal" title="添加文章" @on-ok="add_ok">
      <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="100">
        <FormItem label="标题：" prop="title">
          <Input v-model="formData.title" placeholder="输入文章标题"></Input>
        </FormItem>
        <FormItem label="创建人" prop="author">
          <Input v-model="formData.author" placeholder="输入创建人姓名"></Input>
        </FormItem>
        <FormItem label="关联文件：" prop="source">
          <Select v-model="formData.source" placeholder="请选择...">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="标签：" prop="tags">
          <Select multiple v-model="formData.tags" placeholder="请选择...">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="头图名称：" prop="figure">
          <Input v-model="formData.figure" placeholder="输入头图文件名"></Input>
        </FormItem>
        <FormItem label="创建日期：">
          <DatePicker type="date" placeholder="请选择" v-model="formData.date"></DatePicker>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'page-post-list',
  data() {
    return {
      add_modal: false,
      activeRow: {},
      formData: {
        title: '',
        author: 'tangsj',
        source: '',
        figure: '',
        date: '',
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
        {
          type: 'selection',
          width: 50,
          align: 'center',
        },
        {
          title: '标题',
          key: 'name',
        },
        {
          title: '创建人',
          key: 'name',
        },
        {
          title: '文件名',
          key: 'name',
        },
        {
          title: '头图',
          key: 'name',
        },
        {
          title: '创建日期',
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
    add_post() {
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
