<script lang="ts" setup>
import { AppContext, ViewProps } from 'framework';
import { inject } from 'vue';

console.log('Hello from Knowledge!');
const { ctx } = defineProps<{ ctx: AppContext }>();

const viewProps = inject<ViewProps>('viewProps');

console.log('viewProps', viewProps);
</script>

<template>
  <div>Hello from Knowledge! {{ viewProps }}</div>
</template>
