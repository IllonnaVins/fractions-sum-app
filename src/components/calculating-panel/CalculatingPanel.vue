<template>
  <article class="calculating-panel">
    <div class="calculating-panel__wrap">
      <div class="calculating-panel__fractions">
        <ul class="calculating-panel__list">
          <li v-for="fraction in fractions" :key="fraction.id" class="calculating-panel__item">
            <fraction-component :fraction="fraction" @updateFraction="getErrorMessage"/>
          </li>
        </ul>
        <div class="calculating-panel__controls">
          <button
            class="calculating-panel__btn"
            type="button"
            :disabled="getFractionsLength === 5"
            @click="createFraction"
          >Add new fraction</button>
          <button
            class="calculating-panel__btn"
            type="button"
            @click="clearForm"
          >Clear form</button>
        </div>
        <div v-if="showError" class="calculating-panel__msg">Enter an integer from 1 to 99</div>
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
      showError: false,
    };
  },
  computed: {
    ...mapState(['fractions', 'messages']),
    ...mapGetters(['getFractionsLength', 'getErrorFractionsLength']),
    result() {
      const res = +this.fractions.reduce((acc, fraction) => {
        if (this.validate(fraction)) {
          return acc + fraction?.numerator?.value / fraction?.denominator?.value;
        } else {
          return NaN;
        }
      }, 0);
      return (!Object.is(NaN, res)) ? res.toFixed(3) : false;
    },
  },
  methods: {
    createFraction() {
      this.$store.dispatch('createFraction');
    },
    clearForm() {
      this.$store.dispatch('clearForm');
      this.$store.dispatch('clearMessage');
    },
    validate(fraction) {
      return fraction?.numerator?.value !== null && +fraction?.numerator?.value !== 0
            && fraction?.denominator?.value !== null && +fraction?.denominator?.value !== 0;
    },
    getErrorMessage() {
      if (this.getErrorFractionsLength > 0) {
        this.showError = true;
      } else {
        this.showError = false;
      }
    }
  },
  mounted() {
    this.getErrorMessage();
  },
};
</script>

<style lang="scss">
  @import 'calculating-panel.scss';
</style>
