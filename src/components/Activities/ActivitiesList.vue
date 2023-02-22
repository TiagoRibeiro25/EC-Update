<script setup>
import Activity from "@/components/Activities/Activity.vue";
import { useActivitiesStore } from "@/stores/activities";
import { ref, watch, watchEffect, computed } from "vue";

const props = defineProps({
	theme: { type: Boolean, required: true },
	isVerifiedUser: { type: Boolean, required: true },
	schoolFilter: { type: String, required: true },
});
const theme = props.theme;
const isVerifiedUser = props.isVerifiedUser;
const schoolFilter = ref(props.schoolFilter);
const delayedActivities = ref([]);

const activities = computed(() => {
	const store = useActivitiesStore();
	return schoolFilter.value === "all"
		? store.getUnfinishedActivities() // get all activities
		: store.getUnfinishedActivities(schoolFilter.value); // get activities by school
});

watch(
	() => props.schoolFilter,
	(newSchoolFilter) => {
		schoolFilter.value = newSchoolFilter;
	}
);

watchEffect(() => {
	let index = 0;
	delayedActivities.value = [];
	const interval = setInterval(() => {
		delayedActivities.value.push(activities.value[index]);
		index++;
		if (index >= activities.value.length) clearInterval(interval);
	}, 200);
}, [activities.value]);
</script>

<template>
	<div v-if="activities.length > 0">
		<div v-for="activity in delayedActivities" :key="activity.id">
			<Activity :theme="theme" :activity="activity" :isVerifiedUser="isVerifiedUser" />
		</div>
	</div>
	<div v-else class="row" style="height: 190px">
		<div class="col-12 d-flex justify-content-center align-items-center">
			<h2
				class="error-title mt-5 pt-5 text-center"
				:class="theme ? 'error-title-dark' : 'error-title-light'"
			>
				Nenhuma atividade encontrada :(
			</h2>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.error-title {
	font-family: "Panton", sans-serif;
	font-size: 2rem;
	font-weight: 600;
}

.error-title-light {
	color: #333333;
}

.error-title-dark {
	color: #f8f9fa;
}
</style>
