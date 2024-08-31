<template>
  <button
    type="button"
    class="transition hover:-translate-y-0.5 flex items-center w-full justify-center rounded-md bg-indigo-600 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    :class="{
      'px-3 py-1.5': size == 'small',
      'px-5 py-3': size == 'medium',
      'px-8 py-5': size == 'large',
    }"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    required: true,
    validator: (value) => ["small", "medium", "large"].includes(value),
  },
});
</script>
