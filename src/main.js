import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Buefy from "buefy";

import "@/assets/styles/styles.scss";

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
     created() {},
     router,
     store,
     render: (h) => h(App),
}).$mount("#app");
