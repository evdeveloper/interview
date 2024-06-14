<script setup lang="ts">

import { ref, computed } from 'vue'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const isLogin = ref<boolean>(true)
const isLoading = ref<boolean>(false)
const toast = useToast()
const email = ref<string>('')
const password = ref<string>('')
const toggleAuth = () => isLogin.value = !isLogin.value
const subtitleText = computed<string>(() => isLogin.value ? 'Аккаунта ещё нет?' : 'Уже есть аккаунт?')
const linkAccountText = computed(() => isLogin.value ? 'Создать сейчас' : 'Войдите в аккаунт')
const submitButtonText = computed<string>(() => isLogin.value ? 'Войти в аккаунт ' : 'Создать аккаунт')
const submitForm = () => {
  isLogin.value ? singIn() : singUp()
}
const router = useRouter()
const singUp = async ():Promise<void> => {
  isLoading.value = true
  try {
    await createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    router.push('/')
  } catch (error:unknown) {
    if(error instanceof Error) {
      toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 })
    }
  } finally {
    isLoading.value = false
  }
}
const singIn = async ():Promise<void> => {
  isLoading.value = true
  try {
    await signInWithEmailAndPassword(getAuth(), email.value, password.value)
    router.push('/')
  } catch (error:unknown) {
    if(error instanceof Error) {
      toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 })
    }
  } finally {
    isLoading.value = false
  }
}

</script>

<template>
  <app-toast position="top-right"/>
  <div class="flex justify-content-center p-2">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-3">
        <div class="text-900 text-3xl font-medium mb-3">Приветствую!</div>
        <span class="text-600 font-medium line-height-3">{{ subtitleText }}</span>
        <a class="font-medium user-select-none no-underline ml-2 text-blue-500 cursor-pointer" @click="toggleAuth">
          {{ linkAccountText }}
        </a>
      </div>

      <form @submit.prevent="submitForm">
        <label for="email1" class="block text-900 font-medium mb-2">Email</label>
        <app-input-text v-model="email" id="email1" type="email" class="w-full mb-3" />

        <label for="password1" class="block text-900 font-medium mb-2">Пароль</label>
        <app-input-text v-model="password" id="password1" type="password" class="w-full mb-3" />

        <app-button
          :label="submitButtonText"
          type="submit"
          icon="pi pi-user"
          :loading="isLoading"
          class="w-full flex justify-content-center align-items-center"
        ></app-button>
      </form>
    </div>
  </div>
</template>
