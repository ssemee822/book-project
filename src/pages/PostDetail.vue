<template>
  <div class="flex">
    <div class="max-w-3xl mx-auto">
      <button
        @click="$emit('go-back')"
        class="text-[#9baa59] text-sm mb-4 hover:underline"
      >
        ← 목록으로 돌아가기
      </button>
      <div class="flex flex-col items-center">
        <h1 class="text-2xl font-bold mb-2 mt-4">{{ post.title }}</h1>
        <div class="text-sm text-gray-500 mb-1">
          {{ post.author }}
        </div>
        <div class="text-sm text-gray-500 mb-1">
          {{ post.date }}
        </div>
        <div class="text-sm text-gray-500 mb-6">조회수 {{ post.views }}</div>
        <hr class="mb-16 border-t border-gray-300 w-4/5" />
        <img
          :src="post.image"
          alt="게시글 이미지"
          class="w-1/4 max-h-96 object-cover rounded mb-4"
        />
        <div class="text-base leading-relaxed whitespace-pre-line p-6 w-5/6">
          {{ post.contents }}
        </div>

        <div class="w-full mt-12 px-6">
          <h2 class="text-lg font-semibold mb-4">💬 댓글</h2>
          <Comment></Comment>
        </div>
      </div>
    </div>
    <div class="w-1/4 p-4 bg-[#f7f5f0]">
      <ProfileCard />
    </div>
  </div>
</template>

<script setup>
import ProfileCard from "../components/common/ProfileCard.vue";
import BaseButton from "../components/common/BaseButton.vue";
import Comment from "../components/common/Comment.vue";

const post = {
  id: 1,
  title: "처음 올리는 게시글입니다",
  contents: `젊은 시절의 기억을 스스로 봉인한 채 한평생을 살아온 한 여인이, 말년이 되어서야 기억이 되살아나면서 독자가 대신 그 한서린 기억을 하나씩 되짚어나가야 하는 이야기.

            이번에도 <기억을 잃은 주인공> 서사로, 독자들은 그 진실이 너무나 염병천병함을 알면서도 그놈의 호기심에 때문에 다음 페이지를 넘기게 된다.

            주인공이 스스로 감춰두고 있던 무려 18층의 기억들은 점점 주인공이 가장 상처받고 후회하였을 순간들로 안내한다.

            글쓴이는 주인공이 겪었을 고통과 후회의 기억들을 18단계에 걸쳐 치밀하게 배치하였고, 독자들은 그 혹독한 관문을 하나씩 지나가면서 타격을 입는다. 그 감정선의 도미노가 너무 잘
            짜여져 있어서 후반부로 갈 수록 어질어질할 지경.

            이야기의 결말에 가서는 독자들도 음, 이런 건 잘 덮어 둬야지! 하며 마음속으로 마무리 하게 된다. 하지만 난 살짝 상처를 입었지…

            누구나 인생에서 괴로운 일을 겪고, 그 괴로운 과거를 망각할 수 있다는 것은 우리에겐 너무나 소중한 선물이다. 그렇지만 글쓴이는 굳이 우리가 차마 어디다 말도 못하고 묻어두고싶은
            그런 기억을 가질 필요가 없는 세상이 되었으면 더욱 좋겠다고 말하는 것 같다.`,
  author: "김세민",
  date: "2025-06-18",
  views: 12,
  image:
    "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6893954%3Ftimestamp%3D20250522155332",
};
</script>
