<script setup>
import Header from "@/components/Header.vue";
import { useUsersStore } from "@/stores/users";

const theme = useUsersStore().isDarkMode();
</script>

<template>
	<div
		class="wrapper px-xl-5 px-4 pt-3"
		:class="{ 'background-light': !theme, 'background-dark': theme }"
	>
		<Header title="GESTÃO" :theme="theme" />
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
