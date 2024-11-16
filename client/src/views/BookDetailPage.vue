<template>
  <div class="grow flex items-center justify-around">
    <div class="flex mt-10" style="width: 800px; height: 400px">
      <div class="w-1/3"><img :src="sach.hinhAnh" class="h-100" /></div>
      <div class="w-2/3 flex flex-column justify-between px-10 py-2">
        <div>
          <div class="text-2xl font-medium">{{ sach.tenSach }}</div>
          <div class="text-base text-slate-600">{{ sach.tacGia }}</div>
        </div>
        <div>
          <div class="grid grid-cols-2">
            <div class="font-medium">Nhà xuất bản</div>
            <div class="text-slate-600">{{ sach.maNXB.tenNXB }}</div>
          </div>
          <div class="grid grid-cols-2">
            <div class="font-medium">Năm xuất bản</div>
            <div class="text-slate-600">{{ sach.namXuatBan }}</div>
          </div>
          <div class="grid grid-cols-2">
            <div class="font-medium">Số quyển</div>
            <div class="text-slate-600">{{ sach.soQuyen }}</div>
          </div>
          <div class="grid grid-cols-2">
            <div class="font-medium">Đơn giá</div>
            <div class="text-slate-600">{{ sach.donGia }}đ</div>
          </div>
        </div>
        <div>
          <RouterLink
            :to="{
              name: 'LoginPage',
            }"
            v-if="!authStore.isLogined()"
          >
            <MyButton size="small">"Thêm để đọc"</MyButton>
          </RouterLink>
          <MyButton
            size="small"
            @click="authStore.addBookCart(sach)"
            :disabled="authStore.isExistBook(sach)"
            :is-hover="!authStore.isExistBook(sach)"
            v-else
            >{{
              authStore.isExistBook(sach)
                ? "Đã thêm vào giỏ sách"
                : "Thêm để đọc"
            }}</MyButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyButton from "@/components/MyButton.vue";
import sachService from "@/services/SachService";
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const sach = ref({ maNXB: "" });
const authStore = useAuthStore();

const fetchDataSach = () => {
  sachService
    .getSachByMaSach(router.currentRoute.value.params.maSach)
    .then((res) => (sach.value = res.data))
    .catch((err) => myToast(err.message));
};

onMounted(() => {
  fetchDataSach();
});
</script>
