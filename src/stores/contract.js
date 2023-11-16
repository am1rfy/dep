import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getFromStorage, setToStorage } from '@/utils/localstorage'

const CONTRACT_STORAGE_KEY = 'contract'

export const useContractStore = defineStore('contractStore', () => {
  const contractForm = ref({})

  const isContractExist = computed(
    () => Boolean(Object.keys(contractForm.value))
  )

  const save = _contract => {
    setToStorage(CONTRACT_STORAGE_KEY, contractForm.value)
  }

  const load = () => {
    contractForm.value = getFromStorage(CONTRACT_STORAGE_KEY) ?? {}
  }

  return {
    contractForm,
    isContractExist,
    save,
    load,
  }
})
