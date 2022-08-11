import request from '@/utils/request'

// 登录
export function loginApi(params) {
  return request({
    method: 'get',
    url: '/api/Login/GetJwtToken',
    params: params
  })
}

// 获取登录用户信息
export function getInfoApi(params) {
  return request({
    method: 'post',
    url: '/user/getInfo',
    data: { token: params }
  })
}
