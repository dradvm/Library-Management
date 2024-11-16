<template>
  <div class="w-100 h-100 bg-slate-100 p-3">
    <div class="bg-white rounded-md p-4 grid grid-cols-3 gap-x-5">
      <div class="col-span-2">
        <div class="text-2xl font-medium text-indigo-600">Sách đã chọn</div>
        <div class="border overflow-auto h-96 mt-6">
          <div
            v-if="theoDoiMuonSachs.length > 0"
            v-for="item in theoDoiMuonSachs"
            class="px-4 py-3 flex space-x-4 w-100 hover:bg-slate-50 cursor-pointer items-center border justify-between"
          >
            <div class="flex">
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
            </div>
            <div>
              <MyButton
                size="small"
                type="danger"
                @click="removeBookCart"
                :disabled="isDisabled"
                :is-hover="!isDisabled"
                ><font-awesome-icon :icon="['fas', 'xmark']"
              /></MyButton>
            </div>
          </div>
          <div v-else class="flex items-center justify-around h-100">
            <div class="flex flex-column">
              <div class="font-medium text-3xl">Vui lòng chọn thêm sách</div>
              <RouterLink :to="{ name: 'DiscoverBookPage' }"
                ><MyButton class="mt-3" size="small"
                  >Thêm sách ngay!</MyButton
                ></RouterLink
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-1">
        <div class="text-2xl text-indigo-600 font-medium">Thông tin mượn</div>
        <div class="mt-6 h-96 flex flex-column justify-between">
          <div class="flex flex-column space-y-3">
            <div class="flex items-center justify-between">
              <div class="font-medium">Ngày mượn</div>
              <div>{{ ngayMuon }}</div>
            </div>
            <div class="flex items-center justify-between">
              <div class="font-medium">Ngày trả</div>
              <input
                type="date"
                v-model="ngayTra"
                :max="getFutureDate(maxDayToBorrow)"
                :min="getFutureDate(0)"
                class="block rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <MyButton
            size="small"
            @click="submit"
            :disabled="isDisabled"
            :is-hover="!isDisabled"
            >Tạo phiếu mượn</MyButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyButton from "@/components/MyButton.vue";
import theoDoiMuonSachService from "@/services/TheoDoiMuonSachService";
import { useAuthStore } from "@/stores/auth";
import myToast from "@/utils/toast";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isDisabled = ref(false);
const maxDayToBorrow = ref(7);
const theoDoiMuonSachs = ref([]);
const theoDoiMuonSach = ref({
  maDocGia: "",
  maSach: "",
  ngayMuon: "",
  ngayTra: "",
});
const isLoading = ref(false);
const authStore = useAuthStore();
const formatDateInput = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
};
const formatDateFromStringDate = (date) => {
  const arr = date.split("/");
  return `${arr[2]}-${arr[1]}-${arr[0]}`;
};
const getFutureDate = (daysToAdd) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + daysToAdd);
  return formatDateInput(currentDate);
};
const ngayMuon = ref(formatDate(new Date()));
const ngayTra = ref(getFutureDate(maxDayToBorrow.value));

const removeBookCart = (index) => {
  isLoading.value = true;
  authStore.removeBookCart(index);
  fetchDataCart();
};

const fetchDataCart = () => {
  isLoading.value = false;
  theoDoiMuonSachs.value = authStore.getCart();
  isDisabled.value = theoDoiMuonSachs.value.length == 0;
};

onMounted(() => {
  isLoading.value = true;
  fetchDataCart();
});
const submit = () => {
  isDisabled.value = true;
  const data = theoDoiMuonSachs.value.map((sach) => {
    return {
      maDocGia: authStore.getId(),
      maSach: sach._id,
      ngayMuon: formatDateFromStringDate(ngayMuon.value),
      ngayTra: ngayTra.value,
    };
  });

  theoDoiMuonSachService
    .createTheoDoiMuonSachs(data)
    .then((res) => {
      authStore.clearCart();
      myToast(res.data.message, "success", 2000, () => {
        router.push({ name: "HomePage" });
      });
    })
    .catch((err) => myToast(err.message));

  // fetchDataCart();
};
</script>
