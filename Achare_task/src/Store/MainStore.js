import { createStore } from 'vuex';

export const store =  createStore({
  state: {
    formData: null,
  },
  mutations: {
    setFormData(state, data) {
      state.formData = data;
    },
  },
});