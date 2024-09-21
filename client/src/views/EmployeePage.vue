<template>
  <div class="mx-20 my-8 w-100">
    <div class="flex items-center justify-between">
      <RouterLink>
        <MyButton size="small">Thêm nhân viên</MyButton>
      </RouterLink>
      <div
        class="w-25 shadow-sm border border-slate-100 px-4 py-1 rounded-full"
      >
        <div class="flex items-center">
          <font-awesome-icon
            :icon="['fas', 'magnifying-glass']"
            class="text-slate-400"
          />
          <input
            type="text"
            class="focus:outline-none focus:ring-0 w-100"
            v-model="search"
          />
          <font-awesome-icon
            :icon="['fas', 'xmark']"
            class="cursor-pointer"
            :class="{ hidden: search.length == 0 }"
            @click="resetSearch"
          />
        </div>
      </div>
    </div>
    <div class="mt-5">
      <div
        class="rounded bg-indigo-400 text-white font-medium flex items-center px-4 py-4"
      >
        <div style="width: 10%;"></div>
        <div style="width: 10%;">Mã Số</div>
        <div style="width: 10%;">Họ Tên</div>
        <div style="width: 20%;">Chức Vụ</div>
        <div style="width: 20%;">Địa chỉ</div>
        <div style="width: 20%;">SĐT</div>
        <div style="width: 10%;"></div>
      </div>
      <div class="mt-4 rounded">
        <div
          v-for="item in data"
          class="flex shadow-sm items-center hover:shadow hover:bg-indigo-100 transition duration-100 px-4 py-1"
        >
          <div class="py-4" style="width: 10%;"></div>
          <div class="py-4" style="width: 10%;">Mã Số</div>
          <div class="py-4" style="width: 10%;">Họ Tên</div>
          <div class="py-4" style="width: 20%;">Chức Vụ</div>
          <div class="py-4" style="width: 20%;">Địa chỉ</div>
          <div class="py-4" style="width: 20%;">SĐT</div>
          <div class="py-4 flex" style="width: 10%;">
            <RouterLink class="mr-2">
              <MyButton size="small" type="success">
                <font-awesome-icon :icon="['fas', 'pen-to-square']" />
              </MyButton>
            </RouterLink>
            <RouterLink>
              <MyButton size="small" type="danger">
                <font-awesome-icon :icon="['fas', 'delete-left']" />
              </MyButton>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyButton from "@/components/MyButton.vue";
import { ref } from "vue";

const data = ref([1, 2, 3, 4, 5, 6, 7]);
const search = ref("");
const resetSearch = () => {
  search.value = "";
};
</script>
