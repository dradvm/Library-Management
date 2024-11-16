<template>
  <div class="fixed flex h-100 w-100" @click="toggleSearchBox(false)">
    <div class="flex flex-column px-8 py-6 border">
      <RouterLink :to="{ name: 'HomePage' }" class="flex items-center">
        <font-awesome-icon
          :icon="['fas', 'book-open']"
          class="text-3xl text-blue-600"
        />
        <div class="text-2xl ms-3">
          <span class="font-medium">Book</span>Base
        </div>
      </RouterLink>
      <div class="flex flex-column mt-6">
        <RouterLink
          :to="{ name: 'HomePage' }"
          class="my-2 flex items-center group"
        >
          <font-awesome-icon
            :icon="['fas', 'house']"
            class="w-4 h-4 transition cursor-pointer text-lg px-2 py-2 rounded"
            :class="{
              'bg-blue-600 text-white': ['HomePage'].includes(route.name),
              'group-hover:bg-slate-200 bg-slate-100 text-slate-400': ![
                'HomePage',
              ].includes(route.name),
            }"
          />
          <span
            class="ms-4"
            :class="{
              'font-medium': ['HomePage'].includes(route.name),
              'group-hover:font-medium': !['HomePage'].includes(route.name),
            }"
            >Home</span
          >
        </RouterLink>
        <RouterLink
          :to="{ name: 'DiscoverBookPage' }"
          class="my-2 flex items-center group"
        >
          <font-awesome-icon
            :icon="['fas', 'book']"
            class="w-4 h-4 transition cursor-pointer text-lg px-2 py-2 rounded"
            :class="{
              'bg-blue-600 text-white': [
                'DiscoverBookPage',
                'BookDetailPage',
              ].includes(route.name),
              'group-hover:bg-slate-200 bg-slate-100 text-slate-400': ![
                'DiscoverBookPage',
                'BookDetailPage',
              ].includes(route.name),
            }"
          />
          <span
            class="ms-4"
            :class="{
              'font-medium': ['DiscoverBookPage'].includes(route.name),
              'group-hover:font-medium': !['DiscoverBookPage'].includes(
                route.name
              ),
            }"
            >Discover</span
          >
        </RouterLink>
        <RouterLink
          :to="{ name: 'CartBookPage' }"
          class="my-2 flex items-center group"
          v-if="authStore.isLogined()"
        >
          <font-awesome-icon
            :icon="['fas', 'cart-shopping']"
            class="w-4 h-4 transition cursor-pointer text-lg px-2 py-2 rounded"
            :class="{
              'bg-blue-600 text-white': ['CartBookPage'].includes(route.name),
              'group-hover:bg-slate-200 bg-slate-100 text-slate-400': ![
                'CartBookPage',
              ].includes(route.name),
            }"
          />
          <span
            class="ms-4"
            :class="{
              'font-medium': ['CartBookPage'].includes(route.name),
              'group-hover:font-medium': !['CartBookPage'].includes(route.name),
            }"
            >Cart</span
          >
        </RouterLink>
        <RouterLink
          :to="{ name: 'HistoryOrderPage' }"
          class="my-2 flex items-center group"
          v-if="authStore.isLogined()"
        >
          <font-awesome-icon
            :icon="['fas', 'clock-rotate-left']"
            class="w-4 h-4 transition cursor-pointer text-lg px-2 py-2 rounded"
            :class="{
              'bg-blue-600 text-white': ['HistoryOrderPage'].includes(
                route.name
              ),
              'group-hover:bg-slate-200 bg-slate-100 text-slate-400': ![
                'HistoryOrderPage',
              ].includes(route.name),
            }"
          />
          <span
            class="ms-4"
            :class="{
              'font-medium': ['HistoryOrderPage'].includes(route.name),
              'group-hover:font-medium': !['HistoryOrderPage'].includes(
                route.name
              ),
            }"
            >History</span
          >
        </RouterLink>
        <hr class="my-3" v-if="authStore.isLogined()" />
        <RouterLink
          :to="{ name: 'HomePage' }"
          class="my-2 flex items-center group"
          v-if="authStore.isLogined()"
          @click="logout"
        >
          <font-awesome-icon
            :icon="['fas', 'right-from-bracket']"
            class="w-4 h-4 transition cursor-pointer text-lg px-2 py-2 rounded group-hover:bg-slate-200 bg-slate-100 text-slate-400"
          />
          <span class="ms-4 group-hover:font-medium">Logout</span>
        </RouterLink>
      </div>
    </div>
    <div class="grow h-100">
      <div class="h-16 shadow flex items-center justify-between px-12">
        <div>
          <div class="bg-slate-100 rounded-md px-4 py-1 relative" @click.stop>
            <div class="flex items-center justify-between" style="width: 500px">
              <div class="grow flex items-center">
                <font-awesome-icon
                  :icon="['fas', 'magnifying-glass']"
                  class="text-slate-400"
                />
                <input
                  type="text"
                  class="focus:outline-none focus:ring-0 bg-slate-100 grow"
                  v-model="search"
                  @keypress.enter="searchBook"
                  @input="debounceSearch"
                  @click="toggleSearchBox(true)"
                />
              </div>
              <font-awesome-icon
                :icon="['fas', 'xmark']"
                class="cursor-pointer"
                :class="{ hidden: search.length == 0 }"
                @click="resetSearch"
              />
            </div>
            <div
              v-if="isOpenSearchBox && sachs.length > 0"
              class="absolute border bg-white rounded shadow-lg w-100 top-14 left-0 z-50"
            >
              <RouterLink
                v-if="!isLoading"
                v-for="item in sachs"
                :to="{
                  name: 'BookDetailPage',
                  params: {
                    maSach: item.maSach,
                  },
                }"
                @click="toggleSearchBox(false)"
                class="px-4 py-3 flex space-x-4 w-100 hover:bg-slate-50 cursor-pointer"
              >
                <div>
                  <img :src="item.hinhAnh" class="h-12 w-8 bg-slate-100" />
                </div>
                <div class="flex flex-column ms-3 w-100 space-y-3 mt-1">
                  <div class="font-medium text-sm truncate">
                    {{ item.tenSach }}
                  </div>
                  <div class="truncate mt-1 text-xs text-slate-600">
                    {{ item.tacGia }}
                  </div>
                </div>
              </RouterLink>
              <div
                v-else
                v-for="item in [1, 2, 3]"
                class="px-4 py-3 flex space-x-4 w-100"
              >
                <div>
                  <div class="h-12 w-8 bg-slate-100"></div>
                </div>
                <div class="flex flex-column ms-3 w-100 space-y-3 mt-1">
                  <div class="w-80 h-2 rounded-md bg-slate-100"></div>
                  <div class="w-32 h-2 rounded-md bg-slate-100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex" v-if="!authStore.isLogined()">
          <RouterLink
            :to="{
              name: 'LoginPage',
            }"
          >
            <MyButton size="small" type="type2" :is-hover="false"
              >Đăng nhập</MyButton
            >
          </RouterLink>
          <RouterLink
            :to="{
              name: 'RegisterPage',
            }"
          >
            <MyButton size="small" type="type3" :is-hover="false"
              >Đăng ký</MyButton
            >
          </RouterLink>
        </div>
        <div v-else class="flex space-x-3 items-center">
          <div class="font-medium text-indigo-600">
            {{ authStore.getTen() }}
          </div>
          <div
            class="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-around"
          >
            <font-awesome-icon :icon="['fas', 'user']" class="text-gray-600" />
          </div>
        </div>
      </div>
      <RouterView
        class="grow"
        :search-value="searchValue"
        :key="$route.params.maSach"
      ></RouterView>
    </div>
  </div>
</template>

<style></style>

<script setup>
import MyButton from "@/components/MyButton.vue";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import sachService from "@/services/SachService";
import debounce from "@/utils/debounce";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const search = ref("");
const searchValue = ref("");
const route = useRoute();
const router = useRouter();
const isOpenSearchBox = ref(false);
const sachs = ref([]);
const isLoading = ref(false);
const resetSearch = () => {
  search.value = "";
};
const logout = () => {
  authStore.logout();
  router.push({ name: "LoginPage" });
};
const toggleSearchBox = (value) => {
  isOpenSearchBox.value = value;
  if (value) {
    fetchDataSachs();
  }
};
const searchBook = () => {
  toggleSearchBox(false);
  searchValue.value = search.value;
  router.push({ name: "DiscoverBookPage" });
};
const fetchDataSachs = () => {
  isLoading.value = true;
  sachService
    .getAllSachByFilter({
      tenSach: search.value,
      sachPerPage: 3,
      currentPage: 1,
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
const debounceSearch = () => {
  isLoading.value = true;
  debounceFunctionSearch();
};
const debounceFunctionSearch = debounce(fetchDataSachs, 500);
</script>
