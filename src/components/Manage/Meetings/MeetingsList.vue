<script setup>
import PastMeeting from "@/components/Manage/Meetings/PastMeeting.vue";
import FutureMeeting from "@/components/Manage/Meetings/FutureMeeting.vue";
import { useMeetingsStore } from "@/stores/meetings";
import { useUsersStore } from "@/stores/users";
import { ref, watchEffect } from "vue";

const props = defineProps({ theme: { type: Boolean, required: true } });

const theme = props.theme;
const options = ref([
	{ name: "Realizadas", active: true },
	{ name: "Futuras", active: false },
]);
const userLogged = useUsersStore().getUserLogged();
const schoolId = userLogged.schoolId;

const pastMeetings = ref([]);
const futureMeetings = ref([]);

const changeOption = (index) => {
	options.value.forEach((option, i) => (option.active = i === index));
};

watchEffect(() => {
	pastMeetings.value = useMeetingsStore().getFilteredMeetings(schoolId, "past");
	futureMeetings.value = useMeetingsStore().getFilteredMeetings(schoolId, "future");
}, [pastMeetings, futureMeetings]);
</script>

<template>
	<div>
		<div class="row mx-0">
			<div class="mr-3 pl-3">
				<span
					class="option"
					:class="{
						selected: options[0].active,
						'option-dark-theme': theme,
						'option-light-theme': !theme,
					}"
					@click="changeOption(0)"
				>
					{{ options[0].name }}
				</span>
			</div>
			<div>
				<span
					class="option"
					:class="{
						selected: options[1].active,
						'option-dark-theme': theme,
						'option-light-theme': !theme,
					}"
					@click="changeOption(1)"
					>{{ options[1].name }}</span
				>
			</div>
		</div>
		<div class="row mx-0">
			<div
				class="meetings-container w-100 shadow-sm p-4"
				:class="theme ? 'container-dark-theme' : 'container-light-theme'"
			>
				<div v-if="options[0].active">
					<PastMeeting
						v-for="meeting in pastMeetings"
						:key="meeting.id"
						:meeting="meeting"
						:theme="theme"
					/>
				</div>
				<div v-else>
					<FutureMeeting
						v-for="meeting in futureMeetings"
						:key="meeting.id"
						:meeting="meeting"
						:theme="theme"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #18516f;
$tertiary-color: #aedcc0;

.option {
	font-family: "Panton", sans-serif;
	font-size: 1.5rem;
	font-weight: 600;
	cursor: pointer;
	opacity: 0.5;
}

.selected {
	opacity: 1;
	text-decoration: underline;
	text-underline-offset: 0.2rem;
	text-decoration-thickness: 0.2rem;
}

.meetings-container {
	height: 250px;
	border-radius: 0.6rem;
	overflow-y: scroll;
	overflow-x: hidden;
	margin-top: -3px;

	&::-webkit-scrollbar {
		width: 10px;
	}
	&::-moz-scrollbar {
		width: 10px;
	}
	scrollbar-width: 10px;
}

.option-light-theme {
	color: $primary-color;
}

.option-dark-theme {
	color: $tertiary-color;
}

.container-light-theme {
	background-color: $tertiary-color;

	&::-webkit-scrollbar-track {
		background: $tertiary-color;
	}
	&::-moz-scrollbar-track {
		background: $tertiary-color;
	}

	&::-webkit-scrollbar-thumb {
		background: $primary-color;
	}
	&::-moz-scrollbar-thumb {
		background: $primary-color;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: $secondary-color;
	}
	&::-moz-scrollbar-thumb:hover {
		background: $secondary-color;
	}
}

.container-dark-theme {
	background-color: $primary-color;

	&::-webkit-scrollbar-track {
		background: $primary-color;
	}
	&::-moz-scrollbar-track {
		background: $primary-color;
	}

	&::-webkit-scrollbar-thumb {
		background: $tertiary-color;
	}
	&::-moz-scrollbar-thumb {
		background: $tertiary-color;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: $secondary-color;
	}
	&::-moz-scrollbar-thumb:hover {
		background: $secondary-color;
	}
}
</style>
