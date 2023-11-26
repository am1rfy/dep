<template>
  <el-card class="balance">
    <template #header>
      <h3>
        Баланс
      </h3>
    </template>

    <el-row class="balance__body">
      <el-col :span="24">
        <el-text size="large">
          Основной счет
        </el-text>
        <h1>
          {{ balance }} ₽
        </h1>
      </el-col>
    </el-row>

    <el-row class="balance__footer">
      <el-col :span="24">
        <el-button
          type="primary"
          @click="goToPaymentPage"
        >
          <el-icon class="el-icon--left"><Money /></el-icon>
          Оплатить
        </el-button>
      </el-col>

      <el-col :span="24">
        <el-button
          type="success"
          @click="openBalanceIncreaseModal"
        >
          <el-icon class="el-icon--left"><Plus /></el-icon>
          Пополнить
        </el-button>
      </el-col>
    </el-row>
  </el-card>

  <BalanceIncreaseModal
    v-model="isBalanceIncreaseModalVisible"
    @submit="increaseBalance"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores'
import BalanceIncreaseModal from '@/components/BalanceIncreaseModal.vue'

const BALANCE_LABEL = 'Баланс - Основной счет'

const router = useRouter()
const store = useStore()

const isBalanceIncreaseModalVisible = ref(false)

const balance = computed(() => store.account.primary_balance)

const increaseBalance = form => {
  store.changeBalance(form.cost)

  store.addTransaction({
    id: Date.now(),
    label: BALANCE_LABEL,
    date: new Date(),
    cost: form.cost,
    paymentLabel: 'Пополнение',
  })
}

const openBalanceIncreaseModal = () => {
  isBalanceIncreaseModalVisible.value = true
}

const goToPaymentPage = () => {
  router.push({ name: 'payment' })
}
</script>

<style scoped lang="scss">
.balance {
  height: 100%;

  &:deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    position: relative;
    height: calc(100% - 59px);
    padding-bottom: 70px;
  }

  &__body {
    gap: 18px;
  }

  &__footer {
    gap: 6px;
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: 20px;
    
    .el-button {
      width: 100%;
    }
  }
}
</style>
