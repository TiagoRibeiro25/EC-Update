<script setup>
import { useNewsStore } from "@/stores/news";
import { useActivitiesStore } from "@/stores/activities";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const props = defineProps({
	theme: { type: Boolean, required: true },
	itemId: { type: String, required: true },
	type: { type: String, required: true }, // "news" or "activities"
});

const route = useRoute();
const router = useRouter();
const theme = props.theme;
const type = props.type;
const itemId = props.itemId;
const modalId = `modal-${crypto.randomUUID()}`;
const removing = ref(false);

const deleteItem = () => {
	removing.value = true;

	if (type === "news") useNewsStore().removeNew(itemId);
	else useActivitiesStore().removeActivity(itemId);

	setTimeout(() => {
		if (route.name === "News" || route.name === "Activities") router.go(0);
		else {
			if (type === "news") router.push({ name: "News" });
			else router.push({ name: "Activities" });
		}
	}, 500);
};
</script>

<template>
	<div>
		<button
			type="button"
			class="remove-btn btn btn-sm rounded-pill px-3 float-right mt-2"
			:class="{
				'light-theme-btn': !theme,
				'dark-theme-btn': theme,
				'mr-3': route.name !== 'News' && route.name !== 'Activities',
			}"
			@click="$bvModal.show(modalId)"
		>
			<img
				v-if="!theme"
				class="mr-1"
				src="@/assets/icons/remove.svg"
				alt="add"
				width="20"
			/>
			<img v-else class="mr-1" src="@/assets/icons/remove2.svg" alt="add" width="20" />
			<span> Remover </span>
		</button>
	</div>

	<b-modal :id="modalId" size="lg" hide-footer>
		<div class="container">
			<h4 class="modal-title text-center mt-1">
				Tens a certeza que queres remover esta
				{{ type === "news" ? "notícia" : "atividade" }}?
			</h4>

			<div v-if="removing" class="w-100 text-center mt-3">
				<b-spinner variant="danger" label="Carregando..."></b-spinner>
			</div>

			<div class="mt-4 mb-3">
				<b-button
					type="submit"
					class="btn btn-block modal-remove-btn w-50 mx-auto"
					:disabled="removing"
					@click="deleteItem"
				>
					Remover
				</b-button>
			</div>
		</div>
	</b-modal>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #ffffff;
$tertiary-color: #18516f;
$fourth-color: #8e0101;
$fifth-color: #b50202;

.remove-btn {
	font-family: "Panton", sans-serif;
	font-weight: 600;
	font-size: 14px;
	background-color: transparent;

	&:hover {
		text-decoration: underline;
	}
}

.dark-theme-btn {
	color: $secondary-color;
	border-color: $secondary-color;
}

.light-theme-btn {
	color: $primary-color;
	border-color: $primary-color;
}

.modal-title {
	font-family: "Panton", sans-serif;
	font-size: 1.5rem;
	font-weight: 600;
	color: $primary-color;
}

.modal-remove-btn {
	font-family: "Panton", sans-serif;
	font-size: 1.2rem;
	font-weight: 600;
	color: $secondary-color;
	background-color: $fourth-color;
	border: none;

	&:hover {
		background-color: $fifth-color;
	}
}
</style>
