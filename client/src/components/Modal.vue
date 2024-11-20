<template>
  <div
    v-if="isVisible"
    class="fixed w-100 h-100 inset-0 flex items-center z-50 justify-center"
  >
    <div class="fixed inset-0 bg-black opacity-50" @click="handleClose"></div>
    <div
      class="border bg-white rounded-lg px-16 py-8 flex flex-col z-10"
      style="width: 600px"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["close"]);

const handleClose = () => {
  emit("close");
};
</script>
