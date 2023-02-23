<script setup>
import Header from "@/components/Header.vue";
import SearchBar from "@/components/SearchBar.vue";
import CreateNewBtn from "@/components/CreateNewBtn.vue";
import NewsList from "@/components/News/NewsList.vue";
import { useUsersStore } from "@/stores/users";

const theme = useUsersStore().isDarkMode();
const isUserLogged = useUsersStore().isUserLogged();
const isUserAdmin = isUserLogged ? useUsersStore().getUserLogged().role === "admin" : false;
</script>

<template>
	<div
		class="wrapper pt-3"
		style="overflow: hidden"
		:class="{ 'background-light': !theme, 'background-dark': theme }"
	>
		<div class="row">
			<div class="col-9 d-flex align-items-center mt-4 pt-2">
				<SearchBar :theme="theme" page="News" />
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<Header title="NOTÍCIAS" :theme="theme" />
			</div>
		</div>
		<div class="row content mx-auto px-5 mt-3">
			<div class="col-12 px-0 mb-2" :class="{ 'd-none': !isUserLogged || !isUserAdmin }">
				<CreateNewBtn :theme="theme" type="NewsCreate" text="Adicionar Notícia" />
			</div>
			<div class="col-12 px-0 mt-4">
				<NewsList :theme="theme" />
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

.content {
	max-width: 1400px;
}
</style>
