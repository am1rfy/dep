import { defineStore } from 'pinia'
import { ElLoading } from 'element-plus'
import { ref, computed } from 'vue'

export const useLoadingStore = defineStore('loadingStore', () => {
  const loading = ref(null)

  const isLoadingOn = computed(() => loading.value?.visible)
  
  const startLoading = () => {
    loading.value = ElLoading.service({
      lock: true,
      fullscreen: true
    })
  }

  const stopLoading = () => {
    if (loading.value)
      loading.value.close()
  }

  return {
    loading,
    isLoadingOn,
    startLoading,
    stopLoading,
  }
})
