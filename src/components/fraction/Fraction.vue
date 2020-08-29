<template>
  <div class="fraction">
    <div class="fraction__part">
      <input
        class="fraction__input"
        :class="{'_error': numError}"
        :id="`num-${fraction.id}`"
        type="text"
        maxlength="2"
        name="numerator"
        v-model="numerator"
        @input="checkInput"
      >
    </div>
    <div class="fraction__part fraction__part--last">
      <input
        class="fraction__input"
        :class="{'_error': denomError}"
        :id="`den-${fraction.id}`"
        type="text"
        name="denominator"
        maxlength="2"
        v-model="denominator"
        @input="checkInput"
      >
    </div>
    <div class="fraction__controls">
      <button
        v-if="getFractionsLength > 2"
        class="fraction__btn"
        type="button"
        @click="deleteFraction"
      ><span class="fraction__icon"></span></button>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'FractionComponent',
  props: {
    fraction: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      numerator: null,
      denominator: null,
      numError: false,
      denomError: false,
      errorMessage: {
        id: 2,
        text: 'Enter an integer from 1 to 99',
      },
    };
  },
  computed: {
    ...mapGetters(['getFractionsLength']),
  },
  methods: {
    updateFraction() {
      const newFraction = {
        id: this.fraction.id,
        numerator: {
          error: this.numError,
          value: this.numerator,
        },
        denominator: {
          error: this.denomError,
          value: this.denominator,
        },
      };
      this.$store.dispatch('updateFraction', newFraction);
    },
    checkInput(event) {
      const isNumerator = event.target.name === 'numerator';
      if (this.validate(event.target.value)) {
        isNumerator ? this.numError = false : this.denomError = false;
        this.updateFraction();
        this.$store.dispatch('deleteMessage', 2);
      } else {
        isNumerator ? this.numError = true : this.denomError = true;
        this.updateFraction();
        this.$store.dispatch('addMessage', this.errorMessage);
      }
    },
    validate(value) {
      if (value === '') return true;
      return /^[1-9]*$/.test(value);
    },
    deleteFraction() {
      this.$store.dispatch('deleteFraction', this.fraction.id);
      if (this.getFractionsLength < 5) {
        this.$store.dispatch('deleteMessage', 1);
      }
    },
  },
  mounted() {
    this.numerator = this.fraction?.numerator?.value;
    this.denominator = this.fraction?.denominator?.value;
    this.numError = this.fraction?.numerator?.error;
    this.denomError = this.fraction?.denominator?.error;
  },
};
</script>

<style lang="scss">
  @import 'fraction.scss';
</style>
