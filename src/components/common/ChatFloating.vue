<script setup>
import { ref, onMounted, watchEffect, nextTick } from "vue";
import SockJS from "sockjs-client/dist/sockjs.min.js";
import Stomp from "stompjs";

const isOpen = ref(false);
const newMsg = ref("");
const messages = ref([]);
const accessToken = localStorage.getItem("accessToken");
const chatContainer = ref(null);
let stompClient = null;

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
          timestamp: body.timestamp,
        });
      });

      stompClient.subscribe("/user/queue/history", (msg) => {
        console.log(msg);
        const history = JSON.parse(msg.body);
        const token = localStorage.getItem("accessToken");
        const myEmail = JSON.parse(atob(token.split(".")[1])).sub;

        messages.value = history.map((m) => ({
          text: m.content,
          sender: m.sender,
          isMine: m.sender === myEmail,
          timestamp: m.timestamp,
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
        <div
          v-for="(msg, index) in messages"
          :key="index"
          class="flex flex-col"
          :class="msg.isMine ? 'items-end' : 'items-start'"
        >
          <div
            v-if="
              !msg.isMine &&
              (index === 0 || messages[index - 1].sender !== msg.sender)
            "
            class="text-xs text-gray-500 mb-1"
          >
            {{ msg.sender }}
          </div>

          <div
            class="flex items-end space-x-1"
            :class="msg.isMine ? 'flex-row-reverse' : 'flex-row'"
          >
            <div
              :class="[
                'px-3 py-2 rounded-xl max-w-[70%] break-words',
                msg.isMine
                  ? 'bg-yellow-300 text-gray-900 rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none',
              ]"
            >
              {{ msg.text }}
            </div>
            <div class="text-[10px] text-gray-400 pr-1">
              {{ formatTime(msg.timestamp) }}
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
