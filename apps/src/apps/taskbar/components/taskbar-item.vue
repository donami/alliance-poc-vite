<script lang="ts" setup>
const props = defineProps<{
  appName: string;
}>();
</script>

<template>
  <div class="wrapper">{{ props.appName }}</div>
</template>

<style scoped>
.wrapper {
  margin-bottom: 1rem;
}
</style>
