<script setup>
import BadgesList from "@/components/Account/Badges/BadgesList.vue";
import { useBadgesStore } from "@/stores/badges";

const emit = defineEmits(["updateHighlightedBadge"]);
const props = defineProps({ user: { type: Object, required: true } });
const user = props.user;

const badges = useBadgesStore().getBadges();
const unlockedBadges = badges.filter((badge) => user.badges.includes(badge.id));
const lockedBadges = badges.filter((badge) => !user.badges.includes(badge.id));
const highlightedBadge = badges.find((badge) => badge.id === user.highlightedBadge);

const updateHighlightedBadge = (badge) => emit("updateHighlightedBadge", badge);
</script>

<template>
	<div
		class="badges row mx-auto py-lg-0 py-sm-3 py-5 mt-5 d-flex justify-content-center align-items-center"
	>
		<div class="col-xl-6 px-0 pr-xl-4">
			<div class="badges-info py-3 shadow">
				<div class="row">
					<div class="col-9 d-flex align-items-center">
						<h2 class="ml-4 pl-3 badges-info-title">Medalhas desbloqueadas</h2>
					</div>
					<div class="col-3 text-center pr-5">
						<span class="percentage-info"> % de usuários com a medalha </span>
					</div>
				</div>
				<div class="badges-list mt-2">
					<BadgesList
						:badges="{
							badges: unlockedBadges,
							type: 'unlocked',
							highlightedBadge: highlightedBadge,
						}"
						@updateHighlightedBadge="updateHighlightedBadge"
					/>
				</div>
			</div>
		</div>
		<div class="col-xl-6 px-0 pl-xl-4">
			<div class="badges-info py-3 shadow mt-xl-0 mt-5">
				<div class="row">
					<div class="col-9 d-flex align-items-center">
						<h2 class="ml-4 pl-3 badges-info-title">Medalhas bloqueadas</h2>
					</div>
					<div class="col-3 text-center pr-5">
						<span class="percentage-info"> % de usuários com a medalha </span>
					</div>
				</div>
				<div class="badges-list mt-2">
					<BadgesList
						:badges="{
							badges: lockedBadges,
							type: 'locked',
						}"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$quaternary-color: #3fc380;
$quinary-color: #303a39;

.badges {
	max-width: 1400px;
}

.badges-info {
	min-height: 500px;
	background-color: $primary-color;
	border-radius: 20px;
}

.badges-info-title {
	color: $secondary-color;
	font-family: "Alkes", sans-serif;
	font-size: 1.55rem;
	font-weight: 700;
}

.percentage-info {
	color: $secondary-color;
	font-family: "Alkes", sans-serif;
	font-size: 0.8rem;
	font-weight: 700;
}

.badges-list {
	overflow-y: scroll;
	overflow-x: hidden;
	height: 430px;

	&::-webkit-scrollbar {
		width: 10px;
	}
	&::-moz-scrollbar {
		width: 10px;
	}
	scrollbar-width: 10px;

	&::-webkit-scrollbar-track {
		background: $quinary-color;
	}
	&::-moz-scrollbar-track {
		background: $quinary-color;
	}

	&::-webkit-scrollbar-thumb {
		background: $secondary-color;
	}
	&::-moz-scrollbar-thumb {
		background: $secondary-color;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: $quaternary-color;
	}
	&::-moz-scrollbar-thumb:hover {
		background: $quaternary-color;
	}
}
</style>
