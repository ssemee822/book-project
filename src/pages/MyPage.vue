<script setup>
import BaseButton from "../components/common/BaseButton.vue";
import BookSearch from "../components/common/BookSearch.vue";
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import { ref, onMounted } from "vue";
import axios from "../api/axios";
import ProfileCard from "../components/common/ProfileCard.vue";

const todoList = ref([]);
const newTodo = ref({ title: "", start: "", end: "", isbn: "" });

onMounted(() => {
  getTodoList();
});

const getTodoList = async () => {
  const res = await axios.get(`/api/user/me/books`);
  console.log(res);
};

const handleBookSelect = (book) => {
  console.log(book);
  newTodo.value.title = book.title;
  newTodo.value.isbn = book.isbn;
};

function addTodo() {
  if (!newTodo.value.title || !newTodo.value.start) return;
  const end = newTodo.value.end || newTodo.value.start;
  const newItem = {
    title: newTodo.value.title,
    start: newTodo.value.start,
    isbn: newTodo.value.isbn,
    end,
    done: false,
  };
  calendarOptions.value.events.push({
    title: newItem.title,
    start: newItem.start,
    isbn: newTodo.value.isbn,
    end: newItem.end,
    backgroundColor: "rgba(211, 228, 136, 0.6)",
    borderColor: "white",
    textColor: "#000",
  });
  console.log(newTodo.v);
  uploadTodo();
  newTodo.value = { title: "", start: "", end: "", isbn: "" };
}

const uploadTodo = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const body = {
    memo: newTodo.value.title,
    startRead: newTodo.value.start,
    endRead: newTodo.value.end,
    isbn: newTodo.value.isbn,
  };
  const res = await axios.post(`/api/user/me/books`, body);
};

function formatPeriod(start, end) {
  return start === end ? start : `${start} ~ ${end}`;
}

const calendarOptions = ref({
  plugins: [dayGridPlugin],
  initialView: "dayGridMonth",
  locale: "ko",
  locales: [koLocale],
  height: 600,
  headerToolbar: {
    left: "prev,next",
    center: "title",
    right: "today",
  },
  events: todoList.value.map((todo) => ({
    title: todo.title,
    start: todo.start,
    end: todo.end,
    backgroundColor: todo.done
      ? "rgba(255, 231, 120, 0.6)"
      : "rgba(211, 228, 136, 0.6)",
    borderColor: "white",
    textColor: "#000",
  })),
  eventDidMount(info) {
    info.el.style.marginBottom = "4px";
    info.el.style.padding = "2px 8px";
    info.el.style.borderRadius = "6px";
    info.el.style.transition = "all 0.2s";
    info.el.onmouseenter = () => (info.el.style.filter = "brightness(1.05)");
    info.el.onmouseleave = () => (info.el.style.filter = "brightness(1)");
  },
});

function updateEventColor(todo) {
  const event = calendarOptions.value.events.find(
    (e) =>
      e.title === todo.title && e.start === todo.start && e.end === todo.end
  );
  if (event) {
    event.backgroundColor = todo.done
      ? "rgba(255, 231, 120, 0.6)"
      : "rgba(211, 228, 136, 0.6)";
  }
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <div class="flex-1 gap-6 p-6">
      <div class="col-span-2 space-y-6">
        <div class="bg-white rounded-xl shadow p-4">
          <FullCalendar :options="calendarOptions" class="custom-calendar" />
        </div>
        <div class="bg-white rounded-xl shadow p-4 max-h-80 overflow-y-auto">
          <h2 class="text-lg font-semibold mb-4">🗓 읽을 책 리스트</h2>
          <BookSearch @select="handleBookSelect" class="mb-4" />
          <div class="mb-4 flex gap-2 items-center">
            <!-- <input
              v-model="newTodo.title"
              type="text"
              placeholder="할 일 제목"
              class="border rounded px-2 py-1 w-1/3"
            /> -->
            <input
              v-model="newTodo.start"
              type="date"
              class="border rounded px-2 py-1"
            />
            <input
              v-model="newTodo.end"
              type="date"
              class="border rounded px-2 py-1"
            />
            <BaseButton @click="addTodo">추가</BaseButton>
          </div>
          <ul class="space-y-2">
            <li
              v-for="(todo, index) in todoList"
              :key="index"
              class="flex items-center gap-2"
            >
              <input
                type="checkbox"
                v-model="todo.done"
                @change="updateEventColor(todo)"
                class="w-4 h-4"
              />
              <span :class="{ 'line-through text-gray-400': todo.done }">
                {{ todo.title }} ({{ formatPeriod(todo.start, todo.end) }})
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="w-1/3 p-4 bg-[#f7f5f0]">
      <ProfileCard />
    </div>
  </div>
</template>

<style>
.custom-calendar .fc {
  font-family: "Pretendard", sans-serif;
  --fc-border-color: #e2e8f0;
  --fc-today-bg-color: #fef8e7;
  font-size: 14px;
}
</style>
