<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { reactive, toRefs } from 'vue';
import newTodo from './components/new-todo.vue';
import todoItem from './components/todo-item.vue';
import { useStatusStore } from './stores/status.store';
import { useTodosStore } from './stores/todo.store';

const todoState = useTodosStore();
const { state } = storeToRefs(todoState);
const { todos, isLoading } = toRefs(state.value);
todoState.fetchTodos();

const status = reactive({
  show: false,
  message: '',
  color: ''
});
const statusState = useStatusStore();
statusState.$subscribe((mutation, state) => {
  status.show = true;
  status.color = state.status !== 200 ? 'error' : 'success';
  status.message = state.message;
});
</script>

<template>
  <div class="container">
    <h1>Todo list</h1>
    <newTodo></newTodo>
    <template v-if="isLoading">
      <v-progress-circular color="primary" indeterminate class="mx-auto"></v-progress-circular>
    </template>
    <template v-if="!isLoading && todos.length > 0">
      <todoItem v-for="todo in todos" :key="todo.id" v-bind="todo" />
    </template>
  </div>
  <v-snackbar :timeout="2000" :color="status.color" v-model="status.show" variant="tonal">
    {{ status.message }}
    <template v-slot:actions>
      <v-btn icon="close" @click="status.show = false"></v-btn>
    </template>
  </v-snackbar>
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
