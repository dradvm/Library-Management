<template>
  <div class="flex grow">
    <div class="w-9/12">
      <div class="grid grid-cols-5 gap-x-8 gap-y-5 px-20 py-8">
        <div
          v-if="false"
          v-for="item in books"
          class="h-56 flex flex-column text-center text-xs cursor-pointer transition"
          :class="{
            'book-item hover:text-indigo-500 hover:shadow-md shadow-md':
              bookSelectedIndex != item,
            'book-item-selected text-indigo-700 shadow-lg':
              bookSelected == item,
          }"
          @click="selectBook(item)"
        >
          <img :src="item.hinhAnh" class="w-100 grow border" />
          <div class="px-2 py-2 h-12">
            <p class="font-semibold line-clamp-2">
              {{ item.tenSach }}
            </p>
          </div>
        </div>
        <div>
          
        </div>
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
          />
          <font-awesome-icon
            :icon="['fas', 'xmark']"
            class="cursor-pointer"
            :class="{ hidden: search.length == 0 }"
            @click="resetSearch"
          />
        </div>
      </div>
      <RouterLink to="/Home/AddBook" class="flex justify-around mt-4"
        ><MyButton size="small" class="w-75"
          >Thêm sách mới</MyButton
        ></RouterLink
      >
      <div class="grow flex items-center justify-center">
        <div v-if="bookSelected === null" class="text-3xl font-medium">
          Please Select Book!
        </div>
        <div v-else class="flex flex-column px-4 w-75">
          <img :src="bookSelected.hinhAnh" class="w-100" />
          <div class="text-center">
            <div class="mt-3">
              <div class="font-semibold"></div>
            </div>
            <div class="flex justify-around">
              <div class="italic flex items-center">
                <div>--</div>
                <div>{{ bookSelected.tacGia }}</div>
                <div>--</div>
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
            <MyButton size="small" class="mt-4"
              ><RouterLink
                :to="{
                  name: 'UpdateBook',
                  params: { maSach: bookSelected.maSach },
                }"
                >Cập nhật</RouterLink
              ></MyButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import MyButton from "@/components/MyButton.vue";
import sachService from "@/services/SachService";
import { onMounted, ref } from "vue";
const search = ref("");
const bookSelectedIndex = ref(null);
const bookSelected = ref(null);
const books = ref([]);

const resetSearch = () => {
  search.value = "";
};

const selectBook = (book) => {
  bookSelected.value = book;
};

const fetchDataBooks = () => {
  sachService
    .getAllSach()
    .then((res) => (books.value = res.data))
    .catch((err) => console.log(err));
};

onMounted(() => {
  fetchDataBooks();
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
