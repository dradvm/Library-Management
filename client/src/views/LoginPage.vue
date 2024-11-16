<template>
  <div class="fixed flex items-center justify-center h-100 w-100 bg-slate-50">
    <div
      class="bg-white shadow-lg flex overflow-hidden"
      style="width: 800px; height: 450px"
    >
      <div class="px-14 py-10 w-3/5">
        <div>
          <div class="text-2xl font-medium text-center text-indigo-600">
            Đăng Nhập
          </div>
          <div class="mt-10">
            <label
              for="email"
              class="block font-semibold leading-6 text-gray-900"
              >Email</label
            >
            <div class="mt-1">
              <input
                v-model="email"
                id="email"
                name="email"
                type="email"
                required="true"
                class="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div
              class="text-red-500 font-medium text-sm mt-1"
              v-if="messageErrorEmail"
            >
              <font-awesome-icon
                :icon="['fas', 'circle-exclamation']"
                class="me-2"
              />
              <span>{{ messageErrorEmail }}</span>
            </div>
          </div>

          <div class="mt-4">
            <label
              for="password"
              class="block font-semibold leading-6 text-gray-900"
              >Mật khẩu</label
            >
            <div class="mt-1">
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                class="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div class="flex justify-between items-center">
              <div
                v-if="messageErrorPassword"
                class="text-red-500 font-medium text-sm mt-1"
              >
                <font-awesome-icon
                  :icon="['fas', 'circle-exclamation']"
                  class="me-2"
                />
                <span>{{ messageErrorPassword }}</span>
              </div>
              <div v-else></div>
              <div
                class="text-indigo-500 text-xs font-medium cursor-pointer hover:text-indigo-700 transition"
                :class="{ 'mt-1': !messageErrorPassword }"
              >
                Quên mật khẩu?
              </div>
            </div>
          </div>
        </div>

        <div class="mt-7">
          <MyButton size="small" @click="login">Đăng nhập</MyButton>
        </div>
      </div>
      <div
        class="bg-gradient-to-b text-center text-white from-indigo-700 to-indigo-900 w-2/5 flex items-center justify-around"
      >
        <div class="flex flex-column justify-around items-center">
          <div class="text-xl font-medium">Chào mừng bạn đăng nhập</div>
          <div class="mt-2 text-sm">Chưa có tài khoản?</div>
          <RouterLink
            style="border: 1px solid white"
            class="rounded-full mt-3"
            :to="{ name: 'RegisterPage' }"
          >
            <MyButton type="type2" size="small" class="w-32" :is-hover="false"
              ><span class="text-white hover:text-slate-500 text-sm"
                >Đăng ký ngay!</span
              ></MyButton
            >
          </RouterLink>
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

const email = ref("");
const password = ref("");
const messageErrorEmail = ref(null);
const messageErrorPassword = ref(null);
const authStore = useAuthStore();
const router = useRouter();
watch(email, (oldValue, newValue) => {
  messageErrorEmail.value = null;
});
watch(password, (oldValue, newValue) => {
  messageErrorPassword.value = null;
});
const validEmail = () => {
  if (email.value.length == 0) {
    messageErrorEmail.value = "Vui lòng nhập email";
    return false;
  } else if (email.value.trim().length == 0) {
    messageErrorEmail.value = "Vui lòng không nhập các kí tự trắng";
    return false;
  }
  messageErrorEmail.value = null;
  return true;
};
const validPassword = () => {
  if (password.value.length == 0) {
    messageErrorPassword.value = "Vui lòng nhập mật khẩu";
    return false;
  } else if (password.value.trim().length == 0) {
    messageErrorPassword.value = "Vui lòng không nhập các kí tự trắng";
    return false;
  }
  messageErrorPassword.value = null;
  return true;
};
const login = () => {
  const checkEmail = validEmail();
  const checkPassword = validPassword();
  if (!checkEmail || !checkPassword) {
    return;
  }
  authService
    .login({
      email: email.value,
      password: password.value,
    })
    .then((res) => {
      if (res.status === 401) {
        messageErrorPassword.value = res.data.message;
      } else {
        localStorage.setItem("accessToken", res.data);
        authStore.login(res.data).then((res) => {
          router.push({ name: "HomePage" });
        });
      }
    })
    .catch((err) => {
      myToast(err);
    });
};
</script>
