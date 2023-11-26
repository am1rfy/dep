<template>
  <el-card class="transaction-history">
    <template #header>
      <h3>
        Последние операции
      </h3>
    </template>

    <div
      v-if="transactionHistory.length"
      class="transaction-history__list"
    >
      <el-card
        class="transaction-history__item"
        shadow="hover"
        v-for="item of truncatedTransactionHistory"
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

      <el-row class="transaction-history__footer">
        <el-col :span="24">
          <el-button
            type="primary"
            @click="openTransactionHistoryModal"
          >
            Показать все
          </el-button>
        </el-col>
      </el-row>
    </div>

    <el-empty
      class="transaction-history__empty"
      v-else
    />
  </el-card>

  <TransactionHistoryModal
    v-model="isTransactionHistoryModalVisible"
    :items="transactionHistory"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from '@/stores'
import { formatDateToRu } from '@/utils/format'

import TransactionHistoryModal from '@/components/TransactionHistoryModal.vue'

const store = useStore()

const isTransactionHistoryModalVisible = ref(false)

const transactionHistory = computed(
  () => [...store.account.transaction_history]
    .reverse()
    .map(
      item => ({
        id: item.id,
        label: item.label,
        date: formatDateToRu(item.date),
        cost: `${item.cost > 0 ? '+' : ''} ${item.cost} руб.`,
        tagType: item.cost > 0 ? 'success' : 'danger',
        paymentLabel: item.paymentLabel,
      })
    )
)

const truncatedTransactionHistory = computed(
  () => transactionHistory.value.slice(0, 3)
)

const openTransactionHistoryModal = () => {
  isTransactionHistoryModalVisible.value = true
}
</script>

<style scoped lang="scss">
.transaction-history {
  height: 100%;

  &__list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__item {
    height: fit-content;
    border: none;
    box-shadow: var(--el-box-shadow-lighter);
    
    &:hover {
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.24);
    }
  }

  &__empty {
    position: absolute;
    inset: 0 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > :deep(.el-card__body) {
    min-height: 294px;
    position: relative;
    height: calc(100% - 59px);
    padding-bottom: 70px;
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
</style>