<script setup>
import ActivityTheme from "@/components/Activities/ActivityTheme.vue";
import ActivityFinishBtn from "@/components/Activities/ActivityFinishBtn.vue";
import DeleteBtn from "@/components/DeleteBtn.vue";
import { convertDateToString } from "@/hooks/convertDate.js";
import { useUsersStore } from "@/stores/users.js";

const props = defineProps({
	theme: { type: Boolean, required: true },
	activity: { type: Object, required: true },
});

const theme = props.theme;
const activity = props.activity;
const author = useUsersStore().getUserById(activity.creatorId);

const isUserLogged = useUsersStore().isUserLogged();
const userLogged = isUserLogged ? useUsersStore().getUserLogged() : null;

const isUserVerified = userLogged
	? userLogged.schoolId === activity.schoolId && userLogged.role !== "unsigned"
	: false;
</script>

<template>
	<div class="mt-5">
		<div class="row">
			<div class="col-10">
				<h1
					class="activity-title"
					:class="theme ? 'title-dark-theme' : 'title-light-theme'"
				>
					{{ activity.title }}
				</h1>
			</div>
			<div class="col-2">
				<b-form-rating
					class="complexity-info float-right mt-2"
					:class="theme ? 'title-dark-theme' : 'title-light-theme'"
					inline
					:value="activity.complexity"
					:readonly="true"
				></b-form-rating>
			</div>
		</div>
		<div class="row mt-2">
			<div class="col-3">
				<ActivityTheme :activityTheme="activity.themeId" />
			</div>
			<div class="col-5">
				<div class="row text-center">
					<span
						class="date-info"
						:class="theme ? 'title-dark-theme' : 'title-light-theme'"
					>
						{{ convertDateToString(activity.initialDate) }} 🌳
						{{ convertDateToString(activity.finalDate) }}
					</span>
				</div>
			</div>
			<div class="col-4 text-right">
				<span>
					<b
						class="creator-info mr-2"
						:class="theme ? 'title-dark-theme' : 'title-light-theme'"
						>Criado por:</b
					>
					<router-link
						class="creator-link"
						:class="theme ? 'creator-dark-theme' : 'creator-light-theme'"
						:to="{ name: 'Account', params: { id: author.id } }"
					>
						{{ author.name }}
					</router-link>
				</span>
			</div>
		</div>
		<div class="row" :class="isUserVerified ? 'mt-1' : 'mt-4'">
			<div v-if="isUserVerified" class="col-12">
				<ActivityFinishBtn :theme="theme" :activityId="activity.id" />
				<DeleteBtn :theme="theme" :itemId="activity.id" type="activities" />
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

.activity-title {
	font-family: "Alkes", sans-serif;
	font-size: 2.3rem;
	font-weight: 700;
}

.complexity-info {
	border: none;
	scale: 1.2;
	background-color: transparent;

	&:focus {
		box-shadow: none;
	}
}

.date-info {
	font-family: "Panton", sans-serif;
	font-size: 1.05rem;
	font-weight: 500;
	margin-top: 1px;
}

.creator-info,
.creator-link {
	font-family: "Panton", sans-serif;
	font-size: 1.05rem;
	font-weight: 600;
}

.title-dark-theme {
	color: $fifth-color;
}

.title-light-theme {
	color: $primary-color;
}

.creator-light-theme {
	color: $fourth-color;

	&:hover {
		text-decoration: underline;
	}
}

.creator-dark-theme {
	color: $tertiary-color;

	&:hover {
		text-decoration: underline;
	}
}
</style>
