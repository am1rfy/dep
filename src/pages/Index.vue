<template>
  <el-card
    class="widget-card"
  >
    <template #header>
      <div class="widget-card__header">
        <el-tooltip
          v-if="isWidgetActive(CONTRACT_SIGN_WIDGET_NAME)"
          content="Назад"
          placement="top"
        >
          <el-button
            icon="ArrowLeft"
            type="primary"
            size="small"
            @click="goToUserInfoWidget"
          />
        </el-tooltip>

        <h2>
          {{ activeWidget.label }}
        </h2>
      </div>
    </template>

    <component
      :is="activeWidget.component"
      @submit="onWidgetSubmit"
    />
  </el-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLoadingStore } from '@/stores/loading'
import { ElNotification } from 'element-plus'
import UserInfoWidget from '@/components/UserInfo.vue'
import ContractSignWidget from '@/components/ContractSign.vue'

const router = useRouter()
const { startLoading, stopLoading } = useLoadingStore()

const USER_INFO_WIDGET_NAME = 'userInfo'
const CONTRACT_SIGN_WIDGET_NAME = 'contractSign'

const WIDGETS = {
  [USER_INFO_WIDGET_NAME]: {
    label: 'Заполнение данных',
    component: UserInfoWidget,
  },
  [CONTRACT_SIGN_WIDGET_NAME]: {
    label: 'Заключение договора',
    component: ContractSignWidget,
  },
}

const activeWidgetName = ref(USER_INFO_WIDGET_NAME)
const activeWidget = computed(() => WIDGETS[activeWidgetName.value])

const isWidgetActive = widgetName =>
  activeWidgetName.value === widgetName


const onWidgetSubmit = formData => {
  if (isWidgetActive(USER_INFO_WIDGET_NAME)) {
    // TODO: сохранить в стор

    goToContractSignWidget()
  }

  else {
    // TODO: сохранить в стор

    ElNotification.success('Успешно')

    setTimeout(() => {
      startLoading()
      setTimeout(() => {
        stopLoading()
        router.push({ name: 'lk' })
      }, 3000)
    }, 1500)
  }
}

const goToUserInfoWidget = () => {
  activeWidgetName.value = USER_INFO_WIDGET_NAME
}

const goToContractSignWidget = () => {
  activeWidgetName.value = CONTRACT_SIGN_WIDGET_NAME
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
