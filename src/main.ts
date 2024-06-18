import '@/assets/main.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { initializeApp } from "firebase/app";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ConfirmationService from 'primevue/confirmationservice';
import PrimeVue from 'primevue/config';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import ProgressSpinner from 'primevue/progressspinner';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ConfirmDialog from 'primevue/confirmdialog';
import InlineMessage from 'primevue/inlinemessage';

const firebaseConfig = {
  apiKey: "AIzaSyDjncVkHguyHhP8AZGt9Q0JfYjCiChoBZI",
  authDomain: "interview-26fb8.firebaseapp.com",
  projectId: "interview-26fb8",
  storageBucket: "interview-26fb8.appspot.com",
  messagingSenderId: "512824751610",
  appId: "1:512824751610:web:b452ce4a7a3a96a898a043",
  measurementId: "G-JGQSZ4PCEN"
};

initializeApp(firebaseConfig);

import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)

app.use(ToastService)
app.use(ConfirmationService)
app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.component('app-menubar', Menubar)
app.component('app-button', Button)
app.component('app-input-text', InputText)
app.component('app-toast', Toast)
app.component('app-spinner', ProgressSpinner)
app.component('app-card', Card)
app.component('app-data-table', DataTable)
app.component('app-column', Column)
app.component('app-dialog', ConfirmDialog)
app.component('app-message', InlineMessage)

app.mount('#app')
