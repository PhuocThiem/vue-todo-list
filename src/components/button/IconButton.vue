<script setup>
defineProps({
  isDisable: Boolean,
  iconPath: String,
});
</script>

<template>
  <button
    class="px-2 hover:bg-slate-200"
    @click="$emit('handle-onclick')"
    :disabled="isDisable"
  >
    <slot>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6"
      >
        <path
          fill-rule="evenodd"
          :d="iconPath"
          clip-rule="evenodd"
        />
      </svg>
    </slot>
  </button>
</template>
