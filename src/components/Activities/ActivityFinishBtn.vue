<script setup>
import { useActivitiesStore } from "@/stores/activities";
import { ref } from "vue";

const props = defineProps({
	theme: { type: Boolean, required: true },
	activityId: { type: String, required: true },
});

const theme = props.theme;
const activityId = props.activityId;
const modalId = `modal-${crypto.randomUUID()}`;
const finishing = ref(false);

const finishActivity = () => {
	finishing.value = true;
	useActivitiesStore().finishActivity(activityId);
	setTimeout(() => {
		window.location.reload();
	}, 500);
};
</script>

<template>
	<div>
		<button
			type="button"
			class="finish-btn btn btn-sm rounded-pill px-3 float-right mt-2"
			:class="!theme ? 'light-theme-btn' : 'dark-theme-btn'"
			@click="$bvModal.show(modalId)"
		>
			<img class="mr-1" src="@/assets/icons/finish.svg" alt="add" width="20" />
			<span> Finalizar </span>
		</button>
	</div>

	<b-modal :id="modalId" size="lg" hide-footer>
		<div class="container">
			<h4 class="modal-title text-center mt-1">
				Tens a certeza que queres finalizar esta atividade?
			</h4>

			<div v-if="finishing" class="w-100 text-center mt-3">
				<b-spinner variant="success" label="Carregando..."></b-spinner>
			</div>

			<div class="mt-4 mb-3">
				<b-button
					type="submit"
					class="btn btn-block modal-finish-btn w-50 mx-auto"
					:disabled="finishing"
					@click="finishActivity"
				>
					Finalizar
				</b-button>
			</div>
		</div>
	</b-modal>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #ffffff;
$tertiary-color: #18516f;

.finish-btn {
	font-family: "Panton", sans-serif;
	font-weight: 600;
	font-size: 14px;
}

.dark-theme-btn {
	background-color: $secondary-color;
	color: $primary-color;

	& img {
		filter: invert(1);
	}

	&:hover {
		background-color: $tertiary-color;
		color: $secondary-color;

		& > img {
			filter: invert(0);
		}
	}
}

.light-theme-btn {
	background-color: $primary-color;
	color: $secondary-color;

	&:hover {
		background-color: $tertiary-color;
	}
}

.modal-title {
	font-family: "Panton", sans-serif;
	font-size: 1.5rem;
	font-weight: 600;
	color: $primary-color;
}

.modal-finish-btn {
	font-family: "Panton", sans-serif;
	font-size: 1.2rem;
	font-weight: 600;
	color: $secondary-color;
	background-color: $primary-color;
	border: none;

	&:hover {
		background-color: $tertiary-color;
	}
}
</style>
