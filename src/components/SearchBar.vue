<script setup>
import { ref, computed, watch } from "vue";
import { useNewsStore } from "@/stores/news";
import { useActivitiesStore } from "@/stores/activities";

const props = defineProps({
	theme: { type: Boolean, required: true },
	page: { type: String, required: true },
});

const theme = props.theme;
const currentPage = props.page;
const search = ref("");
const data = ref([]);
const showModal = ref(false);

const showResults = () => {
	console.log(data.value);
	showModal.value = true;
};

const searchNews = computed(async () => {
	const news = await useNewsStore().searchNews(search.value);
	data.value = [...data.value, ...news];
});

const searchActivities = computed(async () => {
	const activities = await useActivitiesStore().searchActivities(search.value);
	data.value = [...data.value, ...activities];
});

watch(search, async () => {
	// if the search input has less than 3 characters, don't search
	if (search.value.length < 3) {
		showModal.value = false;
		return;
	}

	data.value = [];
	if (currentPage === "News" || currentPage === "Home") await searchNews.value;
	if (currentPage === "Activities" || currentPage === "Home") await searchActivities.value;

	if (data.value.length === 0) {
		showModal.value = false;
		return;
	}

	showResults();
});
</script>

<template>
	<div class="searchbar">
		<b-input-group>
			<template #prepend>
				<b-input-group-text
					class="searchbar-input"
					:class="{ 'bg-light': !theme, 'bg-dark': theme }"
				>
					<img src="../assets/icons/search.svg" alt="search" width="20" />
				</b-input-group-text>
			</template>
			<b-form-input
				class="searchbar-input"
				:class="{ 'bg-light': !theme, 'bg-dark': theme }"
				placeholder="Search"
				type="search"
				v-model="search"
				style="width: 400px"
			></b-form-input>
		</b-input-group>
	</div>

	<div
		class="search-results px-5"
		:style="{ visibility: showModal ? 'visible' : 'hidden' }"
	>
		<div v-for="item in data" :key="item.id" class="mb-3">
			<div class="row">
				<div class="col-9">
					<router-link
						class="go-to-item-link text-decoration-none"
						:to="{
							name: item.type === 'new' ? 'NewsDetails' : 'ActivitiesDetails',
							params: { id: item.id },
						}"
					>
						{{ item.title }}
					</router-link>
				</div>
				<div class="col-3">
					<span>
						{{ item.type }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #ffffff;

.searchbar {
	width: 66%;
	margin-left: auto;
	z-index: 1001;
}

.searchbar-input {
	border: none;
	border-radius: 13px;

	&:focus {
		box-shadow: none;
	}
}

.bg-light {
	background-color: $primary-color !important;
	color: $secondary-color !important;
}

.bg-dark {
	background-color: $tertiary-color !important;
	color: $primary-color !important;
}

.search-results {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1000;
	padding-top: 180px;

	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}

	.row {
		background-color: $primary-color;
		border-radius: 13px;
		padding: 10px;
		margin-bottom: 23px;
	}

	.col-9 {
		color: $secondary-color;
		font-family: "Panton", sans-serif;
		font-weight: 600;
		font-size: 20px;
	}

	.col-3 {
		color: $secondary-color;
		text-align: right;

		font-family: "Panton", sans-serif;
		font-weight: 600;
		font-size: 20px;
	}

	.go-to-item-link {
		color: $secondary-color;
	}

	.go-to-item-link:hover {
		color: $tertiary-color;
	}
}

@media (max-width: 620px) {
	.searchbar {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.searchbar-input {
		border-radius: 0;
	}

	.searchbar-icon {
		display: none;
	}
}
</style>
