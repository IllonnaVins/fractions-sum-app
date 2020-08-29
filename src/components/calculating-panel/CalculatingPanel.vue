<template>
  <article class="calculating-panel">
    <div class="calculating-panel__wrap">
      <div class="calculating-panel__fractions">
        <ul class="calculating-panel__list">
          <li v-for="fraction in fractions" :key="fraction.id" class="calculating-panel__item">
            <fraction-component :fraction="fraction"/>
          </li>
        </ul>
        <div class="calculating-panel__controls">
          <button
            class="calculating-panel__btn"
            type="button"
            @click="createFraction"
          >Add new fraction</button>
          <button
            class="calculating-panel__btn"
            type="button"
            @click="clearForm"
          >Clear form</button>
        </div>
        <div class="calculating-panel__msg">
          <p v-for="(msg, index) in messages" :key="index">{{ msg.text }}</p>
        </div>
      </div>
      <div class="calculating-panel__result">
        <span v-if="result" class="calculating-panel__result-text">{{ result }}</span>
        <span v-else>?</span>
      </div>
    </div>
  </article>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import FractionComponent from '@/components/fraction/Fraction.vue';

export default {
  name: 'CalculatingPanel',
  components: {
    FractionComponent,
  },
  data() {
    return {
      errorMessage: {
        id: 1,
        text: 'Maximum number of fractions 5',
      },
    };
  },
  computed: {
    ...mapState(['fractions', 'messages']),
    ...mapGetters(['getFractionsLength']),
    result() {
      const res = +this.fractions.reduce((acc, fraction) => (this.validate(fraction) ? acc + fraction?.numerator?.value / fraction?.denominator?.value : NaN), 0);
      return (!Object.is(NaN, res)) ? res.toFixed(3) : false;
    },
  },
  methods: {
    createFraction() {
      if (this.getFractionsLength < 5) {
        this.$store.dispatch('createFraction');
      } else {
        this.$store.dispatch('addMessage', this.errorMessage);
      }
    },
    clearForm() {
      this.$store.dispatch('clearForm');
      this.$store.dispatch('clearMessage');
    },
    validate(fraction) {
      return fraction?.numerator?.value !== null && +fraction?.numerator?.value !== 0
            && fraction?.denominator?.value !== null && +fraction?.denominator?.value !== 0;
    },
  },
};
</script>

<style lang="scss">
  @import 'calculating-panel.scss';
</style>
