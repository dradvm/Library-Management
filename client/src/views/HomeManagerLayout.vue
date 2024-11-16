<template>
  <div class="fixed flex h-100 w-100">
    <div
      class="bg-slate-900 flex flex-column items-center text-white px-3 py-3 min-w-20"
    >
      <RouterLink to="">
        <font-awesome-icon
          :icon="['fas', 'book-open']"
          class="text-3xl text-blue-600"
        />
      </RouterLink>
      <div class="flex flex-column mt-8">
        <RouterLink
          :to="{
            name: 'BookPage',
          }"
          class="transition cursor-pointer mt-1 px-4 py-3 rounded"
          :class="{
            'hover:bg-slate-800': !['BookPage'].includes(route.name),
            'bg-slate-700': [
              'BookPage',
              'AddBookPage',
              'UpdateBookPage',
            ].includes(route.name),
          }"
        >
          <font-awesome-icon :icon="['fas', 'book']" class="text-lg" />
        </RouterLink>
        <RouterLink
          :to="{
            name: 'EmployeePage',
          }"
          v-if="authStore.$state.user.chucVu == 'ADMIN'"
          class="transition cursor-pointer mt-1 px-4 py-3 rounded"
          :class="{
            'hover:bg-slate-800': !['EmployeePage'].includes(route.name),
            'bg-slate-700': [
              'EmployeePage',
              'AddEmployeePage',
              'UpdateEmployeePage',
            ].includes(route.name),
          }"
        >
          <font-awesome-icon :icon="['fas', 'user-tie']" class="text-lg" />
        </RouterLink>
        <RouterLink
          :to="{
            name: 'PublisherPage',
          }"
          class="transition cursor-pointer mt-1 hover:bg-slate-800 px-4 py-3 rounded"
          :class="{
            'hover:bg-slate-800': !['PublisherPage'].includes(route.name),
            'bg-slate-700': [
              'PublisherPage',
              'AddPublisherPage',
              'UpdatePublisherPage',
            ].includes(route.name),
          }"
        >
          <font-awesome-icon :icon="['fas', 'address-book']" class="text-lg" />
        </RouterLink>
        <RouterLink
          :to="{
            name: 'OrderPage',
          }"
          class="transition cursor-pointer mt-1 hover:bg-slate-800 px-4 py-3 rounded"
          :class="{
            'hover:bg-slate-800': !['OrderPage'].includes(route.name),
            'bg-slate-700': ['OrderPage'].includes(route.name),
          }"
        >
          <font-awesome-icon :icon="['fas', 'folder-open']" class="text-lg" />
        </RouterLink>
        <RouterLink
          :to="{
            name: 'ConfirmOrderPage',
          }"
          class="transition cursor-pointer mt-1 hover:bg-slate-800 px-4 py-3 rounded"
          :class="{
            'hover:bg-slate-800': !['ConfirmOrderPage'].includes(route.name),
            'bg-slate-700': ['ConfirmOrderPage'].includes(route.name),
          }"
        >
          <font-awesome-icon :icon="['far', 'folder-open']" class="text-lg" />
        </RouterLink>
        <RouterLink
          to=""
          class="transition cursor-pointer mt-1 hover:bg-slate-800 px-4 py-3 rounded"
          @click="logout"
        >
          <font-awesome-icon
            :icon="['fas', 'right-from-bracket']"
            class="text-lg"
          />
        </RouterLink>
      </div>
    </div>
    <RouterView></RouterView>
  </div>
</template>

<style></style>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  router.push({ name: "LoginManagerPage" });
};
</script>
