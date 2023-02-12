<script setup>
import { useActivitiesStore } from "@/stores/activities";
import NoActivities from "@/components/Home/Activities/NoActivities.vue";
import Activities from "@/components/Home/Activities/Activities.vue";

const props = defineProps({ theme: { type: Boolean, required: true } });
const theme = props.theme;

const activities = useActivitiesStore().getUnfinishedActivities().slice(0, 3);
</script>

<template>
	<div
		class="activities mb-5 mx-auto d-flex align-items-center justify-content-center"
		:class="{ 'background-light': !theme, 'background-dark': theme }"
	>
		<Activities :theme="theme" :activities="activities" />
		<NoActivities v-if="activities.length === 0" :theme="theme" />
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #e4f0e8;
$tertiary-color: #ffffff;
$fourth-color: #18516f;
$fifth-color: #aedcc0;

.activities {
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	background-size: 100% 100%;
	min-height: 500px;
	max-width: 900px;
}

.background-light {
	background-image: url("@/assets/images/illustration.png");
}

.background-dark {
	background-image: url("@/assets/images/illustration-dark-theme.png");
}
</style>
