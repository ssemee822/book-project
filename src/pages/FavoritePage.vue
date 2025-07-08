<script setup>
import BookList from "../components/search/BookList.vue";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { favoriteApi } from "../api/favorite"; // 백엔드 즐겨찾기 API
import { searchBooks } from "../api/kakao"; // 카카오북 API 임포트
import { useAuthStore } from '../stores/auth'; // 로그인 여부 확인용

const favoriteBooks = ref([]);
const isLoading = ref(false);
const error = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);
const pageSize = 10;
const totalCount = ref(0);
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
    if (authStore.isAuthenticated) {
        fetchFavoriteBooksWithKakaoDetails();
    } else {
        error.value = "즐겨찾기 목록을 보려면 로그인이 필요합니다.";
    }
});

const fetchFavoriteBooksWithKakaoDetails = async () => {
    isLoading.value = true;
    error.value = null;
    favoriteBooks.value = []; // 기존 목록 초기화
    console.log("백엔드에서 즐겨찾기 ISBN 목록 로딩 시작...");

    try {
        const favoriteIsbnsResult = await favoriteApi.getFavoriteBooks();
        console.log("백엔드 즐겨찾기 API 응답:", favoriteIsbnsResult);

        if (favoriteIsbnsResult.success && Array.isArray(favoriteIsbnsResult.data)) {
            let rawIsbns = favoriteIsbnsResult.data.map(fav => fav.isbn);
            console.log("백엔드 원본 ISBN 목록:", rawIsbns);

            // ⭐ 1. 백엔드 ISBN 형식 처리: 유효한 13자리 ISBN만 추출
            const isbnsToFetch = rawIsbns.map(rawIsbn => {
                if (!rawIsbn) return null; // ISBN이 null인 경우 처리
                // 공백으로 분리된 경우, 13자리 ISBN을 찾아서 사용
                const parts = rawIsbn.split(' ');
                const validIsbn13 = parts.find(part => part.length === 13 && part.startsWith('97'));
                return validIsbn13 || parts[0]; // 13자리 없으면 일단 첫 번째 부분 반환
            }).filter(Boolean); // null 값 제거

            totalCount.value = isbnsToFetch.length;
            console.log("카카오 API 호출용 정제된 ISBN 목록:", isbnsToFetch);

            if (isbnsToFetch.length === 0) {
                console.log("즐겨찾기에 유효한 ISBN을 가진 책이 없습니다.");
                return;
            }

            const detailedBooksPromises = isbnsToFetch.map(async (isbn) => {
                try {
                    // ⭐ 2. 카카오 API 인증 문제 확인
                    // searchBooks 함수 (api/kakao.js) 내 KAKAO_REST_API_KEY가 올바른지 다시 확인하세요.
                    // 해당 파일의 KAKAO_REST_API_KEY = "KakaoAK YOUR_ACTUAL_KEY"; 이 형식입니다.
                    // 콘솔에 출력되는 KAKAO_REST_API_KEY 값을 확인하여 올바르게 설정되었는지 검증하세요.
                    const kakaoSearchResult = await searchBooks(isbn, 1, 'isbn');
                    
                    // 카카오 API 응답이 documents 배열을 포함하는지 확인
                    if (kakaoSearchResult && kakaoSearchResult.documents && kakaoSearchResult.documents.length > 0) {
                        const bookData = kakaoSearchResult.documents[0];
                        return {
                            isbn: bookData.isbn,
                            title: bookData.title,
                            authors: bookData.authors || [], // authors가 없을 경우 빈 배열
                            thumbnail: bookData.thumbnail || 'https://via.placeholder.com/96x128?text=No+Image', // 이미지 없을 경우 대체 이미지
                            publisher: bookData.publisher || '',
                            datetime: bookData.datetime || '',
                            price: bookData.price || 0,
                            sale_price: bookData.sale_price || 0,
                            contents: bookData.contents || '',
                            // 백엔드의 favoritedAt 정보를 카카오 상세 정보와 병합하려면 아래처럼 추가
                            favoritedAt: favoriteIsbnsResult.data.find(f => f.isbn.includes(isbn))?.favoritedAt
                        };
                    } else {
                        console.warn(`ISBN ${isbn}에 대한 카카오북 검색 결과가 없습니다.`);
                        return null; // 검색 결과가 없으면 null 반환
                    }
                } catch (kakaoErr) {
                    console.error(`ISBN ${isbn}에 대한 카카오북 상세 정보 가져오기 실패:`, kakaoErr.response?.status, kakaoErr.response?.data?.message || kakaoErr.message);
                    // 401 오류 메시지를 콘솔에서 더 자세히 볼 수 있도록 추가
                    if (kakaoErr.response && kakaoErr.response.status === 401) {
                        error.value = "카카오 API 인증 실패: API 키를 확인해주세요.";
                    } else {
                        error.value = `책 정보를 불러오는데 실패했습니다: ${isbn}`;
                    }
                    return null; // 실패한 책은 건너뜀
                }
            });

            const detailedBooks = (await Promise.all(detailedBooksPromises)).filter(Boolean);
            favoriteBooks.value = detailedBooks;

            totalPages.value = Math.ceil(favoriteBooks.value.length / pageSize);
            currentPage.value = 1;

            console.log("최종 즐겨찾기 책 목록 (카카오 상세 정보 포함):", favoriteBooks.value);

        } else {
            error.value = favoriteIsbnsResult.message || "백엔드에서 즐겨찾기 목록을 불러오는데 실패했습니다.";
            console.error("즐겨찾기 ISBN 목록 로드 실패 (API 응답 문제):", favoriteIsbnsResult);
        }
    } catch (err) {
        error.value = "즐겨찾기 목록 로드 중 오류가 발생했습니다. 네트워크 또는 서버 문제일 수 있습니다.";
        console.error("Error during fetchFavoriteBooksWithKakaoDetails (catch 블록):", err);
    } finally {
        isLoading.value = false;
        console.log("즐겨찾기 목록 로딩 완료. isLoading:", isLoading.value);
    }
};

const changePage = (page) => {
    console.warn("즐겨찾기 페이지는 현재 클라이언트 측 페이지네이션을 명시적으로 지원하지 않습니다. 모든 책을 가져옵니다.");
    currentPage.value = page;
};
</script>

<template>
    <div class="flex">
        <div class="flex-1 p-4">
            <div class="mb-4 text-lg font-semibold">
                ⭐ 나의 즐겨찾기 도서 {{ totalCount.toLocaleString() }}권
            </div>
            <div v-if="isLoading" class="text-center text-gray-500 mt-10">
                즐겨찾기 목록을 불러오는 중입니다...
            </div>
            <div v-else-if="error" class="text-center text-red-500 mt-10">
                {{ error }}
            </div>
            <div v-else-if="totalCount === 0" class="text-center text-gray-500 mt-10">
                아직 즐겨찾기에 추가된 책이 없습니다.
            </div>
            <BookList
                v-else
                :books="favoriteBooks"
                :currentPage="currentPage"
                :totalPages="totalPages"
                :pageSize="pageSize"
                @change-page="changePage"
            />
        </div>
    </div>
</template>

<style scoped>
/* 즐겨찾기 페이지에 필요한 추가 스타일 */
</style>