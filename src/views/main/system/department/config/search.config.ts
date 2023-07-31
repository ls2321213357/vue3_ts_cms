export default {
  formItems: [
    {
      type: 'input',
      label: '部门名称',
      prop: 'name',
      placeholder: '请输入要查询的部门'
    },
    {
      type: 'input',
      label: '领导名称',
      prop: 'leader',
      placeholder: '请输入要查询的领导'
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
