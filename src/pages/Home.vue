<template>
  <el-card
    class="widget-card"
  >
    <template #header>
      <HomeHeader />
    </template>

    <el-row
      :gutter="10"
    >
      <el-col :span="isInvestmentBalanceExist ? 10 : 14">
        <TransactionHistory />
      </el-col>

      <el-col :span="isInvestmentBalanceExist ? 7 : 10">
        <Balance />
      </el-col>

      <el-col
        v-if="isInvestmentBalanceExist"
        :span="7"
      >
        <InvestmentBalance />
      </el-col>
    </el-row>
  </el-card>

</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '@/stores'

import HomeHeader from '@/components/HomeHeader.vue'
import TransactionHistory from '@/components/TransactionHistory.vue'
import Balance from '@/components/Balance.vue'
import InvestmentBalance from '@/components/InvestmentBalance.vue'

const store = useStore()

const isInvestmentBalanceExist = computed(
  () => Boolean(
    Object.keys(store.account.investment_balance_info ?? {}).length
  )
)
</script>

<style scoped lang="scss">
.widget-card {
  min-width: 768px;
}
</style>
