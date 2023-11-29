<template>
	<el-row justify="space-between" class="header">
		<div class="header__primary">
			<el-avatar icon="Avatar" :size="30" />

			<h2>
				{{ userFio }}
			</h2>
		</div>

		<el-button @click="goToCreatingInvestmentDeposit" type="primary">
			Открыть вклад
		</el-button>
	</el-row>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores'

const router = useRouter()
const store = useStore()

const userFio = computed(() => store.account.fio)

const isInvestmentBalanceExist = computed(
	() => Boolean(
		Object.keys(store.account.investment_balance_info ?? {}).length
	)
)

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
