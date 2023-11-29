<template>
  <el-card class="widget-card">
    <template #header>
      <div class="widget-card__header">
        <ButtonBack @click="goBack" />

        <h2>
          {{ activeWidget.label }}
        </h2>
      </div>
    </template>

    <keep-alive>
      <component
        :is="activeWidget.component"
        @submit="onWidgetSubmit"
      />
    </keep-alive>
  </el-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

import { useLoadingStore } from '@/stores'
import { useStore } from '@/stores'

import ButtonBack from '@/components/ButtonBack.vue'
import UserInfoWidget from '@/components/UserInfo.vue'
import ContractSignWidget from '@/components/ContractSign.vue'
import TermsWidget from '@/components/Terms.vue'

const router = useRouter()
const { startLoading, stopLoading } = useLoadingStore()

const store = useStore()

const USER_INFO_WIDGET_NAME = 'userInfo'
const CONTRACT_SIGN_WIDGET_NAME = 'contractSign'
const TERMS_WIDGET_NAME = 'terms'

const WIDGETS = {
  [TERMS_WIDGET_NAME]: {
    label: 'Условия вклада',
    component: TermsWidget
  },
  [USER_INFO_WIDGET_NAME]: {
    label: 'Заполнение данных',
    component: UserInfoWidget
  },
  [CONTRACT_SIGN_WIDGET_NAME]: {
    label: 'Заключение договора',
    component: ContractSignWidget
  }
}

const activeWidgetName = ref(TERMS_WIDGET_NAME)
const activeWidget = computed(() => WIDGETS[activeWidgetName.value])

const isWidgetActive = (widgetName) => activeWidgetName.value === widgetName

const createInvestmentDeposit = () => {
  store.account.investment_balance = 0
  store.account.savings_balance = 0
  store.account.savings_percent = investmentDepositInfo.value.base_deposit_rate_label
}

const investmentDepositInfo = ref({
  base_deposit_rate_label: 0
})

const onWidgetSubmit = (form) => {
  if (isWidgetActive(TERMS_WIDGET_NAME)) {
    investmentDepositInfo.value.base_deposit_rate_label = form.base_deposit_rate_label
    goToUserInfoWidget()
  } else if (isWidgetActive(USER_INFO_WIDGET_NAME)) goToContractSignWidget()
  else {
    createInvestmentDeposit()

    ElNotification.success('Успешно')

    setTimeout(() => {
      startLoading()
      setTimeout(() => {
        stopLoading()
        router.push({ name: 'home' })
      }, 3000)
    }, 1500)
  }
}

const goBack = () => {
  if (isWidgetActive(USER_INFO_WIDGET_NAME)) activeWidgetName.value = TERMS_WIDGET_NAME
  else if (isWidgetActive(CONTRACT_SIGN_WIDGET_NAME))
    activeWidgetName.value = USER_INFO_WIDGET_NAME
  else router.push({ name: 'home' })
}

const goToContractSignWidget = () => {
  activeWidgetName.value = CONTRACT_SIGN_WIDGET_NAME
}

const goToUserInfoWidget = () => {
  activeWidgetName.value = USER_INFO_WIDGET_NAME
}
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
</style>
