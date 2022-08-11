import defaultSettings from '@/utils/website'
const {
  sidebarLogo,
  tagsView,
  fixedHeader,
  showFooter,
  footerTxt,
  caseNumber
} = defaultSettings

export default {
  namespaced: true,
  state: () => ({
    sidebarLogo: sidebarLogo,
    fixedHeader: fixedHeader,
    tagsView: tagsView,
    showFooter: showFooter,
    footerTxt: footerTxt,
    caseNumber: caseNumber
  }),
  mutations: {
    CHANGE_SETTING: (state, { key, value }) => {
      if (state.hasOwnProperty(key)) {
        state[key] = value
      }
    }
  },
  actions: {
    changeSetting({ commit }, data) {
      commit('CHANGE_SETTING', data)
    }
  }
}
