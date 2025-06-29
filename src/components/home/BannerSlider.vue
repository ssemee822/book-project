<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const banners = [
  {
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    title: "쭉정이에 오신 걸 환영합니다 📚",
    subtitle: "좋은 책을 발견하고, 리뷰를 나누세요.",
    buttonText: "✍ 리뷰 쓰기",
    link: "/postcreate",
  },
  {
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    title: "다양한 리뷰 📖",
    subtitle: "회원들이 사랑한 책은 무엇일까요?",
    buttonText: "🔥 최신글 보기",
    link: "/community",
  },
  {
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
    title: "책으로 기록하는 하루 ☀️",
    subtitle: "마이페이지에서 나만의 독서일지를 만들어보세요.",
    buttonText: "📓 내 서재로 가기",
    link: "/mypage",
  },
];
</script>

<template>
  <swiper
    class="!w-full !max-w-full rounded-xl overflow-hidden h-48 sm:h-72"
    :slides-per-view="1"
    :loop="true"
    :autoplay="{ delay: 3000 }"
    :modules="[Autoplay]"
  >
    <swiper-slide
      v-for="(banner, index) in banners"
      :key="index"
      class="relative !w-full"
    >
      <img :src="banner.image" class="w-full h-48 sm:h-72 object-cover" />
      <div
        class="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-60 px-4"
      >
        <h2 class="text-xl sm:text-3xl font-bold mb-2">{{ banner.title }}</h2>
        <p class="text-sm sm:text-lg mb-3">{{ banner.subtitle }}</p>
        <router-link :to="banner.link">
          <button
            class="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-4 py-2 rounded-xl shadow"
          >
            {{ banner.buttonText }}
          </button>
        </router-link>
      </div>
    </swiper-slide>
  </swiper>
</template>
