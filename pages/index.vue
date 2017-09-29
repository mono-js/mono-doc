<template>
  <div>
    <a href="" id="nav-button" @click.prevent="menuOpen = !menuOpen">
      <span>
        <i class="fa fa-bars fa-lg"></i>
      </span>
    </a>
    <div class="toc-wrapper" :class="{ open: menuOpen }" @click.prevent="menuOpen = false">
      <img src="/logo.png" alt="Logo">
      <div class="lang-selector">
        <a href="" @click.prevent="$store.dispatch('setLanguage', 'shell')" :class="{ active: $store.state.language === 'shell' }">shell</a>
        <a href="" @click.prevent="$store.dispatch('setLanguage', 'javascript')" :class="{ active: $store.state.language === 'javascript' }">javascript</a>
      </div>
      <div class="search">
        <input type="text" placeholder="Search" v-model="search" @change="updateScroll" autofocus>
      </div>
      <ul id="toc" class="toc-list-h1">
        <li v-for="(routes, name, index) in processedRoutes" :key="name">
          <a :href="`#${name}`" class="toc-h1 toc-link" :class="{ active: $store.state.scroll === name }" @click="$store.dispatch('updateScroll', name)">{{name.replace('-', ' / ')}}</a>
          <ul class="toc-list-h2" v-show="$store.state.scroll === name || routes.findIndex((route) => route.key === $store.state.scroll) >= 0">
            <li v-for="route in routes" :key="route.key">
              <a :href="`#${route.key}`" class="toc-h2 toc-link" :class="{ active: $store.state.scroll === route.key }" @click="$store.dispatch('updateScroll', route.key)">
                <span v-if="route.name">{{route.name}}</span>
                <span v-else class="text-capitalize">{{route.method}} {{route.resources.join(' ')}}</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="toc-footer">
        <li>
          <a href="https://github.com/terrajs/mono-doc">Documentation Powered by Mono Doc</a>
        </li>
      </ul>
    </div>
    <div class="page-wrapper">
      <div class="dark-box"></div>
      <div class="content">
        <routes :processed-routes="processedRoutes"></routes>
      </div>
      <div class="dark-box">
        <div class="lang-selector">
          <a href="" @click.prevent="$store.dispatch('setLanguage', 'shell')" :class="{ active: $store.state.language === 'shell' }">shell</a>
          <a href="" @click.prevent="$store.dispatch('setLanguage', 'javascript')" :class="{ active: $store.state.language === 'javascript' }">javascript</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import routes from '../components/routes'

export default {
  data() {
    return {
      search: '',
      menuOpen: false
    }
  },
  computed: {
    processedRoutes() {
      const routes = _.map(this.$store.state.routes, (route) => {
        const paths = route.path.split('/').slice(1)
        const bodyParams = route.validation && route.validation.body ? _(route.validation.body.properties).mapValues((value, key) => {
          const required = route.validation.body.required ? !!route.validation.body.required.indexOf(key) !== -1 : false
          return _.merge({}, value, { key, required })
        }).values().value() : []
        const queryParams = route.validation && route.validation.query ? _(route.validation.query.properties).mapValues((value, key) => {
          const required = route.validation.query.required ? !!route.validation.query.required.indexOf(key) !== -1 : false
          return _.merge({}, value, { key, required })
        }).values().value() : []
        const urlParams = paths.filter((path) => path[0] === ':')
        const resources = paths.filter((path) => path[0] !== ':')

        return {
          key: `${route.method.toLowerCase()}-${paths.join('-').replace(/:/g, '')}`,
          path: route.path,
          paths,
          method: route.method.toUpperCase(),
          session: route.session,
          bodyParams,
          queryParams,
          urlParams,
          resources,
          ..._.pick(route.documentation, 'name', 'description')
        }
      })

      const filteredRoutes = _.filter(routes, (route) => {
        if (!this.search.length) return route

        const search = this.search.toLowerCase().split(' ')
        const names = route.name ? route.name.split(' ') : route.paths

        return _.intersection(names, search).length
      })

      return _.groupBy(filteredRoutes && filteredRoutes.length ? filteredRoutes : routes, (route) => _.take(route.resources, 2).join('-'))
    }
  },
  methods: {
    updateScroll() {
      this.store.dispatch('updateScroll', '')
    }
  },
  components: {
    routes
  }
}
</script>
