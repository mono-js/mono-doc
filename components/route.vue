<template>
  <div :id="processedRoute.key">
    <h2>
      <span v-if="processedRoute.name">{{processedRoute.name}}</span>
      <span v-else class="text-capitalize">{{processedRoute.method}} {{processedRoute.resources.join(' ')}}</span>
      <span class="caption" v-if="!processedRoute.name && env !== 'production'">
        <i>
          (Override this with
          <code>documentation.name</code> key in your route definition)
        </i>
      </span>
    </h2>

    <route-highlight :route="processedRoute"></route-highlight>

    <p v-if="processedRoute.description">{{processedRoute.description}}</p>
    <p v-else-if="env !== 'production'">
      <i>
        Please provide
        <code>documentation.description</code> key in your route definition
      </i>
    </p>

    <route-http-request :route="processedRoute"></route-http-request>

    <route-url-params :params="processedRoute.urlParams" v-if="processedRoute.urlParams && processedRoute.urlParams.length"></route-url-params>
    <route-body-params :params="processedRoute.bodyParams" v-if="processedRoute.bodyParams && processedRoute.bodyParams.length"></route-body-params>
    <route-query-params :params="processedRoute.queryParams" v-if="processedRoute.queryParams && processedRoute.queryParams.length"></route-query-params>

    <route-roles :roles="processedRoute.roles" v-if="processedRoute.roles && processedRoute.roles.length"></route-roles>

    <aside class="notice" v-if="processedRoute.session">
      <i class="fa fa-info-circle fa-lg"></i>
      You need to be authenticated to perform this request!
    </aside>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import routeHttpRequest from './route-http-request'
import routeBodyParams from './route-body-params'
import routeQueryParams from './route-query-params'
import routeUrlParams from './route-url-params'
import routeHighlight from './route-highlight'
import routeRoles from './route-roles'

export default {
  props: ['processedRoute'],
  computed: {
    ...mapState(['env'])
  },
  components: {
    routeHttpRequest,
    routeBodyParams,
    routeQueryParams,
    routeUrlParams,
    routeHighlight,
    routeRoles
  }
}
</script>
