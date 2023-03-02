<script setup>
import ActivitiesList from "@/components/Manage/ActivitiesReports/ActivitiesList.vue";
import ActivityReport from "@/components/Manage/ActivitiesReports/ActivityReport.vue";
import { ref } from "vue";

const props = defineProps({
	theme: { type: Boolean, required: true },
	activities: { type: Array, required: true },
});

const theme = props.theme;
const activities = props.activities;
const activitySelected = ref(activities[0].id);
const changing = ref(false);

const changeSelected = (id) => {
	changing.value = true;

	setTimeout(() => {
		activitySelected.value = id;
		changing.value = false;
	}, 300);
};
</script>

<template>
	<div class="row w-100 mx-auto">
		<div class="col-xl-6 pl-0 pr-xl-3 px-0">
			<div class="activities mx-auto mb-xl-0 mb-5">
				<ActivitiesList
					:theme="theme"
					:activities="activities"
					:selected="activitySelected"
					@update:activitySelected="changeSelected($event)"
				/>
			</div>
		</div>
		<div class="col-xl-6 pr-0 pl-xl-3 px-0">
			<div
				class="report-container shadow-sm px-4"
				:class="theme ? 'report-container-dark-theme' : 'report-container-light-theme'"
			>
				<ActivityReport v-if="!changing" :theme="theme" :activityId="activitySelected" />
				<div
					v-else
					class="d-flex justify-content-center align-items-center"
					style="height: 600px"
				>
					<b-spinner class="mx-auto" label="Carregando..." variant="success" />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #e4f0e8;
$tertiary-color: #ffffff;
$fourth-color: #18516f;
$fifth-color: #aedcc0;

.activities {
	max-height: 600px;
	overflow-y: auto;
}

.report-container {
	min-height: 600px;
	border-radius: 0.6rem;
}

.report-container-dark-theme {
	background-color: $primary-color;
}

.report-container-light-theme {
	background-color: $fifth-color;
}
</style>
