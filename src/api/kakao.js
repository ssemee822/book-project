import axios from "axios";

const KAKAO_REST_API_KEY = "KakaoAK 495557866b03b83b1110d943aeb53696";

export async function searchBooks(query, page = 1, target = "title") {
  const response = await axios.get("https://dapi.kakao.com/v3/search/book", {
    headers: {
      Authorization: KAKAO_REST_API_KEY,
    },
    params: {
      query,
      target,
      size: 10,
      page,
    },
  });
  return response.data;
}
