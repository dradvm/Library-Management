<template>
  <div class="flex px-20 py-12 w-100" @click="closeDropdown">
    <div class="w-4/12 flex flex-column px-8">
      <div
        class="w-100 relative grow border-dashed border-2 rounded-lg border-indigo-300 overflow-hidden cursor-default"
      >
        <img
          v-if="imageSrc"
          :src="imageSrc"
          alt="Uploaded Image"
          class="w-100 h-100 absolute"
        />
        <input
          class="w-100 h-100 absolute opacity-0 z-10"
          type="file"
          id="image-upload"
          accept="image/*"
          @change="handleFileChange"
          @click.prevent
          title=""
        />
        <div class="w-100 h-100 relative bg-indigo-50" v-if="!imageSrc">
          <div
            class="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-center"
          >
            <font-awesome-icon
              :icon="['fas', 'cloud-arrow-up']"
              class="text-indigo-300 text-5xl"
            />
            <div class="font-medium leading-5 mt-2 text-indigo-300">
              Thả ảnh vào hoặc tải ảnh lên
            </div>
          </div>
        </div>
      </div>
      <div class="py-8">
        <MyButton
          size="medium"
          @click="handleFileInputClick"
          :disabled="btnDisabled"
        >
          <font-awesome-icon :icon="['fas', 'upload']" class="me-2" />
          <label class="cursor-pointer text-base">Tải ảnh</label>
          <input
            class="opacity-0 absolute -z-10 overflow-hidden w-0 h-0"
            type="file"
            id="image-upload2"
            accept="image/*"
            ref="fileInput"
            @change="handleFileChange"
          />
        </MyButton>
      </div>
    </div>
    <div class="w-8/12 px-8 flex flex-column">
      <div class="grow">
        <div class="grid grid-cols-4 gap-x-12">
          <div>
            <div class="font-medium mb-1">Mã sách</div>
            <input
              class="rounded border w-100 font-medium text-slate-500 text-sm"
              type="text"
              disabled
              v-model="sach.maSach"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-x-12 gap-y-5 mt-5">
          <div>
            <div class="font-medium mb-1">Tên sách</div>
            <input
              class="rounded border w-100"
              type="text"
              v-model="sach.tenSach"
            />
          </div>
          <div>
            <div class="font-medium mb-1">Tác giả</div>
            <input
              class="rounded border w-100"
              type="text"
              v-model="sach.tacGia"
            />
          </div>
          <div>
            <div class="font-medium mb-1">Đơn giá</div>
            <input
              class="rounded border w-100"
              type="number"
              min="1000"
              step="1000"
              v-model="sach.donGia"
            />
          </div>
          <div>
            <div class="font-medium mb-1">Số quyển</div>
            <input
              class="rounded border w-100"
              type="number"
              min="1"
              v-model="sach.soQuyen"
            />
          </div>
          <div>
            <div class="font-medium mb-1">Năm xuất bản</div>
            <input
              class="rounded border w-100"
              type="number"
              min="0"
              v-model="sach.namXuatBan"
            />
          </div>
          <div>
            <div class="font-medium mb-1">Nhà xuất bản</div>
            <div class="relative cursor-pointer" @click.stop>
              <div
                class="relative w-full bg-white text-left text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                @click="toggleDropdown"
              >
                <input
                  class="rounded border w-100 cursor-pointer"
                  type="text"
                  :value="nxbSelected"
                  readonly
                />
                <span
                  class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
                >
                  <svg
                    class="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              <!-- <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded="true"
              aria-labelledby="listbox-label"
            >
              <span class="flex items-center"> {{ nxbSelected }} </span>
              
            </button> -->

              <ul
                v-if="checkDropdown"
                class="transition ease-in duration-100 absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                tabindex="-1"
                role="listbox"
                aria-labelledby="listbox-label"
                aria-activedescendant="listbox-option-3"
              >
                <!-- Highlighted: "bg-indigo-600 text-white", Not Highlighted: "text-gray-900" -->

                <li
                  class="relative flex items-center justify-between select-none py-2 px-3 text-gray-900 hover:bg-indigo-600 hover:text-white"
                  id="listbox-option-0"
                  role="option"
                  :class="{
                    'font-semibold': item._id == sach.maNXB,
                  }"
                  v-for="item in nxbs"
                  @click="selectNXB(item)"
                >
                  <div class="flex items-center">
                    <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                    <span class="ml-3 block truncate">{{ item.tenNXB }}</span>
                  </div>

                  <!-- Highlighted: "text-white", Not Highlighted: "text-indigo-600" -->

                  <font-awesome-icon
                    v-if="item._id == sach.maNXB"
                    :icon="['fas', 'check']"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="py-8">
        <MyButton size="medium" @click="submitForm" :disabled="btnDisabled">
          <div class="flex items-center" v-if="!isLoading">
            <font-awesome-icon :icon="['fas', 'book']" />
            <div class="ml-2 text-base">
              {{ isUpdate ? "Cập nhật sách" : "Tạo sách mới" }}
            </div>
          </div>
          <div v-else class="flex items-center">
            <div
              class="animate-spin border-2 border-x-white border-y-transparent rounded-circle w-6 h-6"
            ></div>
            <div class="ml-3 text-base">
              {{ isUpdate ? "Đang cập nhật" : "Đang tạo" }}
            </div>
          </div>
        </MyButton>
      </div>
    </div>
  </div>
