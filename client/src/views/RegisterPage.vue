<template>
  <div class="fixed flex items-center justify-center h-100 w-100 bg-slate-50">
    <div
      class="bg-white shadow-lg flex overflow-hidden"
      style="width: 900px; height: 500px"
    >
      <div
        class="bg-gradient-to-b z-50 text-center text-white from-indigo-700 to-indigo-900 w-2/6 flex items-center justify-around"
      >
        <div class="flex flex-column justify-around items-center">
          <div class="text-xl font-medium">Chào mừng bạn đăng ký</div>
          <div class="mt-2 text-sm">Đã có tài khoản?</div>
          <RouterLink
            style="border: 1px solid white"
            class="rounded-full mt-3"
            :to="{ name: 'LoginPage' }"
          >
            <MyButton type="type2" size="small" class="w-36" :is-hover="false"
              ><span class="text-white hover:text-slate-500 text-sm"
                >Đăng nhập ngay!</span
              ></MyButton
            >
          </RouterLink>
        </div>
      </div>
      <div class="px-14 py-10 w-4/6">
        <div>
          <div class="text-2xl font-medium text-center text-indigo-600">
            Đăng Ký
          </div>
          <div class="relative min-h-80 mt-4">
            <div
              class="grid grid-cols-3 gap-x-4 mt-3 transition absolute"
              :class="{
                '-transform-x-2full': isStep2,
              }"
            >
              <div class="col-span-2">
                <label
                  class="block text-sm font-semibold leading-6 text-gray-900"
                  for="hoLot"
                  >Họ lót</label
                >
                <div class="mt-0.5">
                  <input
                    v-model="docGia.hoLot"
                    id="hoLot"
                    name="hoLot"
                    type="text"
                    required="true"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div
                  class="text-red-500 font-medium text-sm mt-1"
                  v-if="messageErrorDocGia.hoLot"
                >
                  <font-awesome-icon
                    :icon="['fas', 'circle-exclamation']"
                    class="me-2"
                  />
                  <span>{{ messageErrorDocGia.hoLot }}</span>
                </div>
              </div>
              <div>
                <label
                  class="block text-sm font-semibold leading-6 text-gray-900"
                  for="ten"
                  >Tên</label
                >
                <div class="mt-0.5">
                  <input
                    v-model="docGia.ten"
                    id="ten"
                    name="ten"
                    type="text"
                    required="true"
                    class="block w-full font-medium rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div
                  class="text-red-500 font-medium text-sm mt-1"
                  v-if="messageErrorDocGia.ten"
                >
                  <font-awesome-icon
                    :icon="['fas', 'circle-exclamation']"
                    class="me-2"
                  />
                  <span>{{ messageErrorDocGia.ten }}</span>
                </div>
              </div>
              <div>
                <label
                  class="block text-sm font-semibold leading-6 text-gray-900"
                  for="ngaySinh"
                  >Ngày sinh</label
                >
                <div class="mt-0.5">
                  <input
                    v-model="docGia.ngaySinh"
                    id="ngaySinh"
                    name="ngaySinh"
                    type="date"
                    required="true"
                    :max="getCurrentDate()"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div
                  class="text-red-500 font-medium text-sm mt-1"
                  v-if="messageErrorDocGia.ngaySinh"
                >
                  <font-awesome-icon
                    :icon="['fas', 'circle-exclamation']"
                    class="me-2"
                  />
                  <span>{{ messageErrorDocGia.ngaySinh }}</span>
                </div>
              </div>
              <div>
                <label
                  class="block text-sm font-semibold leading-6 text-gray-900"
                  for="dienThoai"
                  >Số điện thoại</label
                >
                <div class="mt-0.5">
                  <input
                    v-model="docGia.dienThoai"
                    id="dienThoai"
                    name="dienThoai"
                    type="text"
                    required="true"
                    maxlength="10"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div
                  class="text-red-500 font-medium text-sm mt-1"
                  v-if="messageErrorDocGia.dienThoai"
                >
                  <font-awesome-icon
                    :icon="['fas', 'circle-exclamation']"
                    class="me-2"
                  />
                  <span>{{ messageErrorDocGia.dienThoai }}</span>
                </div>
              </div>
              <div>
                <label
                  class="block text-sm font-semibold leading-6 text-gray-900"
                  for="phai"
                  >Phái</label
                >
                <div class="mt-3 flex justify-evenly">
                  <div class="flex items-center">
                    <input
                      v-model="docGia.phai"
                      id="Male"
                      name="phai"
                      type="radio"
                      value="Male"
                      checked
                      class="border"
                    />
                    <label class="text-sm ms-2" for="Male">Nam</label>
                  </div>
                  <div class="flex items-center">
                    <input
                      v-model="docGia.phai"
                      id="Female"
                      name="phai"
                      type="radio"
                      value="Female"
                      class="border"
                    />

                    <label class="text-sm ms-2" for="Female">Nữ</label>
                  </div>
                </div>
              </div>
              <div class="col-span-3">
                <label
                  class="block text-sm font-semibold leading-6 text-gray-900"
                  for="diaChi"
                  >Địa chỉ</label
                >
                <div class="mt-0.5">
                  <textarea
                    v-model="docGia.diaChi"
                    id="diaChi"
                    name="diaChi"
                    type="text"
                    required="true"
                    class="rounded border w-100 resize-none h-24"
                  ></textarea>
                </div>
                <div
                  class="text-red-500 font-medium text-sm mt-1"
                  v-if="messageErrorDocGia.diaChi"
                >
                  <font-awesome-icon
                    :icon="['fas', 'circle-exclamation']"
                    class="me-2"
                  />
                  <span>{{ messageErrorDocGia.diaChi }}</span>
                </div>
              </div>
            </div>
            <div
              class="absolute transition flex items-center justify-around w-100 h-100"
              :class="{
                'transform-x-2full': !isStep2,
              }"
            >
              <MyButton
                class="absolute top-0 left-0"
                size="small"
                type="type2"
                @click="toggle"
                :is-hover="false"
                ><span class="font-medium"
                  ><font-awesome-icon
                    :icon="['fas', 'arrow-left']"
                    class="text-lg" /></span
              ></MyButton>
              <div class="w-64">
                <div class="">
                  <label
                    class="block text-sm font-semibold leading-6 text-gray-900"
                    for="email"
                    >Email</label
                  >
                  <div class="mt-0.5">
                    <input
                      v-model="docGia.email"
                      id="email"
                      name="email"
                      type="email"
                      required="true"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div
                    class="text-red-500 font-medium text-sm mt-1"
                    v-if="messageErrorDocGia.email"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'circle-exclamation']"
                      class="me-2"
                    />
                    <span>{{ messageErrorDocGia.email }}</span>
                  </div>
                </div>
                <div class="">
                  <label
                    class="block text-sm font-semibold leading-6 text-gray-900"
                    for="password"
                    >Mật khẩu</label
                  >
                  <div class="mt-0.5">
                    <input
                      v-model="docGia.password"
                      id="password"
                      name="password"
                      type="password"
                      required="true"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div
                    class="text-red-500 font-medium text-sm mt-1"
                    v-if="messageErrorDocGia.password"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'circle-exclamation']"
                      class="me-2"
                    />
                    <span>{{ messageErrorDocGia.password }}</span>
                  </div>
                </div>

                <div class="">
                  <label
                    class="block text-sm font-semibold leading-6 text-gray-900"
                    for="confirmPassword"
                    >Xác nhận mật khẩu</label
                  >
                  <div class="mt-0.5">
                    <input
                      v-model="confirmPassword"
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required="true"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div
                    class="text-red-500 font-medium text-sm mt-1"
                    v-if="messageErrorDocGia.confirmPassword"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'circle-exclamation']"
                      class="me-2"
                    />
                    <span>{{ messageErrorDocGia.confirmPassword }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-7">
          <MyButton size="small" @click="changeToStep2" v-if="!isStep2"
            >Tiếp theo</MyButton
          >
          <MyButton
            size="small"
            v-else
            @click="submit"
            :disabled="isDisabled"
            :is-hover="!isDisabled"
            >Đăng ký</MyButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyButton from "@/components/MyButton.vue";
import authService from "@/services/AuthService";
import { useAuthStore } from "@/stores/auth";
import myToast from "@/utils/toast";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const isStep2 = ref(false);

const docGia = ref({
  hoLot: "",
  ten: "",
  phai: "Male",
  diaChi: "",
  ngaySinh: "",
  dienThoai: "",
  email: "",
  password: "",
});
const messageErrorDocGia = ref({
  hoLot: null,
  ten: null,
  phai: null,
  diaChi: null,
  ngaySinh: null,
  dienThoai: null,
  email: null,
  password: null,
  confirmPassword: null,
});
const confirmPassword = ref("");
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Tháng cần có 2 chữ số
  const day = String(today.getDate()).padStart(2, "0"); // Ngày cũng cần có 2 chữ số
  return `${year}-${month}-${day}`;
};
const isDisabled = ref(false);
const router = useRouter();
const validateStep1 = () => {
  var check = true;
  const soDienThoaiRegex = /^0\d{6,9}$/;

  if (docGia.value.hoLot.trim().length == 0) {
    messageErrorDocGia.value.hoLot = "Vui lòng nhập giá trị";
    check = false;
  }
  if (docGia.value.ten.trim().length == 0) {
    messageErrorDocGia.value.ten = "Vui lòng nhập giá trị";
    check = false;
  }
  if (!docGia.value.ngaySinh) {
    messageErrorDocGia.value.ngaySinh = "Vui lòng chọn giá trị";
    check = false;
  }
  if (docGia.value.dienThoai.trim().length == 0) {
    messageErrorDocGia.value.dienThoai = "Vui lòng nhập giá trị";
    check = false;
  } else if (!soDienThoaiRegex.test(docGia.value.dienThoai)) {
    messageErrorDocGia.value.dienThoai = "SĐT không hợp lệ";
    check = false;
  }

  if (docGia.value.diaChi.trim().length == 0) {
    messageErrorDocGia.value.diaChi = "Vui lòng nhập giá trị";
    check = false;
  }
  return check;
};

