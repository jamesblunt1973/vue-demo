<script setup lang="ts">
import { ref, toRef, type Ref } from 'vue';
import type { Todo } from '../models/todo';
import { useTodosStore } from '../stores/todo.store';

const todoState = useTodosStore();

const props = defineProps<Todo>();
const isDone: Ref<boolean> = toRef(props.isDone);
const showText: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(false);

async function update(): Promise<void> {
  loading.value = true;
  await todoState.updateTodo({ ...props, isDone: isDone.value });
  loading.value = false;
}

async function remove(): Promise<void> {
  loading.value = true;
  await todoState.deleteTodo({ ...props });
  loading.value = false;
}
</script>

<template>
  <v-card class="mb-4" :loading="loading">
    <v-card-item>
      <v-card-title>
        <div class="indicator bg-red-accent-3" :class="{ 'bg-green-accent-3': isDone }"></div>
        <p class="title">{{ title }}</p>
        <div class="commands">
          <v-checkbox color="primary" v-model="isDone" @change="update" hide-details>
            <v-tooltip
              activator="parent"
              :text="isDone ? 'Mark as pending' : 'Mark as done'"
              location="bottom"
            ></v-tooltip>
          </v-checkbox>
          <v-btn variant="text" icon size="x-small" color="error" @click="remove">
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
    <v-divider></v-divider>
    <v-card-text class="pt-4" v-if="showText">{{ description }}</v-card-text>
  </v-card>
</template>

<style scoped lang="scss">
.v-card {
  .v-card-title {
    user-select: none;
    display: flex;
    align-items: center;

    .indicator {
      width: 4px;
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
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
