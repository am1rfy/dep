import { defineStore } from 'pinia'
import { ref } from 'vue'

import * as init from '@/data/init.json'
import { BASE_DEPOSIT_RATE } from '@/consts'

export const useStore = defineStore('store', () => {
  const account = ref(init.default)

  const changeBalance = value => {
    account.value.primary_balance += value
  }

  const changeInvestmentBalance = value => {
    account.value.investment_balance += value
    account.value.savings_balance += value * BASE_DEPOSIT_RATE
  }

  const addTransaction = transaction => {
    account.value.transaction_history.push(transaction)
  } 

  return {
    account,
    changeBalance,
    changeInvestmentBalance,
    addTransaction,
  }
})
