<template>
  <div>
    <pre class="highlight shell tab-shell" v-if="language === 'shell'">
      <code>
        <span>curl "{{`${url}${route.path}`}}"</span>
      </code>
    </pre>
  </div>
</template>

<script>
export default {
  props: ['route', 'language'],
  data() {
    return {
      url: process.env.url
    }
  }
}
</script>
