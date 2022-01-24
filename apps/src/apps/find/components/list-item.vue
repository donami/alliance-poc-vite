<script lang="ts" setup>
const { item } = defineProps<{ item: any }>();
const emits = defineEmits(['open', 'remove']);

const onOpen = (ref: string, objectType: string) => {
  emits('open', { ref, objectType });
};

const onRemove = (ref: string, objectType: string) => {
  emits('remove', { ref, objectType });
};
</script>

<template>
  <div class="list-item">
    <div class="label">
      {{ item.label }}
    </div>
    <div class="actions">
      <button @click="onOpen(item.ref, item.objectType)">Open</button>
      <button @click="onRemove(item.ref, item.objectType)">Remove</button>
    </div>
  </div>
</template>

<style scoped>
.list-item {
  display: flex;
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
</style>
