<script setup>
import BaseButton from "../components/common/BaseButton.vue";
import BookSearch from "../components/common/BookSearch.vue";
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import { ref, onMounted, watchEffect } from "vue";
import axios from "../api/axios";

const todoList = ref([]);
const newTodo = ref({ title: "", start: "", end: "", isbn: "" });

onMounted(() => {
  getTodoList();
});

const getTodoList = async () => {
  const res = await axios.get(`/api/user/me/books`);
  todoList.value = res.data.data;
  console.log(todoList);
};

const handleBookSelect = (book) => {
  newTodo.value.title = book.title;
  newTodo.value.isbn = book.isbn;
};

const calendarOptions = ref({
  plugins: [dayGridPlugin],
  initialView: "dayGridMonth",
  locale: "ko",
  locales: [koLocale],
  height: 500,
  headerToolbar: {
    left: "prev,next",
    center: "title",
    right: "today",
  },
  events: [],
  eventDidMount(info) {
    info.el.style.marginBottom = "4px";
    info.el.style.padding = "2px 8px";
    info.el.style.borderRadius = "6px";
    info.el.style.transition = "all 0.2s";
    info.el.onmouseenter = () => (info.el.style.filter = "brightness(1.05)");
    info.el.onmouseleave = () => (info.el.style.filter = "brightness(1)");
  },
});

watchEffect(() => {
  calendarOptions.value.events = todoList.value.map((todo) => ({
    title: todo.memo,
    start: todo.startRead,
    end: todo.endRead,
    backgroundColor:
      todo.status === "COMPLETED"
        ? "rgba(255, 231, 120, 0.6)"
        : "rgba(211, 228, 136, 0.6)",
    borderColor: "white",
    textColor: "#000",
  }));
});

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
    status: "EXPECTED",
  };
  const res = await axios.post(`/api/user/me/books`, body);
  getTodoList();
  window.location.reload();
};

function formatPeriod(start, end) {
  return start === end ? start : `${start} ~ ${end}`;
}
const updateEvent = async (todo) => {
  console.log(todo);
  if (todo.status == "COMPLETED") {
    const body = {
      status: "EXPECTED",
    };
    const res = await axios.patch(`/api/user/me/books/${todo.historyId}`, body);
    console.log(res);
  }
  const event = calendarOptions.value.events.find(
    (e) =>
      e.title === todo.title && e.start === todo.start && e.end === todo.end
  );
  if (event) {
    event.backgroundColor =
      todo.status == "COMPLETED"
        ? "rgba(255, 231, 120, 0.6)"
        : "rgba(211, 228, 136, 0.6)";
  }
};
const showForm = ref(false);

const toggleForm = () => {
  showForm.value = !showForm.value;
};
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <div class="flex-1 gap-6 p-6">
      <div class="col-span-2 space-y-6">
        <div class="bg-white rounded-xl shadow p-4">
          <FullCalendar :options="calendarOptions" class="custom-calendar" />
          <div class="mt-4 flex justify-end">
            <div class="relative inline-block">
              <BaseButton @click="toggleForm" class="text-sm"
                >+ 일정 추가</BaseButton
              >
              <transition name="fade">
                <div
                  v-if="showForm"
                  class="absolute bottom-full mb-2 right-0 z-50 bg-white p-4 rounded-lg shadow-lg w-[330px]"
                >
                  <BookSearch @select="handleBookSelect" />
                  <div class="mt-4">
                    <label class="text-xs text-gray-500">📅 읽기 시작</label>
                    <input
                      v-model="newTodo.start"
                      type="date"
                      class="w-full border px-2 py-1 rounded text-sm mt-1"
                    />
                  </div>
                  <div class="mt-4">
                    <label class="text-xs text-gray-500">📅 읽기 완료</label>
                    <input
                      v-model="newTodo.end"
                      type="date"
                      class="w-full border px-2 py-1 rounded text-sm mt-1"
                    />
                  </div>
                  <div class="flex justify-end gap-2 mt-4">
                    <button
                      @click="showForm = false"
                      class="text-xs text-gray-500 hover:text-black mr-4"
                    >
                      취소
                    </button>
                    <BaseButton @click="addTodo" class="text-sm"
                      >등록</BaseButton
                    >
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow p-4 max-h-80 overflow-y-auto">
          <!-- <h2 class="text-lg font-semibold mb-4">🗓 책 리스트</h2> -->
          <ul class="space-y-2">
            <li
              v-for="(todo, index) in todoList"
              :key="index"
              class="flex items-start gap-3 p-3 bg-white rounded-md shadow-sm border border-gray-200 hover:shadow-md transition"
            >
              <input
                type="checkbox"
                :checked="todo.status === 'COMPLETED'"
                @change="updateEvent(todo)"
                class="mt-1 w-5 h-5 accent-yellow-400 cursor-pointer"
              />
              <div class="flex flex-col">
                <span
                  :class="[
                    'text-sm',
                    todo.status === 'COMPLETED'
                      ? 'line-through text-gray-400'
                      : 'text-gray-800 font-medium',
                  ]"
                >
                  {{ todo.memo }}
                </span>
                <span class="text-xs text-gray-400 mt-0.5">
                  📅 {{ formatPeriod(todo.startRead, todo.endRead) }}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
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
.fc-button {
  height: 40px;
  padding: 0.25rem 0;
}

.fc .fc-toolbar.fc-header-toolbar {
  margin-bottom: 1em;
}

.fc .fc-toolbar-title {
  font-size: 1.3rem;
}

.fc .fc-button {
  background-color: #facc15 !important;
  color: #000 !important;
  border: none !important;
  padding: 0.4rem 0.75rem;
  border-radius: 0.375rem;
  font-weight: 500;
}

.fc .fc-button:hover {
  background-color: #fbbf24 !important;
}

.fc .fc-button.fc-button-active {
  background-color: #eab308 !important;
  color: white !important;
}
.fc-daygrid-event {
  margin-bottom: 4px !important;
}
</style>
