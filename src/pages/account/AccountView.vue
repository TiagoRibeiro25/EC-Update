<script setup>
import Info from "@/components/Account/Info.vue";
import { useUsersStore } from "@/stores/users";
import { useBadgesStore } from "@/stores/badges";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const theme = useUsersStore().isDarkMode();
const isLoaded = ref(false);

const id = route.params.id === "me" ? useUsersStore().getUserLogged().id : route.params.id;

const user = ref(useUsersStore().getUserById(id));
const highLightedBadge = ref(
	user.value ? useBadgesStore().getBadgeById(user.value.highlightedBadge) : null
);

// Validate the user id
onBeforeMount(() => {
	// If the user is logged in, it will check if the user is trying to access his own account
	// with the his own id. If so, it will replace the id with "me" and redirect to the same page.
	if (useUsersStore().isUserLogged()) {
		const loggedUserId = useUsersStore().getUserLogged().id;
		if (loggedUserId === id) useRouter().push({ name: "Account", params: { id: "me" } });
	}

	// If the user does not exist, it will redirect to the NotFound page.
	if (!useUsersStore().doesUserExist(id) && id !== "me") {
		useRouter().push({ name: "NotFound" });
	}

	setTimeout(() => {
		isLoaded.value = true;
	}, 300);
});
</script>

<template>
	<div
		class="wrapper px-xl-5 px-4 pt-3"
		:class="{ 'background-light': !theme, 'background-dark': theme }"
	>
		<div v-if="isLoaded" class="px-sm-5 mt-5">
			<Info :user="user" :highLightedBadge="highLightedBadge" />
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
}

.background-light {
	background-color: $primary-color;
}

.background-dark {
	background-color: $secondary-color;
}

// .loading-page {
// 	height: 95vh;
// }
</style>
