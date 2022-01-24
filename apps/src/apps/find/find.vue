<script lang="ts" setup>
import { AppContext, ViewProps, ObjectType } from 'framework';
import { computed, inject, onMounted, ref, watch } from 'vue';
import ListItem from './components/list-item.vue';

console.log('Hello from Find!');
const { ctx } = defineProps<{ ctx: AppContext }>();

// const viewProps = inject<ViewProps>('viewProps');

const selectedObjectType = ref('guide');

const filteredItems = ref<ObjectType[]>([]);

onMounted(() => {
  getObjectsByType(selectedObjectType.value);
});

watch(selectedObjectType, (type) => {
  getObjectsByType(type);
});

const onChangeObjectType = (objectType: string) => {
  selectedObjectType.value = objectType;
};

const getObjectsByType = (type: string) => {
  ctx.objects
    .query({ type })
    .request()
    .then((response) => {
      filteredItems.value = response;
    });
};

const open = (payload: { ref: string; objectType: string }) => {
  const { ref, objectType } = payload;
  ctx.dispatch('openObjects', { ref: ref, objectType });
};

const remove = (payload: { ref: string; objectType: string }) => {
  const { ref, objectType } = payload;
  ctx.dispatch('removeObjects', { ref: ref, objectType });
};
</script>

<template>
  <div>
    Hello from Find!

    <div>
      <button @click="onChangeObjectType('widget')">Widgets</button>
      <button @click="onChangeObjectType('guide')">Guides</button>
    </div>

    <div v-for="item in filteredItems">
      <ListItem :key="item.ref" :item="item" @open="open" @remove="remove" />
    </div>
  </div>
</template>
