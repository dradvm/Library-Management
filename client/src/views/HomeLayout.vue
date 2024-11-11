<template>
  <div class="fixed flex h-100 w-100">
    <div class="flex flex-column px-8 py-6 w-60 border">
      <RouterLink to="" class="flex items-center">
        <font-awesome-icon
          :icon="['fas', 'book-open']"
          class="text-3xl text-blue-600"
        />
        <div class="text-2xl ms-3">
          <span class="font-medium">Book</span>Base
        </div>
      </RouterLink>
      <div class="flex flex-column mt-6">
        <RouterLink to="" class="my-2 flex items-center">
          <font-awesome-icon
            :icon="['fas', 'house']"
            class="w-4 h-4 text-white transition cursor-pointer text-lg px-2 py-2 bg-blue-600 rounded"
          />
          <span class="font-medium ms-4">Home</span>
        </RouterLink>
        <RouterLink to="" class="my-2 flex items-center group">
          <font-awesome-icon
            :icon="['fas', 'book']"
            class="w-4 h-4 transition cursor-pointer text-lg px-2 py-2 group-hover:bg-slate-200 bg-blue-600 rounded bg-slate-100 text-slate-400"
          />
          <span class="group-hover:font-medium ms-4">Discover</span>
        </RouterLink>
        <hr class="my-3" />
        <RouterLink to="" class="my-2 flex items-center group">
          <font-awesome-icon
            :icon="['fas', 'user']"
            class="w-4 h-4 transition cursor-pointer text-lg px-2 py-2 group-hover:bg-slate-200 bg-blue-600 rounded bg-slate-100 text-slate-400"
          />
          <span class="group-hover:font-medium ms-4">Discover</span>
        </RouterLink>
      </div>
    </div>
    <div class="grow h-100">
      <div class="h-16 shadow flex items-center justify-between px-12">
        <div>
          <div class="bg-slate-100 rounded-md px-4 py-1">
            <div class="flex items-center">
              <font-awesome-icon
                :icon="['fas', 'magnifying-glass']"
                class="text-slate-400"
              />
              <input
                type="text"
                class="focus:outline-none focus:ring-0 bg-slate-100"
                v-model="search"
                @input="debounceSearch"
                style="width: 500px"
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
        <div class="flex">
          <MyButton size="small" type="type2" :is-hover="false"
            >Đăng nhập</MyButton
          >
          <MyButton size="small" type="type3" :is-hover="false"
            >Đăng ký</MyButton
          >
        </div>
      </div>
      <RouterView class="grow"></RouterView>
    </div>
  </div>
</template>

<style></style>

<script setup>
import MyButton from "@/components/MyButton.vue";
import debounce from "@/utils/debounce";
import { ref } from "vue";
const search = ref("");

const fetchData = () => {};

const resetSearch = () => {
  search.value = "";
  fetchData();
};
const debounceSearch = () => {
  debounceFunctionSearch();
};
const debounceFunctionSearch = debounce(fetchData, 1000);
</script>
