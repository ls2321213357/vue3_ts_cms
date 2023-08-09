export default {
  pageName: 'menu',
  title: '菜单列表',
  dataList: [
    { type: 'normal', label: '菜单名称', prop: 'name', width: '180' },
    { type: 'normal', label: '级别', prop: 'type', width: '80' },
    { type: 'normal', label: '菜单地址', prop: 'url', width: '180' },
    { type: 'normal', label: '菜单图标', prop: 'icon', width: '180' },
    { type: 'normal', label: '排序', prop: 'sort', width: '180' },
    { type: 'normal', label: '权限', prop: 'permission', width: '180' },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '修改时间', prop: 'updateAt' },
    { type: 'handler', label: '操作' }
  ]
}
