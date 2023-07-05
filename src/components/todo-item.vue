<script setup lang="ts">
import { ref, toRef, type Ref } from 'vue';
import type { Todo } from '../models/todo';

const props = defineProps<Todo>();
defineEmits<{
  (e: 'update', val: Todo): void;
  (e: 'delete', val: Todo): void;
}>();
const isDone: Ref<boolean> = toRef(props.isDone);
const showText: Ref<boolean> = ref(false);
</script>

<template>
  <v-card class="mb-4">
    <v-card-item>
      <v-card-title>
        <div class="indicator" :class="{ done: isDone }"></div>
        <p class="title">{{ title }}</p>
        <div class="commands">
          <v-checkbox
            color="primary"
            v-model="isDone"
            @change="$emit('update', { ...props, isDone })"
            hide-details
          >
            <v-tooltip
              activator="parent"
              :text="isDone ? 'Mark as pending' : 'Mark as done'"
              location="bottom"
            ></v-tooltip>
          </v-checkbox>
          <v-btn variant="text" icon size="x-small" color="error" @click="$emit('delete', props)">
            <v-tooltip activator="parent" text="Delete todo item" location="bottom"></v-tooltip>
            <v-icon icon="mdi-delete-outline"></v-icon>
          </v-btn>
          <v-btn variant="text" icon size="x-small" color="secondary" @click="showText = !showText">
            <v-tooltip activator="parent" text="Show description" location="bottom"></v-tooltip>
            <v-icon icon="mdi-dots-vertical"></v-icon>
          </v-btn>
        </div>
      </v-card-title>
    </v-card-item>

    <v-card-text class="pt-4" v-if="showText">{{ description }}</v-card-text>
  </v-card>
</template>

<style scoped>
.v-card {
  .v-card-title {
    user-select: none;
    display: flex;
    align-items: center;

    .indicator {
      width: 4px;
      position: absolute;
      background-color: #f77;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: 4px 0 0 4px;

      &.done {
        background-color: #7f7;
      }
    }

    .title {
      max-width: 200px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-size: 1rem;
      font-weight: normal;
      letter-spacing: 0;
    }

    .commands {
      margin-left: auto;
      display: flex;
      align-items: center;
    }
  }
}
</style>
