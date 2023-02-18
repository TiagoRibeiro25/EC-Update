<script setup>
import UserInfo from "@/components/Account/UserInfo.vue";
import EditProfileModal from "@/components/Account/EditProfileModal.vue";
import { ref, watch } from "vue";
import { useUsersStore } from "@/stores/users";

const props = defineProps({
	user: { type: Object, required: true },
	highLightedBadge: { type: Object, required: true },
});

const user = props.user;
const highLightedBadge = ref(props.highLightedBadge);
let isThisUserPage = false;

if (useUsersStore().isUserLogged() && user.id === useUsersStore().getUserLogged().id) {
	isThisUserPage = true;
}

watch(
	() => props.highLightedBadge,
	(newVal) => (highLightedBadge.value = newVal)
);
</script>

<template>
	<div class="top-info row mx-auto py-lg-0 py-sm-3 py-5 shadow">
		<!-- Profile Picture -->
		<div class="col-lg-2 d-flex justify-content-center align-items-center flex-column">
			<img
				class="img-fluid profile-pic rounded-circle"
				:src="user.photo"
				alt="Imagem de Perfil"
			/>
		</div>
		<!-- Profile Info -->
		<div class="col-lg-8 pl-lg-0 pb-lg-0 pb-3 text-lg-left text-center">
			<UserInfo :user="user" />
		</div>
		<!-- Profile HighLight Badge + Edit Profile Button -->
		<div class="col-lg-2 d-flex justify-content-center align-items-center flex-column">
			<!-- HighLight Badge -->
			<div
				v-if="highLightedBadge"
				class="d-flex justify-content-center align-items-center flex-column"
			>
				<img
					class="img-fluid badge-icon mb-2"
					:src="highLightedBadge.src"
					alt="Medalha em Destaque"
				/>
				<span class="badge-title d-block text-center">{{ highLightedBadge.title }}</span>
			</div>
			<div v-else class="d-flex justify-content-center align-items-center flex-column">
				<img
					class="empty-badge"
					src="@/assets/logo/logo.png"
					alt="Nenhuma medalha em destaque"
					:class="{ 'mb-3': !isThisUserPage }"
				/>
			</div>
			<!-- Edit Profile Button -->
			<div v-if="isThisUserPage" class="mt-3">
				<b-button
					class="edit-profile-btn px-2"
					size="sm"
					@click="$bvModal.show('edit-profile-modal')"
				>
					Editar Perfil
				</b-button>
			</div>
		</div>
	</div>

	<!-- Edit Profile Modal -->
	<EditProfileModal v-if="isThisUserPage" id="edit-profile-modal" />
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #6ea952;
$quaternary-color: #3fc380;

.top-info {
	background-color: $primary-color;
	border-radius: 20px;
	min-height: 180px;
	max-width: 1400px;
}

.profile-pic {
	max-width: 150px;
	max-height: 150px;
	background-color: $tertiary-color;
}

.badge-title {
	font-family: "Panton", sans-serif;
	font-size: 1.7rem;
	font-weight: 700;
	color: $secondary-color;
}

.badge-icon {
	width: 60px;
	height: 70px;
}

.badge-title {
	font-size: 0.9rem;
}

.empty-badge {
	width: 65px;
	height: 90px;
	background-image: url("@/assets/logo/logo_dark.png");
}

.edit-profile-btn {
	background: transparent;
	border: 1px solid $secondary-color;
	color: $secondary-color;
	font-family: "Panton", sans-serif;
	font-size: 0.9rem;
	font-weight: 700;
	border-radius: 20px;

	&:hover {
		background-color: $secondary-color;
		color: $primary-color;
	}
}
</style>
