<template>
  <div>
    <section v-for="(routes, name) in processedRoutes" :key="name" :id="`#${name.replace(' / ', '-')}`">
      <h1>{{name}}</h1>
      <route v-for="route in routes" :key="route.path" :processed-route="route" :language="language"></route>
    </section>
  </div>
</template>

<script>
import route from './route'

export default {
  props: ['processedRoutes', 'language'],
  components: {
    route
  }
}
</script>
