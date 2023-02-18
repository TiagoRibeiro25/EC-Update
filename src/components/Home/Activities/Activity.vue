<script setup>
import { useThemesStore } from "@/stores/themes";
import { convertDateToString } from "@/hooks/convertDate";

const props = defineProps({
	theme: { type: Boolean, required: true },
	activity: { type: Object, required: true },
});

const theme = props.theme;
const activity = props.activity;

function getThemeName(themeId) {
	const theme = useThemesStore().getThemeById(themeId);
	return theme.name;
}

function formatTitle(title) {
	const max_length = 30;
	return title.length > max_length ? title.substring(0, max_length) + "..." : title;
}
</script>

<template>
	<div class="activity-card shadow" :class="{ 'dark-bg': theme, 'light-bg': !theme }">
		<header>
			<img
				class="img-fluid"
				:src="activity.images[0]"
				:alt="activity.title"
				:style="{ 'border-radius': '20px 20px 0 0' }"
			/>
		</header>
		<main class="px-3 mt-2">
			<div class="title-theme">
				<h5>{{ formatTitle(activity.title) }}</h5>
				<span>{{ getThemeName(activity.themeId) }}</span>
			</div>
			<div class="dates d-flex align-items-center justify-content-center flex-column">
				<h6>Calendarização</h6>
				<div class="text-center">
					<span class="d-block">{{ convertDateToString(activity.initialDate) }}</span>
					<span class="d-block">{{ convertDateToString(activity.initialDate) }}</span>
				</div>
			</div>
			<div class="text-center mt-1">
				<router-link
					class="see-more-btn py-1 px-3"
					:to="{ name: 'ActivitiesDetails', params: { id: activity.id } }"
				>
					Ver Mais
				</router-link>
			</div>
		</main>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #e4f0e8;
$tertiary-color: #ffffff;
$fourth-color: #18516f;
$fifth-color: #aedcc0;
$sixth-color: #000000;

.activity-card {
	border-radius: 20px;
	height: 400px;
	width: 250px;

	& header img {
		width: 100%;
	}
}

.title-theme {
	height: 85px;

	& h5 {
		font-family: "Alkes", sans-serif;
		font-weight: 700;
		font-size: 1.3rem;
		margin-bottom: 0.1rem;
	}

	& span {
		border-radius: 15px;
		padding: 3px 7px;

		font-family: "Panton", sans-serif;
		font-weight: 600;
		font-size: 0.8rem;
	}
}

.dates {
	height: 90px;

	& h6 {
		font-family: "Panton", sans-serif;
		font-weight: 700;
		font-size: 1rem;
		margin-bottom: 0.1rem;
	}

	& div span {
		font-family: "Panton", sans-serif;
		font-weight: 600;
		font-size: 0.8rem;
	}
}

.see-more-btn {
	border-radius: 15px;
	font-family: "Panton", sans-serif;
	font-weight: 600;
	font-size: 0.9rem;
	text-decoration: none;
	transition: all 0.3s ease-in-out;
}

.dark-bg {
	// background-color: $primary-color;
	background-color: rgba(52, 62, 61, 0.8);
	color: $secondary-color;
	transition: background-color 0.3s ease-in-out;

	&:hover {
		background-color: $primary-color;
	}

	& .title-theme h5 {
		color: $fifth-color;
	}

	& .title-theme span {
		background-color: $fifth-color;
		color: $primary-color;
	}

	& .dates h6 {
		color: $secondary-color;
	}

	& .dates div span {
		color: $secondary-color;
	}

	& .see-more-btn {
		background-color: $tertiary-color;
		color: $primary-color;

		&:hover {
			background-color: $fourth-color;
			color: $secondary-color;
		}
	}
}

.light-bg {
	// background-color: $secondary-color;
	background-color: rgba(228, 240, 232, 0.8);
	color: $primary-color;
	transition: background-color 0.3s ease-in-out;

	&:hover {
		background-color: $secondary-color;
	}

	& .title-theme h5 {
		color: $primary-color;
	}

	& .title-theme span {
		background-color: $primary-color;
		color: $secondary-color;
	}

	& .dates h6 {
		color: $primary-color;
	}

	& .dates div span {
		color: $primary-color;
	}

	& .see-more-btn {
		background-color: $primary-color;
		color: $secondary-color;

		&:hover {
			background-color: $fourth-color;
			color: $secondary-color;
		}
	}
}
</style>
