export const state = () => ({
  language: 'javascript',
  scroll: '',
  env: 'development',
  version: '',
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
  SET_ENV: (state, env) => {
    state.env = env
  },
  SET_VERSION: (state, version) => {
    state.version = version
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
  nuxtServerInit({ commit }, context) {
    const mono = context.req ? context.req.mono : context.payload.mono

    commit('SET_ENV', mono.env)
    commit('SET_VERSION', mono.version)
    commit('SET_ROUTES', mono.routes)
  }
}
