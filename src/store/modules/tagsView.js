export default {
  namespaced: true,
  state: {
    tagsList: [],
    cachedViews: []
  },
  mutations: {
    delTagsItem(state, data) {
      const temp = state.tagsList[data.index].name
      state.tagsList.splice(data.index, 1)

      if (!state.cachedViews.includes(temp)) return

      for (const i of state.cachedViews) {
        if (i === temp) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },
    setTagsItem(state, data) {
      state.tagsList.push(data)
      if (state.cachedViews.includes(data.name)) return
      if (!data.noCache) {
        state.cachedViews.push(data.name)
      }
    },
    clearTags(state) {
      state.tagsList.length = 0
      state.cachedViews.length = 0
    },
    closeTagsOther(state, data) {
      state.tagsList = data

      state.cachedViews.length = 0
      state.cachedViews.push(data[0].name)
    }
  },
  actions: {
    setTag({ commit }, parameter) {
      commit('setTagsItem', parameter)
    },
    delTag({ commit }, parameter) {
      commit('delTagsItem', parameter)
    },
    clearAll({ commit }) {
      commit('clearTags')
    },
    closeOther({ commit }, parameter) {
      commit('closeTagsOther', parameter)
    }
  }
}
