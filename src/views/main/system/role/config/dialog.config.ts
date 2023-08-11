export default {
  name: '角色',
  isNewUser: true,
  isShowDialog: false,
  pageName: 'role',
  slotName: 'tree',
  formList: [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name'
    },
    {
      type: 'input',
      label: '角色描述',
      prop: 'intro'
    }
  ]
}
