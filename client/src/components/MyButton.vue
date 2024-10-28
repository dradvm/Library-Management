<template>
  <button
    type="button"
    class="transition flex items-center w-full justify-center rounded-md text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    :class="{
      'px-3 py-1.5': size == 'small',
      'px-5 py-3': size == 'medium',
      'px-8 py-5': size == 'large',
      'bg-red-600 hover:bg-red-500': type == 'danger',
      'bg-green-600 hover:bg-green-500': type == 'success',
      'bg-blue-600 hover:bg-blue-500': type == 'primary',
      'hover:-translate-y-0 bg-indigo-400': disabled,
      'hover:-translate-y-0.5 bg-indigo-600 hover:bg-indigo-500': !disabled,
    }"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    required: true,
    validator: (value) => ["small", "medium", "large"].includes(value),
  },
  type: {
    type: String,
    validator: (value) => ["success", "danger", "primary"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
