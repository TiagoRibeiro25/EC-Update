<script setup>
import { ref } from "vue";
import { useUsersStore } from "@/stores/users";
import Header from "@/components/Header.vue";
import SearchBar from "@/components/SearchBar.vue";
import ThemeSwitcher from "@/components/Home/ThemeSwitcher.vue";
import RecentNews from "@/components/Home/RecentNews.vue";
import RecentActivities from "@/components/Home/RecentActivities.vue";
import Quote from "@/components/Home/Quote.vue";
import FAQ from "@/components/Home/FAQ/FAQ.vue";
import Footer from "@/components/Home/Footer.vue";

const render = ref(true);
const theme = ref(useUsersStore().isDarkMode());

function toggleTheme(value) {
	theme.value = value;
	render.value = false;
	setTimeout(() => {
		render.value = true;
	}, 1);
}
</script>

<template>
	<div
		v-if="render"
		class="wrapper pt-5"
		:class="{ 'background-light': !theme, 'background-dark': theme }"
	>
		<div class="row">
			<div class="col-9 d-flex align-items-end">
				<SearchBar :theme="theme" page="Home" />
			</div>
			<div class="col-3 d-flex align-items-center justify-content-center">
				<ThemeSwitcher @toggleTheme="toggleTheme" />
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<Header title="DESTAQUES" :theme="theme" />
			</div>
		</div>
		<div class="row">
			<div class="col-12 mt-5 mb-5">
				<RecentNews :theme="theme" />
			</div>
		</div>
		<div class="row">
			<div class="col-12 mt-5 mb-4">
				<RecentActivities :theme="theme" />
			</div>
		</div>
		<div class="row">
			<div class="col-12 mt-5">
				<Quote :theme="theme" />
			</div>
		</div>
		<div class="row">
			<div class="col-12 mt-5">
				<FAQ :theme="theme" />
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<Footer />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #f8f9fa;
$secondary-color: #333333;

.background-light {
	background-color: $primary-color;
}

.background-dark {
	background-color: $secondary-color;
}
</style>
