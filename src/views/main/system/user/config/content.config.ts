export default {
  title: '用户列表',
  btnTitle: '新建用户',
  pageName: 'users',
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
      label: '用户名称',
      prop: 'name'
    },
    {
      type: 'normal',
      label: '真实姓名',
      prop: 'realname'
    },
    {
      type: 'normal',
      label: '手机号码',
      prop: 'cellphone',
      width: '150'
    },
    {
      type: 'status',
      label: '状态',
      prop: 'enable',
      slotName: 'status'
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
    }
  ]
}
