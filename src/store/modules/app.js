import websiteInfo from '@/utils/website'
import Cookies from 'js-cookie'

export default {
  namespaced: true,
  state: {
    website: websiteInfo,
    device: 'desktop',
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    }
  },
  mutations: {
    Toggle_SideBar: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('Toggle_SideBar')
    }
  }
}
