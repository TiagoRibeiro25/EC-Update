<script setup>
import Header from "@/components/Header.vue";
import { useUsersStore } from "@/stores/users";
import SearchBar from "../../components/SearchBar.vue";

const theme = useUsersStore().isDarkMode();
</script>

<template>
	<div
		class="wrapper pt-3"
		:class="{ 'background-light': !theme, 'background-dark': theme }"
	>
		<div class="row">
			<div class="col-9 d-flex align-items-center mt-4 pt-2">
				<SearchBar :theme="theme" page="Activities" />
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<Header title="ATIVIDADES" :theme="theme" />
			</div>
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
</style>
