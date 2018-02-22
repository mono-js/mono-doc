export const state = () => ({
  language: 'javascript',
  scroll: '',
  routes: []
})

export const mutations = {
  SET_LANGUAGE: (state, language) => {
    state.language = language
  },
  SET_SCROLL: (state, scroll) => {
    state.scroll = scroll
  },
  UPDATE_SCROLL: (state, scroll) => {
    state.scroll = scroll
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}

export const actions = {
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  setScroll({ commit }, scroll) {
    commit('SET_SCROLL', scroll)
  },
  updateScroll({ commit }, scroll) {
    commit('UPDATE_SCROLL', scroll)
  },
  async nuxtServerInit({ commit }, { req }) {
    commit('SET_ROUTES', req.routes || [])
  }
}
