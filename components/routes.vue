<template>
  <div v-scroll-spy>
    <section v-for="(routes, name) in processedRoutes" :key="name" :id="name">
      <h1>{{name.replace('-', ' / ')}}</h1>
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
