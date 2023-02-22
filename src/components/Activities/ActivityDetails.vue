<script setup>
import DeleteBtn from "@/components/DeleteBtn.vue";
import { useUsersStore } from "@/stores/users";

const props = defineProps({
	theme: { type: Boolean, required: true },
	activity: { type: Object, required: true },
	isVerifiedUser: { type: Boolean, required: true },
});

const theme = props.theme;
const activity = props.activity;
const isActivityFromUserSchool =
	props.isVerifiedUser && activity.schoolId === useUsersStore().getUserLogged().schoolId;
</script>

<template>
	<div class="activity-info px-4 py-3">
		<div class="row">
			<div class="title-container" :class="isActivityFromUserSchool ? 'col-8' : 'col-12'">
				<h2>
					<router-link
						:to="{ name: 'ActivitiesDetails', params: { id: activity.id } }"
						class="activity-title"
						:class="theme ? 'dark-theme-title' : 'light-theme-title'"
					>
						{{ activity.title }}
					</router-link>
				</h2>
			</div>
			<div v-if="isActivityFromUserSchool" class="col-4">
				<DeleteBtn :theme="theme" type="activities" :itemId="activity.id" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #ffffff;
$tertiary-color: #aedcc0;

.activity-info {
	height: 300px;
}

.title-container {
	height: 80px;
	overflow: hidden;
}

.activity-title {
	font-family: "Alkes", sans-serif;
	font-size: 1.5rem;
	font-weight: 700;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
}

.dark-theme-title {
	color: $tertiary-color;
}

.light-theme-title {
	color: $primary-color;
}

.dark-theme-text {
	color: $secondary-color;
}

.light-theme-text {
	color: $primary-color;
}
</style>