const validateStep2 = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var check = true;
  if (docGia.value.email.trim().length == 0) {
    messageErrorDocGia.value.email = "Vui lòng nhập email";
    check = false;
  } else if (!emailRegex.test(docGia.value.email)) {
    messageErrorDocGia.value.email = "Email không hợp lệ";
    check = false;
  }
  if (docGia.value.password.length == 0) {
    messageErrorDocGia.value.password = "Vui lòng nhập mật khẩu";
    check = false;
  } else if (docGia.value.password.length < 6) {
    messageErrorDocGia.value.password = "Mật khẩu tối thiểu 6 kí tự";
    check = false;
  }
  if (docGia.value.password != confirmPassword.value) {
    messageErrorDocGia.value.confirmPassword = "Mật khẩu không khớp";
    check = false;
  }
  return check;
};

watch(
  () => docGia.value.hoLot,
  () => {
    messageErrorDocGia.value.hoLot = null;
  }
);
watch(
  () => docGia.value.ten,
  () => {
    messageErrorDocGia.value.ten = null;
  }
);
watch(
  () => docGia.value.ngaySinh,
  () => {
    messageErrorDocGia.value.ngaySinh = null;
  }
);
watch(
  () => docGia.value.dienThoai,
  () => {
    messageErrorDocGia.value.dienThoai = null;
  }
);
watch(
  () => docGia.value.diaChi,
  () => {
    messageErrorDocGia.value.diaChi = null;
  }
);
watch(
  () => docGia.value.email,
  () => {
    messageErrorDocGia.value.email = null;
  }
);
watch(
  () => docGia.value.password,
  () => {
    messageErrorDocGia.value.password = null;
  }
);
watch(confirmPassword, () => {
  messageErrorDocGia.value.confirmPassword = null;
});

const toggle = () => {
  isStep2.value = !isStep2.value;
};

const changeToStep2 = () => {
  if (validateStep1()) {
    toggle();
  }
};

const submit = () => {
  if (validateStep1() && !isDisabled.value) {
    if (validateStep2() && !isDisabled.value) {
      isDisabled.value = true;
      authService
        .register(docGia.value)
        .then((res) => {
          if (res.status == 409) {
            messageErrorDocGia.value.email = res.data.message;
            isDisabled.value = false;
          } else {
            myToast(res.data.message, "success", 1000, () => {
              router.push({ name: "HomePage" });
            });
          }
        })
        .catch((err) => myToast(err.message));
    }
  } else {
    isStep2.value = false;
    isDisabled.value = false;
  }
};
</script>

<style scoped>
.transform-x-2full {
  transform: translateX(200%);
}
.-transform-x-2full {
  transform: translateX(-200%);
}
</style>
