<script setup>
import SeedImg from "@/components/Account/SeedImg.vue";
import { formatNumber } from "@/hooks/formatData.js";
import { useSeedsStore } from "@/stores/seeds";

const props = defineProps({ user: { type: Object, required: true } });
const userId = props.user.id;

const monthlySeeds = useSeedsStore().getUserSeeds(userId, true);
const totalSeeds = useSeedsStore().getUserSeeds(userId);
</script>

<template>
	<div
		class="seeds-info row mx-auto py-lg-0 py-sm-3 py-5 mt-5 shadow d-flex justify-content-center align-items-center"
	>
		<div class="col-6 d-lg-block d-none">
			<h2 class="ml-4 title">Sementes</h2>
		</div>
		<div class="col-lg-3 col-6">
			<div class="row justify-content-center align-items-center">
				<h2 class="info">Mensal: {{ formatNumber(monthlySeeds) }}</h2>
				<SeedImg />
			</div>
		</div>
		<div class="col-lg-3 col-6">
			<div class="row justify-content-center align-items-center">
				<h2 class="info">Total: {{ formatNumber(totalSeeds) }}</h2>
				<SeedImg />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;

.seeds-info {
	background-color: $primary-color;
	border-radius: 20px;
	min-height: 100px;
	max-width: 1400px;
}

.title {
	color: $secondary-color;
	font-family: "Alkes", sans-serif;
	font-size: 1.7rem;
	font-weight: 700;
}

.info {
	color: $secondary-color;
	font-family: "Panton", sans-serif;
	font-size: 1.5rem;
	font-weight: 600;
	margin-top: 5px;
}
</style>
