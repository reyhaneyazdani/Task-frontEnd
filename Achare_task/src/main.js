import { createApp } from "vue";
import "./style.css";
import { store } from "./Store/MainStore";
import "bootstrap/dist/css/bootstrap.css";
import router from "./router";
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
