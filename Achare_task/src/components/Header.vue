<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
    <div class="container">
      <ul class="between navbar-nav">
    <li class="nav-item">
      <router-link class="nav-link" to="/showall" :class="{'active': $route.path === '/showall'}">
        مشاهده آدرس ها
      </router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/addnewaddress" :class="{'active': $route.path === '/addnewaddress'}">
        ثبت آدرس
      </router-link>
    </li>
  </ul>

      <div class="navbar-brand">
        <img src="/src/assets/achareh-type-logo.a2a4993.png" alt="logo" height="40" />
      </div>
    </div>
  </nav>
</template>

<style scoped>
a {
  color: #00bfa5;
  margin: 0.5rem;
}
a:active {
  color: black;
}
.navbar-nav {
  width: auto;
  flex-direction: row;
}
</style>
