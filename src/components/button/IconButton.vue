<script setup>
defineProps({
  isDisable: Boolean,
});
</script>

<template>
  <button
    class="px-2 hover:bg-slate-200"
    @click="$emit('handle-onclick')"
    :disabled="isDisable"
  >
    <slot />
  </button>
</template>
