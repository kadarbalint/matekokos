import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import firebase from "firebase/app";
import '@firebase/firestore';
import VueKatex from 'vue-katex';
import 'katex/dist/katex.min.css';

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(VueKatex, {
  globalOptions: {
    //... Define globally applied KaTeX options here
  }
});

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCUKftFeiiueNNf-4X7MDSCSpamupNJvJ4",
    authDomain: "matekokos-f3cfd.firebaseapp.com",
    projectId: "matekokos-f3cfd",
    storageBucket: "matekokos-f3cfd.appspot.com",
    messagingSenderId: "551631473487",
    appId: "1:551631473487:web:e09e72458de8968d33d33a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore();


    let app;
    
    firebase.auth().onAuthStateChanged(user=> {
      console.log(user);
      if(!app){
        app = new Vue({
          router,
          store,
          render: h => h(App)
        }).$mount('#app')
      }
    })

