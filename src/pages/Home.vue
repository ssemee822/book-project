<script setup>
import BookList from "../components/book/BookList.vue";
import SearchBar from "../components/common/SearchBar.vue";
import ProfileCard from "../components/common/ProfileCard.vue";
</script>

<template>
  <div class="flex">
    <div class="flex-1 p-4">
      <SearchBar class="p-4 border-b" />
      <BookList />
    </div>
    <div class="w-1/5 p-4 bg-[#f5f5f5]">
      <ProfileCard />
    </div>
  </div>
</template>
