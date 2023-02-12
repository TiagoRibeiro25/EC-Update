<script setup>
import { RouterView } from "vue-router";
import { ref, onBeforeMount } from "vue";
import {
	loadAllUserData,
	loadBadgesData,
	loadActivitiesData,
	loadMeetingsData,
	loadNewsData,
	loadSchoolsData,
	loadThemesData,
} from "@/hooks/loadData";
import SideBar from "@/components/SideBar.vue";
import { useUsersStore } from "@/stores/users";

const dataLoaded = ref(false);
const loadingPercentage = ref(0);
const loadingMessage = ref("Loading...");
const showContent = ref(false);
const theme = ref(useUsersStore().isDarkMode());

onBeforeMount(async () => {
	loadingMessage.value = "Carregando Utilizadores...";
	await loadAllUserData();
	loadingPercentage.value = ((100 / 7) * 1).toFixed(0);

	loadingMessage.value = "Carregando Conquistas...";
	await loadBadgesData();
	loadingPercentage.value = ((100 / 7) * 2).toFixed(0);

	loadingMessage.value = "Carregando Atividades...";
	await loadActivitiesData();
	loadingPercentage.value = ((100 / 7) * 3).toFixed(0);

	loadingMessage.value = "Carregando Reuniões...";
	await loadMeetingsData();
	loadingPercentage.value = ((100 / 7) * 4).toFixed(0);

	loadingMessage.value = "Carregando Notícias...";
	await loadNewsData();
	loadingPercentage.value = ((100 / 7) * 5).toFixed(0);

	loadingMessage.value = "Carregando Escolas...";
	await loadSchoolsData();
	loadingPercentage.value = ((100 / 7) * 6).toFixed(0);

	loadingMessage.value = "Carregando Temas...";
	await loadThemesData();
	loadingPercentage.value = ((100 / 7) * 7).toFixed(0);
	loadingMessage.value = "Carregamento Concluído!";

	// Prevent scrolling while loading
	document.body.style.overflow = "hidden";

	setTimeout(() => {
		dataLoaded.value = true;
	}, 500);

	setTimeout(() => {
		showContent.value = true;
	}, 500);

	setTimeout(() => {
		// Allow scrolling after loading
		document.body.style.overflow = "auto";
	}, 1500);
});
</script>

<template>
	<div v-if="dataLoaded">
		<div class="wrapper" :class="{ 'bg-light': !theme, 'bg-dark': theme }">
			<SideBar class="nav" :class="{ nav_loaded: showContent }" />
			<main class="main" :class="{ loaded: showContent }">
				<RouterView />
			</main>
		</div>
	</div>

	<div
		v-else
		class="d-flex flex-column align-items-center justify-content-center loading-container"
		:class="{ 'bg-light': !theme, 'bg-dark': theme }"
	>
		<b-spinner
			class="mx-auto loading-icon"
			:class="{ remove: loadingPercentage == 100 }"
			variant="success"
			label="Loading..."
		></b-spinner>
		<b-progress
			class="loading-bar mt-5 w-75"
			:class="{ remove: loadingPercentage == 100 }"
			:value="loadingPercentage"
			max="100"
			variant="success"
			show-progress
			animated
		></b-progress>
		<span
			class="loading-msg mt-2 text-center"
			:class="{
				remove: loadingPercentage == 100,
				'text-dark': !theme,
				'text-light': theme,
			}"
		>
			{{ loadingMessage }}
		</span>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #f8f9fa;
$secondary-color: #333333;

.wrapper {
	min-height: 100vh;
	overflow-x: hidden;
}

.nav {
	transform: translateX(-100%);
	opacity: 0;
	transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.nav_loaded {
	transform: translateX(0);
	opacity: 1;
}

.main {
	flex: 1 1 auto;
	overflow: auto;
	margin-left: 80px;
	transition: transform 1s ease-in-out, opacity 1s ease-in-out;
	transform: translateY(10vh);
	opacity: 0;

	&.loaded {
		transform: translateY(0);
		opacity: 1;
	}
}

.loading-container {
	height: 100vh;

	& .loading-icon {
		width: 3.5rem;
		height: 3.5rem;
	}

	& .loading-bar {
		max-width: 500px;
		height: 20px;
	}

	& .loading-msg {
		font-family: "Panton", sans-serif;
		font-size: 1.3rem;
		font-weight: 600;
	}
}

.remove {
	transition: all 0.5s ease-in-out;
	opacity: 0;
	transform: translateY(-20px);
}

.bg-light {
	background-color: $primary-color !important;
}

.bg-dark {
	background-color: $secondary-color !important;
}

.text-light {
	color: $primary-color !important;
}

.text-dark {
	color: $secondary-color !important;
}
</style>
