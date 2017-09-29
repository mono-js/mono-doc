<template>
  <div>
    <h3>Roles</h3>
    <p>
      <span class="tag tag-primary" v-for="role in roles" :key="role">{{role}}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ['roles']
}
</script>
