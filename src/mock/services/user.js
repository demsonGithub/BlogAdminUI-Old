const userCollection = {
  admin: {
    code: 0,
    roles: ['admin'],
    token: 'admin',
    introduction: '超级管理员',
    avatar:
      'https://raw.githubusercontent.com/mgbq/nx-admin/master/src/assets/img/home/logo.png',
    name: 'Super Admin'
  },
  common: {
    code: 0,
    roles: ['common'],
    token: 'common',
    introduction: '普通用户',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Common User'
  }
}

export default {
  login: config => {
    const { username } = JSON.parse(config.body)
    if (!userCollection[username]) {
      return { code: 0, message: '用户不存在' }
    } else {
      return { code: 1, data: { token: userCollection[username].token } }
    }
  },
  getInfo: config => {
    const { token } = JSON.parse(config.body)

    if (!userCollection[token]) {
      return { code: 0, message: '用户不存在' }
    } else {
      return {
        code: 1,
        data: {
          roles: userCollection[token].roles,
          introduction: userCollection[token].introduction,
          avatar: userCollection[token].avatar,
          name: userCollection[token].name
        }
      }
    }
  },
  logout: () => {
    return {
      code: 0,
      Message: 'success'
    }
  }
}
