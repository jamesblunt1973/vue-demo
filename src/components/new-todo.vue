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
  <v-expansion-panels class="mb-4">
    <v-expansion-panel>
      <v-expansion-panel-title>
        New Todo Item
        <template v-slot:actions="{ expanded }">
          <v-icon
            :color="!expanded ? 'green' : 'blue'"
            :icon="expanded ? 'mdi-pencil' : 'mdi-plus-circle'"
          ></v-icon>
        </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text class="pt-4">
        <v-text-field label="Title" v-model="todo.title"></v-text-field>
        <v-textarea
          clearable
          clear-icon="mdi-close-circle"
          label="Description"
          rows="4"
          v-model="todo.description"
        ></v-textarea>
        <v-text-field label="Due date" v-model="date"></v-text-field>

        <v-btn variant="text" color="primary" @click="submit">Send</v-btn>
        <v-btn variant="text" color="error" @click="reset">Reset</v-btn>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style scoped></style>
