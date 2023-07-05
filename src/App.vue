<script setup lang="ts">
import type { Ref } from 'vue';
import { ref } from 'vue';
import newTodo from './components/new-todo.vue';
import todoItem from './components/todo-item.vue';
import type { ApiError } from './models/error';
import type { Todo } from './models/todo';

const todos: Ref<Todo[]> = ref([]);
const loading: Ref<boolean> = ref(false);
const error: Ref<ApiError | null> = ref(null);
const env = import.meta.env;

async function getData() {
  loading.value = true;
  const res = await fetch(env.VITE_API_URL);
  loading.value = false;
  if (!res.ok) {
    error.value = {
      statusText: res.statusText,
      status: res.status
    };
    return;
  }
  const data = await res.json();
  todos.value = data as Todo[];
}

async function patchData(todo: Todo) {
  const res = await fetch(`${env.VITE_API_URL}?id=${todo.id}`, {
    method: 'PATCH',
    body: JSON.stringify(todo)
  });
  if (!res.ok) {
    // todo.updateStatus = { status: res.status, statusText: res.statusText };
    return;
  }
  const data = await res.json();
  // todo.updateStatus = { status: data.status, statusText: data.statusText };
}

async function deleteData(todo: Todo) {
  const res = await fetch(env.VITE_API_URL, {
    method: 'DELETE',
    body: JSON.stringify(todo)
  });
  if (!res.ok) {
    // todo.updateStatus = { status: res.status, statusText: res.statusText };
    return;
  }
  const data = await res.json();
  // todo.updateStatus = { status: data.status, statusText: data.statusText };

  todos.value = todos.value.filter((a) => a.id !== todo.id);
}

async function postData(todo: Todo) {
  const res = await fetch(env.VITE_API_URL, {
    method: 'POST',
    body: JSON.stringify(todo)
  });
  if (!res.ok) {
    // todo.updateStatus = { status: res.status, statusText: res.statusText };
    return;
  }
  const data = await res.json();
  todos.value = [...todos.value, todo];
}

getData();
</script>
<script setup></script>

<template>
  <div class="container">
    <h1>Todo list</h1>
    <template v-if="loading">
      <img src="/loading.svg" />
    </template>
    <template v-if="todos.length > 0">
      <newTodo @newTodo="postData"></newTodo>
      <todoItem
        v-for="todo in todos"
        :key="todo.id"
        v-bind="todo"
        @update="patchData"
        @delete="deleteData"
      />
    </template>
  </div>
</template>

<style scoped>
:global(#app) {
  display: flex;
  justify-content: center;
}
.container {
  width: 360px;
  max-width: 360px;
  display: flex;
  flex-direction: column;
}
</style>
