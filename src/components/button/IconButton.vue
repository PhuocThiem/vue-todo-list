<template>
  <button class="px-2 hover:bg-slate-200" @click="$emit('handle-onclick')">
    <slot />
  </button>
</template>
