<script lang="ts" setup>
import { AppContext } from 'framework';

console.log('Hello from Knowledge!');
const { ctx } = defineProps<{ ctx: AppContext }>();
</script>

<template>
  <div>Hello from Knowledge!</div>
</template>
