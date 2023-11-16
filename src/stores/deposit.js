import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getFromStorage, setToStorage } from '@/utils/localstorage'

const DEPOSIT_STORAGE_KEY = 'deposit'
const BALANCE_HISTORY_STORAGE_KEY = 'balance_history'

export const useDepositStore = defineStore('depositStore', () => {
  const deposit = ref({})
  const balanceHistory = ref([])

  const isDepositExist = computed(
    () => Boolean(Object.keys(deposit.value))
  )

  const save = () => {
    setToStorage(DEPOSIT_STORAGE_KEY, deposit.value)
    setToStorage(BALANCE_HISTORY_STORAGE_KEY, balanceHistory.value)
  }

  const load = () => {
    deposit.value = getFromStorage(DEPOSIT_STORAGE_KEY) ?? {}
    balanceHistory.value = getFromStorage(BALANCE_HISTORY_STORAGE_KEY) ?? {}
  }

  return {
    deposit,
    balanceHistory,
    isDepositExist,
    save,
    load,
  }
})
