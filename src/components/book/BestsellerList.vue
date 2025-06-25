<script setup>
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import axios from "../../api/axios";

const books = ref([]);

onMounted(() => {
  getBestsellerList();
});

const getBestsellerList = async () => {
  console.log("getBestsellerList");
  const res = await axios.get("/api/book/best");
  console.log(res);
  // books.value = res.data.data.content;
};

// const props = defineProps({
//   books: Array,
// });

// const router = useRouter();

// const topBooks = computed(() => props.books.slice(0, 3));
// const books = computed(() => props.books.slice(3));

// const goToDetail = (book) => {
//   router.push({
//     name: "BookDetail",
//     params: { isbn: book.isbn.split(" ")[0] },
//   });
// };

// const getHighQualityThumbnail = (url) => {
//   const match = url?.match(/fname=(.+)$/);
//   return match ? decodeURIComponent(match[1]) : url;
// };
</script>

<!-- <template>
  <div class="space-y-10">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="(book, idx) in topBooks"
        :key="book.isbn"
        @click="goToDetail(book)"
        class="relative cursor-pointer group"
      >
        <img
          :src="
            getHighQualityThumbnail(book.thumbnail) ||
            'https://via.placeholder.com/300x400?text=No+Image'
          "
          class="w-full h-[400px] object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition"
        />
        <div
          class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4 rounded-b-xl"
        >
          <h3 class="text-xl font-semibold truncate">{{ book.title }}</h3>
          <p class="text-sm">{{ book.authors?.join(", ") || "-" }}</p>
        </div>
        <div
          class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-xl text-xs shadow"
        >
          베스트셀러 {{ idx + 1 }}위
        </div>
      </div>
    </div>

    <hr class="border-t border-gray-200 my-6" />
    <div class="space-y-4">
      <div
        v-for="(book, index) in books"
        :key="book.isbn"
        @click="goToDetail(book)"
        class="bg-white p-4 rounded-xl shadow flex gap-4 cursor-pointer hover:shadow-md"
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
            {{ index + 4 }}위
          </div>
        </div>
        <div class="flex-1">
          <div class="font-semibold leading-snug text-lg">
            {{ book.title }}
          </div>
          <div class="text-sm text-gray-700 mt-1">
            저자 {{ book.authors?.join(", ") || "-" }}<br />
            출판 {{ book.publisher }} • {{ book.datetime?.slice(0, 10) || "-" }}
          </div>
          <div class="text-sm text-gray-600 mt-1">
            정가: {{ book.price.toLocaleString() }}원
            <template v-if="book.sale_price > 0">
              / 구매가: {{ book.sale_price.toLocaleString() }}원
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->
