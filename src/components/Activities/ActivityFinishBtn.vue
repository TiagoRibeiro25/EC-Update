<script setup>
import CreateItemImgs from "@/components/CreateItemImgs.vue";
import { useActivitiesStore } from "@/stores/activities";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const props = defineProps({
	theme: { type: Boolean, required: true },
	activityId: { type: String, required: true },
});

const router = useRouter();
const route = useRoute();
const theme = props.theme;
const activityId = props.activityId;
const modalId = `modal-${crypto.randomUUID()}`;
const images = ref([]);
const description = ref("");
const finishing = ref(false);

const verifyDescription = () => {
	const regex = /[a-zA-Z]/;
	return regex.test(description.value);
};

const verifyForm = () => {
	if (images.value.length === 0) return false;
	return verifyDescription();
};

const finishActivity = () => {
	finishing.value = true;
	const report = { description: description.value, images: images.value };

	useActivitiesStore().addReport(activityId, report);
	useActivitiesStore().finishActivity(activityId);

	// unlock "Preciso" badge
	const activity = useActivitiesStore().getActivityById(activityId);
	const today = new Date().toString().split(" ");
	const finalDate = new Date(activity.finalDate).toString().split(" ");
	const todayDate = `${today[2]}-${today[1]}-${today[3]}`;
	const finalDateFormatted = `${finalDate[2]}-${finalDate[1]}-${finalDate[3]}`;

	if (todayDate === finalDateFormatted) useActivitiesStore().unlockBadge("2");

	setTimeout(() => {
		if (route.name !== "Activities") router.push({ name: "Activities" });
		else router.go(0);
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

			<CreateItemImgs :images="images" />

			<div class="mt-3 w-100 mx-auto">
				<b-form-textarea
					class="activity-report-description"
					v-model="description"
					placeholder="Relatório da atividade..."
				></b-form-textarea>
			</div>

			<div v-if="finishing" class="w-100 text-center mt-3">
				<b-spinner variant="success" label="Carregando..."></b-spinner>
			</div>

			<div class="mt-4 mb-3">
				<b-button
					type="submit"
					class="btn btn-block modal-finish-btn w-50 mx-auto"
					:disabled="finishing || !verifyForm()"
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
$fourth-color: #aedcc0;

.finish-btn {
	font-family: "Panton", sans-serif;
	font-weight: 600;
	font-size: 14px;
}

.activity-report-description {
	font-family: "Panton", sans-serif;
	font-weight: 600;
	font-size: 1.3rem;
	height: 350px;
	resize: none;
	border: 2px solid $fourth-color;
	border-radius: 0.6rem;

	&:focus {
		outline: transparent;
		box-shadow: none;
		border-color: $tertiary-color;
	}
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
