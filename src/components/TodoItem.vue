<template>
  <li :class="['todo-item', { completed: todo.completed }]">
    <input type="checkbox" :checked="todo.completed" @change="toggle" />
    <input
      v-if="isEditing"
      type="text"
      class="edit-input"
      v-model="editableText"
      @blur="saveEdit"
      @keyup.enter="saveEdit"
    />
    <span v-else>{{ todo.text }}</span>
    <button v-if="!isEditing" class="edit-button" @click="edit">Редактировать</button>
    <button v-if="isEditing" class="accept-button" @click="saveEdit">Принять</button>
    <button class="remove-button" @click="remove">Удалить</button>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Todo } from '../stores/todo';

export default defineComponent({
  props: {
    todo: {
      type: Object as () => Todo,
      required: true,
    },
  },
  emits: ['remove', 'toggle', 'edit'],
  setup(props, { emit }) {
    const isEditing = ref(false);
    const editableText = ref(props.todo.text);

    const saveEdit = () => {
      if (editableText.value !== props.todo.text) {
        emit('edit', props.todo.id, editableText.value);
      }
      isEditing.value = false;
    };

    const remove = () => {
      emit('remove', props.todo.id);
    };

    const toggle = () => {
      emit('toggle', props.todo.id);
    };

    const edit = () => {
      isEditing.value = true;
      editableText.value = props.todo.text;
    };

    return {
      isEditing,
      editableText,
      saveEdit,
      remove,
      toggle,
      edit,
    };
  },
});
</script>

<style scoped>
/* Styles for the edit field */
.edit-input {
  width: 60%; /* Editing field width */
  padding: 5px;
  margin-right: 5px;
}

/* Styles for the accept button */
.accept-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-left: 5px;
  cursor: pointer;
  border-radius: 3px;
}

.accept-button:hover {
  background-color: #45a049; /* Darkening on hover */
}

.todo-item input[type="checkbox"] {
  margin-right: 10px; /* Adding margin to the right for the checkbox */
}
</style>