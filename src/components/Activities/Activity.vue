<script setup>
import HighlightImg from "@/components/HighlightImg.vue";
import ActivityDetails from "@/components/Activities/ActivityDetails.vue";

const props = defineProps({
	theme: { type: Boolean, required: true },
	activity: { type: Object, required: true },
	isVerifiedUser: { type: Boolean, required: true },
});

const theme = props.theme;
const activity = props.activity;
const isVerifiedUser = props.isVerifiedUser;
</script>

<template>
	<div
		class="row mx-auto mb-5 activity-card shadow"
		:class="theme ? 'activity-card-bg-dark' : 'activity-card-bg-light'"
	>
		<div class="col-4 px-0 d-lg-block d-none">
			<router-link :to="{ name: 'ActivitiesDetails', params: { id: activity.id } }">
				<HighlightImg :image="activity.images[0]" />
			</router-link>
		</div>
		<div class="col-lg-8 col-12 px-0">
			<ActivityDetails
				:theme="theme"
				:activity="activity"
				:isVerifiedUser="isVerifiedUser"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #e4f0e8;

.activity-card {
	border-radius: 20px;
	height: 300px;
	animation: slideIn 0.7s ease-in-out;
}

.activity-card-bg-dark {
	background-color: $primary-color;
}

.activity-card-bg-light {
	background-color: $secondary-color;
}

@keyframes slideIn {
	0% {
		transform: translateX(-100%);
	}
	100% {
		transform: translateX(0);
	}
}
</style>
