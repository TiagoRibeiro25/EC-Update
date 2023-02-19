<script setup>
import DeleteNewBtn from "@/components/News/DeleteNewBtn.vue";
import { convertDateToString } from "@/hooks/convertDate.js";
import { useUsersStore } from "@/stores/users";

const props = defineProps({
	theme: { type: Boolean, required: true },
	newItem: { type: Object, required: true },
});

const theme = props.theme;
const newItem = props.newItem;
const isUserLogged = useUsersStore().isUserLogged();
const isUserAdmin = isUserLogged && useUsersStore().getUserLogged().role === "admin";

const formatText = (text, max) => {
	return text.length > max ? text.substring(0, max) + "..." : text;
};
</script>

<template>
	<div class="new-info px-4 py-3">
		<div class="row">
			<div class="title-container" :class="isUserAdmin ? 'col-8' : 'col-12'">
				<h2>
					<router-link
						:to="{ name: 'NewsDetails', params: { id: newItem.id } }"
						class="new-title"
						:class="theme ? 'dark-theme-title' : 'light-theme-title'"
					>
						{{ newItem.title }}
					</router-link>
				</h2>
			</div>
			<div v-if="isUserAdmin" class="col-4">
				<DeleteNewBtn :theme="theme" :newItemId="newItem.id" />
			</div>
		</div>
		<div class="row mt-3">
			<div class="col-12">
				<p
					class="new-description"
					:class="theme ? 'dark-theme-text' : 'light-theme-text'"
				>
					{{ formatText(newItem.body, 500) }}
				</p>
			</div>
		</div>
		<div class="row mt-3">
			<div class="col-12">
				<p
					class="new-date text-muted"
					:class="theme ? 'dark-theme-text' : 'light-theme-text'"
				>
					{{ convertDateToString(newItem.date) }}
				</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #e4f0e8;
$tertiary-color: #ffffff;
$fourth-color: #18516f;
$fifth-color: #aedcc0;

.new-info {
	height: 300px;
}

.title-container {
	height: 80px;
	overflow: hidden;
}

.new-title {
	font-family: "Alkes", sans-serif;
	font-size: 1.5rem;
	font-weight: 700;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
}

.new-description,
.new-date {
	font-family: "Panton", sans-serif;
	font-size: 1rem;
	font-weight: 400;
	height: 120px;
	overflow: hidden;
}

.new-date {
	font-size: 0.9rem;
}

.dark-theme-title {
	color: $fifth-color;
}

.light-theme-title {
	color: $primary-color;
}

.dark-theme-text {
	color: $tertiary-color;
}

.light-theme-text {
	color: $primary-color;
}
</style>
