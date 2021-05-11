<template>
  <div class="alert" v-if="alert" :class="alert.type">
    <p>{{ alert.text }}</p>
  </div>
</template>

<script>
export default {
  props: ['alert']
}
</script>

<style scoped>

</style>