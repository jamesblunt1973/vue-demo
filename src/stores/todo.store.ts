import type { Todo } from '@/models/todo';
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useStatusStore } from './status.store';

type State = {
  todos: Todo[];
  isLoading: boolean;
};

const env = import.meta.env;

export const useTodosStore = defineStore('todos', () => {
  const statusState = useStatusStore();
  const state: State = reactive({ todos: [], isLoading: false });

  async function fetchTodos(): Promise<void> {
    state.isLoading = true;
    const res = await fetch(env.VITE_API_URL);
    state.isLoading = false;
    if (!res.ok) {
      statusState.$patch({ status: res.status, message: res.statusText });
      return;
    }
    const data = await res.json();
    state.todos = data as Todo[];
    statusState.$patch({ status: res.status, message: 'Fetch todos completed successfully' });
  }

  async function addTodo(todo: Todo): Promise<void> {
    const res = await fetch(env.VITE_API_URL, {
      method: 'POST',
      body: JSON.stringify(todo)
    });
    if (!res.ok) {
      statusState.$patch({ status: res.status, message: res.statusText });
      return;
    }
    const data = await res.json();
    statusState.$patch({ status: res.status, message: data });

    state.todos = [...state.todos, todo];
  }

  async function deleteTodo(todo: Todo): Promise<void> {
    const res = await fetch(env.VITE_API_URL, {
      method: 'DELETE',
      body: JSON.stringify(todo)
    });
    if (!res.ok) {
      statusState.$patch({ status: res.status, message: res.statusText });
      return;
    }
    const data = await res.json();
    statusState.$patch({ status: res.status, message: data });

    state.todos = state.todos.filter((a) => a.id !== todo.id);
  }

  async function updateTodo(todo: Todo): Promise<void> {
    const res = await fetch(`${env.VITE_API_URL}?id=${todo.id}`, {
      method: 'PATCH',
      body: JSON.stringify(todo)
    });
    if (!res.ok) {
      statusState.$patch({ status: res.status, message: res.statusText });
      return;
    }
    const data = await res.json();
    statusState.$patch({ status: res.status, message: data });
  }

  return { state, fetchTodos, addTodo, deleteTodo, updateTodo };
});
