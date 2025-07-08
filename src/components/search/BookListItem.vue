<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useFavoriteStore } from "../../stores/favorite"; // 2단계에서 만든 스토어 임포트
import { useAuthStore } from "../../stores/auth"; // 로그인 상태 확인용

const props = defineProps({
  book: {
    type: Object,
    required: true,
    // book 객체의 필수 필드 정의: isbn, title, authors, publisher, thumbnail 등
    // 카카오 API 응답 형태를 따릅니다.
  },
  // 검색 결과/목록에서 순번을 표시하기 위한 인덱스 (선택 사항)
  itemIndex: {
    type: Number,
    default: 0
  }
});

const router = useRouter();
const favoriteStore = useFavoriteStore();
const authStore = useAuthStore();

// 이 책이 현재 즐겨찾기인지 확인하는 computed 속성
const isBookFavorite = computed(() => {
  // 로그인되지 않았다면 항상 false (즐겨찾기 아이콘도 숨김)
  if (!authStore.isAuthenticated) {
    return false;
  }
  // ISBN을 String으로 변환하여 Pinia Store의 getter에 전달
  return favoriteStore.isFavorite(String(props.book.isbn));
});

// 책 배너 클릭 시 상세 페이지로 이동
const goToDetail = () => {
  // 백엔드 BookEntity의 isbn은 String 타입이므로,
  // book.isbn이 'ISBN 1234567890' 형태일 경우 '1234567890'만 추출
  // 카카오 API의 ISBN이 이미 숫자만 있는 문자열이라면 .split(' ')[1] 제거
  const isbnToUse = props.book.isbn && typeof props.book.isbn === 'string' && props.book.isbn.includes(' ')
    ? props.book.isbn.split(' ')[1]
    : props.book.isbn;
  
  router.push({
    name: "BookDetail",
    params: { isbn: isbnToUse },
  });
};

// 즐겨찾기 아이콘 클릭 시 호출될 함수
const toggleFavorite = async (event) => {
  // ⭐ 중요: 아이콘 클릭 이벤트가 부모 (책 배너)의 goToDetail 이벤트로 전파되는 것을 막습니다.
  event.stopPropagation(); 
  
  if (!authStore.isAuthenticated) {
    alert("즐겨찾기 기능을 사용하려면 로그인이 필요합니다.");
    // 필요하다면 로그인 페이지로 리다이렉트: router.push('/login');
    return;
  }

  // 백엔드 FavoriteBookRequestDto에 맞는 데이터 객체 생성
  const bookDataForApi = {
    isbn: String(props.book.isbn), // ISBN을 문자열로 확실히 변환
    title: props.book.title || '',
    author: props.book.authors?.join(', ') || '',
    cover: props.book.thumbnail || ''
  };

  const success = await favoriteStore.toggleFavorite(bookDataForApi, isBookFavorite.value);
  
  if (success) {
    // 성공 메시지 (선택 사항): 토스트 알림 등을 사용하면 좋음
    console.log(`"${props.book.title}"이(가) ${isBookFavorite.value ? '즐겨찾기에서 제거' : '즐겨찾기에 추가'}되었습니다.`);
  } else {
    // 실패 메시지
    alert(favoriteStore.error || "즐겨찾기 상태 변경에 실패했습니다. 다시 시도해주세요.");
  }
};
</script>

<template>
  <div
    @click="goToDetail"
    class="bg-white p-4 rounded-xl shadow flex gap-4 cursor-pointer transition hover:shadow-lg relative"
  >
    <div class="relative w-24 h-32">
      <img
        :src="
          book.thumbnail ||
          'https://via.placeholder.com/96x128?text=No+Image'
        "
        alt="cover"
        class="w-full h-full object-cover rounded"
      />
      <div
        class="absolute top-0 left-0 bg-red-500 text-white text-xs px-1 rounded-br"
      >
        {{ itemIndex + 1 }} 
      </div>
    </div>
    <div class="flex-1">
      <div class="font-semibold leading-snug">
        {{ book.title }}
      </div>
      <div class="text-sm text-gray-700 mt-1">
        저자 {{ book.authors?.join(", ") || "-" }}<br />
      </div>
      <div class="text-sm text-gray-500 mt-1 line-clamp-2">
        {{ book.contents }}
      </div>
    </div>
    
    <button
      v-if="authStore.isAuthenticated"
      @click="toggleFavorite"
      class="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 active:bg-gray-300 transition-colors duration-100"
    >
      <svg
        :class="{
          'text-yellow-400': isBookFavorite,
          'text-gray-400': !isBookFavorite
        }"
        class="w-3.5 h-3.5 transition-colors duration-200"
        :fill="isBookFavorite ? 'currentColor' : 'none'"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.817 1.48-8.279-6.064-5.828 8.332-1.151z"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
/* BookListItem에 필요한 추가 스타일 */
</style>