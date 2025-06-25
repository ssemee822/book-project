<script setup>
import ProfileCard from "../components/common/ProfileCard.vue";
import Comment from "../components/common/Comment.vue";
import PostCard from "../components/community/PostCard.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { searchBooks } from "../api/kakao.js";

const selectedTab = ref("comment");

const selectTab = (tab) => {
  selectedTab.value = tab;
};

const route = useRoute();
const isbn = route.params.isbn;
const book = ref(null);

onMounted(async () => {
  const result = await searchBooks(isbn, 1, "isbn");
  book.value = result.documents[0];
});

const getHighQualityThumbnail = (url) => {
  const match = url?.match(/fname=(.+)$/);
  return match ? decodeURIComponent(match[1]) : url;
};
const dummyData = [
  {
    id: 1,
    title: "처음 올리는 게시글입니다",
    contents:
      "컨텐츠 내용입니다. 어쩌구 저쩌구 . 안녕안녕 안녕 안녕안녕 반가반가반가반가반가 안뇽ㄴ 테스트 테스트 테스트 테스트테스트테스트테스트테스트컨텐츠 내용입니다. 어쩌구 저쩌구 . 안녕안녕 안녕 안녕안녕 반가반가반가반가반가 안뇽ㄴ 테스트 테스트 테스트 테스트테스트테스트테스트테스트",
    author: "김세민",
    date: "2025-06-18",
    views: 12,
    image:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6893954%3Ftimestamp%3D20250522155332",
  },
  {
    id: 2,
    title: "책 추천해주세요!",
    author: "홍길동",
    contents:
      "컨텐츠 내용입니다. 어쩌구 저쩌구 . 안녕안녕 안녕 안녕안녕 반가반가반가반가반가 안뇽ㄴ 테스트 테스트 테스트 테스트테스트테스트테스트테스트",
    date: "2025-06-17",
    views: 30,
    image:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6893954%3Ftimestamp%3D20250522155332",
  },
  {
    id: 3,
    title: "이 책 내용 질문있어요",
    contents:
      "컨텐츠 내용입니다. 어쩌구 저쩌구 . 안녕안녕 안녕 안녕안녕 반가반가반가반가반가 안뇽ㄴ 테스트 테스트 테스트 테스트테스트테스트테스트테스트컨텐츠 내용입니다. 어쩌구 저쩌구 . 안녕안녕 안녕 안녕안녕 반가반가반가반가반가 안뇽ㄴ 테스트 테스트 테스트 테스트테스트테스트테스트테스트",
    author: "이영희",
    date: "2025-06-16",
    views: 22,
    image:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6893954%3Ftimestamp%3D20250522155332",
  },
  {
    id: 4,
    contents:
      "컨텐츠 내용입니다. 어쩌구 저쩌구 . 안녕안녕 안녕 안녕안녕 반가반가반가반가반가 안뇽ㄴ 테스트 테스트 테스트 테스트테스트테스트테스트테스트",
    title: "좋은 문장 나눠요 😊",
    author: "박하늘",
    date: "2025-06-15",
    views: 17,
    image:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6893954%3Ftimestamp%3D20250522155332",
  },
  {
    id: 5,
    title: "독서모임 모집합니다",
    author: "최민수",
    date: "2025-06-14",
    views: 40,
    image:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6893954%3Ftimestamp%3D20250522155332",
    contents: "tes",
  },
];
</script>

<template>
  <div class="flex min-h-screen bg-[#fefdfb]">
    <div class="flex-1 p-10">
      <div class="flex gap-8" v-if="book != null">
        <div
          class="w-64 h-96 bg-white rounded-xl shadow flex items-center justify-center"
        >
          <img
            :src="getHighQualityThumbnail(book.thumbnail)"
            alt="book cover"
            class="max-w-[85%] max-h-[90%] object-contain rounded"
          />
        </div>

        <div class="flex-1 space-y-4">
          <h1 class="text-3xl font-bold text-gray-900">{{ book.title }}</h1>
          <div class="text-gray-700 grid grid-cols-2 gap-4 text-sm">
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
            <div class="flex items-center gap-2">
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
          <div class="text-gray-700 grid grid-cols-2 gap-4 text-sm">
            <div class="flex items-center gap-2 col-span-2">
              <span class="font-medium text-gray-500">🔗</span>
              <a
                :href="book.url"
                target="_blank"
                class="text-blue-600 underline hover:text-blue-800"
                >카카오 책 페이지로 이동</a
              >
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

      <div class="grid grid-cols-2 gap-6 mt-10">
        <div
          class="bg-white p-6 rounded shadow-md flex flex-col items-center text-center"
        >
          <div class="text-yellow-400 text-4xl">★</div>
          <div class="text-2xl font-semibold mt-1">4.5</div>
          <div class="text-sm text-gray-500">평균 별점</div>
        </div>

        <div class="bg-white p-6 rounded shadow-md">
          <h2 class="text-lg font-semibold mb-2">항목별 별점</h2>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>📖 내용: 4.8</li>
            <li>✍ 문체: 4.2</li>
            <li>👁 가독성: 4.6</li>
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
            <Comment v-if="selectedTab === 'comment'" />
            <div v-if="selectedTab === 'blog'" class="space-y-4">
              <PostCard v-for="post in dummyData" :key="post.id" :post="post" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-1/5 p-4 bg-[#f7f5f0]">
      <ProfileCard />
    </div>
  </div>
</template>
