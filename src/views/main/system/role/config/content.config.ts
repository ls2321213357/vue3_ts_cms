export default {
  title: '角色列表',
  btnTitle: '新建角色',
  pageName: 'role',
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
      label: '角色名称',
      prop: 'name'
    },
    {
      type: 'normal',
      label: '权限介绍',
      prop: 'intro'
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
