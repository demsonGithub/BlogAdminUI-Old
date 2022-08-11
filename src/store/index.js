import { createStore } from 'vuex'
import getters from './getters'

import settings from './modules/settings'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import tagsView from './modules/tagsView'

export default createStore({
  modules: {
    settings,
    app,
    user,
    permission,
    tagsView
  },
  getters
})
