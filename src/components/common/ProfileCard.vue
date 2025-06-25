<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import axios from "../../api/axios";
import { searchBooks } from "../../api/kakao.js";

const router = useRouter();
const route = useRoute();
const isLogin = ref("");
const authStore = useAuthStore();
const selectedClickedItem = ref(null);
const bookList = ref();
const nickname = localStorage.getItem("nickname");

onMounted(() => {
  isLogin.value = authStore.isLogin;
  getTodoList();
});

const getTodoList = async () => {
  const res = await axios.get(`/api/user/me/books`);
  bookList.value = res.data.data;
  for (const book of bookList.value) {
    book.thumbnail = await getImage(book.isbn);
  }
};

const getImage = async (isbn) => {
  const result = await searchBooks(isbn, 1, "isbn");
  if (result.meta.total_count > 0) {
    const thumbnailUrl = result.documents[0].thumbnail;
    return thumbnailUrl;
  } else {
    return "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5291060%3Ftimestamp%3D20250623135402";
  }
};

const isLoginSignupBannerActive = computed(() => {
  return route.name === "Login" || route.name === "Signup";
});

const clickLoginSignupBanner = () => {
  router.push("/login");
  selectedClickedItem.value = "loginSignupBanner";
};

const logout = () => {
  authStore.logout();
  window.location.reload();
};
</script>

<template>
  <div class="bg-white rounded-xl">
    <div
      class="p-6 shadow text-center flex items-center justify-between"
      v-if="isLogin == 'true'"
    >
      <div class="flex items-center">
        <img
          class="w-16 h-16 rounded-full shadow-sm object-cover mr-4"
          src="/default_profile.png"
          alt="profile image"
        />
        <div class="text-gray-800 font-bold text-lg">{{ nickname }}</div>
      </div>

      <button
        @click="logout"
        class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition"
      >
        로그아웃
      </button>
    </div>

    <div
      v-else
      class="cursor-pointer p-4 rounded-lg mb-4"
      :class="{
        'bg-[#e3c02b] text-white': isLoginSignupBannerActive,
        'bg-[#9baa59] text-gray-200 hover:bg-[#9baa59]':
          !isLoginSignupBannerActive,
        'border-2 border-yellow-400':
          selectedClickedItem === 'loginSignupBanner',
      }"
      @click="clickLoginSignupBanner"
    >
      <div class="font-bold text-xl mb-1">시작하기</div>
      <div class="text-sm">로그인 / 회원가입</div>
    </div>
    <div class="shadow p-4">
      <h2 class="text-lg font-bold mb-4">📚 내 서재</h2>
      <div class="text-sm text-gray-500 mb-2">
        읽은 책: {{ bookList ? bookList.length : "" }}권
      </div>
      <div class="grid grid-cols-4 gap-4">
        <div
          v-for="book in bookList"
          :key="book.historyId"
          class="flex flex-col items-center text-center"
        >
          <img
            :src="book.thumbnail"
            class="w-20 h-28 object-cover rounded shadow"
          />
          <p class="text-sm text-gray-700 mt-2 truncate w-20">
            {{ book.memo }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
