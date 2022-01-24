<script lang="ts" setup>
import TaskbarItem from './components/taskbar-item.vue';
console.log('Hello from Taskbar!');

// TODO: not hardcoded..
const apps = [
  {
    displayName: 'Knowledge',
  },
  {
    displayName: 'Widget Studio',
  },
];
</script>

<template>
  <div>
    <TaskbarItem
      v-for="app in apps"
      :app-name="app.displayName"
      :key="app.displayName"
    />
  </div>
</template>
