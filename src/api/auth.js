import request from '@/utils/request'

// 获取登录用户信息
export function getInfoApi(params) {
  return request({
    method: 'get',
    url: '/api/user/GetUserInfoByToken',
    params
  })
}

// 根据角色获取菜单权限
export function getMenuByRoleApi(params) {
  return request({
    method: 'post',
    url: '/api/Auth/GetMenuListByRoleName',
    data: params
  })
}
