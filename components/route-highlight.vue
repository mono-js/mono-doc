<template>
  <div>
    <pre v-highlightjs v-show="$store.state.language === 'shell'"><code class="shell">curl -X{{route.method}} "{{url}}{{route.path}}"<span v-if="route.session"> \<br>-H "Authorization: ..."</span></code></pre>
    <pre v-highlightjs v-show="$store.state.language === 'javascript'"><code class="javascript hljs">const axios = require('axios')<br><br>await axios.{{route.method.toLowerCase()}}('{{route.path}}')</code></pre>
  </div>
</template>

<script>
export default {
  props: ['route'],
  data() {
    return {
      url: process.env.url
    }
  }
}
</script>

<style scoped>
code {
  color: white;
}
</style>
