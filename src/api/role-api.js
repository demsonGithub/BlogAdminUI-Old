import request from '@/utils/request'

export function getRoleListApi(params) {
  return request({
    method: 'get',
    url: '/api/Role/GetRoleList',
    params
  })
}
