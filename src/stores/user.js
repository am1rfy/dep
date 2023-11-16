import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getFromStorage, setToStorage } from '@/utils/localstorage'

const USER_STORAGE_KEY = 'user'

export const useUserStore = defineStore('userStore', () => {
  const userForm = ref({})

  const isUserInfoExist = computed(
    () => Boolean(Object.keys(userForm.value))
  )

  const save = _user => {
    setToStorage(USER_STORAGE_KEY, userForm.value)
  }

  const load = () => {
    userForm.value = getFromStorage(USER_STORAGE_KEY) ?? {}
  }

  return {
    userForm,
    isUserInfoExist,
    save,
    load,
  }
})
