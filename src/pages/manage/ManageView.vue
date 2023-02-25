<script setup>
import Header from "@/components/Header.vue";
import FastActions from "@/components/Manage/FastActions.vue";
import Themes from "@/components/Manage/Themes/Themes.vue";
import ContactMembers from "@/components/Manage/ContactMembers/ContactMembers.vue";
import { useUsersStore } from "@/stores/users";
import { ref, onBeforeMount } from "vue";

const theme = useUsersStore().isDarkMode();
const loaded = ref(false);

onBeforeMount(() => {
	// check if the user logged has a role different from "unsigned"
	const userLogged = useUsersStore().getUserLogged();

	setTimeout(() => {
		if (userLogged.role === "unsigned") $router.push({ name: "Home" });
		else loaded.value = true;
	}, 300);
});
</script>

<template>
	<div
		class="wrapper px-xl-5 px-4 pt-3"
		style="overflow-x: hidden"
		:class="{ 'background-light': !theme, 'background-dark': theme }"
	>
		<div v-if="loaded" class="content mx-auto">
			<Header title="GESTÃO" :theme="theme" />
			<FastActions :theme="theme" />
			<Themes :theme="theme" />
			<ContactMembers :theme="theme" />
		</div>
		<div
			v-else
			class="loading-page pb-5 d-flex justify-content-center align-items-center flex-column"
		>
			<b-spinner variant="success" label="Carregando..."></b-spinner>
		</div>
	</div>
</template>

<style lang="scss">
$primary-color: #f8f9fa;
$secondary-color: #333333;

.wrapper,
.loading-page {
	min-height: 100vh;
	min-height: 100dvh;
}

.background-light {
	background-color: $primary-color;
}

.background-dark {
	background-color: $secondary-color;
}

.content {
	max-width: 1400px;
}
</style>
