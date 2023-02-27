<script setup>
import ActivityDetails from "@/components/Activities/ActivityDetails/ActivityDetails.vue";
import { useUsersStore } from "@/stores/users";
import { useActivitiesStore } from "@/stores/activities";
import { useRoute, useRouter } from "vue-router";
import { ref, onBeforeMount } from "vue";

const router = useRouter();
const theme = useUsersStore().isDarkMode();
const { id } = useRoute().params;
const activity = useActivitiesStore().getActivityById(id);
const loaded = ref(false);

onBeforeMount(() => {
	setTimeout(() => {
		if (activity) loaded.value = true;
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
					<ActivityDetails :activity="activity" :theme="theme" />
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
