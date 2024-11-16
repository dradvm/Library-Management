<template>
  <div class="fixed flex items-center justify-center h-100 w-100 bg-slate-50">
    <div style="width: 500px; height: 85vh">
      <div class="flex flex-col items-center">
        <img src="../assets/logo.png" width="100" />
        <div class="text-2xl font-semibold">Đăng nhập vào tài khoản</div>
      </div>
      <div class="bg-white px-14 py-10 mt-5 rounded-lg shadow">
        <div>
          <div>
            <label
              for="msnv"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Mã số nhân viên</label
            >
            <div class="mt-0.5">
              <input
                v-model="msNV"
                id="msnv"
                name="msnv"
                type="text"
                required="true"
                class="block w-full font-medium rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div
              class="text-red-500 font-medium text-sm mt-1"
              v-if="messageErrorMsNV"
            >
              <font-awesome-icon
                :icon="['fas', 'circle-exclamation']"
                class="me-2"
              />
              <span>{{ messageErrorMsNV }}</span>
            </div>
          </div>
          <div class="mt-2">
            <label
              for="password"
              class="block text-sm font-semibold leading-6 text-gray-900"
              >Mật khẩu</label
            >
            <div class="mt-0.5">
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div
              class="text-red-500 font-medium text-sm mt-1"
              v-if="messageErrorPassword"
            >
              <font-awesome-icon
                :icon="['fas', 'circle-exclamation']"
                class="me-2"
              />
              <span>{{ messageErrorPassword }}</span>
            </div>
          </div>
        </div>
        <div class="mt-5">
          <MyButton size="small" @click="login">Đăng nhập</MyButton>
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

const msNV = ref("");
const password = ref("");
const messageErrorMsNV = ref(null);
const messageErrorPassword = ref(null);
const authStore = useAuthStore();
const router = useRouter();
watch(msNV, (oldValue, newValue) => {
  messageErrorMsNV.value = null;
});
watch(password, (oldValue, newValue) => {
  messageErrorPassword.value = null;
});
const validMsNV = () => {
  if (msNV.value.length == 0) {
    messageErrorMsNV.value = "Vui lòng nhập mã số nhân viên";
    return false;
  } else if (msNV.value.trim().length == 0) {
    messageErrorMsNV.value = "Vui lòng không nhập các kí tự trắng";
    return false;
  }
  messageErrorMsNV.value = null;
  return true;
};
const validPassword = () => {
  if (password.value.length == 0) {
    messageErrorPassword.value = "Vui lòng nhập password";
    return false;
  } else if (password.value.trim().length == 0) {
    messageErrorPassword.value = "Vui lòng không nhập các kí tự trắng";
    return false;
  }
  messageErrorPassword.value = null;
  return true;
};
const login = () => {
  const checkMsNV = validMsNV();
  const checkPassword = validPassword();
  if (!checkMsNV || !checkPassword) {
    return;
  }
  authService
    .loginEmployee({
      msNV: msNV.value,
      password: password.value,
    })
    .then((res) => {
      console.log(res);
      if (res.status === 401) {
        messageErrorPassword.value = res.data.message;
      } else {
        localStorage.setItem("accessToken", res.data);
        authStore.login(res.data).then((res) => {
          router.push({ name: "BookPage" });
        });
      }
    })
    .catch((err) => {
      myToast(err);
    });
};
</script>
