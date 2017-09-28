import Vue from 'vue'
import Scrollspy from '~/directives/scrollspy'

Vue.use(Scrollspy)

export default ({ store, route }) => {
  window.onNuxtReady(() => store.dispatch('updateScroll', route.hash.replace('#', '')))
}
