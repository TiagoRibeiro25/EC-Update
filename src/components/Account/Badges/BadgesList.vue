<script setup>
import { useBadgesStore } from "@/stores/badges";
import { useUsersStore } from "@/stores/users";
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const emit = defineEmits(["updateHighlightedBadge"]);
const props = defineProps({ badges: { type: Object, required: true } });
const badges = props.badges.badges;
const type = props.badges.type;
const highlightedBadge = ref(props.badges.highlightedBadge || null);

const isThisUserProfile = () => {
	// If the user is logged in and the route is /me, then it's the user's profile
	return useUsersStore().isUserLogged() && route.params.id === "me";
};
const percentageOfUsers = (badgeId) => {
	return useBadgesStore().getPercentageOfUsersWithBadge(badgeId);
};
const contrastBg = (index) => index % 2 === 0;

const changeHighlightedBadge = (badge) => {
	if (isThisUserProfile()) {
		useUsersStore().updateHighlightedBadge(badge.id);
	}
	highlightedBadge.value = badge;
	emit("updateHighlightedBadge", badge);
};
</script>

<template>
	<div v-for="(badge, index) in badges" :key="badge.id">
		<!-- cursor pointer bootstrap class -->
		<div
			class="row pl-4 py-3"
			:class="{ 'bg-darker': contrastBg(index), disabled: type === 'locked' }"
		>
			<!-- Icon -->
			<div class="col-2 text-center">
				<img
					class="img-fluid badge-icon"
					:class="{ 'unlocked-badge': type === 'unlocked' && isThisUserProfile() }"
					:src="badge.src"
					alt="Badge Icon"
					@click="changeHighlightedBadge(badge)"
				/>
			</div>

			<!-- Description -->
			<div class="col-7">
				<div class="row">
					<div class="col-12">
						<h3
							class="badge-title"
							:class="{
								'text-success': badge === highlightedBadge && isThisUserProfile(),
							}"
						>
							{{ badge.title }}
						</h3>
					</div>
					<div class="col-12">
						<p
							class="badge-description"
							:class="{
								'text-success': badge === highlightedBadge && isThisUserProfile(),
							}"
						>
							{{ badge.description }}
						</p>
					</div>
				</div>
			</div>

			<!-- Percentage of Users that unlocked it -->
			<div class="col-2">
				<div class="row mt-2">
					<div class="col-12 text-center">
						<span class="badge-percentage">{{ percentageOfUsers(badge.id) }}%</span>
					</div>
					<div class="col-12">
						<div class="progress">
							<div
								class="progress-bar bg-success"
								role="progressbar"
								:style="{ width: percentageOfUsers(badge.id) + '%' }"
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #6ea952;
$quaternary-color: #3fc380;
$quinary-color: #303a39;

.disabled {
	opacity: 0.5;
}

.badge-icon {
	width: 70px;
	height: 80px;
}

.unlocked-badge {
	transition: transform 0.2s ease-in-out;

	&:hover {
		cursor: pointer;
		transform: scale(1.1);
	}
}

.badge-title,
.badge-description,
.badge-percentage {
	font-family: "Panton", sans-serif;
	font-size: 1.3rem;
	font-weight: 700;
	color: $secondary-color;
}

.badge-description {
	font-size: 1rem;
	font-weight: 400;
}

.badge-percentage {
	font-size: 1rem;
}

.bg-darker {
	background-color: $quinary-color;
}

.progress {
	height: 10px !important;
	background-color: $secondary-color !important;
}

.progress-bar {
	background-color: $tertiary-color !important;
}
</style>
