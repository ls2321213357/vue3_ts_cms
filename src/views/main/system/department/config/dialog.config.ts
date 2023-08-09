export default {
  name: '部门',
  isNewUser: true,
  isShowDialog: false,
  pageName: 'department',
  formList: [
    {
      type: 'input',
      label: '部门名称',
      prop: 'name'
    },
    {
      type: 'input',
      label: '部门领导',
      prop: 'leader'
    },
    {
      type: 'input',
      label: '上级部门',
      prop: 'parentId'
    }
  ]
}
