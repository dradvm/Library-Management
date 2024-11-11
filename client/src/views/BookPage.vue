<template>
  <div class="flex grow">
    <div class="w-9/12">
      <div
        :class="{
          'h-100': sachs.length != 0,
          'flex items-center justify-around h-100': sachs.length == 0,
        }"
        v-if="!isLoading"
      >
        <div
          v-if="sachs.length != 0"
          class="flex flex-column h-100 justify-between"
        >
          <div class="grid grid-cols-5 gap-x-8 gap-y-8 px-20 py-8">
            <div
              v-for="item in sachs"
              class="h-56 flex flex-column text-center text-xs cursor-pointer transition"
              :class="{
                'book-item hover:text-indigo-500  shadow-md':
                  sachSelected != item,
                'book-item-selected text-indigo-700 shadow-lg':
                  sachSelected == item,
              }"
              @click="selectBook(item)"
            >
              <div class="grow overflow-hidden">
                <img :src="item.hinhAnh" class="w-100 h-100" />
              </div>
              <div class="px-2 py-2 h-12">
                <p class="font-semibold line-clamp-2">
                  {{ item.tenSach }}
                </p>
              </div>
            </div>
          </div>
          <v-pagination
            v-model="currentPage"
            :length="pages"
            :total-visible="4"
            class="my-5"
          ></v-pagination>
        </div>

        <div class="text-5xl font-medium" v-else>Không tìm thấy sách!</div>
      </div>
      <div class="h-100 flex items-center justify-around" v-else>
        <LoadingSpinning></LoadingSpinning>
      </div>
    </div>
    <div class="w-3/12 shadow flex flex-column">
      <div class="w-100 shadow px-4 py-1">
        <div class="flex items-center">
          <font-awesome-icon
            :icon="['fas', 'magnifying-glass']"
            class="text-slate-400"
          />
          <input
            type="text"
            class="focus:outline-none focus:ring-0 w-100"
            v-model="search"
            @input="debounceSearch"
          />
          <font-awesome-icon
            :icon="['fas', 'xmark']"
            class="cursor-pointer"
            :class="{ hidden: search.length == 0 }"
            @click="resetSearch"
          />
        </div>
      </div>
      <div class="flex justify-around mt-4">
        <RouterLink
          :to="{
            name: 'AddBookPage',
          }"
          class="flex w-75"
          ><MyButton size="small">Thêm sách mới</MyButton></RouterLink
        >
      </div>
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
              <div class="italic flex items-center">
                <div>{{ sachSelected.tacGia }}</div>
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
            <MyButton size="small" class="mt-4">Xem thông tin</MyButton>
            <RouterLink
              :to="{
                name: 'UpdateBookPage',
                params: { maSach: sachSelected.maSach },
              }"
              ><MyButton size="small" class="mt-4"> Cập nhật </MyButton>
            </RouterLink>
            <MyButton size="small" class="mt-4" @click="deleteSach">
              Xóa
            </MyButton>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script setup>
import LoadingSpinning from "@/components/LoadingSpinning.vue";
import MyButton from "@/components/MyButton.vue";
import sachService from "@/services/SachService";
import debounce from "@/utils/debounce";
import myToast from "@/utils/toast";
import { onMounted, ref, watch } from "vue";
const search = ref("");
const sachSelected = ref(null);
const sachs = ref([]);
const isLoading = ref(true);
const sachPerPage = ref(10);
const currentPage = ref(1);
const pages = ref(0);
const resetSearch = () => {
  search.value = "";
  fetchData();
};

const selectBook = (sach) => {
  sachSelected.value = sach;
};
const fetchData = () => {
  fetchDataSachs();
  fetchPagesOfSach();
};
const fetchDataSachs = () => {
  isLoading.value = true;
  sachService
    .getAllSachByFilter({
      tenSach: search.value,
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
      tenSach: search.value,
      sachPerPage: sachPerPage.value,
    })
    .then((res) => (pages.value = res.data.count))
    .catch((err) => console.log(err));
};
const debounceSearch = () => {
  isLoading.value = true;
  debounceFunctionSearch();
};
const debounceFunctionSearch = debounce(fetchData, 1000);
const deleteSach = () => {
  isLoading.value = true;
  sachService
    .deleteSach(sachSelected.value._id)
    .then((res) => {
      myToast(res.data.message, "success");
      fetchDataSachs();
    })
    .catch((err) => myToast(err.message));
};

onMounted(() => {
  fetchData();
});
watch(search, () => {
  currentPage.value = 1;
});
watch(currentPage, () => {
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
