<script setup>
import Header from "@/components/Header.vue";
import Menu from "@/components/Manage/AdminMenu/Menu.vue";
import { useUsersStore } from "@/stores/users";
import { ref, onBeforeMount } from "vue";

const theme = useUsersStore().isDarkMode();
const loaded = ref(false);

onBeforeMount(() => {
	// check if the user logged is an admin
	const userLogged = useUsersStore().getUserLogged();

	setTimeout(() => {
		if (userLogged.role !== "admin") $router.push({ name: "NotFound" });
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
		<div v-if="loaded" class="content mx-auto mb-5">
			<Header title="MENU ADMIN" :theme="theme" />
			<Menu :theme="theme" />
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
