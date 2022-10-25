import {createApp} from 'vue';

import "bootstrap/js/dist/base-component";
import "bootstrap/js/dist/popover";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/collapse";
// Import custom css
import "./sass/main.scss";

import App from './App.vue';
import store from './store'

createApp(App).use(store).mount('#app')