</template>
<script setup>
import MyButton from "@/components/MyButton.vue";
import nhaXuatBanService from "@/services/NhaXuatBanService";
import sachService from "@/services/SachService";
import myToast from "@/utils/toast";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const imageSrc = ref("");
const nxbs = ref([]);
const checkDropdown = ref(false);
const fileInput = ref(null);
const sach = ref({
  maSach: "",
  tenSach: "",
  donGia: 0,
  soQuyen: 1,
  namXuatBan: null,
  maNXB: null,
  tacGia: "",
  hinhAnh: null,
});
const isUpdate = ref(false);
const router = useRouter();
const nxbSelected = ref("");
const sachIdUpdate = ref("");
const btnDisabled = ref(false);
const closeDropdown = () => {
  checkDropdown.value = false;
};
const isLoading = ref(false);
const toggleDropdown = () => {
  checkDropdown.value = !checkDropdown.value;
};
const selectNXB = (nxb) => {
  nxbSelected.value = nxb.tenNXB;
  sach.value.maNXB = nxb._id;
};

const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (file && file.type.startsWith("image/")) {
    sach.value.hinhAnh = file;
    const reader = new FileReader();

    reader.onload = (e) => {
      imageSrc.value = e.target.result;
    };

    reader.readAsDataURL(file);
  } else {
    alert("Please select a valid image file.");
  }
};
const handleFileInputClick = () => {
  fileInput.value.click();
};
const fetchDataNhaXuatBans = () => {
  nhaXuatBanService
    .getAllNhaXuatBan()
    .then((res) => (nxbs.value = res.data))
    .catch((err) => myToast(err.message));
};
const fetchNewMaSach = () => {
  sachService
    .getNewMaSach()
    .then((res) => (sach.value.maSach = res.data))
    .catch((err) => myToast(err.message));
};
const submitForm = () => {
  if (validateForm()) {
    isLoading.value = true;
    btnDisabled.value = true;
    if (isUpdate.value) {
      sachService
        .updateSach(sachIdUpdate.value, sach.value)
        .then((res) => {
          myToast(res.data.message, "success", 2000, () => {
            router.push({ name: "BookPage" });
          });
          isLoading.value = false;
        })
        .catch((err) => {
          isLoading.value = false;
          myToast("Lỗi hệ thống, vui lòng thử lại sau!");
        });
    } else {
      sachService
        .createSach(sach.value)
        .then((res) => {
          myToast(res.data.message, "success", 2000, () => {
            router.push({ name: "BookPage" });
          });
          isLoading.value = false;
        })
        .catch((err) => {
          isLoading.value = false;
          myToast("Lỗi hệ thống, vui lòng thử lại sau!");
        });
    }
  }
};
const validateForm = () => {
  if (!imageSrc.value) {
    myToast("Vui lòng chọn hình ảnh sách");
    return false;
  }
  if (sach.value.tenSach.trim().length === 0) {
    myToast("Vui lòng nhập tên sách");
    return false;
  } else if (sach.value.tenSach.trim().length > 200) {
    myToast("Tên sách tối đa 200 kí tự");
    return false;
  }

  if (sach.value.tacGia.trim().length === 0) {
    myToast("Vui lòng nhập tên tác giả");
    return false;
  } else if (sach.value.tacGia.trim().length > 200) {
    myToast("Tên tác giả tối đa 200 kí tự");
    return false;
  }

  if (parseInt(sach.value.donGia) < 1000) {
    myToast("Đơn giá tối thiểu 1000 VNĐ");
    return false;
  }
  if (parseInt(sach.value.soQuyen) < 1) {
    myToast("Số quyển tối thiểu là 1");
    return false;
  }
  if (!sach.value.namXuatBan) {
    myToast("Vui lòng nhập năm xuất bản");
    return false;
  } else if (parseInt(sach.value.namXuatBan) <= 0) {
    myToast("Năm xuất bản phải lớn hơn 0");
    return false;
  } else if (parseInt(sach.value.namXuatBan) > new Date().getFullYear()) {
    myToast(`Năm xuất bản phải nhỏ hơn hoặc bằng ${new Date().getFullYear()}`);
    return false;
  }
  if (!sach.value.maNXB) {
    myToast("Vui lòng chọn nhà xuất bản");
    return false;
  }
  return true;
};
const fetchDataSachUpdate = () => {
  sachService
    .getSachByMaSach(router.currentRoute.value.params.maSach)
    .then((res) => setValueSach(res.data))
    .catch((err) => myToast(err.message));
};
const setValueSach = (data) => {
  sach.value.donGia = data.donGia;
  sach.value.maNXB = data.maNXB._id;
  sach.value.namXuatBan = data.namXuatBan;
  sach.value.maSach = data.maSach;
  sach.value.soQuyen = data.soQuyen;
  sach.value.tacGia = data.tacGia;
  sach.value.tenSach = data.tenSach;
  sach.value.hinhAnh = data.hinhAnh;
  imageSrc.value = data.hinhAnh;
  sachIdUpdate.value = data._id;
  nxbSelected.value = data.maNXB.tenNXB;
};
onMounted(() => {
  fetchDataNhaXuatBans();
  switch (router.currentRoute.value.name) {
    case "AddBookPage": {
      fetchNewMaSach();
      break;
    }
    case "UpdateBookPage": {
      isUpdate.value = true;
      fetchDataSachUpdate();
      break;
    }
  }
});
</script>
