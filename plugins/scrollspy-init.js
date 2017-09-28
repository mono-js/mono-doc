export default ({ store, route }) => {
  window.onNuxtReady(() => store.dispatch('updateScroll', route.hash.replace('#', '')))
}
