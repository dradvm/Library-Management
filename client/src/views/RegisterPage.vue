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
          <RouterLink style="border: 1px solid white" class="rounded-full mt-3">
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
                '-transform-x-2full': check,
              }"
            >
              <div class="col-span-2">
                <label
                  class="block text-sm font-semibold leading-6 text-gray-900"
                  >Họ lót</label
                >
                <div class="mt-0.5">
                  <input
                    v-model="msNV"
                    id="msnv"
                    name="msnv"
                    type="text"
                    required="true"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div class="text-red-500 font-medium text-sm mt-1" v-if="true">
                  <font-awesome-icon
                    :icon="['fas', 'circle-exclamation']"
                    class="me-2"
                  />
                  <span>{{ "Vui lòng nhập giá trị" }}</span>
                </div>
              </div>
              <div>
                <label
                  class="block text-sm font-semibold leading-6 text-gray-900"
                  >Tên</label
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
                <div class="text-red-500 font-medium text-sm mt-1" v-if="true">
                  <font-awesome-icon
                    :icon="['fas', 'circle-exclamation']"
                    class="me-2"
                  />
                  <span>{{ "Vui lòng nhập giá trị" }}</span>
                </div>
              </div>
              <div>
                <label
                  class="block text-sm font-semibold leading-6 text-gray-900"
                  >Ngày sinh</label
                >
                <div class="mt-0.5">
                  <input
                    v-model="msNV"
                    id="msnv"
                    name="msnv"
                    type="date"
                    required="true"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div class="text-red-500 font-medium text-sm mt-1" v-if="true">
                  <font-awesome-icon
                    :icon="['fas', 'circle-exclamation']"
                    class="me-2"
                  />
                  <span>{{ "A" }}</span>
                </div>
              </div>
              <div>
                <label
                  class="block text-sm font-semibold leading-6 text-gray-900"
                  >Số điện thoại</label
                >
                <div class="mt-0.5">
                  <input
                    v-model="msNV"
                    id="msnv"
                    name="msnv"
                    type="text"
                    required="true"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div class="text-red-500 font-medium text-sm mt-1" v-if="true">
                  <font-awesome-icon
                    :icon="['fas', 'circle-exclamation']"
                    class="me-2"
                  />
                  <span>{{ "A" }}</span>
                </div>
              </div>
              <div>
                <label
                  class="block text-sm font-semibold leading-6 text-gray-900"
                  >Phái</label
                >
                <div class="mt-3 flex justify-evenly">
                  <div class="flex items-center">
                    <input
                      v-model="msNV"
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
                      v-model="msNV"
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
                  >Địa chỉ</label
                >
                <div class="mt-0.5">
                  <textarea
                    v-model="msNV"
                    id="msnv"
                    name="msnv"
                    type="text"
                    required="true"
                    class="rounded border w-100 resize-none h-24"
                  ></textarea>
                </div>
                <div class="text-red-500 font-medium text-sm mt-1" v-if="true">
                  <font-awesome-icon
                    :icon="['fas', 'circle-exclamation']"
                    class="me-2"
                  />
                  <span>{{ "A" }}</span>
                </div>
              </div>
            </div>
            <div
              class="absolute transition flex items-center justify-around w-100 h-100"
              :class="{
                'transform-x-3full': !check,
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
                    >Email</label
                  >
                  <div class="mt-0.5">
                    <input
                      v-model="msNV"
                      id="msnv"
                      name="msnv"
                      type="text"
                      required="true"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div
                    class="text-red-500 font-medium text-sm mt-1"
                    v-if="true"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'circle-exclamation']"
                      class="me-2"
                    />
                    <span>{{ "A" }}</span>
                  </div>
                </div>
                <div class="">
                  <label
                    class="block text-sm font-semibold leading-6 text-gray-900"
                    >Mật khẩu</label
                  >
                  <div class="mt-0.5">
                    <input
                      v-model="msNV"
                      id="msnv"
                      name="msnv"
                      type="text"
                      required="true"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div
                    class="text-red-500 font-medium text-sm mt-1"
                    v-if="true"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'circle-exclamation']"
                      class="me-2"
                    />
                    <span>{{ "A" }}</span>
                  </div>
                </div>

                <div class="">
                  <label
                    class="block text-sm font-semibold leading-6 text-gray-900"
                    >Xác nhận mật khẩu</label
                  >
                  <div class="mt-0.5">
                    <input
                      v-model="msNV"
                      id="msnv"
                      name="msnv"
                      type="text"
                      required="true"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div
                    class="text-red-500 font-medium text-sm mt-1"
                    v-if="true"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'circle-exclamation']"
                      class="me-2"
                    />
                    <span>{{ "A" }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-7">
          <MyButton size="small" @click="toggle" v-if="!check"
            >Tiếp theo</MyButton
          >
          <MyButton size="small" v-else>Đăng ký</MyButton>
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

const check = ref(false);
const hoLot = ref("");
const messageErrorHoLot = ref("");
const ten = ref("");
const messageErrorTen = ref("");
const phai = ref("");
const messageErrorPhai = ref("");
const diaChi = ref("");
const messageErrorDiaChi = ref("");
const ngaySinh = ref(null);
const messageErrorNgaySinh = ref(null);
const dienThoai = ref("");
const messageErrorDienThoai = ref("");
const email = ref("");
const messageErrorEmail = ref("");
const password = ref("");
const messageErrorPassword = ref("");

const validate = () => {
  return true;
};

const toggle = () => {
  check.value = !check.value;
};
</script>

<style scoped>
.transform-x-3full {
  transform: translateX(300%);
}
.-transform-x-2full {
  transform: translateX(-200%);
}
</style>
