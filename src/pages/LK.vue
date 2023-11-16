<template>
  <el-card
    class="widget-card"
  >
    <template #header>
      <el-row justify="space-between">
        <div class="widget-card__header">
          <el-avatar
            icon="Avatar"
            :size="30"
          />

          <h2>
            {{ userFio }}
          </h2>
        </div>

        <el-tooltip
          content="Выйти"
          placement="top"
        >
          <el-button
            @click="logout"
            type="danger"
            icon="unlock"
            circle
          />
        </el-tooltip>
      </el-row>
    </template>

    <el-row
      :gutter="10"
      class="widget-card"
    >
      <el-col :span="14">
        <el-card class="balance-history">
          <template #header>
            <h3>
              Последние операции
            </h3>
          </template>

          <div
            v-if="depositStore.balanceHistory.length"
            class="balance-history__list"
          >
            <el-card
              class="balance-history__item"
              shadow="hover"
              v-for="item of truncatedBalanceHistory"
              :key="item.id"
            >
              <el-row
                justify="space-between"
                align="middle"
              >
                <el-text size="large">
                  {{ item.date }}
                </el-text>

                <el-tag :type="item.tagType">
                  {{ item.cost }}
                </el-tag>
              </el-row>
            </el-card>

            <el-row class="balance-history__footer">
              <el-col :span="24">
                <el-button
                  type="primary"
                  @click="openBalanceHistoryModal"
                >
                  Показать все
                </el-button>
              </el-col>
            </el-row>
          </div>

          <div
            v-else
            class="balance-history__empty"
          >
            <el-text size="large">
              Нет данных
            </el-text>
          </div>
        </el-card>
      </el-col>

      <el-col :span="10">
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

            <el-col :span="24">
              <el-text size="large">
                Накопительный счет
              </el-text>
              <h1>
                0 ₽
              </h1>
            </el-col>
          </el-row>

          <el-row class="balance__footer">
            <el-col :span="24">
              <el-button
                type="primary"
                @click="openDepositModal"
              >
                <el-icon class="el-icon--left"><Plus /></el-icon>
                Пополнить
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </el-card>

  <DepositModal
    v-model="isDepositModalVisible"
    @submit="changeBalance"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores'
import { useDepositStore } from '@/stores'
import { formatDateToRu, formatCost } from '@/utils/format'

import DepositModal from '@/components/DepositModal.vue'

const userStore = useUserStore()
const depositStore = useDepositStore()

const isDepositModalVisible = ref(false)
const isBalanceHistoryModalVisible = ref(false)

const userFio = computed(
  () => userStore.userForm.fio
)

const balance = computed(
  () => depositStore.deposit.balance
)

const truncatedBalanceHistory = computed(
  () => depositStore.balanceHistory
    .slice(depositStore.balanceHistory.length - 3)
    .map(
      item => ({
        id: item.id,
        date: formatDateToRu(item.date),
        cost: formatCost(item.cost),
        tagType: item.cost > 0 ? 'success' : 'danger'
      })
    )
)

const changeBalance = form => {
  depositStore.deposit.balance += form.balance
  depositStore.balanceHistory.push({
    id: Date.now(),
    date: new Date(),
    cost: form.balance,
  })
  depositStore.save()
}

const openDepositModal = () => {
  isDepositModalVisible.value = true
}

const openBalanceHistoryModal = () => {
  isBalanceHistoryModalVisible.value = true
}

const logout = () => {

}

onMounted(() => {
  depositStore.load()
  userStore.load()
})
</script>

<style scoped lang="scss">
.widget-card {
  min-width: 638px;

  &__header {
    display: flex;
    align-items: center;
    gap: 18px;
  }
}
.balance {
  height: 100%;

  &:deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    position: relative;
    height: calc(100% - 59px);
  }

  &__body {
    gap: 18px;
  }

  &__footer {
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: 20px;
    
    .el-button {
      width: 100%;
    }
  }
}
.balance-history {
  height: 100%;

  &__list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__item {
    border: none;
    box-shadow: var(--el-box-shadow-lighter);
    
    &:hover {
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.24);
    }
  }

  &__empty {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__footer {
    margin-top: 12px;
    
    .el-button {
      width: 100%;
    }
  }
}
</style>
