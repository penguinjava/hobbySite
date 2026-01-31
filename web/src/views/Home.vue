<script setup lang="ts">

</script>

<template>
  <h1> 홈 화면 </h1>
  <hr/>
  <router-link :to="{name:'login'}">
    로그인
  </router-link>
  <hr/>
  <div class="grid grid-cols-4 gap-4">
    <div>
    <router-link :to="{name:'bord'}">
      보드게임
    </router-link>
    </div>
    <div>
    <router-link :to="{name:'food'}">
      미식회
    </router-link>
    </div>
    <div>
      추가
    </div>
  </div>
</template>

<style scoped>

</style>