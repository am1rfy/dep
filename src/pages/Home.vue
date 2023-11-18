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
      <el-col :span="14">
        <TransactionHistory />
      </el-col>

      <el-col :span="10">
        <Balance />
      </el-col>
    </el-row>
  </el-card>

</template>

<script setup>
import HomeHeader from '@/components/HomeHeader.vue'
import TransactionHistory from '@/components/TransactionHistory.vue'
import Balance from '@/components/Balance.vue'
</script>

<style scoped lang="scss">
.widget-card {
  min-width: 638px;
}
</style>
