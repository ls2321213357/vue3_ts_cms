export default {
  pageName: 'users',
  formItems: [
    {
      type: 'input',
      label: '用户名',
      prop: 'name',
      placeholder: '请输入要查询的用户名'
    },
    {
      type: 'input',
      label: '真实姓名',
      prop: 'realname',
      placeholder: '请输入要查询的真实姓名'
    },
    {
      type: 'input',
      label: '手机号',
      prop: 'cellphone',
      placeholder: '请输入要查询的手机号'
    },
    {
      type: 'select',
      label: '状态',
      prop: 'enable',
      options: [
        {
          value: 1,
          label: '启用'
        },
        {
          value: 0,
          label: '禁用'
        }
      ]
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
