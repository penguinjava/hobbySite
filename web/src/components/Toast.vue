<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircle2, AlertCircle } from 'lucide-vue-next'

// props에 type 추가 (success 또는 error)
const props = defineProps<{
  show: boolean;
  message: string;
  subMessage?: string;
  type?: 'success' | 'error';
}>()

// 타입에 따른 스타일 및 아이콘 설정
const config = computed(() => {
  if (props.type === 'error') {
    return {
      icon: AlertCircle,
      iconBg: 'bg-rose-100',
      iconColor: 'text-rose-600',
      barColor: 'bg-rose-600'
    }
  }
  // 기본값은 success
  return {
    icon: CheckCircle2,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    barColor: 'bg-emerald-600'
  }
})
</script>

<template>
  <Transition
      enter-active-class="transform transition duration-300 ease-out"
      enter-from-class="translate-y-[-20px] opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
  >
    <div v-if="show" class="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm">
      <div class="mx-4 bg-white/90 backdrop-blur-xl border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl p-4 flex items-center gap-4 relative overflow-hidden">

        <div :class="['absolute left-0 top-0 bottom-0 w-1.5', config.barColor]"></div>

        <div :class="['rounded-2xl p-2', config.iconBg]">
          <component :is="config.icon" :class="['h-6 w-6', config.iconColor]" />
        </div>

        <div class="flex-1">
          <h3 class="font-bold text-slate-900 leading-tight">{{ message }}</h3>
          <p v-if="subMessage" class="text-sm text-slate-500 mt-0.5">{{ subMessage }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>