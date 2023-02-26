<script setup>
import NoActivities from "@/components/Home/Activities/NoActivities.vue";
import Activities from "@/components/Home/Activities/Activities.vue";
import { useActivitiesStore } from "@/stores/activities";
import { useUsersStore } from "@/stores/users";

const props = defineProps({ theme: { type: Boolean, required: true } });
const theme = props.theme;
const isUserLogged = useUsersStore().isUserLogged();
const userLogged = isUserLogged ? useUsersStore().getUserLogged() : null;

const activities = userLogged
	? useActivitiesStore().getUnfinishedActivities(false, userLogged.schoolId)
	: useActivitiesStore().getUnfinishedActivities();
</script>

<template>
	<div
		class="activities mb-5 mx-auto d-flex align-items-center justify-content-center"
		:class="{ 'background-light': !theme, 'background-dark': theme }"
	>
		<NoActivities v-if="activities.length === 0" :theme="theme" />
		<Activities v-else :theme="theme" :activities="activities.slice(0, 3)" />
	</div>
</template>

<style lang="scss" scoped>
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
