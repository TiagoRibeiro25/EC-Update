<script setup>
import { useUsersStore } from "@/stores/users";
import { convertDateToString } from "@/hooks/convertDate.js";

const props = defineProps({
	theme: { type: Boolean, required: true },
	meeting: { type: Object, required: true },
	modalId: { type: String, required: true },
});

const theme = props.theme;
const meeting = props.meeting;
const modalId = props.modalId;

const meetingCreator = useUsersStore().getUserById(meeting.creatorId);
</script>

<template>
	<b-modal :id="modalId" size="lg" hide-footer>
		<div class="container">
			<div class="text-center">
				<h2>Informações da Reunião de {{ convertDateToString(meeting.date) }}</h2>
				<h3 class="mt-3">
					Reunião criada por <b>{{ meetingCreator.name }}</b>
				</h3>
				<h4 class="mt-3">
					Sala <b>{{ meeting.room }}</b>
				</h4>
			</div>

			<div class="row mt-4 mb-3 mx-5">
				<p class="modal-description">
					{{ meeting.description }}
				</p>
			</div>
		</div>
	</b-modal>
</template>

<style lang="scss" scoped>
h2,
h3,
h4 {
	font-family: "Panton", sans-serif;
	font-size: 1.8rem;
	font-weight: 500;
}

h3,
h4 {
	font-size: 1.3rem;
}

.modal-description {
	font-family: "Panton", sans-serif;
	font-size: 1.1rem;
	font-weight: 500;
	text-align: justify;
}
</style>
