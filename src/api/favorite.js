// src/api/favorite.js (새로 생성)
import apiClient from './axios'; // 당신의 axios 인스턴스 경로에 맞게 조정

export const favoriteApi = {
    /**
     * 책을 즐겨찾기에 추가합니다.
     * @param {Object} bookData - { isbn: string, title: string, author: string, cover: string }
     * @returns {Promise<Object>} API 응답 데이터 (success, message, data)
     */
    async addFavoriteBook(bookData) {
        try {
            const response = await apiClient.post('/api/book/favorites', bookData);
            // 백엔드가 FavoriteBookResponseDto를 반환하므로, data 필드에 해당 DTO 객체가 들어갑니다.
            return { success: true, message: "즐겨찾기에 추가되었습니다.", data: response.data };
        } catch (error) {
            console.error("즐겨찾기 추가 실패:", error.response?.data?.message || error.message);
            return { success: false, message: error.response?.data?.message || "즐겨찾기 추가에 실패했습니다." };
        }
    },

    /**
     * 사용자의 즐겨찾기 목록을 조회합니다.
     * @returns {Promise<Object>} API 응답 데이터 (success, message, data: Array<FavoriteBookResponseDto>)
     */
    async getFavoriteBooks() {
        try {
            const response = await apiClient.get('/api/book/favorites');
            // 백엔드가 List<FavoriteBookResponseDto>를 직접 반환하므로, data 필드에 배열이 들어갑니다.
            return { success: true, message: "즐겨찾기 목록 조회 성공", data: response.data };
        } catch (error) {
            console.error("즐겨찾기 목록 조회 실패:", error.response?.data?.message || error.message);
            return { success: false, message: error.response?.data?.message || "즐겨찾기 목록을 불러오는데 실패했습니다." };
        }
    },

    /**
     * 즐겨찾기에서 책을 제거합니다.
     * @param {string} isbn - 제거할 책의 ISBN
     * @returns {Promise<Object>} API 응답 데이터 (success, message)
     */
    async removeFavoriteBook(isbn) {
        try {
            const response = await apiClient.delete(`/api/book/favorites/${isbn}`);
            // 백엔드가 204 No Content를 반환하므로 response.data는 비어있을 수 있습니다.
            return { success: true, message: "즐겨찾기에서 제거되었습니다." };
        } catch (error) {
            console.error("즐겨찾기 삭제 실패:", error.response?.data?.message || error.message);
            return { success: false, message: error.response?.data?.message || "즐겨찾기 삭제에 실패했습니다." };
        }
    }
};