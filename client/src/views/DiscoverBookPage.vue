<template>
  <div class="flex h-100">
    <div class="p-3 grow bg-slate-100">
      <div class="rounded-md bg-white px-2 py-4 grow">
        <div v-if="!isLoading" class="flex items-center justify-between">
          <div class="w-16">
            <MyButton
              size="small"
              type="type2"
              :is-hover="false"
              @click="changeCurrentPage(-1)"
              ><font-awesome-icon :icon="['fas', 'arrow-left']" class="text-lg"
            /></MyButton>
          </div>
          <div class="mt-3 grid grid-cols-6 gap-x-4 gap-y-5">
            <RouterLink
              v-for="item in sachs"
              :to="{
                name: 'BookDetailPage',
                params: {
                  maSach: item.maSach,
                },
              }"
              class="flex flex-column book-item hover:text-indigo-500 shadow-md text-xs cursor-pointer transition shadow rounded-md overflow-hidden"
            >
              <div class="overflow-hidden">
                <img :src="item.hinhAnh" class="h-40 w-100" />
              </div>
              <div class="px-2 py-3">
                <div class="font-medium text-sm truncate">
                  {{ item.tenSach }}
                </div>
                <div class="truncate mt-1 text-slate-600">
                  {{ item.tacGia }}
                </div>
              </div>
            </RouterLink>
          </div>
          <div class="w-16">
            <MyButton
              size="small"
              type="type2"
              :is-hover="false"
              @click="changeCurrentPage(1)"
              ><font-awesome-icon
                :icon="['fas', 'arrow-right']"
                class="text-lg"
            /></MyButton>
          </div>
        </div>
        <div v-else class="flex items-center justify-between">
          <div class="w-16">
            <MyButton size="small" type="type2" :is-hover="false"
              ><font-awesome-icon :icon="['fas', 'arrow-left']" class="text-lg"
            /></MyButton>
          </div>
          <div class="mt-3 grid grid-cols-6 gap-x-4 gap-y-5">
            <div
              v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
              class="animate-pulse flex flex-column text-xs cursor-pointer transition shadow rounded-md overflow-hidden"
            >
              <div class="overflow-hidden">
                <div class="h-40 w-100 bg-slate-200"></div>
              </div>
              <div class="px-2 py-3">
                <div
                  class="font-medium text-sm truncate overflow-hidden rounded"
                >
                  <div class="h-2 bg-slate-200 w-64"></div>
                </div>
                <div
                  class="truncate mt-1 text-slate-600 rounded overflow-hidden"
                >
                  <div class="h-2 bg-slate-200 w-12 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-16">
            <MyButton size="small" type="type2" :is-hover="false"
              ><font-awesome-icon
                :icon="['fas', 'arrow-right']"
                class="text-lg"
            /></MyButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import LoadingSpinning from "@/components/LoadingSpinning.vue";
import MyButton from "@/components/MyButton.vue";
import sachService from "@/services/SachService";
import myToast from "@/utils/toast";
import { onMounted, ref, watch } from "vue";
const props = defineProps({
  searchValue: {
    type: String,
    default: "",
  },
});
const currentPage = ref(1);
const sachPerPage = ref(12);
const isLoading = ref(false);
const sachs = ref([]);
const tenSach = ref("");
const pages = ref(null);
const fetchData = () => {
  isLoading.value = true;
  fetchDataSachs();
  fetchPagesOfSach();
};

const changeCurrentPage = (variance) => {
  console.log(pages.value);
  console.log(currentPage.value);
  if (
    currentPage.value + variance >= 1 &&
    currentPage.value + variance <= pages.value
  ) {
    currentPage.value = currentPage.value + variance;
  }
  console.log(currentPage.value);
};

const fetchDataSachs = () => {
  sachService
    .getAllSachByFilter({
      tenSach: props.searchValue,
      sachPerPage: sachPerPage.value,
      currentPage: currentPage.value,
    })
    .then((res) => {
      sachs.value = res.data;
      isLoading.value = false;
    })
    .catch((err) => {
      isLoading.value = false;
      myToast(err.message);
    });
};
const fetchPagesOfSach = () => {
  sachService
    .getPagesOfSach({
      tenSach: props.searchValue,
      sachPerPage: sachPerPage.value,
    })
    .then((res) => (pages.value = res.data.count))
    .catch((err) => console.log(err));
};
watch(currentPage, () => {
  fetchData();
});
onMounted(() => {
  fetchData();
});
</script>
<style>
.book-item {
  position: relative;
  transform: translateY(0px);
}

.book-item:hover {
  transform: translateY(-3px);
}
.book-item:active {
  transform: translateY(-1px);
}
.book-item-selected {
}
</style>
