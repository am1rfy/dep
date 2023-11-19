<template>
  <el-row
    justify="space-between"
    class="header"
  >
    <div class="header__primary">
      <el-avatar
        icon="Avatar"
        :size="30"
      />

      <h2>
        {{ userFio }}
      </h2>
    </div>

    <el-tooltip
      content="Открыть вклад"
      placement="top"
    >
      <el-button
        @click="goToCreatingInvestmentDeposit"
        type="primary"
        icon="unlock"
        circle
      />
    </el-tooltip>
  </el-row>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores'

const router = useRouter()
const store = useStore()

const userFio = computed(() => store.account.fio)

const goToCreatingInvestmentDeposit = () => {
  router.push({ name: 'createInvestmentDeposit' })
}
</script>

<style scoped lang="scss">
.header__primary {
  display: flex;
  align-items: center;
  gap: 18px;
}
</style>
