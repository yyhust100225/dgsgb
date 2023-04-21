<template>
  <h1>
    {{ title }}
  </h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      title: ""
    };
  },
  methods: {
    asyncHomePageData() {
      this.title = "DGSGB";
    }
  },
  mounted() {
    this.asyncHomePageData();
  },
});
</script>

<style scoped>

h1 {
  text-align: center;
  margin-top: 20px;
}

</style>