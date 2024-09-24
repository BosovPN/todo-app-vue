<template>
  <div class="todo-list">
    <h1>To-Do List</h1>
    <input 
      v-model="newTaskText" 
      @keyup.enter="addTask" 
      placeholder="Добавить новую задачу" 
      class="new-task-input" 
    />
    <ul>
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @remove="removeTask"
        @toggle="toggleTask"
        @edit="editTask"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useTodoStore } from '../stores/todo';
import TodoItem from './TodoItem.vue';

export default defineComponent({
  components: { TodoItem },
  setup() {
    const todoStore = useTodoStore();
    const newTaskText = ref('');

    todoStore.loadTodos();

    const todos = computed(() => todoStore.todos);

    const addTask = () => {
      if (newTaskText.value.trim()) {
        todoStore.addTask(newTaskText.value.trim());
        newTaskText.value = '';
      }
    };

    const removeTask = (id: string) => {
      todoStore.removeTask(id);
    };

    const toggleTask = (id: string) => {
      todoStore.toggleTask(id);
    };

    const editTask = (id: string, text: string) => {
      todoStore.editTask(id, text);
    };

    return {
      newTaskText,
      todos,
      addTask,
      removeTask,
      toggleTask,
      editTask,
    };
  },
});
</script>

<style scoped>
.todo-list {
  max-width: 600px;
  margin: auto;
}

ul {
  list-style-type: none;
  padding: 0;
}

.new-task-input {
  width: 100%;
  padding: 12px 20px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>