import request from '@/utils/request'

// 登录
export function loginApi(params) {
  return request({
    method: 'get',
    url: '/api/Login/GetJwtToken',
    params: params
  })
}
