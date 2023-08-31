export default {
  name: '用户',
  isNewUser: true,
  isShowDialog: false,
  pageName: 'users',
  formList: [
    {
      type: 'input',
      label: '用户名',
      prop: 'name'
    },
    {
      type: 'input',
      label: '真实姓名',
      prop: 'realname'
    },
    {
      type: 'input',
      label: '密码',
      prop: 'password'
    },
    {
      type: 'input',
      label: '电话号码',
      prop: 'cellphone'
    },
    {
      type: 'select',
      label: '选择部门',
      prop: 'departmentId',
      data: 'departmentList'
    },
    {
      type: 'select',
      label: '选择角色',
      prop: 'roleId',
      data: 'roleList'
    }
  ]
}
