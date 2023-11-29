<template>
  <el-dialog
    :model-value="modelValue"
    class="transaction-history-modal"
    title="Все операции"
    width="30%"
    @closed="closeModal"
  >
    <el-scrollbar height="450px">
      <el-card
        shadow="hover"
        v-for="item of items"
        :key="item.id"
        style="margin: 6px 8px"
      >
        <el-row
          justify="space-between"
          align="middle"
        >
          <el-row style="flex-direction: column; gap: 4px">
            <el-text
              style="align-self: flex-start"
              v-if="item.paymentLabel"
              size="large"
              type="primary"
            >
              {{ item.paymentLabel }}
            </el-text>

            <el-text style="align-self: flex-start">
              {{ item.label }}
            </el-text>

            <el-text
              size="small"
              style="align-self: flex-start"
            >
              {{ item.date }}
            </el-text>
          </el-row>

          <el-tag
            :type="item.tagType"
            style="align-self: flex-start"
          >
            {{ item.cost }}
          </el-tag>
        </el-row>
      </el-card>
    </el-scrollbar>
  </el-dialog>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  items: {
    type: Array,
    default: []
  }
})

const emit = defineEmits(['update:modelValue'])

const closeModal = () => {
  emit('update:modelValue', false)
}
</script>

<style scoped lang="scss"></style>
