import request from '@/utils/request'

// 根据角色获取菜单权限
export function getMenuByRoleApi(params) {
  return request({
    method: 'post',
    url: '/menu/getMenuByRole',
    data: { roles: params }
  })
}
