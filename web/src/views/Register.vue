<script setup lang="ts">
  import { ref, watch, computed } from 'vue'
  import { Lock, User, UserPlus, ShieldCheck, ContactRound, KeyRound } from 'lucide-vue-next'
  import Toast from '@/components/Toast.vue'
  import TermsConsentModal from '@/components/modal/TermsConsentModal.vue'

  const userName = ref('')
  const userId = ref('')
  const userPw = ref('')
  const passPw = ref('')
  const nickName = ref('')
  const memberCode = ref('')
  const message = ref('')
  const toastType = ref<'success' | 'error'>('success')

  const agreePrivacy = ref(false)
  const agreeTerms = ref(false)
  const allChecked = computed(() => agreeTerms.value && agreePrivacy.value)

  const termsConsenOpen = ref(false)
  const activeTab = ref<'terms' | 'privacy'>('terms')

  const isToastShow = ref(false)

  let timeout: ReturnType<typeof setTimeout>

  const addMember = async () =>{
    isToastShow.value = true
    message.value = '회원가입 되었습니다.'

    setTimeout(() => {
      isToastShow.value = false
    }, 3000)

    const memberData = {
      user_id: userId.value,
      user_pw: userPw.value,
    }

    console.info('memberData : ', memberData);
  }

  watch([userPw, passPw], ([newPw, newConfirm]) =>{
    clearTimeout(timeout)

    timeout = setTimeout(() =>{
      if (!newPw || !newConfirm){
        isToastShow.value = false
        return
      }

      isToastShow.value = true
      if (newPw === newConfirm){
        message.value = '비밀번호가 일치합니다'
        toastType.value = 'success'
      }else{
        message.value = '비밀번호가 일치하지 않습니다'
        toastType.value = 'error'
      }
    }, 300)
  })

  const openTerms = () =>{
    termsConsenOpen.value = true
    activeTab.value = 'terms'
  }

  const openPrivacy = () => {
    termsConsenOpen.value = true
    activeTab.value = 'privacy'
  }

  const toggleAll = (v: boolean)=>{
    agreeTerms.value= v
    agreePrivacy.value= v
  }

</script>

<template>
  <Toast
      :show="isToastShow"
      :message="message"
      :type="toastType"
  />

  <TermsConsentModal
      v-model="termsConsenOpen"
      v-model:activeTab="activeTab"
  />

  <div class="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100/60 relative overflow-hidden">

      <div class="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      <div class="text-center">
        <h2 class="text-4xl font-extrabold text-slate-800 tracking-tight mb-2">계정 생성</h2>
        <p class="text-slate-500 font-medium">서비스 이용을 위해 정보를 입력해주세요</p>
      </div>

      <form class="space-y-6" @submit.prevent="addMember">
        <div class="space-y-1">
          <label class="block text-sm font-bold text-slate-700 ml-1">이름</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User class="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
                v-model="userName"
                type="text"
                placeholder="이름"
                class="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-600 placeholder:text-slate-400" />
          </div>
        </div>

        <div class="space-y-1">
          <label class="block text-sm font-bold text-slate-700 ml-1">아이디 생성</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <UserPlus class="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
                v-model="userId"
                type="text"
                placeholder="아이디 입력"
                class="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-600 placeholder:text-slate-400" />
          </div>
        </div>

        <div class="space-y-1">
          <label class="block text-sm font-bold text-slate-700 ml-1">비밀번호</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock class="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
                v-model="userPw"
                type="password"
                placeholder="비밀번호 입력"
                class="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-600 placeholder:text-slate-400" />
          </div>
        </div>

        <div class="space-y-1">
          <label class="block text-sm font-bold text-slate-700 ml-1">비밀번호 확인</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <ShieldCheck class="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
                v-model="passPw"
                type="password"
                placeholder="비밀번호 확인"
                class="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-600 placeholder:text-slate-400" />
          </div>
        </div>

        <div class="space-y-1">
          <label class="block text-sm font-bold text-slate-700 ml-1">닉네임</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <ContactRound class="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
                v-model="nickName"
                type="text"
                placeholder="닉네임을 입력해주세요"
                class="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-600 placeholder:text-slate-400" />
          </div>
        </div>

        <div class="space-y-1">
          <label class="block text-sm font-bold text-slate-700 ml-1">멤버 코등 등록</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <KeyRound class="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
                v-model="memberCode"
                type="password"
                placeholder="등록 코드를 입력해주세요"
                class="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-600 placeholder:text-slate-400" />
          </div>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100">
          <!-- 전체 동의 -->
          <div class="flex items-start justify-between gap-3 p-4 bg-slate-50/60">
            <label for="agreeAll" class="flex cursor-pointer items-start gap-3">
              <input
                  id="agreeAll"
                  type="checkbox"
                  class="mt-1 h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  :checked="allChecked"
                  @change="toggleAll(($event.target as HTMLInputElement).checked)"
              />
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-sm font-semibold text-slate-900">전체 동의</span>
                </div>
              </div>
            </label>
          </div>

          <!-- 이용약관 -->
          <div class="flex items-start justify-between gap-3 p-4">
            <label for="terms" class="flex cursor-pointer items-start gap-3">
              <input
                  id="terms"
                  type="checkbox"
                  v-model="agreeTerms"
                  class="mt-1 h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-sm font-semibold text-slate-900">이용약관 동의</span>
                  <span class="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-600">필수</span>
                </div>
                <p class="mt-1 text-xs text-slate-500">서비스 이용 조건 및 책임 범위를 확인합니다.</p>
              </div>
            </label>

            <button
                type="button"
                @click="openTerms"
                class="shrink-0 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              보기
            </button>
          </div>

          <!-- 개인정보처리방침 -->
          <div class="flex items-start justify-between gap-3 p-4">
            <label for="privacy" class="flex cursor-pointer items-start gap-3">
              <input
                  id="privacy"
                  type="checkbox"
                  v-model="agreePrivacy"
                  class="mt-1 h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-sm font-semibold text-slate-900">개인정보처리방침 동의</span>
                  <span class="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-600">필수</span>
                </div>
                <p class="mt-1 text-xs text-slate-500">수집 항목, 이용 목적, 보관 기간 등을 확인합니다.</p>
              </div>
            </label>

            <button
                type="button"
                @click="openPrivacy"
                class="shrink-0 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              보기
            </button>
          </div>
        </div>

        <!-- 제출 버튼 -->
        <button
            type="submit"
            :disabled="!allChecked"
            class="mt-4 w-full rounded-2xl bg-slate-900 py-4 font-bold text-white shadow-xl shadow-slate-200 transition active:scale-[0.98] hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
        >
          시작하기
        </button>
      </form>

      <div class="pt-6 text-center border-t border-slate-100">
        <p class="text-sm font-medium text-slate-500">
          이미 계정이 있으신가요?
          <router-link :to="{name:'login'}" class="font-bold text-indigo-600 hover:underline">
            로그인
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>