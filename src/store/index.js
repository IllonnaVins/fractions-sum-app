import Vue from 'vue';
import Vuex from 'vuex';
import { v4 as uuidv4 } from 'uuid';

Vue.use(Vuex);

const emptyFraction = {
  numerator: {
    error: false,
    value: null,
  },
  denominator: {
    error: false,
    value: null,
  },
};

export default new Vuex.Store({
  state: {
    fractions: JSON.parse(localStorage.getItem('fractions')) || [
      { ...emptyFraction, id: uuidv4() },
      { ...emptyFraction, id: uuidv4() },
    ],
    messages: JSON.parse(localStorage.getItem('messages')) || [],
  },
  mutations: {
    createFraction(state) {
      state.fractions.push({ ...emptyFraction, id: uuidv4() });
      localStorage.setItem('fractions', JSON.stringify(state.fractions));
    },
    updateFraction(state, fraction) {
      const idx = state.fractions.findIndex((item) => item.id === fraction.id);
      state.fractions.splice(idx, 1, fraction);
      localStorage.setItem('fractions', JSON.stringify(state.fractions));
    },
    deleteFraction(state, id) {
      const idx = state.fractions.findIndex((item) => item.id === id);
      state.fractions.splice(idx, 1);
      localStorage.setItem('fractions', JSON.stringify(state.fractions));
    },
    clearForm(state) {
      state.fractions = [
        { ...emptyFraction, id: uuidv4() },
        { ...emptyFraction, id: uuidv4() },
      ];
      localStorage.setItem('fractions', JSON.stringify(state.fractions));
    },
    addMessage(state, msg) {
      const idx = state.messages.findIndex((item) => item.id === msg.id);
      if (idx === -1) {
        state.messages.push(msg);
      }
      localStorage.setItem('messages', JSON.stringify(state.messages));
    },
    deleteMessage(state, id) {
      let isError = false;
      if (id === 2) {
        state.fractions.forEach((fraction) => {
          if (fraction?.numerator?.error || fraction?.denominator?.error) {
            isError = true;
          }
        });
      }

      if (!isError) {
        const idx = state.messages.findIndex((item) => item.id === id);
        if (idx !== -1) {
          state.messages.splice(idx, 1);
        }
      }
      localStorage.setItem('messages', JSON.stringify(state.messages));
    },
    clearMessage(state) {
      state.messages.length = 0;
      localStorage.setItem('messages', JSON.stringify(state.messages));
    },
  },
  actions: {
    createFraction({ commit }) {
      commit('createFraction');
    },
    updateFraction({ commit }, fraction) {
      commit('updateFraction', fraction);
    },
    deleteFraction({ commit }, fractionID) {
      commit('deleteFraction', fractionID);
    },
    clearForm({ commit }) {
      commit('clearForm');
    },
    addMessage({ commit }, message) {
      commit('addMessage', message);
    },
    deleteMessage({ commit }, messageID) {
      commit('deleteMessage', messageID);
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
  getters: {
    getFractionsLength: (state) => state.fractions.length,
  },
});
