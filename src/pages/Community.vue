<script setup>
import SearchBar from "../components/common/SearchBar.vue";
import BaseButton from "../components/common/BaseButton.vue";
import ProfileCard from "../components/common/ProfileCard.vue";
import PostCard from "../components/community/PostCard.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const query = ref("");
const posts = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalCount = ref(0);
const pageSize = 5;
const router = useRouter();

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

onMounted(() => {
  handleSearch();
});

const handleSearch = () => {
  posts.value = dummyData;
  totalCount.value = dummyData.length;
  totalPages.value = Math.ceil(dummyData.length / pageSize);
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const goPostCreate = () => {
  router.push("/postcreate");
};
</script>

<template>
  <div class="flex">
    <div class="flex-1 p-4">
      <div class="p-4 border-b mb-4 flex gap-2 items-center">
        <SearchBar v-model="query" @search="handleSearch" class="flex-1" />
        <BaseButton @click="handleSearch">검색</BaseButton>
      </div>

      <div class="mb-4 text-lg font-semibold flex justify-between">
        <div class="pl-4">
          총 <span class="text-[#9baa59]">{{ totalCount }}</span
          >개의 게시글이 있습니다
        </div>
        <BaseButton @click="goPostCreate">글쓰기</BaseButton>
      </div>

      <div class="space-y-3">
        <PostCard
          v-for="post in posts.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )"
          :key="post.id"
          :post="post"
        />
      </div>

      <div class="mt-6 flex justify-center gap-2">
        <BaseButton
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          >이전</BaseButton
        >
        <span class="px-4 py-2">{{ currentPage }} / {{ totalPages }}</span>
        <BaseButton
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          >다음</BaseButton
        >
      </div>
    </div>

    <div class="w-1/4 p-4 bg-[#f7f5f0]">
      <ProfileCard />
    </div>
  </div>
</template>
