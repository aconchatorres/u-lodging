<template>
  <div id="app">
    <router-view/>
    <FooterInfo></FooterInfo>
  </div>
</template>

<script>
import FooterInfo from './components/FooterInfo.vue'
import firebase from 'firebase'

let config = {
  apiKey: "AIzaSyA78QePkuZfX4hV0TcxC-KyCuddkMtxz-8",
  authDomain: "u-lodging.firebaseapp.com",
  databaseURL: "https://u-lodging.firebaseio.com",
  projectId: "u-lodging",
  storageBucket: "u-lodging.appspot.com",
  messagingSenderId: "976627078440"
}

var app = firebase.initializeApp(config);

export default {
  name: 'app',
  components: {
    FooterInfo
  }
}
</script>

<style>
#app {
  margin-top: -10px;
  background: white;
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
