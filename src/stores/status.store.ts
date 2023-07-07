import { defineStore } from 'pinia';

type State = {
  status: number;
  message: string;
};

export const useStatusStore = defineStore('status', {
  state: (): State => ({ status: 0, message: '' })
});
