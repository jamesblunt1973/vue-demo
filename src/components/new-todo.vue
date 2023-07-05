<script setup lang="ts">
import type { Todo } from '@/models/todo';
import { DateTime } from 'luxon';
import { computed, reactive, toRaw } from 'vue';

const todo: Todo = reactive({
  description: '',
  duoDate: DateTime.now().toJSDate(),
  id: crypto.randomUUID(),
  isDone: false,
  title: ''
});
const date = computed({
  get() {
    return DateTime.fromJSDate(todo.duoDate).toISODate() as string;
  },
  set(newValue) {
    todo.duoDate = DateTime.fromISO(newValue).toJSDate();
  }
});

const emit = defineEmits<{
  (e: 'newTodo', val: Todo): void;
}>();

function submit() {
  emit('newTodo', { ...toRaw(todo) });
  reset();
}

function reset() {
  todo.description = '';
  todo.title = '';
  todo.id = crypto.randomUUID();
  todo.duoDate = DateTime.now().toJSDate();
}
</script>

<template>
  <v-card class="mb-4">
    <v-card-item>
      <v-card-title>New Todo Item</v-card-title>
    </v-card-item>
    <v-card-text>
      <v-text-field label="Title" v-model="todo.title"></v-text-field>
      <v-textarea
        clearable
        clear-icon="mdi-close-circle"
        label="Description"
        rows="4"
        v-model="todo.description"
      ></v-textarea>
      <v-text-field label="Due date" v-model="date"></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="submit">Send</v-btn>
      <v-btn color="error" @click="reset">Reset</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
