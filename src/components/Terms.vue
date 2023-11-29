<template>
  <el-form
    ref="formRef"
    label-position="top"
    require-asterisk-position="right"
    :model="form"
    @submit.prevent="onSubmit"
  >
    <el-row :gutter="10">
      <el-col
        v-for="term of TERMS"
        :key="term.label"
        :span="24 / TERMS.length"
      >
        <el-card
          :header="term.label"
          :class="[isTermCurrent(term.label) ? 'terms__current' : '', 'terms__card']"
          @click="currentTermLabel = term.label"
        >
          <h3 style="margin-bottom: 12px">Ставка: {{ term.base_deposit_rate_label }}</h3>
          <div
            v-for="option of term.desc.split('; ')"
            :key="option"
            style="white-space: nowrap; display: flex; align-items: center; margin: 6px 0;"
          >
            <el-icon
              color="#409EFF"
              class="el-icon--left"
            >
              <Check />
            </el-icon>
            {{ option }}
          </div>
        </el-card>
      </el-col>
    </el-row>

    <section style="margin-top: 16px">
      <el-row justify="end">
        <el-button
          type="success"
          native-type="submit"
          :disabled="!currentTermLabel.length"
        >
          <el-icon class="el-icon--left">
            <Check />
          </el-icon>
          Сохранить
        </el-button>
      </el-row>
    </section>
  </el-form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { mask as vMask } from 'vue-the-mask'
import { useStore } from '@/stores'
import { requiredRule, validate } from '@/utils/validation'

const emit = defineEmits(['submit'])

const store = useStore()

const form = ref({})
const formRef = ref({})

const TERMS = [
  {
    label: 'Базовый',
    desc: 'Капитализация: есть; Выплата процентов: Ежемесячно; Пополнение: есть; Частичное снятие: есть',
    base_deposit_rate_label: '10% годовых',
    base_deposit_rate: 0.1
  },
  {
    label: 'Бизнес',
    desc: 'Капитализация: есть; Выплата процентов: Ежегодно; Пополнение: есть; Частичное снятие: есть',
    base_deposit_rate_label: '15% годовых',
    base_deposit_rate: 0.15
  },
  {
    label: 'Лучший',
    desc: 'Капитализация: есть; Выплата процентов: Ежемесячно; Пополнение: есть; Частичное снятие: нет',
    base_deposit_rate_label: '20% годовых',
    base_deposit_rate: 0.2
  }
]

const currentTermLabel = ref('')

const isTermCurrent = (termLabel) => termLabel === currentTermLabel.value

const resetForm = () => {
  form.value = {}
}

const onSubmit = async () => {
  const isFormValid = await validate(formRef.value)
  if (!isFormValid) return

  emit('submit', {
    base_deposit_rate_label: TERMS.find((term) => isTermCurrent(term.label))
      .base_deposit_rate
  })
}

onMounted(() => {})
</script>

<style scoped lang="scss">
.terms {
  &__current {
    border: 1px solid #409eff !important;
    box-shadow: none !important;
  }

  &__card {
    cursor: pointer;
    height: 100%;
    border: none;
    box-shadow: var(--el-box-shadow-lighter);
    border: 1px solid white;

    &:hover {
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.24);
    }
  }
}

.section {
  &:not(:first-child) &__header {
    margin: 1rem 0;
  }

  &:first-child &__header {
    margin-bottom: 1rem;
  }
}
</style>
