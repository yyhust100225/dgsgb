<template>
  <h1>
    {{ title }}
  </h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getHomePage } from '@/apis/home';

export default defineComponent({
  data() {
    return {
      title: ""
    };
  },
  methods: {
    asyncHomePageData() {
      getHomePage().then(resp => {
        this.title = resp.data.homepage_title;
      });
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