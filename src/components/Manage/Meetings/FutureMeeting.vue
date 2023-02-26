<script setup>
import ModalMeetingInfo from "@/components/Manage/Meetings/modals/ModalMeetingInfo.vue";
import { convertDateToString } from "@/hooks/convertDate.js";

const props = defineProps({
	theme: { type: Boolean, required: true },
	meeting: { type: Object, required: true },
});

const theme = props.theme;
const meeting = props.meeting;
const modalId = `modal-${crypto.randomUUID()}`;
</script>

<template>
	<div class="mb-3 text-center">
		<span
			class="meeting-date py-1 px-xl-4 px-5 rounded shadow-sm mr-5"
			:class="theme ? 'meeting-date-dark-theme' : 'meeting-date-light-theme'"
		>
			{{ convertDateToString(meeting.date) }}
		</span>

		<button
			type="button"
			class="btn meeting-btn mb-1 ml-5"
			:class="theme ? 'meeting-btn-dark-theme' : 'meeting-btn-light-theme'"
			@click="$bvModal.show(modalId)"
		>
			Ver Mais
		</button>
	</div>

	<ModalMeetingInfo :modalId="modalId" :meeting="meeting" :theme="theme" />
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #e4f0e8;
$tertiary-color: #ffffff;
$fourth-color: #18516f;
$fifth-color: #aedcc0;

.meeting-date {
	font-family: "Panton", sans-serif;
	font-size: 1.1rem;
	font-weight: 500;
}

.meeting-btn {
	font-family: "Panton", sans-serif;
	font-size: 1.1rem;
	font-weight: 500;
	padding-top: 0.1rem;
	padding-bottom: 0.1rem;
	width: 8.55rem;
}

.meeting-date-light-theme {
	background-color: $secondary-color;
	color: $primary-color;
}

.meeting-date-dark-theme {
	background-color: $fifth-color;
	color: $primary-color;
	border: 2px solid $fifth-color;
}

.meeting-btn-light-theme {
	background-color: $primary-color;
	color: $tertiary-color;

	&:hover {
		background-color: $fourth-color;
		color: $tertiary-color;
	}
}

.meeting-btn-dark-theme {
	background-color: transparent;
	color: $fifth-color;
	border: 2px solid $fifth-color;

	&:hover {
		background-color: $fifth-color;
		color: $primary-color;
	}
}
</style>
