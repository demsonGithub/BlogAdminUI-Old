import request from '@/utils/request'

// 获取树形菜单列表
export function getMenuPermissionListApi(params) {
  return request({
    method: 'get',
    url: '/api/menuPermission/GetMenuPermissionList',
    params: params
  })
}
