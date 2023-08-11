export default {
  pageName: 'menu',
  title: '菜单列表',
  dataList: [
    //如果使用el-table需要使用展开行的话就不能设置type类型了
    { label: '菜单名称', prop: 'name', width: '180' },
    { label: '级别', prop: 'type', width: '80' },
    { label: '菜单地址', prop: 'url', width: '240' },
    { label: '菜单图标', prop: 'icon', width: '180' },
    { label: '排序', prop: 'sort', width: '180' },
    { label: '权限', prop: 'permission', width: '260' },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '修改时间', prop: 'updateAt' },
    { type: 'handler', label: '操作' }
  ],
  childrenTree: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  }
}
