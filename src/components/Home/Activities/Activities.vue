<script setup>
import { defineProps } from "vue";
import Activity from "@/components/Home/Activities/Activity.vue";
import { useUsersStore } from "@/stores/users";

const props = defineProps({
	theme: { type: Boolean, required: true },
	activities: { type: Array, required: true },
});

const theme = props.theme;
let activities = props.activities;

// Show only activities from the school of the user logged
if (useUsersStore().isUserLogged()) {
	const user = useUsersStore().getUserLogged();
	activities = activities.filter((activity) => activity.schoolId === user.schoolId);
}
</script>

<template>
	<div class="cards" v-for="activity in activities" :key="activity.id">
		<div class="mx-4">
			<Activity :theme="theme" :activity="activity" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 840px) {
	.cards {
		&:nth-child(3) {
			display: none;
		}
	}
}

@media screen and (max-width: 600px) {
	.cards {
		&:nth-child(2) {
			display: none;
		}
	}
}
</style>
