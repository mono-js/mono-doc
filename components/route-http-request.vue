<template>
  <div>
    <h3>HTTP Request</h3>
    <p>
      <code>{{route.method}} {{route.path}}</code>
    </p>
  </div>
</template>

<script>
export default {
  props: ['route']
}
</script>
