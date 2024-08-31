<template>
  <div class="fixed flex items-center justify-center h-100 w-100 bg-slate-50">
    <div style="width: 500px; height: 85vh">
      <div class="flex flex-col items-center">
        <img src="../assets/logo.png" width="100" />
        <div class="text-2xl font-semibold">Đăng nhập vào tài khoản</div>
      </div>
      <form class="bg-white px-14 py-10 mt-5 rounded-lg shadow">
        <div>
          <label
            for="msnv"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Mã số nhân viên</label
          >
          <div class="mt-0.5">
            <input
              id="msnv"
              name="msnv"
              type="text"
              required="true"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div class="text-red-500 font-medium text-sm mt-1">
          <font-awesome-icon
            :icon="['fas', 'circle-exclamation']"
            class="me-2"
          />
          <span>Error</span>
        </div>
        <div class="mt-2">
          <label
            for="password"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Mật khẩu</label
          >
          <div class="mt-0.5">
            <input
              id="password"
              name="password"
              type="password"
              required="true"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="text-red-500 font-medium text-sm mt-1">
          <font-awesome-icon
            :icon="['fas', 'circle-exclamation']"
            class="me-2"
          />
          <span>Error</span>
        </div>
        <div class="mt-5">
          <MyButton size="small">Đăng nhập</MyButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import MyButton from "@/components/MyButton.vue";
</script>
