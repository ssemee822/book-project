<template>
  <div class="flex min-h-screen bg-gray-50">
    <div class="flex-1 grid grid-cols-3 gap-6 p-6">
      <div class="col-span-2 space-y-6">
        <div class="bg-white rounded-xl shadow p-4">
          <FullCalendar :options="calendarOptions" class="custom-calendar" />
        </div>
        <div class="bg-white rounded-xl shadow p-4 max-h-80 overflow-y-auto">
          <h2 class="text-lg font-semibold mb-4">🗓 일정 투두 리스트</h2>
          <div class="mb-4 flex gap-2 items-center">
            <input
              v-model="newTodo.title"
              type="text"
              placeholder="할 일 제목"
              class="border rounded px-2 py-1 w-1/3"
            />
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
            <button
              @click="addTodo"
              class="bg-[#e3c02b] hover:bg-[#caa900] text-white font-semibold px-4 py-1 rounded"
            >
              추가
            </button>
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

      <div class="bg-white rounded-xl shadow p-4">
        <h2 class="text-lg font-bold mb-4">📚 내 서재</h2>
        <div class="grid grid-cols-4 gap-4">
          <div
            v-for="i in 6"
            :key="i"
            class="flex flex-col items-center text-center"
          >
            <img
              src="/public/default_profile.png"
              alt="book"
              class="w-20 h-28 object-cover rounded shadow"
            />
            <p class="text-sm text-gray-700 mt-2 truncate w-20">
              책 제목 예시 {{ i }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import { ref } from "vue";

const todoList = ref([
  {
    title: "독서 완료 - 사피엔스",
    start: "2025-06-01",
    end: "2025-06-05",
    done: true,
  },
  {
    title: "책 리뷰 작성",
    start: "2025-06-04",
    end: "2025-06-06",
    done: false,
  },
  { title: "새 책 등록", start: "2025-06-12", end: "2025-06-12", done: true },
]);

const newTodo = ref({ title: "", start: "", end: "" });

function addTodo() {
  if (!newTodo.value.title || !newTodo.value.start) return;
  const end = newTodo.value.end || newTodo.value.start;
  const newItem = {
    title: newTodo.value.title,
    start: newTodo.value.start,
    end,
    done: false,
  };
  todoList.value.push(newItem);
  calendarOptions.value.events.push({
    title: newItem.title,
    start: newItem.start,
    end: newItem.end,
    backgroundColor: "rgba(211, 228, 136, 0.6)",
    borderColor: "white",
    textColor: "#000",
  });
  newTodo.value = { title: "", start: "", end: "" };
}

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

<style>
.custom-calendar .fc {
  font-family: "Pretendard", sans-serif;
  --fc-border-color: #e2e8f0;
  --fc-today-bg-color: #fef8e7;
  font-size: 14px;
}
</style>
