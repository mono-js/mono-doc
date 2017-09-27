<template>
  <div>
    <h3>URL Parameters</h3>
    <table>
      <thead>
        <tr>
          <th>Parameter</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="param in params" :key="param">
          <td>{{param.slice(1)}}</td>
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
