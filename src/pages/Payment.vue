<template>
  <el-card
    class="widget-card"
  >
    <template #header>
      <div class="widget-card__header">
        <ButtonBack
          @click="goToHomePage"
        />

        <h2>
          Доступные платежи
        </h2>
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
        <el-card class="payments-list__item">
          {{ item }}
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import ButtonBack from '@/components/ButtonBack.vue'
import * as payment from '@/data/payment.json'
import { useRouter } from 'vue-router'

const router = useRouter()

const payments = payment.default.payments

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

    &:nth-last-child(-n+2) {
      margin-bottom: 10px;
    }
    
    &:hover {
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.24);
    }
  }
}
</style>
