<template>
  <div class="flex px-20 py-20 w-100" @click="closeDropdown">
    <div class="w-4/12 flex flex-column px-8 items-center">
      <div
        class="w-64 h-64 relative border-dashed border-2 rounded-lg border-indigo-300 overflow-hidden cursor-default"
      >
        <img
          v-if="imageSrc"
          :src="imageSrc"
          alt="Uploaded Image"
          class="w-64 h-64 absolute"
        />
        <input
          class="w-64 h-64 absolute opacity-0 z-10"
          type="file"
          id="image-upload"
          accept="image/*"
          @change="handleFileChange"
          @click.prevent
          title=""
        />
        <div class="w-64 h-64 relative bg-indigo-50" v-if="!imageSrc">
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
      <div class="py-8 w-100">
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
        <div class="grid grid-cols-2 gap-x-12 gap-y-5">
          <div>
            <div class="font-medium mb-1">Chức vụ</div>
            <div class="relative cursor-pointer" @click.stop>
              <div
                class="relative w-full bg-white text-left text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                @click="toggleDropdown"
              >
                <input
                  class="rounded border w-100 cursor-pointer"
                  type="text"
                  :value="nhanVien.chucVu"
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
                    'font-semibold': item == nhanVien.chucVu,
                  }"
                  v-for="item in chucVus"
                  @click="selectChucVu(item)"
                >
                  <div class="flex items-center">
                    <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                    <span class="ml-3 block truncate">{{ item }}</span>
                  </div>

                  <!-- Highlighted: "text-white", Not Highlighted: "text-indigo-600" -->

                  <font-awesome-icon
                    v-if="item == nhanVien.chucVu"
                    :icon="['fas', 'check']"
                  />
                </li>
              </ul>
            </div>
          </div>
          <div></div>
          <div>
            <div class="font-medium mb-1">Họ tên</div>
            <input
              class="rounded border w-100"
              type="text"
              v-model="nhanVien.hoTenNV"
            />
          </div>

          <div>
            <div class="font-medium mb-1">Số điện thoại</div>
            <input
              class="rounded border w-100"
              type="text"
              maxlength="10"
              v-model="nhanVien.soDienThoai"
            />
          </div>
        </div>
        <div class="grid mt-5">
          <div class="font-medium mb-1">Địa chỉ</div>

          <textarea
            class="rounded border w-100 resize-none h-36"
            v-model="nhanVien.diaChi"
          ></textarea>
        </div>
      </div>
      <div class="py-8">
        <MyButton size="medium" @click="submitForm" :disabled="btnDisabled">
          <div class="flex items-center" v-if="!isLoading">
            <font-awesome-icon :icon="['fas', 'book']" />
            <div class="ml-2 text-base">
              {{ isUpdate ? "Cập nhật nhân viên" : "Tạo nhân viên mới" }}
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
import nhanVienService from "@/services/NhanVienService";
import myToast from "@/utils/toast";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const isUpdate = ref(false);
const nhanVien = ref({
  hoTenNV: "",
  password: "",
  chucVu: "Nhân viên",
  diaChi: "",
  soDienThoai: "",
  hinhAnh: null,
});
const chucVus = ref([]);
const imageSrc = ref("");
const fileInput = ref(null);
const checkDropdown = ref(false);
const isLoading = ref(false);
const router = useRouter();
const btnDisabled = ref(false);
const nhanVienIdUpdate = ref("");

const validateForm = () => {
  const soDienThoaiRegex = /^0\d{6,9}$/;
  if (!imageSrc.value) {
    myToast("Vui lòng chọn hình ảnh nhân viên");
    return false;
  }
  if (nhanVien.value.hoTenNV.trim().length === 0) {
    myToast("Vui lòng nhập tên nhân viên");
    return false;
  } else if (nhanVien.value.hoTenNV.trim().length > 200) {
    myToast("Tên nhân viên tối đa 200 kí tự");
    return false;
  }
  if (nhanVien.value.soDienThoai.trim().length === 0) {
    myToast("Vui lòng nhập số điện thoại nhân viên");
    return false;
  } else if (!soDienThoaiRegex.test(nhanVien.value.soDienThoai)) {
    myToast("Vui lòng nhập đúng đinh dạng số điện thoại");
    return false;
  }

  if (nhanVien.value.diaChi.trim().length === 0) {
    myToast("Vui lòng nhập địa chỉ");
    return false;
  } else if (nhanVien.value.diaChi.trim().length > 200) {
    myToast("Địa chỉ tối đa 200 ký tự");
    return false;
  }
  return true;
};

const submitForm = () => {
  if (validateForm()) {
    isLoading.value = true;
    btnDisabled.value = true;
    if (isUpdate.value) {
      nhanVienService
        .updateNhanVien(nhanVienIdUpdate.value, nhanVien.value)
        .then((res) => {
          myToast(res.data.message, "success", 2000, () => {
            router.push({ name: "EmployeePage" });
          });
          isLoading.value = false;
        })
        .catch((err) => {
          isLoading.value = false;
          myToast("Lỗi hệ thống, vui lòng thử lại sau!");
        });
    } else {
      nhanVienService
        .createNhanVien(nhanVien.value)
        .then((res) => {
          myToast(res.data.message, "success", 2000, () => {
            router.push({ name: "EmployeePage" });
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

const closeDropdown = () => {
  checkDropdown.value = false;
};
const toggleDropdown = () => {
  checkDropdown.value = !checkDropdown.value;
};
const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (file && file.type.startsWith("image/")) {
    nhanVien.value.hinhAnh = file;
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
const fetchDataChucVus = () => {
  nhanVienService
    .getEnumChucVuValues()
    .then((res) => {
      chucVus.value = res.data;
    })
    .catch((err) => myToast(err.message));
};
const selectChucVu = (chucVu) => {
  nhanVien.value.chucVu = chucVu;
};

const fetchDataNhanVienUpdate = () => {
  nhanVienService
    .getNhanVienByMSNV(router.currentRoute.value.params.msNV)
    .then((res) => setValuesNhanVien(res.data))
    .catch((err) => myToast(err));
};

const setValuesNhanVien = (data) => {
  nhanVien.value.hinhAnh = data.hinhAnh;
  imageSrc.value = data.hinhAnh;
  nhanVien.value.hoTenNV = data.hoTenNV;
  nhanVien.value.soDienThoai = data.soDienThoai;
  nhanVien.value.diaChi = data.diaChi;
  nhanVien.value.chucVu = data.chucVu;
  nhanVienIdUpdate.value = data._id;
};

onMounted(() => {
  fetchDataChucVus();
  switch (router.currentRoute.value.name) {
    case "AddEmployeePage": {
      break;
    }
    case "UpdateEmployeePage": {
      isUpdate.value = true;
      fetchDataNhanVienUpdate();
      break;
    }
  }
});
</script>
