<template>
  <div id="app">
    <TodoList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodoList from './components/TodoList.vue';

export default defineComponent({
  components: {
    TodoList,
  },
});
</script>

<style>
@import './assets/styles.css'; /* Connecting global styles */
</style>