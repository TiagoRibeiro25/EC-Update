<script setup>
import NewDetails from "@/components/News/NewDetails/NewDetails.vue";
import { useUsersStore } from "@/stores/users";
import { useNewsStore } from "@/stores/news";
import { useRoute, useRouter } from "vue-router";
import { ref, onBeforeMount } from "vue";

const router = useRouter();
const theme = useUsersStore().isDarkMode();
const { id } = useRoute().params;
const newItem = useNewsStore().getNewById(id);
const loaded = ref(false);

onBeforeMount(() => {
	setTimeout(() => {
		if (newItem) loaded.value = true;
		else router.push({ name: "NotFound" });
	}, 300);
});
</script>

<template>
	<div v-if="loaded">
		<div
			class="wrapper pt-3"
			style="overflow: hidden"
			:class="{ 'background-light': !theme, 'background-dark': theme }"
		>
			<div class="row content mx-auto">
				<div class="col-12">
					<NewDetails :newItem="newItem" :theme="theme" />
				</div>
			</div>
		</div>
	</div>
	<div
		v-else
		class="loading-page pb-5 d-flex justify-content-center align-items-center flex-column"
		:class="{ 'background-light': !theme, 'background-dark': theme }"
	>
		<b-spinner variant="success" label="Carregando..."></b-spinner>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #f8f9fa;
$secondary-color: #333333;

.wrapper,
.loading-page {
	min-height: 100vh;
	min-height: 100dvh;
}

.content {
	max-width: 1300px;
}

.background-dark {
	background-color: $secondary-color;
}

.background-light {
	background-color: $primary-color;
}
</style>
