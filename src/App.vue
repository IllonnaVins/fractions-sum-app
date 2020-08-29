<template>
  <div class="app" id="app">
    <header-component />
    <main class="main container">
      <div class="main__calculate">
        <calculating-panel />
      </div>
    </main>
  </div>
</template>

<script>

import HeaderComponent from '@/components/header/Header.vue';
import CalculatingPanel from '@/components/calculating-panel/CalculatingPanel.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    CalculatingPanel,
  },
};
</script>
