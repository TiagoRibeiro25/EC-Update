<script setup>
import { useUsersStore } from "@/stores/users";
import { useMeetingsStore } from "@/stores/meetings";
import { convertDateToNumber } from "@/hooks/convertDate.js";
import { ref } from "vue";

const props = defineProps({ theme: { type: String, default: "light" } });
const theme = props.theme;

const limits = {
	minDate: new Date(new Date().setDate(new Date().getDate() + 1)),
	maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
};

const date = ref("");
const time = ref(new Date().getHours() + ":" + new Date().getMinutes());
const room = ref("");
const text = ref("");
const adding = ref(false);

const isFormValid = () => {
	if (!date.value || !time.value || !room.value || !text.value) return false;
	if (!text.value.match(/[a-z]/i)) return false;
	return room.value.match(/[a-z0-9]/i) ? true : false;
};

const createNewMeeting = () => {
	adding.value = true;
	const loggedUser = useUsersStore().getUserLogged();
	const timestamp = convertDateToNumber(date.value, time.value);

	const meeting = {
		date: timestamp,
		room: room.value,
		description: text.value,
		schoolId: loggedUser.schoolId,
		creatorId: loggedUser.id,
	};

	setTimeout(() => {
		useMeetingsStore().addNewMeeting(meeting);
		useUsersStore().increaseMeetingsCreated();

		// unlock "Novato das Reuniões" or "Veterano das Reuniões" badge
		if (loggedUser.meetingsCreated === 1) useUsersStore().unlockBadge("3");
		else if (loggedUser.meetingsCreated === 3) useUsersStore().unlockBadge("7");

		// reset form
		date.value = new Date();
		time.value = new Date().getHours() + ":" + new Date().getMinutes();
		room.value = "";
		text.value = "";
		adding.value = false;
	}, 300);
};
</script>

<template>
	<div class="row d-flex justify-content-end mt-xl-2 mt-5">
		<div class="row w-100 mx-auto">
			<div class="col-7 text-center">
				<b-form-datepicker
					class="mb-2 form-input"
					:class="theme ? 'form-input-dark-theme' : 'form-input-light-theme'"
					size="sm"
					v-model="date"
					:min="limits.minDate"
					:max="limits.maxDate"
					locale="pt"
					:disabled="adding"
				></b-form-datepicker>
			</div>
			<div class="col-3 text-center">
				<b-form-timepicker
					class="form-input"
					:class="theme ? 'form-input-dark-theme' : 'form-input-light-theme'"
					v-model="time"
					locale="pt"
					size="sm"
					:disabled="adding"
				></b-form-timepicker>
			</div>
			<div class="col-2 text-center">
				<input
					type="text"
					class="form-control form-control-sm text-center form-input"
					:class="theme ? 'form-input-dark-theme' : 'form-input-light-theme'"
					placeholder="Sala"
					v-model="room"
					:disabled="adding"
				/>
			</div>
		</div>
		<div class="row w-100 mx-auto">
			<div class="col-12">
				<b-form-textarea
					class="form-input form-input-select mt-1"
					:class="theme ? 'form-input-dark-theme' : 'form-input-light-theme'"
					v-model="text"
					placeholder="Descrição da reunião"
					max-rows="5"
					:disabled="adding"
				></b-form-textarea>
			</div>
		</div>
		<div class="row w-100 mx-auto">
			<div class="col-12 d-flex justify-content-end align-items-end mt-3">
				<button
					v-if="!adding"
					type="button"
					class="btn create-meeting-btn"
					:class="theme ? 'create-btn-dark-theme' : 'create-btn-light-theme'"
					:disabled="!isFormValid() || adding"
					@click="createNewMeeting"
				>
					Criar Reunião
				</button>
				<div v-else class="loading-spinner mt-1">
					<b-spinner label="A criar reunião..." variant="success"></b-spinner>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #ffffff;
$tertiary-color: #18516f;
$fourth-color: #aedcc0;

.form-input {
	font-family: "Panton", sans-serif;
	font-weight: 600;
	font-size: 1rem;
	border: 2px solid $fourth-color;
	border-radius: 0.6rem;
	background-color: transparent;
}

.form-input-select {
	min-height: 10.7rem;
	max-height: 10.7rem;
	font-size: 1.1rem;
}

.create-meeting-btn {
	font-family: "Panton", sans-serif;
	font-size: 1.1rem;
	font-weight: 400;
	border-radius: 0.6rem;
	padding: 0.2rem 3rem;
	outline: transparent;

	&:hover {
		background-color: $tertiary-color;
		color: $secondary-color;
	}
}

.loading-spinner {
	margin-right: 5.5rem;
}

.form-input-light-theme {
	color: $primary-color;

	&:focus {
		outline: none;
		box-shadow: none;
		border-color: $tertiary-color;
	}
}

.form-input-dark-theme {
	color: $fourth-color;

	&:focus {
		outline: none;
		box-shadow: none;
		border-color: $secondary-color;
		color: $secondary-color;
	}
}

.create-btn-dark-theme {
	background-color: $secondary-color;
	color: $primary-color;
}

.create-btn-light-theme {
	background-color: $primary-color;
	color: $secondary-color;
}
</style>
