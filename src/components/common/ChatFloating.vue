<script setup>
import { ref, onMounted, watchEffect, nextTick, computed } from "vue";
import SockJS from "sockjs-client/dist/sockjs.min.js";
import Stomp from "stompjs";

const isOpen = ref(false);
const newMsg = ref("");
const messages = ref([]);
const accessToken = localStorage.getItem("accessToken");
const chatContainer = ref(null);
let stompClient = null;

const groupedMessages = computed(() => groupMessagesByDate(messages.value));

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

watchEffect(() => {
  messages.value.length;
  scrollToBottom();
});

onMounted(() => {
  connectSocket();
});

const connectSocket = () => {
  const socket = new SockJS(`http://localhost:8111/ws?token=${accessToken}`);
  stompClient = Stomp.over(socket);

  stompClient.connect(
    {},
    (frame) => {
      console.log("소켓 연결 성공", frame);

      stompClient.subscribe("/topic/chat", (msg) => {
        const body = JSON.parse(msg.body);
        const token = localStorage.getItem("accessToken");
        const myEmail = JSON.parse(atob(token.split(".")[1])).sub;

        messages.value.push({
          text: body.content,
          isMine: body.sender === myEmail,
          sender: body.sender,
          nickname: body.nickname,
          timestamp: body.timestamp,
        });
      });

      stompClient.subscribe("/user/queue/history", (msg) => {
        const history = JSON.parse(msg.body);
        const token = localStorage.getItem("accessToken");
        const myEmail = JSON.parse(atob(token.split(".")[1])).sub;

        messages.value = history.slice(-100).map((m) => ({
          text: m.content,
          sender: m.sender,
          isMine: m.sender === myEmail,
          timestamp: m.timestamp,
          nickname: m.nickname,
        }));
      });

      stompClient.send("/app/chat/join", {}, {});
    },
    (error) => {
      console.error("소켓 연결 실패", error);
    }
  );
};

const toggleChat = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    nextTick(() => scrollToBottom());
  }
};

const sendMsg = () => {
  if (!newMsg.value.trim()) return;

  if (stompClient && stompClient.connected) {
    const token = localStorage.getItem("accessToken");
    const myEmail = JSON.parse(atob(token.split(".")[1])).sub;

    stompClient.send(
      "/app/chat/message",
      {},
      JSON.stringify({
        content: newMsg.value,
        sender: myEmail,
      })
    );

    newMsg.value = "";
  }
};

const formatTime = (ts) => {
  const date = new Date(ts);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const isAM = hours < 12;
  const hour12 = hours % 12 || 12;
  const meridiem = isAM ? "오전" : "오후";
  return `${meridiem} ${hour12}:${minutes}`;
};

const groupMessagesByDate = (messages) => {
  const grouped = [];
  let lastDate = null;

  messages.forEach((msg) => {
    const date = new Date(msg.timestamp).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });

    if (date !== lastDate) {
      grouped.push({ type: "date", value: date });
      lastDate = date;
    }

    grouped.push({ type: "message", ...msg });
  });

  return grouped;
};
</script>

<template>
  <div>
    <button
      @click="toggleChat"
      class="fixed bottom-6 right-6 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full shadow-lg z-50"
    >
      {{ isOpen ? "✖" : "+" }}
    </button>
    <div
      v-if="isOpen"
      class="fixed bottom-20 right-6 w-[320px] h-[480px] bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden z-40 flex flex-col"
    >
      <div class="bg-yellow-100 px-4 py-2 font-semibold">💬 쭉정이 채팅</div>

      <div
        ref="chatContainer"
        class="flex-1 overflow-y-auto p-4 text-sm space-y-2"
      >
        <div v-for="(item, index) in groupedMessages" :key="index">
          <div
            v-if="item.type === 'date'"
            class="text-center text-gray-700 text-[0.81rem] mt-4 mb-2 py-[0.1rem] bg-gray-200 rounded-lg"
          >
            {{ item.value }}
          </div>

          <div
            v-else
            :class="[
              'flex flex-col',
              item.isMine ? 'items-end' : 'items-start',
            ]"
          >
            <div
              v-if="
                !item.isMine && groupedMessages[index - 1].sender != item.sender
              "
              class="text-xs text-gray-500 mb-1"
            >
              {{ item.nickname }}
            </div>
            <div
              class="flex items-end space-x-1"
              :class="item.isMine ? 'flex-row-reverse' : 'flex-row'"
            >
              <div
                :class="[
                  'px-3 py-2 rounded-xl max-w-[70%] break-words',
                  item.isMine
                    ? 'bg-yellow-300 text-gray-900 rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none',
                ]"
              >
                {{ item.text }}
              </div>
              <div class="text-[10px] text-gray-400 pr-1">
                {{ formatTime(item.timestamp) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex border-t p-2">
        <input
          type="text"
          v-model="newMsg"
          placeholder="메시지 입력..."
          @keyup.enter="sendMsg"
          class="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
        />
        <button
          @click="sendMsg"
          class="ml-2 bg-yellow-400 text-white px-3 py-1 rounded"
        >
          전송
        </button>
      </div>
    </div>
  </div>
</template>
