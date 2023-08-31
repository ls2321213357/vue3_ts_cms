export default {
  pageName: 'role',
  formItems: [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入要查询的角色'
    },
    {
      type: 'input',
      label: '权限介绍',
      prop: 'intro',
      placeholder: '请输入要查询的权限'
    },
    {
      type: 'date-picker',
      label: '创建时间',
      prop: 'createAt',
      startName: '开始时间',
      endName: '结束时间'
    }
  ]
}
