import { createApp, onMounted, watch } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./assets/style.css";
import "aos/dist/aos.css";
import AOS from "aos";
import "aos/dist/aos.css";

const app = createApp(App);
const pinia = createPinia();

AOS.init({
  duration: 500,
  easing: "ease-out",
  once: true,
});

app.use(pinia);
app.use(router);
app.mount("#app");

AOS.init();
