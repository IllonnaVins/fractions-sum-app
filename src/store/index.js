import Vue from 'vue';
import Vuex from 'vuex';
import { v4 as uuidv4 } from 'uuid';

Vue.use(Vuex);

const EMPTY_FRACTION = {
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
      { ...EMPTY_FRACTION, id: uuidv4() },
      { ...EMPTY_FRACTION, id: uuidv4() },
    ],
  },
  mutations: {
    createFraction(state) {
      state.fractions.push({ ...EMPTY_FRACTION, id: uuidv4() });
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
        { ...EMPTY_FRACTION, id: uuidv4() },
        { ...EMPTY_FRACTION, id: uuidv4() },
      ];
      localStorage.setItem('fractions', JSON.stringify(state.fractions));
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
  },
  getters: {
    getFractionsLength: (state) => state.fractions.length,
    getErrorFractionsLength: (state) => {
      return state.fractions.filter(fraction => {
        return fraction?.numerator?.error || fraction?.denominator?.error;
      }).length;
    },
  },
});
