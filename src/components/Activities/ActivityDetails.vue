<script setup>
import DeleteBtn from "@/components/DeleteBtn.vue";
import ActivityTheme from "@/components/Activities/ActivityTheme.vue";
import ActivityFinishBtn from "@/components/Activities/ActivityFinishBtn.vue";
import { convertDateToString } from "@/hooks/convertDate.js";
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
		<div class="row mt-3">
			<div class="col-12">
				<p
					class="activity-description"
					:class="theme ? 'dark-theme-text' : 'light-theme-text'"
				>
					{{ activity.meta }}
					<br />
					{{ activity.objective }}
					<br />
					{{ activity.participants }}
				</p>
			</div>
		</div>
		<div class="row mt-2 px-3">
			<div class="col-6 mt-2">
				<div class="row">
					<p
						class="mb-1 activity-date"
						:class="theme ? 'dark-theme-text' : 'light-theme-text'"
					>
						Data de início:
						<span class="text-muted">
							{{ convertDateToString(activity.initialDate) }}
						</span>
					</p>
				</div>
				<div class="row py-0">
					<p
						class="m-0 activity-date"
						:class="theme ? 'dark-theme-text' : 'light-theme-text'"
					>
						Data final:
						<span class="text-muted">
							{{ convertDateToString(activity.finalDate) }}
						</span>
					</p>
				</div>
			</div>

			<div class="col-6 d-flex flex-column justify-content-end align-items-end">
				<div class="row theme">
					<ActivityTheme :activityTheme="activity.themeId" />
				</div>
				<div v-if="isActivityFromUserSchool" class="row">
					<ActivityFinishBtn :theme="theme" :activityId="activity.id" />
				</div>
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

.activity-description,
.activity-date {
	font-family: "Panton", sans-serif;
	font-size: 1.1rem;
	font-weight: 400;
	height: 80px;
	overflow: hidden;
}

.activity-date {
	font-size: 1rem;
	height: auto;
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
