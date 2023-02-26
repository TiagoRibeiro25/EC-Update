<script setup>
import { convertDateToString } from "@/hooks/convertDate.js";
import { ref } from "vue";

const emit = defineEmits(["update:activitySelected"]);
const props = defineProps({
	theme: { type: Boolean, required: true },
	activities: { type: Array, required: true },
	selected: { type: String, required: true },
});

const theme = props.theme;
const activities = props.activities;
const activitySelected = ref(props.selected);

const changeSelected = (id) => {
	activitySelected.value = id;
	emit("update:activitySelected", id);
};
</script>

<template>
	<div v-for="activity in activities" :key="activity.id">
		<div class="row mx-auto mb-4">
			<div
				class="col-9 pl-0 d-flex flex-column justify-content-center align-items-center"
			>
				<button
					class="btn w-100 activity-btn py-2"
					:class="theme ? 'activity-btn-dark-theme' : 'activity-btn-light-theme'"
					:disabled="activity.id === activitySelected"
					@click="changeSelected(activity.id)"
				>
					{{ activity.meta }}
				</button>
			</div>
			<div class="col-3 d-flex flex-column justify-content-center align-items-center">
				<div class="row">
					<span
						class="date-title"
						:class="theme ? 'date-dark-theme' : 'date-light-theme'"
						>Data de Início:</span
					>
				</div>
				<div class="row">
					<span
						class="date-info"
						:class="theme ? 'date-dark-theme' : 'date-light-theme'"
					>
						{{ convertDateToString(activity.initialDate) }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #ffffff;
$tertiary-color: #18516f;

.activity-btn {
	font-family: "Panton", sans-serif;
	font-size: 1.15rem;
	font-weight: 400;
	border: none;
	border-radius: 0.6rem;
	cursor: pointer;

	&:focus {
		outline: transparent;
		box-shadow: none;
	}

	&:hover {
		background-color: $tertiary-color;
		color: $secondary-color;
	}
}

.activity-btn-light-theme {
	border: 1px solid $primary-color;
	background-color: $primary-color;
	color: $secondary-color;

	&:disabled {
		background-color: transparent;
		color: $primary-color;
		opacity: 1;
	}
}

.activity-btn-dark-theme {
	border: 1px solid $secondary-color;
	background-color: $secondary-color;
	color: $primary-color;

	&:hover {
		border-color: $tertiary-color;
	}

	&:disabled {
		background-color: transparent;
		color: $secondary-color;
		opacity: 1;

		&:hover {
			border-color: $secondary-color;
		}
	}
}

.date-title,
.date-info {
	font-family: "Panton", sans-serif;
	font-size: 1.15rem;
	font-weight: 600;
}

.date-info {
	font-size: 1.05rem;
	font-weight: 400;
	margin-top: -5px;
}

.date-light-theme {
	color: $primary-color;
}

.date-dark-theme {
	color: $secondary-color;
}
</style>
