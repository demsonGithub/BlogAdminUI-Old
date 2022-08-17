import request from '@/utils/request'

// 获取树形菜单列表
export function getMenuPermissionListApi(params) {
  return request({
    method: 'get',
    url: '/api/menuPermission/GetMenuPermissionList',
    params: params
  })
}

// 获取目录和菜单树形列表
export function getMenuListApi(params) {
  return request({
    method: 'get',
    url: '/api/menuPermission/getMenuList',
    params
  })
}

// 增加一个菜单或按钮
export function addMenuPermissionApi(params) {
  return request({
    method: 'post',
    url: '/api/menuPermission/AddMenuPermission',
    data: params
  })
}

// 删除一个菜单或按钮
export function deleteMenuPermissionApi(params) {
  return request({
    method: 'delete',
    url: '/api/menuPermission/DeleteMenuPermissionById',
    data: params
  })
}

// 修改一个菜单或按钮
export function updateMenuPermissionApi(params) {
  return request({
    method: 'post',
    url: '/api/menuPermission/UpdateMenuPermission',
    data: params
  })
}
