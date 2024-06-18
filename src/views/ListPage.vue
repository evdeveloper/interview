<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { IInterview } from '@/interfaces'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
  orderBy
} from 'firebase/firestore'
import { useConfirm } from 'primevue/useconfirm'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const db = getFirestore()
const confirm = useConfirm()
const isLoading = ref<boolean>(true)

const interviews = ref<IInterview[]>([])
const getAllInterviews = async <T extends IInterview>(): Promise<T[]> => {
  const getData = query(
    collection(db, `users/${userStore.userId}/interviews`),
    orderBy('createdAt', 'desc')
  )
  const listDocs = await getDocs(getData)
  return listDocs.docs.map((doc) => doc.data() as T)
}

const confirmRemoveInterview = async (id: string): Promise<void> => {
  confirm.require({
    message: 'Вы хотите удалить собеседование?',
    header: 'Подтвердите действие',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Отмена',
    acceptLabel: ' Удалить',
    acceptClass: 'p-button-outline p-button-secondary',
    accept: async () => {
      isLoading.value = true
      await deleteDoc(doc(db, `users/${userStore.userId}/interviews`, id))
      const listInterviews: Array<IInterview> = await getAllInterviews()
      interviews.value = listInterviews
      isLoading.value = false
    }
  })
}

onMounted(async () => {
  const listInterviews: Array<IInterview> = await getAllInterviews()
  interviews.value = listInterviews
  isLoading.value = false
})
</script>
<template>
  <app-dialog />
  <app-spinner class="flex justify-content-center align-items-center h-screen" v-if="isLoading" />
  <app-message class="flex justify-content-center mt-6" v-else-if="!isLoading && !interviews.length" severity="info">Список собеседований пуст</app-message>
  <div v-else>
    <h1>Список собеседований</h1>
    <app-data-table :value="interviews">
      <app-column field="company" header="Компания"></app-column>
      <app-column field="hrName" header="Контакт"></app-column>
      <app-column field="vacancyLink" header="Вакансия">
        <template #body="slotProps">
          <a target="_blank" :href="slotProps.data.vacancyLink">{{ slotProps.data.vacancyLink }}</a>
        </template>
      </app-column>
      <app-column header="Контакты">
        <template #body="slotProps">
          <div class="contacts">
            <a
              v-if="slotProps.data.contactTelegram"
              target="_blank"
              class="contacts__tg"
              :href="`https://t.me/${slotProps.data.contactTelegram}`"
            >
              <span class="contacts__icon pi pi-telegram"></span>
            </a>
            <a
              v-if="slotProps.data.contactWhatsApp"
              :href="`https://wa.me/${slotProps.data.contactWhatsApp}`"
              target="_blank"
              class="contacts__wh"
            >
              <span class="contacts__icon pi pi-whatsapp"></span>
            </a>
            <a
              v-if="slotProps.data.contactPhone"
              class="contacts__phone"
              :href="`tel:${slotProps.data.contactPhone}`"
            >
              <span class="contacts__icon pi pi-phone"></span>
            </a>
          </div>
        </template>
      </app-column>
      <app-column>
        <template #body="slotProps">
          <div class="flex gap-2">
            <router-link :to="`/interview/${slotProps.data.id}`">
              <app-button icon="pi pi-pencil" severity="info" />
            </router-link>
            <app-button
              icon="pi pi-trash"
              severity="danger"
              @click="confirmRemoveInterview(slotProps.data.id)"
            />
          </div>
        </template>
      </app-column>
    </app-data-table>
  </div>
</template>

<style scoped>
.contacts {
  display: flex;
  align-items: center;
  gap: 20px;
}
.contacts__tg {
  color: #0088cc;
}
.contacts__wh {
  color: #25d366;
}
.contacts__phone {
  color: #371777;
}
.contacts__icon {
  font-size: 20px;
}
.interview-stages {
  display: flex;
  gap: 5px;
}
</style>
