export default {
  title: '部门列表',
  btnTitle: '新建部门',
  pageName: 'department',
  dataList: [
    {
      type: 'selection',
      label: '选择',
      width: '80'
    },
    {
      type: 'index',
      label: 'ID',
      width: '80'
    },
    {
      type: 'normal',
      label: '部门名称',
      prop: 'name'
    },
    {
      type: 'normal',
      label: '部门领导',
      prop: 'leader'
    },
    {
      type: 'normal',
      label: '上级部门',
      prop: 'parentId',
      width: '150'
    },
    {
      type: 'timer',
      label: '创建时间',
      prop: 'createAt'
    },
    {
      type: 'timer',
      label: '修改时间',
      prop: 'updateAt'
    },
    {
      type: 'handler',
      label: '操作'
    },
    //需要定制开发时就是用作用域插槽
    {
      type: 'custom',
      label: '部门领导',
      prop: 'leader',
      slotName: 'leader'
    },
    {
      type: 'custom',
      label: '部门名称',
      prop: 'name',
      slotName: 'name'
    }
  ]
}
