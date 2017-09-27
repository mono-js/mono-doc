<template>
  <div>
    <pre>{{processedRoutes}}</pre>
    <section v-for="(routes, name) in processedRoutes" :key="name">
      <h1 :id="`#${name}`">{{name}}</h1>
      <route v-for="route in routes" :key="route.path" :processed-route="route"></route>
    </section>
  </div>
</template>

<script>
import route from './route'

export default {
  props: ['processedRoutes'],
  components: {
    route
  }
}
</script>
