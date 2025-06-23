import axios from "axios";

const ALADIN_REST_API_KEY = "ttbjisuu78131719001";

export async function getBestseller() {
  const response = await axios.get(
    "http://www.aladin.co.kr/ttb/api/ItemList.aspx",
    {
      params: {
        ttbkey: ALADIN_REST_API_KEY,
        QueryType: "Bestseller",
        SearchTarget: "Book",
        Start: 1,
        MaxResults: 10,
        Output: "js",
        Version: "20131101",
      },
    }
  );
  return response.data;
}
