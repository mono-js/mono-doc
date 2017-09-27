<template>
  <div>
    <div class="toc-wrapper">
      <img src="/logo.png" class="logo" alt="Logo">
      <div class="lang-selector">
        <a href="#" data-language-name="shell">shell</a>
        <a href="#" data-language-name="javascript">javascript</a>
      </div>
      <div class="search">
        <input type="text" class="search" id="input-search" placeholder="Search">
      </div>
      <ul class="search-results"></ul>
      <div id="toc" class="toc-list-h1">
        <li v-for="(routes, name) in processedRoutes" :key="name">
          <a :href="`#${name}`" class="toc-h1 toc-link">{{name}}</a>
          <ul class="toc-list-h2">
            <li>
              <a href="#get-all-kittens" class="toc-h2 toc-link" data-title="Kittens">Get All Kittens</a>
            </li>
          </ul>
        </li>
      </div>
    </div>
    <div class="page-wrapper">
      <div class="dark-box"></div>
      <div class="content">
        <routes :processed-routes="processedRoutes"></routes>
      </div>
      <div class="dark-box">
        <div class="lang-selector">
          <a href="#" data-language-name="shell">shell</a>
          <a href="#" data-language-name="javascript" class="active">javascript</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { groupBy, map } from 'lodash'
import routes from '../components/routes'

export default {
  async asyncData({ app, env, error }) {
    let routes

    try {
      routes = await app.$axios.$get('/routes')
    } catch (e) {
      error({ statusCode: 404, message: 'The url you provided is not a Mono API or you didn\'t exposed the routes' })
    }

    return {
      url: env.url,
      routes
    }
  },
  computed: {
    processedRoutes() {
      return groupBy(map(this.routes, (route) => {
        const paths = route.path.split('/').slice(1)

        return {
          path: route.path,
          paths,
          method: route.method.toUpperCase(),
          urlParameters: paths.filter((path) => path[0] === ':'),
          queryParameters: []
        }
      }), (route) => route.paths[0])
    }
  },
  components: {
    routes
  }
}
</script>
