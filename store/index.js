export const state = () => ({
  language: 'javascript',
  scroll: '',
  url: 'http://localhost:8000',
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
  SET_URL: (state, url) => {
    state.url = url
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
  // Action called by nuxt.js
  async nuxtServerInit({ state, commit }, { app, error }) {
    const monoUrl = process.env.MONO_URL
    if (monoUrl && /https?:\/\//.test(monoUrl)) commit('SET_URL', monoUrl)

    try {
      const routes = await app.$axios.$get(`${state.url}/_routes`)
      commit('SET_ROUTES', routes)
    } catch (e) {
      error({ statusCode: 404, message: 'The url you provided is not a Mono API!' })
    }
  }
}
