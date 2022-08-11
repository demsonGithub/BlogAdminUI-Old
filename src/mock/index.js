// 引入Mock
import Mock from 'mockjs'
// 添加需要模拟的接口
import userApi from './services/user'
import menuApi from './services/menu'

console.log('%c mock mounting...', 'color:green')

// 设置全局延时
Mock.setup({
  timeout: '200- 800'
})
// 具体的模拟数据
Mock.mock(/\/user\/login/, 'post', userApi.login)
Mock.mock(/\/user\/getInfo/, 'post', userApi.getInfo)
Mock.mock(/\/menu\/getMenuByRole/, 'post', menuApi.getMenuByRole)

console.log('%c mock mounted', 'color:green')

export default Mock
