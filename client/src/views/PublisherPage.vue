<template>
  <div class="mx-20 my-8 w-100">
    <div class="flex items-center justify-between">
      <div>
        <MyButton size="small" @click="toggleModal(true)"
          >Thêm nhà xuất bản</MyButton
        >
      </div>
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
        <div class="flex justify-center" style="width: 25%">
          Mã Nhà Xuất Bản
        </div>
        <div class="flex justify-center" style="width: 25%">
          Tên Nhà Xuất Bản
        </div>
        <div class="flex justify-center" style="width: 40%">Địa chỉ</div>
        <div class="flex justify-center" style="width: 10%"></div>
      </div>
      <div class="rounded" v-if="!isLoading">
        <div
          v-for="item in nhaXuatBans"
          class="flex cursor-default shadow-sm items-center hover:shadow hover:bg-indigo-100 transition duration-100 pe-4 py-3"
        >
          <div class="flex justify-center font-medium" style="width: 25%">
            {{ item.maNXB }}
          </div>
          <div class="flex justify-center" style="width: 25%">
            {{ item.tenNXB }}
          </div>
          <div class="flex justify-center" style="width: 40%">
            {{ item.diaChi }}
          </div>
          <div class="flex justify-evenly" style="width: 10%">
            <RouterLink>
              <MyButton size="small" @click="fetchDataNhaXuatBan(item._id)">
                <font-awesome-icon :icon="['fas', 'pen-to-square']" />
              </MyButton>
            </RouterLink>
            <RouterLink>
              <MyButton
                size="small"
                type="danger"
                @click="deleteNhaXuatBan(item._id)"
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

  <Modal :is-visible="isVisibleModal" @close="toggleModal(false)">
    <div class="font-bold text-center text-2xl">THÊM NHÀ XUẤT BẢN</div>
    <div class="mt-4">
      <div class="mt-4">
        <div class="font-medium mb-1">Tên Nhà Xuất Bản</div>
        <input class="rounded border w-100" v-model="nhaXuatBan.tenNXB" />
      </div>
      <div class="mt-4">
        <div class="font-medium mb-1">Địa Chỉ</div>
        <textarea
          class="rounded border w-100 resize-none h-20"
          v-model="nhaXuatBan.diaChi"
        ></textarea>
      </div>
    </div>
    <div class="mt-6 flex justify-evenly space-x-3">
      <MyButton
        size="small"
        class="w-28"
        @click="submitForm"
        :disabled="isLoadingForm"
        >{{ nhaXuatBan._id == "" ? "Thêm" : "Cập nhật" }}</MyButton
      >
      <MyButton
        size="small"
        class="w-28"
        type="danger"
        @click="toggleModal(false)"
        :disabled="isLoadingForm"
        >Hủy</MyButton
      >
    </div>
  </Modal>
</template>

<script setup>
import LoadingSpinning from "@/components/LoadingSpinning.vue";
import Modal from "@/components/Modal.vue";
import MyButton from "@/components/MyButton.vue";
import nhaXuatBanService from "@/services/NhaXuatBanService";
import debounce from "@/utils/debounce";
import myToast from "@/utils/toast";
import { onMounted, ref, watch } from "vue";

const nhaXuatBans = ref([]);
const isLoading = ref(false);
const search = ref("");
const nhaXuatBanPerPage = ref(5);
const currentPage = ref(1);
const pages = ref(0);
const resetSearch = () => {
  search.value = "";
  fetchData();
};
const isVisibleModal = ref(false);
const nhaXuatBan = ref({
  _id: "",
  tenNXB: "",
  diaChi: "",
});
const isLoadingForm = ref(false);
const fetchDataNhaXuatBans = () => {
  isLoading.value = true;
  nhaXuatBanService
    .getAllNhaXuatBanByFilter({
      keySearch: search.value,
      nhaXuatBanPerPage: nhaXuatBanPerPage.value,
      currentPage: currentPage.value,
    })
    .then((res) => {
      nhaXuatBans.value = res.data;
      isLoading.value = false;
    })
    .catch((err) => {
      myToast(err.message);
    });
};

const fetchPagesOfNhaXuatBan = () => {
  nhaXuatBanService
    .getPagesOfNhaXuatBan({
      keySearch: search.value,
      nhaXuatBanPerPage: nhaXuatBanPerPage.value,
    })
    .then((res) => (pages.value = res.data.count))
    .catch((err) => console.log(err));
};

const fetchData = () => {
  fetchDataNhaXuatBans();
  fetchPagesOfNhaXuatBan();
};

const deleteNhaXuatBan = (id) => {
  isLoading.value = true;
  nhaXuatBanService
    .deleteNhaXuatBan(id)
    .then((res) => {
      myToast(res.data.message, "success");
      fetchData();
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

const fetchDataNhaXuatBan = (id) => {
  nhaXuatBanService.getOneNhaXuatBanById(id).then((res) => {
    nhaXuatBan.value._id = res.data._id;
    nhaXuatBan.value.tenNXB = res.data.tenNXB;
    nhaXuatBan.value.diaChi = res.data.diaChi;
    toggleModal(true);
  });
};

const clearDataNhaXuatBan = () => {
  nhaXuatBan.value._id = "";
  nhaXuatBan.value.tenNXB = "";
  nhaXuatBan.value.diaChi = "";
};

const toggleModal = (action) => {
  isVisibleModal.value = action;
  if (!action) {
    clearDataNhaXuatBan();
  }
};

const validate = () => {
  if (nhaXuatBan.value.tenNXB.trim().length === 0) {
    myToast("Vui lòng nhập tên");
    return false;
  }
  if (nhaXuatBan.value.diaChi.trim().length === 0) {
    myToast("Vui lòng nhập địa chỉ");
    return false;
  }
  return true;
};

const submitForm = () => {
  if (validate()) {
    isLoadingForm.value = true;
    var { _id, ...body } = nhaXuatBan.value;
    if (_id === "") {
      nhaXuatBanService
        .createNhaXuatBan(body)
        .then((res) => {
          isLoadingForm.value = false;
          myToast(res.data.message, "success");
          fetchData();
          toggleModal(false);
        })
        .catch((err) => {
          isLoadingForm.value = false;
          myToast(err.message);
          toggleModal(false);
        });
    } else {
      nhaXuatBanService
        .updateNhaXuatBan(_id, body)
        .then((res) => {
          isLoadingForm.value = false;
          myToast(res.data.message, "success");
          fetchData();
          toggleModal(false);
        })
        .catch((err) => {
          isLoadingForm.value = false;
          myToast(err.message);
          toggleModal(false);
        });
    }
  }
};

watch(search, () => {
  currentPage.value = 1;
});
watch(currentPage, () => {
  fetchData();
});
</script>
