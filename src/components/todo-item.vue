<script setup lang="ts">
import { toRef, type Ref } from 'vue';
import type { Todo } from '../models/todo';

const props = defineProps<Todo>();
defineEmits<{
  (e: 'update', val: Todo): void;
  (e: 'delete', val: Todo): void;
}>();
const isDone: Ref<boolean> = toRef(props.isDone);
</script>

<template>
  <div class="todo-item">
    <div class="indicator" :class="{ done: isDone }"></div>
    <p class="title">{{ title }}</p>
    <div class="commands">
      <input type="checkbox" v-model="isDone" @change="$emit('update', { ...props, isDone })" />
      <button class="icon-button" @click="$emit('delete', props)">
        <img src="/delete-outline.svg" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.todo-item {
  user-select: none;
  display: flex;
  align-items: center;
  height: 35px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  padding: 10px;
  position: relative;

  .indicator {
    width: 4px;
    position: absolute;
    background-color: #f77;
    height: 100%;
    left: 0;
    border-radius: 4px 0 0 4px;

    &.done {
      background-color: #7f7;
    }
  }

  .title {
    font-weight: bold;
  }

  .commands {
    margin-left: auto;

    .icon-button {
      border: 0;
      background-color: transparent;
      cursor: pointer;
    }
  }
}
</style>
