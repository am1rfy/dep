<template>
  <el-card class="widget-card">
    <template #header>
      <div class="widget-card__header">
        <ButtonBack @click="goToHomePage" />

        <h2>Доступные платежи</h2>
      </div>
    </template>

    <el-row
      class="payments-list"
      :gutter="10"
    >
      <el-col
        v-for="item of payments"
        :key="item"
        :span="12"
      >
        <el-card
          @click="openPaymentModal(item)"
          class="payments-list__item"
        >
          {{ item.name }}
        </el-card>
      </el-col>
    </el-row>
  </el-card>

  <PaymentModal
    v-model="isPaymentModalVisible"
    :payment="currentPayment"
    @submit="onPaymentFormSubmit"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores'
import { deepClone } from '@/utils'
import * as payment from '@/data/payment.json'

import PaymentModal from '@/components/PaymentModal.vue'
import ButtonBack from '@/components/ButtonBack.vue'

const router = useRouter()
const store = useStore()

const isPaymentModalVisible = ref(false)
const currentPayment = ref({})

const payments = payment.default.payments

const onPaymentFormSubmit = (form) => {
  switch (form.balanceAccount) {
    case 'primary_balance':
      store.account.primary_balance -= form.cost
      break
    case 'investment_balance':
      store.account.investment_balance -= form.cost
      break
    case 'savings_balance':
      store.account.savings_balance -= form.cost
      break
    default:
      return
  }

  store.addTransaction({
    id: Date.now(),
    label: form.label,
    date: new Date(),
    cost: `- ${form.cost}`,
    paymentLabel: form.paymentLabel
  })
}

const openPaymentModal = (payment) => {
  currentPayment.value = deepClone(payment)
  isPaymentModalVisible.value = true
}

const goToHomePage = () => {
  router.push({ name: 'home' })
}
</script>

<style scoped lang="scss">
.widget-card {
  max-width: 638px;

  &__header {
    display: flex;
    align-items: center;
    gap: 18px;
  }
}
.payments-list {
  &__item {
    cursor: pointer;
    height: fit-content;
    border: none;
    box-shadow: var(--el-box-shadow-lighter);

    &:nth-last-child(-n + 2) {
      margin-bottom: 10px;
    }

    &:hover {
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.24);
    }
  }
}
</style>
