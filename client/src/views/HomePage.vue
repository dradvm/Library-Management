<template>
  <div class="flex h-100">
    <div style="width: 75%" class="p-3 grow bg-slate-100">
      <div class="rounded-md bg-white px-4 py-4 grow">
        <div class="flex justify-between">
          <div class="font-medium text-lg">Recommended</div>
          <RouterLink :to="{ name: 'DiscoverBookPage' }">
            <MyButton size="small" type="type2">See All</MyButton>
          </RouterLink>
        </div>

        <div v-if="!isLoading" class="mt-3 grid grid-cols-5 gap-x-4 gap-y-5">
          <div
            v-for="item in sachs"
            class="flex flex-column text-xs cursor-pointer transition shadow rounded-md overflow-hidden"
            :class="{
              'book-item hover:text-indigo-500  shadow-md':
                sachSelected != item,
              'book-item-selected text-indigo-700 shadow-lg':
                sachSelected == item,
            }"
            @click="selectBook(item)"
          >
            <div class="overflow-hidden">
              <img :src="item.hinhAnh" class="h-40 w-100" />
            </div>
            <div class="px-2 py-3">
              <div class="font-medium text-sm truncate">
                {{ item.tenSach }}
              </div>
              <div class="truncate mt-1 text-slate-600">{{ item.tacGia }}</div>
            </div>
          </div>
        </div>
        <div v-else class="flex items-center justify-around">
          <div class="mt-3 grid grid-cols-5 gap-x-4 gap-y-5">
            <div
              v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
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
        </div>
      </div>
    </div>
    <div
      class="grow bg-gradient-to-b from-slate-600 to-slate-800 h-100 flex items-center justify-between"
      style="width: 25%"
    >
      <div class="grow flex items-center justify-center">
        <div v-if="sachSelected === null" class="text-3xl font-medium">
          Hãy chọn sách!
        </div>
        <div v-else class="flex flex-column px-4 w-75">
          <img :src="sachSelected.hinhAnh" class="w-100" />
          <div class="text-center">
            <div class="mt-3">
              <div class="font-semibold"></div>
            </div>
            <div class="flex justify-around">
              <div class="flex flex-column items-center">
                <div class="text-white font-medium leading-5 text sm">
                  {{ sachSelected.tenSach }}
                </div>
                <div class="text-slate-100 font-medium text-xs mt-2">
                  {{ sachSelected.tacGia }}
                </div>
              </div>
            </div>
            <div class="mt-2 text-sm text-start">
              <div class="flex">
                <div class="font-semibold">Còn:</div>
                <div class="ms-1">0</div>
              </div>
              <div class="flex">
                <div class="font-semibold">Đã mượn:</div>
                <div class="ms-1">10</div>
              </div>
            </div>
            <RouterLink
              :to="{
                name: 'BookDetailPage',
                params: {
                  maSach: sachSelected.maSach,
                },
              }"
            >
              <MyButton size="small" class="mt-4"
                ><div class="flex items-center">
                  Mượn ngay
                  <font-awesome-icon
                    :icon="['fas', 'book']"
                    class="ms-3"
                  /></div
              ></MyButton>
            </RouterLink>
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
import { onMounted, ref } from "vue";

const currentPage = ref(1);
const sachPerPage = ref(10);
const isLoading = ref(false);
const sachs = ref([]);
const sachSelected = ref(null);
const fetchDataSachs = () => {
  isLoading.value = true;
  sachService
    .getAllSachByFilter({
      tenSach: "",
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
const selectBook = (sach) => {
  sachSelected.value = sach;
};

onMounted(() => {
  fetchDataSachs();
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
