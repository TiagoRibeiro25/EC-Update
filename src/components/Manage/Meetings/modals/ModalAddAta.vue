<script setup>
import CreateItemImgs from "@/components/CreateItemImgs.vue";
import { useMeetingsStore } from "@/stores/meetings";
import { useUsersStore } from "@/stores/users";
import { ref } from "vue";

const props = defineProps({
	modalId: { type: String, required: true },
	meeting: { type: Object, required: true },
});

const images = ref([]);
const modalId = props.modalId;
const meeting = props.meeting;
const text = ref("");
const adding = ref(false);

const verifyText = () => !text.value.match(/[a-z]/i);

const addAta = () => {
	adding.value = true;
	const ata = { description: text.value, images: images.value };

	// unlock "Supervisor das reuniões" badge
	useUsersStore().unlockBadge("4");

	setTimeout(() => {
		useMeetingsStore().addAta(meeting.id, ata);
		adding.value = false;
	}, 300);
};
</script>

<template>
	<b-modal :id="modalId" size="lg" hide-footer>
		<div class="container">
			<h2 class="modal-warning mb-4">
				Depois de adicionar a ata, você <b>não</b> poderá mais editá-la.
			</h2>

			<div class="text-center">
				<CreateItemImgs :images="images" />
			</div>

			<div class="mt-5">
				<!-- Max rows -->
				<b-form-textarea
					class="ata-textarea mb-4"
					v-model="text"
					placeholder="Insira a ata da reunião..."
					rows="8"
				></b-form-textarea>
			</div>

			<div v-if="adding" class="w-100 text-center mb-4">
				<b-spinner variant="success" label="Carregando..."></b-spinner>
			</div>

			<div class="mb-2 d-flex justify-content-center">
				<button
					type="button"
					class="btn add-ata-btn text-center px-5"
					:disabled="verifyText() || images.length === 0"
					@click="addAta"
				>
					Adicionar Ata
				</button>
			</div>
		</div>
	</b-modal>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #ffffff;
$tertiary-color: #18516f;
$fourth-color: #aedcc0;

.modal-warning {
	font-family: "Panton", sans-serif;
	font-size: 1.5rem;
	font-weight: 500;
	color: $primary-color;
	text-align: center;
}

.ata-textarea {
	font-family: "Panton", sans-serif;
	font-size: 1.2rem;
	font-weight: 400;
	text-align: justify;
	color: $primary-color;
	background-color: transparent;
	border: 2px solid $fourth-color;
	border-radius: 0.6rem;
	max-height: 25rem;
	min-height: 6rem;

	&:focus {
		border-color: $tertiary-color;
		box-shadow: none;
		outline: transparent;
	}
}

.add-ata-btn {
	font-family: "Panton", sans-serif;
	font-size: 1.2rem;
	font-weight: 500;
	color: $secondary-color;
	background-color: $primary-color;
	border: none;
	border-radius: 0.6rem;
}
</style>
