<script setup lang="ts">
  import { ref } from 'vue'
  import { Lock, User, LogIn } from 'lucide-vue-next'
  import Toast from '@/components/Toast.vue'

  const userId = ref('')
  const userPw = ref('')
  const isToastShow = ref(false)
  const toastType = ref<'success' | 'error'>('success')

  const handleLogin = async () =>{

    isToastShow.value = true

    setTimeout(() => {
      isToastShow.value = false
    }, 3000)

    const loginData = {
      user_id: userId.value,
      user_pw: userPw.value,
    }

    console.info('loginData : ', loginData);
  }
</script>

<template>
  <Toast
      :show="isToastShow"
      message="로그인에 성공했습니다"
      :sub-message="`${userId}님 환영합니다!`"
      :type="toastType"
  />
  <div class="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    <div class="max-w-md w-full space-y-6 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-slate-800 tracking-tight">로그인</h2>
      </div>

      <form class="space-y-5" @submit.prevent="handleLogin">

        <!-- 아이디 입력 필드 -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1 ml-1">아이디</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User class="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
                v-model="userId"
                type="text"
                required
                class="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-600"
                placeholder="아이디"
            />
          </div>
        </div>

        <!-- 비밀번호 입력 필드 -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1 ml-1">비밀번호</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock class="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
                v-model="userPw"
                type="password"
                required
                class="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-600"
                placeholder="비밀번호"
            />
          </div>
        </div>

        <!-- 로그인 버튼 -->
        <button
            type="submit"
            class="w-full flex items-center justify-center gap-2 py-4 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
        >
          <LogIn class="h-5 w-5" />
          로그인
        </button>
      </form>

      <div class="pt-4 text-center border-t border-slate-100">
        <p class="text-sm text-slate-500">
          아직 회원이 아니신가요?
          <router-link :to="{name:'register'}" class="font-bold text-indigo-600 hover:underline">
            회원가입
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>