<template>
  <div class="mx-20 my-8 w-100">
    <div class="flex items-center justify-between">
      <RouterLink
        :to="{
          name: 'AddEmployeePage',
        }"
      >
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
    </div>
    <div class="mt-5">
      <div
        class="rounded bg-indigo-600 text-white font-medium flex items-center pe-4 py-4"
      >
        <div class="flex justify-center" style="width: 10%"></div>
        <div class="flex justify-center" style="width: 10%">Mã Số</div>
        <div class="flex justify-center" style="width: 20%">Họ Tên</div>
        <div class="flex justify-center" style="width: 10%">Chức Vụ</div>
        <div class="flex justify-center" style="width: 20%">Địa chỉ</div>
        <div class="flex justify-center" style="width: 20%">SĐT</div>
        <div class="flex justify-center" style="width: 10%"></div>
      </div>
      <div class="rounded" v-if="!isLoading">
        <div
          v-for="item in nhanViens"
          class="flex cursor-default shadow-sm items-center hover:shadow hover:bg-indigo-100 transition duration-100 pe-4 py-3"
        >
          <div class="flex items-center justify-center" style="width: 10%">
            <img :src="item.hinhAnh" class="rounded-full w-12 h-12" />
          </div>
          <div class="flex justify-center font-medium" style="width: 10%">
            {{ item.msNV }}
          </div>
          <div class="flex justify-center" style="width: 20%">
            {{ item.hoTenNV }}
          </div>
          <div class="flex justify-center" style="width: 10%">
            <div
              v-if="item.chucVu == 'ADMIN'"
              class="px-2 py-1 bg-red-600 text-white rounded font-medium"
            >
              {{ item.chucVu }}
            </div>
            <div
              v-else
              class="px-2 py-1 bg-indigo-500 text-white rounded font-medium"
            >
              {{ item.chucVu }}
            </div>
          </div>
          <div class="flex justify-center" style="width: 20%">
            {{ item.diaChi }}
          </div>
          <div class="flex justify-center" style="width: 20%">
            {{ item.soDienThoai }}
          </div>
          <div class="flex justify-evenly" style="width: 10%">
            <RouterLink
              :to="{
                name: 'UpdateEmployeePage',
                params: {
                  msNV: item.msNV,
                },
              }"
            >
              <MyButton
                size="small"
                type="success"
                v-if="item.chucVu != 'ADMIN'"
              >
                <font-awesome-icon :icon="['fas', 'pen-to-square']" />
              </MyButton>
            </RouterLink>
            <RouterLink>
              <MyButton
                size="small"
                type="danger"
                v-if="item.chucVu != 'ADMIN'"
                @click="deleteNhanVien(item._id)"
              >
                <font-awesome-icon :icon="['fas', 'delete-left']" />
              </MyButton>
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="my-32 flex items-center justify-around" v-else>
        <LoadingSpinning></LoadingSpinning>
      </div>
    </div>
    <v-pagination
      v-model="currentPage"
      :length="pages"
      :total-visible="4"
      class="my-5"
      v-if="!isLoading"
    ></v-pagination>
  </div>
</template>

<script setup>
import LoadingSpinning from "@/components/LoadingSpinning.vue";
import MyButton from "@/components/MyButton.vue";
import nhanVienService from "@/services/NhanVienService";
import debounce from "@/utils/debounce";
import myToast from "@/utils/toast";
import { onMounted, ref, watch } from "vue";

const nhanViens = ref([]);
const isLoading = ref(false);
const search = ref("");
const nhanVienPerPage = ref(5);
const currentPage = ref(1);
const pages = ref(0);
const resetSearch = () => {
  search.value = "";
  fetchData();
};

const fetchDataNhanViens = () => {
  isLoading.value = true;
  nhanVienService
    .getAllNhanVienByFilter({
      keySearch: search.value,
      nhanVienPerPage: nhanVienPerPage.value,
      currentPage: currentPage.value,
    })
    .then((res) => {
      nhanViens.value = res.data;
      isLoading.value = false;
    })
    .catch((err) => {
      myToast(err.message);
    });
};

const fetchPagesOfNhanVien = () => {
  nhanVienService
    .getPagesOfNhanVien({
      keySearch: search.value,
      nhanVienPerPage: nhanVienPerPage.value,
    })
    .then((res) => (pages.value = res.data.count))
    .catch((err) => console.log(err));
};

const fetchData = () => {
  fetchDataNhanViens();
  fetchPagesOfNhanVien();
};

const deleteNhanVien = (id) => {
  isLoading.value = true;
  nhanVienService
    .deleteNhanVien(id)
    .then((res) => {
      myToast(res.data.message, "success");
      fetchDataNhanViens();
    })
    .catch((err) => {
      myToast(err.message);
    });
};
const debounceSearch = () => {
  isLoading.value = true;
  debounceFunctionSearch();
};
const debounceFunctionSearch = debounce(fetchData, 1000);
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
