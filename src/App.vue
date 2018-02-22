<template>
  <div id="app">
    <h1 class="text-red mb-4">hello world</h1>
    <Foo />
  </div>
</template>

<script>
import Foo from './foo';

export default {
  components: { Foo },
  name: 'App',
};
</script>

<style src="./assets/main.css"></style>
