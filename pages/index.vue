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
        <a href="" @click.prevent="language = 'shell'" :class="{ active: language === 'shell' }">shell</a>
        <a href="" @click.prevent="language = 'javascript'" :class="{ active: language === 'javascript' }">javascript</a>
      </div>
      <div class="search">
        <input type="text" placeholder="Search" autofocus>
      </div>
      <div id="toc" class="toc-list-h1">
        <li v-for="(routes, name) in processedRoutes" :key="name">
          <a :href="`#${name}`" class="toc-h1 toc-link">{{name}}</a>
          <ul class="toc-list-h2">
            <li v-for="route in routes" :key="route.path">
              <a :href="`#${route.resources.join('-')}`" class="toc-h2 toc-link">
                <span v-if="route.name">{{route.name}}</span>
                <span v-else class="text-capitalize">{{route.method}} {{route.resources.join(' ')}}</span>
              </a>
            </li>
          </ul>
        </li>
      </div>
      <ul class="toc-footer">
        <li>
          <a href="https://github.com/terrajs/mono-doc">Documentation Powered by Mono Doc</a>
        </li>
      </ul>
    </div>
    <div class="page-wrapper">
      <div class="dark-box"></div>
      <div class="content">
        <routes :processed-routes="processedRoutes" :language="language"></routes>
      </div>
      <div class="dark-box">
        <div class="lang-selector">
          <a href="" @click.prevent="language = 'shell'" :class="{ active: language === 'shell' }">shell</a>
          <!-- <a href="" @click.prevent="language = 'javascript'" :class="{ active: language === 'javascript' }">javascript</a> -->
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
      language: 'shell',
      menuOpen: false
    }
  },
  async asyncData({ app, env, error }) {
    let routes

    try {
      routes = await app.$axios.$get('/routes')
    } catch (e) {
      error({ statusCode: 404, message: 'The url you provided is not a Mono API!' })
    }

    return {
      url: env.url,
      routes
    }
  },
  computed: {
    processedRoutes() {
      return _.groupBy(_.map(this.routes, (route) => {
        const paths = route.path.split('/').slice(1)
        const bodyParams = route.validate && route.validate.body ? _(route.validate.body.properties).mapValues((value, key) => {
          const required = !!route.validate.body.required.indexOf(key) !== -1
          return _.merge({}, value, { key, required })
        }).values().value() : []
        const queryParams = route.validate && route.validate.query ? _(route.validate.query.properties).mapValues((value, key) => {
          const required = !!route.validate.query.required.indexOf(key) !== -1
          return _.merge({}, value, { key, required })
        }).values().value() : []
        const urlParams = paths.filter((path) => path[0] === ':')
        const resources = paths.filter((path) => path[0] !== ':')

        return {
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
      }), (route) => _.take(route.resources, 2).join(' / '))
    }
  },
  components: {
    routes
  }
}
</script>
