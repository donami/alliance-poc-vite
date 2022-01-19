<script lang="ts" setup>
import { AppContext } from 'framework';

console.log('Hello from Find!');
const { ctx } = defineProps<{ ctx: AppContext }>();

const open = (itemId: number, objectType: string) => {
  ctx.dispatch('openObjects', { ref: itemId, objectType });
};
</script>

<template>
  <div>
    Hello from Find!

    <ul>
      <li>My Widget<button @click="open(1, 'widget')">Open</button></li>
      <li>My Guide<button @click="open(2, 'guide')">Open</button></li>
    </ul>
  </div>
</template>
