<script setup lang="ts">
  const modelValue = defineModel<boolean>({default: false})
  const activeTabModel = defineModel<'terms' | 'privacy'>('activeTab', {default: 'terms'})

  const close = () => {
    modelValue.value = false
  }
</script>
<template>
  <teleport to="body">
    <div
        v-show="modelValue"
        class="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4 overflow-hidden"
        aria-modal="true"
        role="dialog"
    >
      <!-- Backdrop -->
      <button
          type="button"
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          aria-label="배경 클릭 닫기"
          @click="close"
      />

      <!-- Modal -->
      <div class="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 h-[calc(100dvh-2rem)] sm:h-auto sm:max-h-[calc(100dvh-2rem)] flex flex-col">


        <!-- Header -->
        <div class="shrink-0 flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">

          <div class="min-w-0">
            <h2 class="truncate text-lg font-semibold tracking-tight text-slate-900">
              <span v-if="activeTabModel === 'terms'">서비스 이용약관</span>
              <span v-else>개인정보 수집·이용 동의</span>
            </h2>
            <p class="mt-1 text-sm text-slate-500">
              시행일: <span class="font-medium text-slate-700">2026-01-29</span>
              <span class="mx-2 text-slate-300">•</span>
              문의: <span class="font-medium text-slate-700">ejh.devworks@gmail.com</span>
            </p>
          </div>

          <button
              type="button"
              class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="닫기"
              @click="close"
          >
            ✕
          </button>
        </div>

        <!-- Body -->
        <div class="flex-1 min-h-0 px-6 py-6 overflow-hidden flex flex-col">


          <!-- Card -->
          <div class="flex-1 min-h-0 overflow-hidden rounded-2xl border border-slate-200 bg-white flex flex-col">


            <!-- Top bar -->
            <div class="shrink-0 flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
              <p class="truncate text-sm font-semibold text-slate-900">
                <span v-if="activeTabModel === 'terms'">이용약관(요약)</span>
                <span v-else>개인정보 동의(요약)</span>
              </p>

              <span class="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                필수
              </span>
            </div>

            <!-- Scroll -->
            <div class="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y px-5 py-5 text-sm leading-6 text-slate-700"
                 style="-webkit-overflow-scrolling: touch;">



              <!-- =========================
                   이용약관 (간소화)
                   ========================= -->
              <div v-show="activeTabModel === 'terms'" class="space-y-5">
                <div class="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <p>
                    본 약관은 운영자가 제공하는 웹 서비스(이하 “서비스”) 이용과 관련하여 운영자와 이용자 간 권리·의무 및 책임사항을 정합니다.
                  </p>
                </div>

                <section class="space-y-2">
                  <h3 class="text-base font-semibold text-slate-900">1. 계정 및 보안</h3>
                  <ul class="list-disc space-y-1 pl-5">
                    <li>이용자는 계정(ID/비밀번호)을 본인 책임 하에 안전하게 관리합니다.</li>
                    <li>도용/이상징후가 의심되면 즉시 운영자에게 알려야 합니다.</li>
                  </ul>
                </section>

                <section class="space-y-2">
                  <h3 class="text-base font-semibold text-slate-900">2. 금지행위</h3>
                  <ul class="list-disc space-y-1 pl-5">
                    <li>타인 계정 도용, 불법/부정 이용</li>
                    <li>서비스 운영 방해(비정상 트래픽, 취약점 악용 등)</li>
                    <li>저작권/권리 침해</li>
                  </ul>
                </section>

                <section class="space-y-2">
                  <h3 class="text-base font-semibold text-slate-900">3. 서비스 제공</h3>
                  <p>
                    점검/장애/보안 이슈 등 불가피한 사유가 있는 경우 서비스가 일시 중단될 수 있습니다.
                  </p>
                </section>

                <section class="space-y-2">
                  <h3 class="text-base font-semibold text-slate-900">4. 책임 제한</h3>
                  <ul class="list-disc space-y-1 pl-5">
                    <li>이용자 귀책으로 발생한 손해에 대해 운영자는 책임을 지지 않습니다.</li>
                    <li>무료 제공 범위 내 서비스는 법령상 허용 범위에서 책임이 제한될 수 있습니다.</li>
                  </ul>
                </section>

                <section class="space-y-2">
                  <h3 class="text-base font-semibold text-slate-900">5. 분쟁 및 관할</h3>
                  <p>협의가 어려운 경우 <span class="font-semibold text-slate-900">서울중앙지방법원</span>을 관할로 합니다.</p>
                </section>
              </div>

              <!-- =========================
                   개인정보 수집·이용 (간소화)
                   ========================= -->
              <div v-show="activeTabModel === 'privacy'" class="space-y-5">
                <div class="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <p>
                    운영자는 서비스 제공을 위해 아래와 같이 개인정보를 수집·이용합니다.
                  </p>
                </div>

                <section class="space-y-2">
                  <h3 class="text-base font-semibold text-slate-900">1. 수집 항목(필수)</h3>
                  <ul class="list-disc space-y-1 pl-5">
                    <li>ID(아이디), 비밀번호(암호화 저장), 닉네임</li>
                  </ul>
                  <p class="text-xs text-slate-500">※ 본 서비스는 휴대폰/이메일을 수집하지 않습니다.</p>
                </section>

                <section class="space-y-2">
                  <h3 class="text-base font-semibold text-slate-900">2. 이용 목적</h3>
                  <ul class="list-disc space-y-1 pl-5">
                    <li>회원가입, 로그인, 계정 관리</li>
                    <li>서비스 제공 및 운영</li>
                    <li>부정 이용 방지 및 보안/안정화</li>
                  </ul>
                </section>

                <section class="space-y-2">
                  <h3 class="text-base font-semibold text-slate-900">3. 보유 및 이용기간</h3>
                  <ul class="list-disc space-y-1 pl-5">
                    <li>회원 탈퇴 시 지체 없이 파기합니다.</li>
                    <li>관련 법령에 따라 보관이 필요한 경우 해당 기간 보관 후 파기합니다.</li>
                  </ul>
                </section>

                <section class="space-y-2">
                  <h3 class="text-base font-semibold text-slate-900">4. 제3자 제공/처리위탁</h3>
                  <ul class="list-disc space-y-1 pl-5">
                    <li>동의 없이 제3자에게 제공하지 않습니다(법령 근거 예외).</li>
                    <li>현재 외부 처리위탁은 없습니다(발생 시 고지).</li>
                  </ul>
                </section>

                <section class="space-y-2">
                  <h3 class="text-base font-semibold text-slate-900">5. 동의 거부권 및 문의</h3>
                  <ul class="list-disc space-y-1 pl-5">
                    <li>동의 거부 권리가 있으나, 필수 항목 미동의 시 회원가입/이용이 제한됩니다.</li>
                    <li>문의: <span class="font-semibold text-slate-900">ejh.devworks@gmail.com</span></li>
                  </ul>
                </section>

                <section class="space-y-2">
                  <h3 class="text-base font-semibold text-slate-900">6. 안전성 확보 조치</h3>
                  <ul class="list-disc space-y-1 pl-5">
                    <li>비밀번호 암호화 저장</li>
                    <li>접근권한 관리 및 보안 점검</li>
                    <li>부정 이용 방지를 위한 최소한의 로그 점검</li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="shrink-0 flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-5">

          <button
              type="button"
              class="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 ring-1 ring-slate-200"
              @click="close"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>
