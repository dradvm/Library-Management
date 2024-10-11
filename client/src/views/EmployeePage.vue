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
      <div class="rounded">
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
            <RouterLink>
              <MyButton size="small" type="success">
                <font-awesome-icon :icon="['fas', 'pen-to-square']" />
              </MyButton>
            </RouterLink>
            <RouterLink v-if="item.chucVu != 'ADMIN'">
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
import nhanVienService from "@/services/NhanVienService";
import myToast from "@/utils/toast";
import { onMounted, ref } from "vue";

const nhanViens = ref([]);
const isLoading = ref(false);
const search = ref("");
const resetSearch = () => {
  search.value = "";
};

const fetchDataNhanViens = () => {
  isLoading.value = true;
  nhanVienService
    .getAllNhanVien()
    .then((res) => {
      nhanViens.value = res.data;
    })
    .catch((err) => {
      console.log(err);
      myToast(err.message);
    });
};

onMounted(() => {
  fetchDataNhanViens();
});
</script>
