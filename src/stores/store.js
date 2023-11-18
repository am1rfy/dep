import { defineStore } from 'pinia'
import { ref } from 'vue'

import * as init from '@/data/init.json'

export const useStore = defineStore('store', () => {
  const account = ref(init.default)

  const changeBalance = value => {
    account.value.primary_balance += value
  }

  const addTransaction = transaction => {
    account.value.transaction_history.push(transaction)
  } 

  return {
    account,
    changeBalance,
    addTransaction,
  }
})
