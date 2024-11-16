<template>
  <div
    class="rounded-md text-sm"
    :class="{
      'border border-indigo-600 text-indigo-600 hover:border-indigo-800 hover:text-indigo-800':
        type == 'type3',
      'w-100': type == 'default',
    }"
  >
    <button
      class="transition rounded-md flex items-center w-full justify-center font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      :class="{
        'px-3 py-1.5': size == 'small',
        'px-5 py-3': size == 'medium',
        'px-8 py-5': size == 'large',
        'bg-red-600 hover:bg-red-500': type == 'danger',
        'bg-green-600 hover:bg-green-500': type == 'success',
        'bg-blue-600 hover:bg-blue-500': type == 'primary',
        'text-white shadow-sm': [
          'default',
          'danger',
          'success',
          'primary',
        ].includes(type),
        'text-indigo-600 hover:text-indigo-800': type == 'type2',
        'hover:-translate-y-0 bg-indigo-400': disabled,
        'bg-indigo-600 hover:bg-indigo-500':
          !disabled && !['type2', 'type3', 'success'].includes(type),
        'hover:-translate-y-0.5': isHover,
      }"
      :disabled="disabled"
    >
      <slot></slot>
    </button>
  </div>
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
    default: "default",
    validator: (value) =>
      ["default", "success", "danger", "primary", "type2", "type3"].includes(
        value
      ),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isHover: {
    type: Boolean,
    default: true,
  },
});
</script>
