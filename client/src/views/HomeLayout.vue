<template>
  <div class="fixed flex h-100 w-100">
    <div class="bg-slate-900 flex flex-column items-center text-white px-3 py-3 min-w-20">
      <RouterLink to="">
          <font-awesome-icon
            :icon="['fas', 'book-open']"
            class="text-3xl text-blue-600"
          />
        </RouterLink>
        <div class="flex flex-column mt-8">
          <RouterLink
            to=""
            class="transition cursor-pointer mt-1 hover:bg-slate-800 px-4 py-3 rounded"
          >
            <font-awesome-icon :icon="['fas', 'user']" class="text-lg" />
          </RouterLink>
          <RouterLink
            to="/Home/Book"
            class="transition cursor-pointer mt-1 px-4 py-3 rounded"
            :class="{
              'hover:bg-slate-800': !['BookPage'].includes(route.name),
              'bg-slate-700': ['BookPage'].includes(route.name),
            }"
          >
            <font-awesome-icon :icon="['fas', 'book']" class="text-lg" />
          </RouterLink>
          <RouterLink
            to=""
            class="transition cursor-pointer mt-1 hover:bg-slate-800 px-4 py-3 rounded"
          >
            <font-awesome-icon
              :icon="['fas', 'address-book']"
              class="text-lg"
            />
          </RouterLink>
          <RouterLink
            to=""
            class="transition cursor-pointer mt-1 hover:bg-slate-800 px-4 py-3 rounded"
          >
            <font-awesome-icon
              :icon="['fas', 'chart-simple']"
              class="text-lg"
            />
          </RouterLink>
          <RouterLink
            to=""
            class="transition cursor-pointer mt-1 hover:bg-slate-800 px-4 py-3 rounded"
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
import { useRoute } from "vue-router";

const route = useRoute();
</script>
