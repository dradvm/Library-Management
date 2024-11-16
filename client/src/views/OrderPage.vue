<template>
  <div class="mx-20 my-8 w-100">
    <div class="flex items-center justify-around">
      <div class="text-indigo-600 text-3xl font-medium">
        Danh sách yêu cầu phiếu mượn
      </div>
    </div>
    <div class="mt-3">
      <div
        class="rounded bg-indigo-600 text-white font-medium flex items-center pe-4 py-4"
      >
        <div class="flex justify-center" style="width: 25%">Ngày mượn</div>
        <div class="flex justify-center" style="width: 25%">Ngày trả</div>
        <div class="flex justify-center" style="width: 40%"></div>
        <div class="flex justify-center" style="width: 10%"></div>
      </div>
      <div class="rounded" v-if="!isLoading">
        <div
          v-for="item in theoDoiMuonSachs"
          class="flex cursor-default shadow-sm items-center hover:shadow hover:bg-indigo-100 transition duration-100 pe-4 py-3"
        >
          <div class="flex justify-center font-medium" style="width: 25%">
            {{ formatDate(item.ngayMuon) }}
          </div>
          <div class="flex justify-center font-medium" style="width: 25%">
            {{ formatDate(item.ngayTra) }}
          </div>
          <div class="flex justify-center" style="width: 40%">
            <div>
              <MyButton size="small" @click="toggleModal(true, item.sachs)"
                >Chi tiết</MyButton
              >
            </div>
          </div>
          <div class="flex justify-evenly" style="width: 10%">
            <div>
              <MyButton
                size="small"
                type="success"
                @click="
                  updateTrangThaiTheoDoiMuonSach(
                    item.maTheoDoiMuonSach,
                    'Confirmed'
                  )
                "
              >
                <font-awesome-icon :icon="['fas', 'check']" />
              </MyButton>
            </div>
            <div>
              <MyButton
                size="small"
                type="danger"
                @click="
                  updateTrangThaiTheoDoiMuonSach(
                    item.maTheoDoiMuonSach,
                    'Rejected'
                  )
                "
              >
                <font-awesome-icon :icon="['fas', 'minus']" />
              </MyButton>
            </div>
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

  <Modal :is-visible="isVisibleModal" @close="toggleModal(false)">
    <div class="font-bold text-center text-2xl">Chi tiết phiếu mượn</div>
    <div class="mt-4 h-60 overflow-auto">
      <div
        v-for="item in sachsDetail"
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
      </div>
    </div>
  </Modal>
</template>

<script setup>
import LoadingSpinning from "@/components/LoadingSpinning.vue";
import Modal from "@/components/Modal.vue";
import MyButton from "@/components/MyButton.vue";
import sachService from "@/services/SachService";
import theoDoiMuonSachService from "@/services/TheoDoiMuonSachService";
import { useAuthStore } from "@/stores/auth";
import myToast from "@/utils/toast";
import { onMounted, ref, watch } from "vue";

const theoDoiMuonSachs = ref([]);
const isLoading = ref(false);
const theoDoiMuonSachPerPage = ref(7);
const currentPage = ref(1);
const pages = ref(0);
const isVisibleModal = ref(false);
const formatDate = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
};
const authStore = useAuthStore();
const sachsDetail = ref([]);
const trangThais = ref(["Waiting Confirm"]);

const fetchDataSachs = (sachs) => {
  sachs.forEach((sach) => {
    sachService
      .getSachById(sach)
      .then((res) => {
        console.log(res.data);
        sachsDetail.value.push(res.data);
      })
      .catch((err) => myToast(err.message));
  });
};
const fetchDataTheoDoiMuonSachs = () => {
  isLoading.value = true;
  theoDoiMuonSachService
    .getAllTheoDoiMuonSach({
      theoDoiMuonSachPerPage: theoDoiMuonSachPerPage.value,
      currentPage: currentPage.value,
      trangThais: trangThais.value,
    })
    .then((res) => {
      theoDoiMuonSachs.value = res.data;
      isLoading.value = false;
    })
    .catch((err) => {
      myToast(err.message);
    });
};

const fetchPagesOfTheoDoiMuonSach = () => {
  theoDoiMuonSachService
    .getPagesOfTheoDoiMuonSach({
      theoDoiMuonSachPerPage: theoDoiMuonSachPerPage.value,
      trangThais: trangThais.value,
    })
    .then((res) => (pages.value = res.data.count))
    .catch((err) => console.log(err));
};
const fetchData = () => {
  fetchDataTheoDoiMuonSachs();
  fetchPagesOfTheoDoiMuonSach();
};
onMounted(() => {
  fetchData();
});

const updateTrangThaiTheoDoiMuonSach = (maTheoDoiMuonSach, trangThai) => {
  theoDoiMuonSachService
    .updateTrangThaiTheoDoiMuonSach({
      maTheoDoiMuonSach: maTheoDoiMuonSach,
      trangThai: trangThai,
      msNV: authStore.getId(),
    })
    .then((res) => {
      fetchData();
      myToast(res.data.message, "success");
    })
    .catch((res) => myToast(err.message));
};

const toggleModal = (action, sachs = []) => {
  isVisibleModal.value = action;
  if (action && sachs.length > 0) {
    fetchDataSachs(sachs);
    console.log(sachsDetail.value);
  } else {
    sachsDetail.value = [];
  }
};

watch(currentPage, () => {
  fetchData();
});
</script>
