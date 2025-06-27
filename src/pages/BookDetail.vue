<script setup>
import Comment from "../components/common/Comment.vue";
import PostCard from "../components/community/PostCard.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { searchBooks } from "../api/kakao.js";
import axios from "../api/axios";

const selectedTab = ref("comment");
const route = useRoute();
const isbn = route.params.isbn;
const book = ref(null);
const posts = ref([]);
const avgRate = ref();
const rateList = ref([]);

const selectTab = (tab) => {
  selectedTab.value = tab;
};

onMounted(async () => {
  const result = await searchBooks(isbn, 1, "isbn");
  book.value = result.documents[0];
  getPostList();
  getRating();
});

const getRating = async () => {
  const res = await axios.get(`/api/v1/books/${isbn}/rating`);
  avgRate.value = res.data.data.averageScore;
  rateList.value = res.data.data.scoreCounts;
};

const getHighQualityThumbnail = (url) => {
  const match = url?.match(/fname=(.+)$/);
  return match ? decodeURIComponent(match[1]) : url;
};

const getPostList = async () => {
  const res = await axios.get(`/api/board/list/${isbn}`);
  const rawPosts = res.data.data.content;
  posts.value = rawPosts;
};
</script>

<template>
  <div class="flex min-h-screen bg-[#fefdfb]">
    <div class="flex-1 p-10">
      <div class="flex flex-col md:flex-row gap-6" v-if="book != null">
        <div
          class="w-full md:w-64 bg-white rounded-xl shadow flex items-center justify-center"
        >
          <img
            :src="getHighQualityThumbnail(book.thumbnail)"
            alt="book cover"
            class="max-w-[85%] max-h-[90%] object-contain rounded"
          />
        </div>

        <div class="flex-1 space-y-4">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
            {{ book.title }}
          </h1>

          <div
            class="text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"
          >
            <div class="flex items-center gap-2">
              <span class="font-medium text-gray-500">👤 저자</span>
              <span>{{ book.authors?.join(", ") }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-gray-500">🌐 번역가</span>
              <span>{{ book.translators?.join(", ") || "없음" }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-gray-500">🏢 출판사</span>
              <span>{{ book.publisher }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-gray-500">📅 출판일</span>
              <span>{{ book.datetime?.slice(0, 10) }}</span>
            </div>
            <div class="flex items-center gap-2 col-span-full">
              <span class="font-medium text-gray-500">💰 가격</span>
              <span>
                <span class="line-through text-red-500"
                  >{{ book.price.toLocaleString() }}원</span
                >
                <template v-if="book.sale_price > 0">
                  <span class="ml-2 text-green-600 font-semibold text-base">
                    {{ book.sale_price.toLocaleString() }}원
                  </span>
                </template>
              </span>
            </div>
          </div>

          <hr />

          <div
            class="text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"
          >
            <div class="flex items-center gap-2">
              <span class="font-medium text-gray-500">🔗</span>
              <a
                :href="book.url"
                target="_blank"
                class="text-blue-600 underline hover:text-blue-800"
              >
                카카오 책 페이지로 이동
              </a>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-gray-500">🔗</span>
              <a
                :href="'https://search.kyobobook.co.kr/search?keyword=' + isbn"
                target="_blank"
                class="text-blue-600 underline hover:text-blue-800"
              >
                책 구매 페이지로 이동
              </a>
            </div>
          </div>

          <hr />

          <div class="mt-6 bg-[#fff9e7] p-4 rounded-lg shadow-inner">
            <h2 class="text-lg font-semibold text-[#8d6e00] mb-2">책 소개</h2>
            <p class="text-sm text-gray-800 leading-relaxed">
              {{ book.contents }}...
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div
          class="bg-white p-6 rounded-xl shadow flex flex-col items-center text-center justify-center"
        >
          <div>
            <span
              v-for="n in 5"
              :key="n"
              class="text-3xl"
              :class="{
                'text-yellow-400': n <= avgRate,
                'text-gray-300': n > avgRate,
              }"
            >
              ★
            </span>
          </div>
          <div class="text-3xl font-bold mt-2 text-gray-800">
            {{ avgRate }}
          </div>
          <div class="text-sm text-gray-500">평균 별점</div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow">
          <h2 class="text-lg font-semibold mb-4 text-gray-800">
            다른 회원들의 평가
          </h2>
          <ul>
            <li
              v-for="(rate, index) in rateList"
              :key="index"
              class="flex items-center justify-between"
            >
              <span class="text-sm text-gray-600 font-medium"
                >{{ index }}점</span
              >
              <div class="flex items-center gap-2">
                <span>
                  <span
                    v-for="n in 5"
                    :key="n"
                    class="text-xl"
                    :class="{
                      'text-yellow-400': n <= index,
                      'text-gray-300': n > index,
                    }"
                    >★</span
                  >
                </span>
                <span class="text-sm text-gray-500">{{ rate }}건</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="gap-6 mt-6">
        <div class="bg-white p-6 rounded shadow-md">
          <div class="grid grid-cols-2 border-b pb-4 mb-6">
            <h2
              class="text-lg font-semibold cursor-pointer text-center"
              :class="{
                'text-[#9baa59] border-b-2 border-[#9baa59] pb-1':
                  selectedTab === 'comment',
              }"
              @click="selectTab('comment')"
            >
              💬 댓글
            </h2>
            <h2
              class="text-lg font-semibold cursor-pointer text-center"
              :class="{
                'text-[#9baa59] border-b-2 border-[#9baa59] pb-1':
                  selectedTab === 'blog',
              }"
              @click="selectTab('blog')"
            >
              📝 블로그
            </h2>
          </div>
          <div>
            <Comment v-if="selectedTab === 'comment'" :isbn="isbn" />
            <div v-if="selectedTab === 'blog'" class="space-y-4">
              <PostCard
                v-for="post in posts"
                :key="post.boardId"
                :post="post"
                type="book"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
