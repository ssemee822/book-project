import { defineStore } from 'pinia';
import { favoriteApi } from '../api/favorite';
import { useAuthStore } from './auth';

export const useFavoriteStore = defineStore('favorite', {
    state: () => ({
        favoriteIsbns: new Set(),
        isLoading: false,
        error: null,
    }),
    getters: {
        isFavorite: (state) => (isbn) => {
            return state.favoriteIsbns.has(String(isbn));
        },
        favoriteCount: (state) => state.favoriteIsbns.size,
    },
    actions: {
        async fetchFavorites() {
            const authStore = useAuthStore();
            if (!authStore.isAuthenticated) {
                this.favoriteIsbns.clear();
                console.log("[FavoriteStore] Not authenticated, favoriteIsbns cleared.");
                return;
            }

            this.isLoading = true;
            this.error = null;
            try {
                const result = await favoriteApi.getFavoriteBooks();
                if (result.success) {
                    if (Array.isArray(result.data)) {
                        this.favoriteIsbns = new Set(result.data.map(book => String(book.isbn)));
                        console.log(`[FavoriteStore] Fetched ${this.favoriteIsbns.size} favorites.`);
                    } else {
                        console.warn("[FavoriteStore] API returned non-array data for favorites:", result.data);
                        this.favoriteIsbns.clear();
                    }
                } else {
                    this.error = result.message;
                    this.favoriteIsbns.clear();
                    console.error("[FavoriteStore] Failed to fetch favorites:", result.message);
                }
            } catch (err) {
                this.error = "즐겨찾기 목록을 불러오는데 실패했습니다.";
                this.favoriteIsbns.clear();
                console.error("[FavoriteStore] fetchFavorites action error:", err);
            } finally {
                this.isLoading = false;
            }
        },

        async toggleFavorite(bookData) {
            const authStore = useAuthStore();
            if (!authStore.isAuthenticated) {
                alert("로그인 후 이용 가능합니다.");
                return false;
            }

            this.isLoading = true;
            this.error = null;

            try {
                const isbnToToggle = String(bookData.isbn);

                if (this.isFavorite(isbnToToggle)) {
                    const result = await favoriteApi.removeFavoriteBook(isbnToToggle);
                    if (result.success) {
                        this.favoriteIsbns.delete(isbnToToggle);
                        console.log(`[FavoriteStore] Removed favorite: ${isbnToToggle}`);
                        return true;
                    } else {
                        this.error = result.message;
                        console.error(`[FavoriteStore] Failed to remove favorite: ${result.message}`);
                        return false;
                    }
                } else {
                    const dataToSend = {
                        isbn: isbnToToggle,
                        title: bookData.title,
                        author: bookData.authors?.join(', ') || '',
                        cover: bookData.thumbnail || '',
                    };
                    const result = await favoriteApi.addFavoriteBook(dataToSend);
                    if (result.success) {
                        this.favoriteIsbns.add(isbnToToggle);
                        console.log(`[FavoriteStore] Added favorite: ${isbnToToggle}`);
                        return true;
                    } else {
                        this.error = result.message;
                        console.error(`[FavoriteStore] Failed to add favorite: ${result.message}`);
                        return false;
                    }
                }
            } catch (err) {
                this.error = "즐겨찾기 추가/제거 중 오류가 발생했습니다.";
                console.error("[FavoriteStore] toggleFavorite action error:", err);
                return false;
            } finally {
                this.isLoading = false;
            }
        },

        clearFavorites() {
            this.favoriteIsbns.clear();
            console.log("[FavoriteStore] favoriteIsbns Set cleared.");
        }
    }
});