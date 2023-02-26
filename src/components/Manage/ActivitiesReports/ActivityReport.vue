<script setup>
import ActivityTheme from "@/components/Activities/ActivityTheme.vue";
import ImgSlider from "@/components/ImgSlider.vue";
import ActivityReportInfo from "@/components/Manage/ActivitiesReports/ActivityReportInfo.vue";
import ActivityReportModal from "@/components/Manage/ActivitiesReports/ActivityReportModal.vue";
import { useActivitiesStore } from "@/stores/activities";
import { ref, watchEffect } from "vue";

const props = defineProps({
	theme: { type: Boolean, required: true },
	activityId: { type: String, required: true },
});

const theme = props.theme;
const activity = ref();
const modalId = `modal-${crypto.randomUUID()}`;

watchEffect(() => {
	activity.value = useActivitiesStore().getActivityById(props.activityId);
}, [props.activityId]);
</script>

<template>
	<div>
		<div class="row mx-auto pt-4">
			<h2
				class="activity-title w-100"
				:class="theme ? 'activity-title-dark-theme' : 'activity-title-light-theme'"
			>
				{{ activity.title }}
			</h2>
			<ActivityTheme :activityTheme="activity.themeId" />
		</div>

		<div
			class="row mx-auto d-flex flex-column justify-content-center align-items-center text-center"
			style="transform: scale(0.75)"
		>
			<ImgSlider :images="activity.images" />
		</div>
		<div
			class="row mx-auto d-flex flex-column justify-content-center align-items-center mb-5"
		>
			<button
				type="button"
				class="btn see-report-btn py-1"
				:class="theme ? 'see-report-btn-dark-theme' : 'see-report-btn-light-theme'"
				@click="$bvModal.show(modalId)"
			>
				Ver Relatório
			</button>
		</div>
		<div class="pb-3">
			<ActivityReportInfo :activity="activity" :theme="theme" />
		</div>
	</div>

	<ActivityReportModal :report="activity.report" :modalId="modalId" />
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #e4f0e8;
$tertiary-color: #ffffff;
$fourth-color: #18516f;
$fifth-color: #aedcc0;

.activity-title {
	font-family: "Panton", sans-serif;
	font-size: 2rem;
	font-weight: 600;
	color: $primary-color;
}

.see-report-btn {
	width: 200px;
	border-radius: 0.6rem;
	font-family: "Panton", sans-serif;
	font-size: 1.2rem;
	font-weight: 600;

	&:hover {
		background-color: $fourth-color;
		color: $tertiary-color;
	}
}

.activity-title-light-theme {
	color: $primary-color;
}

.activity-title-dark-theme {
	color: $fifth-color;
}

.see-report-btn-light-theme {
	background-color: $primary-color;
	color: $tertiary-color;
}

.see-report-btn-dark-theme {
	background-color: $tertiary-color;
	color: $primary-color;
}
</style>
