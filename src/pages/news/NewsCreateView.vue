<script setup>
import Header from "@/components/Header.vue";
import NewsForm from "@/components/News/AddNew/NewsForm.vue";
import { useUsersStore } from "@/stores/users";
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const theme = useUsersStore().isDarkMode();
const isUserAdmin = useUsersStore().getUserLogged().role === "admin";
const loaded = ref(false);

onBeforeMount(() => {
	setTimeout(() => {
		if (isUserAdmin) loaded.value = true;
		else router.push({ name: "NotFound" });
	}, 300);
});
</script>

<template>
	<div v-if="loaded">
		<div
			class="wrapper pt-3"
			style="overflow-x: hidden"
			:class="{ 'background-light': !theme, 'background-dark': theme }"
		>
			<div class="row">
				<div class="col-12">
					<Header title="ADICIONAR NOTÍCIA" :theme="theme" />
				</div>
			</div>
			<div class="row content mx-auto mt-3">
				<div class="col-12 px-0">
					<NewsForm />
				</div>
			</div>
		</div>
	</div>
	<div
		v-else
		class="loading-page pb-5 d-flex justify-content-center align-items-center flex-column"
	>
		<b-spinner variant="success" label="Carregando..."></b-spinner>
	</div>
</template>

<style lang="scss" scoped>
.wrapper,
.loading-page {
	min-height: 100vh;
	min-height: 100dvh;
}

.content {
	max-width: 1300px;
}
</style>
