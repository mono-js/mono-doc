<template>
  <div>
    <h3>Query Parameters</h3>
    <table>
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Type</th>
          <th>Required</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="param in params" :key="param.key">
          <td>{{param.key}}</td>
          <td>{{param.type}}</td>
          <td>{{param.required}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['params']
}
</script>
